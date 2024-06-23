from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=55, unique=True)
    description = models.TextField(null=True)
    
    def __str__(self) -> str:
        return self.name