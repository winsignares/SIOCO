from django.db import models
from django.conf import settings
from shared.persistencia import CitaEstadosModel

class CitaModel(models.Model):
    
    paciente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='appointments')
    secretaria = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='secretary_appointments')
    dentista = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='dentist_appointments')
    hora = models.DateTimeField()
    creada_en = models.DateField(auto_now_add=True)
    estado = models.ForeignKey(CitaEstadosModel, null=False, default=1, on_delete=models.PROTECT)
    
    class Meta:
        unique_together = (('paciente', 'hora'), ('dentista', 'hora'),)
    
    def __str__(self) -> str:
        return f"{self.paciente.get_full_name()}, {self.hora}"