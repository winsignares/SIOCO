from django.db import models
from . import Role
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    identification_card = models.CharField(max_length=255, null=False)
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True)
    gender = models.CharField(max_length=1, null=True)
    description = models.TextField(null=True, blank=True)
    url_image = models.CharField(max_length=255, null=True)
    
    class Meta:
        unique_together = (('id', 'identification_card'),)
    
    def __str__(self):
        return f"{self.get_full_name()}"