from django.db import models
from .appointment_models import Appointment
from django.utils import timezone
from datetime import timedelta

class Bill(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    bill_date = models.DateField(auto_now_add=True)
    deadline = models.DateField(default=timezone.now() + timedelta(days=30))
    total_to_pay = models.FloatField()
    is_done = models.BooleanField(default=False)
    iva_rate = models.FloatField(default=19.0)
    
    def calculate_total_with_iva(self):
        return self.total_to_pay * (1 + self.iva_rate / 100)

class BillItem(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    description = models.TextField()
    amount = models.FloatField()