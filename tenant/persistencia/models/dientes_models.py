from django.db import models
from django.conf import settings

class OdontogramaModel(models.Model):
    paciente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)
    creado_en = models.DateField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.paciente.get_full_name()

class DienteModel(models.Model):
    odontograma = models.ForeignKey(OdontogramaModel, on_delete=models.CASCADE)
    numero = models.IntegerField()
    
    def __str__(self) -> str:
        return f"{self.odontograma.patient.get_full_name()}, {self.numero}"

class DienteSeccionModel(models.Model):
    diente = models.ForeignKey(DienteModel, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=55, null=False)
    
    def __str__(self) -> str:
        return f"{self.nombre}, {self.diente.number}, {self.diente.odontogram.patient}"