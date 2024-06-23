from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import ToothCondition, ToothConditionColor

@receiver(post_migrate)
def create_default_tooth_conditions(sender, **kwargs):
    default_conditions = [
        {"name": "New", "description": "Default condition", "color_name": "White"},
        {"name": "Amalgam", "description": "Amalgam filling", "color_name": "Red"},
        {"name": "Cavity", "description": "Treatment for cavity", "color_name": "Yellow"},
        {"name": "Endodontics", "description": "Root canal treatment", "color_name": "Orange"},
        {"name": "Missing", "description": "Missing tooth", "color_name": "Light Coral"},
        {"name": "Resin", "description": "Resin filling", "color_name": "Sienna"},
        {"name": "Implant", "description": "Dental implant", "color_name": "Medium Orchid"},
        {"name": "Sealant", "description": "Sealant application", "color_name": "Green"},
        {"name": "Crown", "description": "Dental crown", "color_name": "Blue"},
        {"name": "Normal", "description": "Normal tooth condition", "color_name": "Black"},
    ]

    for condition in default_conditions:
        color = ToothConditionColor.objects.get(name=condition["color_name"])
        ToothCondition.objects.get_or_create(name=condition["name"], defaults={"description": condition["description"], "color": color})
