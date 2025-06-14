from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from django.conf import settings


class OdontologiaModel(TenantMixin):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    activa = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    exp_token = models.TextField(null=True)
    auto_create_schema = True
    auto_drop_schema = True

    def save(self, *args, **kwargs):
        if not self.pk:
            super(OdontologiaModel, self).save(*args, **kwargs)

        data = {
            "name": self.nombre,
            "created_at": str(self.creado_en),
            "id": self.pk
        }

        kwargs['force_insert'] = False
        super(OdontologiaModel, self).save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class OdontologiaDomain(DomainMixin):
    tenant = models.OneToOneField(OdontologiaModel, related_name='domain', on_delete=models.CASCADE)

    def __str__(self):
        return self.domain


class OdontologiaUsuarioModel(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    odontologia = models.ForeignKey(OdontologiaModel, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('usuario', 'odontologia'),)

    def __str__(self):
        return f"{self.usuario.get_full_name()}, {self.odontologia.nombre}"