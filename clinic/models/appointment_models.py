from django.db import models
from django.conf import settings

class Appointment(models.Model):
    
    from shared.models import AppointmentStatus
    
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='appointments')
    secretary = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='secretary_appointments')
    dentist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='dentist_appointments')
    date = models.DateTimeField()
    created_on = models.DateField(auto_now_add=True)
    status = models.ForeignKey(AppointmentStatus, null=False, default=1, on_delete=models.PROTECT)
    
    class Meta:
        unique_together = (('patient', 'date'), ('dentist', 'date'),)
    
    def __str__(self) -> str:
        return f"{self.patient.get_full_name()}, {self.date}"