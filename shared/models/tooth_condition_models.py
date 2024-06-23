from django.db import models

class ToothConditionColor(models.Model):
    name = models.CharField(max_length=55, unique=True)
    description = models.TextField(null=True)
    hexadecimal_code = models.CharField(max_length=55, unique=True, null=False)
    
    def __str__(self) -> str:
        return self.name

class ToothCondition(models.Model):
    name = models.CharField(max_length=55, unique=True)
    description = models.TextField(null=True)
    color = models.ForeignKey(ToothConditionColor, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name