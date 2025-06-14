from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import PagoMetodosModel

@receiver(post_migrate)
def crear_metodos_pago_default(sender, **kwargs):
    metodos_pago_default = [
        {"nombre": "Tarjeta de crédito", "descripcion": "Pago con tarjeta de crédito."},
        {"nombre": "Efectivo", "descripcion": "Pago en efectivo"},
        {"nombre": "Seguro", "descripcion": "Pago hecho con seguro."},
    ]

    for metodo in metodos_pago_default:
        PagoMetodosModel.objects.get_or_create(nombre=metodo["nombre"], defaults={"descripcion": metodo["descripcion"]})
