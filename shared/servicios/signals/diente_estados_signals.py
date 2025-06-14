from django.db import OperationalError
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import DienteEstadosModel, ColoresEstadosDienteModel

@receiver(post_migrate)
def crear_condiciones_diente_por_defecto(sender, **kwargs):

    if not ColoresEstadosDienteModel.objects.exists():
        print("Los colores aún no han sido creados. Ejecuta primero la creación de colores.")
        return

    condiciones_por_defecto = [
        {"nombre": "Nuevo", "descripcion": "Condición por defecto", "color_nombre": "Blanco"},
        {"nombre": "Amalgama", "descripcion": "Relleno de amalgama", "color_nombre": "Rojo"},
        {"nombre": "Caries", "descripcion": "Tratamiento para caries", "color_nombre": "Amarillo"},
        {"nombre": "Endodoncia", "descripcion": "Tratamiento de conducto", "color_nombre": "Naranja"},
        {"nombre": "Ausente", "descripcion": "Diente ausente", "color_nombre": "Coral Claro"},
        {"nombre": "Resina", "descripcion": "Relleno de resina", "color_nombre": "Siena"},
        {"nombre": "Implante", "descripcion": "Implante dental", "color_nombre": "Orquídea Media"},
        {"nombre": "Sellador", "descripcion": "Aplicación de sellador", "color_nombre": "Verde"},
        {"nombre": "Corona", "descripcion": "Corona dental", "color_nombre": "Azul"},
        {"nombre": "Normal", "descripcion": "Condición normal del diente", "color_nombre": "Negro"},
    ]

    for condicion in condiciones_por_defecto:
        try:
            color, created = ColoresEstadosDienteModel.objects.get_or_create(nombre=condicion["color_nombre"])
        except OperationalError:
            print(f"Error al obtener el color '{condicion['color_nombre']}', saltando...")
            continue

        DienteEstadosModel.objects.get_or_create(
            nombre=condicion["nombre"],
            defaults={"descripcion": condicion["descripcion"], "color": color}
        )
