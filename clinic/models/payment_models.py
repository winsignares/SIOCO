from django.db import models
from .bill_models import Bill

class Payment(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    amount_paid = models.FloatField()
    date_paid = models.DateField(auto_now_add=True)
    payment_method = models.ForeignKey(
        'shared.PaymentMethod',
        on_delete=models.CASCADE,
    )
    payment_status = models.ForeignKey(
        'shared.PaymentStatus',
        on_delete=models.CASCADE,
    )
