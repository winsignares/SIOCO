from django.db import models

class CitaEstadosModel(models.Model):
    nombre = models.CharField(max_length=255, null=False, unique=True)
    descripcion = models.TextField(null=True)

    def __str__(self) -> str:
        return self.nombre