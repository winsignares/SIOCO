from django.db import models
from shared.persistencia.models.rol_models import RolModel
from django.contrib.auth.models import AbstractUser

class UsuarioModel(AbstractUser):
    numero_identificacion = models.CharField(max_length=255, null=False)
    rol = models.ForeignKey(RolModel, on_delete=models.PROTECT, null=True)
    genero = models.CharField(max_length=1, null=True)
    descripcion = models.TextField(null=True, blank=True)
    url_imagen = models.CharField(max_length=255, null=True)

    class Meta:
        unique_together = (('id', 'numero_identificacion'),)

    def __str__(self):
        return self.get_full_name() or self.username