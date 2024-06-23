from django.db import models
from django.conf import settings

class Odontogram(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)
    created_on = models.DateField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.patient.get_full_name()

class Tooth(models.Model):
    odontogram = models.ForeignKey(Odontogram, on_delete=models.CASCADE)
    number = models.IntegerField()
    
    def __str__(self) -> str:
        return f"{self.odontogram.patient.get_full_name()}, {self.number}"

class ToothSection(models.Model):
    tooth = models.ForeignKey(Tooth, on_delete=models.CASCADE)
    name = models.CharField(max_length=55, null=False)
    
    def __str__(self) -> str:
        return f"{self.name}, {self.tooth.number}, {self.tooth.odontogram.patient}"