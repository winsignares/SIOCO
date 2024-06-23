from django.db.models.signals import post_save
from django_tenants.utils import schema_context, get_public_schema_name
from django.dispatch import receiver
from ..models import OdontologyUser, ToothCondition, ToothConditionColor
from clinic.models import Odontogram, Tooth, ToothSection, MedicalHistory

@receiver(post_save, sender=OdontologyUser)
def create_odontogram(sender, instance, created, **kwargs):
    if not created or instance.user.role.name != 'patient':
        return
    
    schema_name = instance.odontology.schema_name
    
    tooth_condition = get_or_create_tooth_condition("New", "White", "Default condition")

    if schema_name != get_public_schema_name():
        with schema_context(schema_name):
            user_odontogram = Odontogram.objects.create(patient=instance.user)
            create_teeth_with_sections(user_odontogram, tooth_condition)

def get_or_create_tooth_condition(condition_name, color_name, description):
    try:
        return ToothCondition.objects.get(name=condition_name)
    except ToothCondition.DoesNotExist:
        default_color, _ = ToothConditionColor.objects.get_or_create(name=color_name, defaults={"description": f"Color for the condition {condition_name}", "hexadecimal_code": "#FFFFFF"})
        return ToothCondition.objects.create(name=condition_name, description=description, color=default_color)

def create_teeth_with_sections(odontogram, tooth_condition):
    TOOTH_SECTIONS = ["Mesial", "Distal", "Bucal", "Lingual", "Oclusal"]
    TOOTH_RANGES = {
        "superiores_derecho_izquierdo": range(11, 29),
        "inferiores_derecho": range(41, 49),
        "inferiores_izquierdo": range(31, 39),
    }

    for tooth_range in TOOTH_RANGES.values():
        for tooth_number in tooth_range:
            tooth = Tooth.objects.create(odontogram=odontogram, number=tooth_number)
            create_tooth_sections(tooth, TOOTH_SECTIONS, tooth_condition)

def create_tooth_sections(tooth, sections, tooth_condition):
    for section in sections:
        tooth_section = ToothSection.objects.create(tooth=tooth, name=section)
        MedicalHistory.objects.create(tooth_section=tooth_section, tooth_condition=tooth_condition)
