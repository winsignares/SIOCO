from django.db import models

class RolModel(models.Model):
    nombre = models.CharField(max_length=55, unique=True)
    descripcion = models.TextField(null=True)

    def __str__(self) -> str:
        return self.nombre