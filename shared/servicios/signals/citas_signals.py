from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import CitaEstadosModel

@receiver(post_migrate)
def crear_estados_citas_por_defecto(sender, **kwargs):
    estados_por_defecto = [
        {"nombre": "Pendiente", "descripcion": "La cita está pendiente de confirmar."},
        {"nombre": "Confirmada.", "descripcion": "La cita ha sido confirmada por la secretaria u odontólogo."},
        {"nombre": "Completada.", "descripcion": "La cita ha sido completada con éxito."},
        {"nombre": "Cancelada", "descripcion": "La cita ha sido cancelada por la secretaria u odontólogo."},
    ]

    for estado in estados_por_defecto:
        CitaEstadosModel.objects.get_or_create(nombre=estado["nombre"], defaults={"descripcion": estado["descripcion"]})