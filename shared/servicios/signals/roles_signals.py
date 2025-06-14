from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import RolModel

@receiver(post_migrate)
def crear_roles_defecto(sender, **kwargs):
    roles_por_defecto = [
        {"nombre": "paciente", "descripcion": "Paciente rol."},
        {"nombre": "dentista", "descripcion": "Dentista rol."},
        {"nombre": "secretaria", "descripcion": "Secretaria rol."},
    ]

    for rol in roles_por_defecto:
        RolModel.objects.get_or_create(nombre=rol["nombre"], defaults={"descripcion": rol["descripcion"]})