from django.db import models

class AppointmentStatus(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField(null=True)
    
    def __str__(self) -> str:
        return self.name