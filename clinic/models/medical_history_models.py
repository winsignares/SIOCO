from django.db import models
from django.apps import apps
from .tooths_models import ToothSection

class MedicalHistory(models.Model):
    tooth_section = models.ForeignKey(ToothSection, on_delete=models.CASCADE)
    tooth_condition = models.ForeignKey(
        'shared.ToothCondition',
        on_delete=models.CASCADE
    )
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        ToothCondition = apps.get_model('shared', 'ToothCondition')
        return f"{self.tooth_section.name}, {ToothCondition.objects.get(id=self.tooth_condition_id).name}, {self.date}"
