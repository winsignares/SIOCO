from django.db import models
from .facturas_models import FacturaModel
from shared.persistencia import PagoMetodosModel, PagoEstadosModel

class PagoModel(models.Model):
    factura = models.ForeignKey(FacturaModel, on_delete=models.CASCADE)
    monto_pagado = models.FloatField()
    fecha_pago = models.DateField(auto_now_add=True)
    metodo_pago = models.ForeignKey(PagoMetodosModel, on_delete=models.CASCADE)
    estado_pago = models.ForeignKey(PagoEstadosModel, on_delete=models.CASCADE)