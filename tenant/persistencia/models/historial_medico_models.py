from django.db import models
from .dientes_models import DienteSeccionModel
from shared.persistencia import DienteEstadosModel

class HistorialMedicoModel(models.Model):
    
    diente_seccion = models.ForeignKey(DienteSeccionModel, on_delete=models.CASCADE)
    diente_condicion = models.ForeignKey(DienteEstadosModel, on_delete=models.CASCADE)
    hora = models.DateField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f"{self.diente_seccion.name}, {self.diente_condicion.name}, {self.hora}"