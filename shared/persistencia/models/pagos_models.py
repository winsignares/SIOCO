from django.db import models

class PagoEstadosModel(models.Model):
    nombre = models.CharField(max_length=55, unique=True)
    descripcion = models.TextField(null=True)

    def __str__(self) -> str:
        return self.nombre


class PagoMetodosModel(models.Model):
    nombre = models.CharField(max_length=55, unique=True)
    descripcion = models.TextField(null=True)

    def __str__(self) -> str:
        return self.nombre