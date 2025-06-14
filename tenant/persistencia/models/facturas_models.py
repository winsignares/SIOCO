from django.db import models
from .citas_models import CitaModel
from django.utils import timezone
from datetime import timedelta

class FacturaModel(models.Model):
    cita = models.ForeignKey(CitaModel, on_delete=models.CASCADE)
    fecha_creada = models.DateField(auto_now_add=True)
    fecha_limite = models.DateField(default=timezone.now() + timedelta(days=30))
    total_pagar = models.FloatField()
    activa = models.BooleanField(default=False)
    iva = models.FloatField(default=19.0)
    
    def calculate_total_with_iva(self):
        return self.total_pagar * (1 + self.iva / 100)

class FacturaItemModel(models.Model):
    factura = models.ForeignKey(FacturaModel, on_delete=models.CASCADE)
    descripcion = models.TextField()
    monto = models.FloatField()