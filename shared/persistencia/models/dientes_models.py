from django.db import models

class ColoresEstadosDienteModel(models.Model):
    nombre = models.CharField(max_length=55, unique=True)
    descripcion = models.TextField(null=True)
    codigo_hexadecimal = models.CharField(max_length=55, unique=True, null=False)

    def __str__(self) -> str:
        return self.nombre


class DienteEstadosModel(models.Model):
    nombre = models.CharField(max_length=55, unique=True)
    descripcion = models.TextField(null=True)
    color = models.ForeignKey(ColoresEstadosDienteModel, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.nombre