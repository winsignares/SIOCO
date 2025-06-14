from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import PagoEstadosModel

@receiver(post_migrate)
def crear_estados_pago_defecto(sender, **kwargs):
    estados_por_defecto = [
        {"nombre": "Pendiente", "descripcion": "El pago está pendiente."},
        {"nombre": "Confirmado", "descripcion": "El pago está confirmado."},
        {"nombre": "Cancelado", "descripcion": "El pago está cancelado."},
    ]

    for pago_estado in estados_por_defecto:
        PagoEstadosModel.objects.get_or_create(nombre=pago_estado["nombre"], defaults={"descripcion": pago_estado["descripcion"]})