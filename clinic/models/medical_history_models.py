from django.db import models
from .tooths_models import ToothSection
from shared.models import ToothCondition

class MedicalHistory(models.Model):
    
    tooth_section = models.ForeignKey(ToothSection, on_delete=models.CASCADE)
    tooth_condition = models.ForeignKey(ToothCondition, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f"{self.tooth_section.name}, {self.tooth_condition.name}, {self.date}"