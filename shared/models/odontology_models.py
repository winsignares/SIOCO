from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from ..utils import create_access_token
from django.conf import settings

class Odontology(TenantMixin):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    exp_token = models.TextField(null=True)
    auto_create_schema = True
    auto_drop_schema = True
    
    def save(self, *args, **kwargs):
        if not self.pk:
            super(Odontology, self).save(*args, **kwargs)
        
        data = {
            "name": self.name,
            "created_at": str(self.created_at),
            "id": self.pk
        }
        self.exp_token = create_access_token(data=data)
        
        kwargs['force_insert'] = False
        super(Odontology, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class OdontologyDomain(DomainMixin):
    tenant = models.ForeignKey(Odontology, related_name='domain', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.domain
    
class OdontologyUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    odontology = models.ForeignKey(Odontology, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'odontology'),)

    def __str__(self):
        return f"{self.user.get_full_name()}, {self.odontology.name}"