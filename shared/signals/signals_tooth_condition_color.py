from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import ToothConditionColor

@receiver(post_migrate)
def create_default_tooth_condition_colors(sender, **kwargs):
    default_colors = [
        {"name": "White", "description": "Color for the condition New", "hexadecimal_code": "#FFFFFF"},
        {"name": "Red", "description": "Color for the condition Amalgam", "hexadecimal_code": "#FF0000"},
        {"name": "Yellow", "description": "Color for the condition Cavity", "hexadecimal_code": "#FFFF00"},
        {"name": "Orange", "description": "Color for the condition Endodontics", "hexadecimal_code": "#FFA500"},
        {"name": "Light Coral", "description": "Color for the condition Missing", "hexadecimal_code": "#FF7F50"},
        {"name": "Sienna", "description": "Color for the condition Resin", "hexadecimal_code": "#A0522D"},
        {"name": "Medium Orchid", "description": "Color for the condition Implant", "hexadecimal_code": "#DA70D6"},
        {"name": "Green", "description": "Color for the condition Sealant", "hexadecimal_code": "#008000"},
        {"name": "Blue", "description": "Color for the condition Crown", "hexadecimal_code": "#0000FF"},
        {"name": "Black", "description": "Color for the condition Normal", "hexadecimal_code": "#000000"},
    ]

    for color in default_colors:
        ToothConditionColor.objects.get_or_create(name=color["name"], defaults={"description": color["description"], "hexadecimal_code": color["hexadecimal_code"]})