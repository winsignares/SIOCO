from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ...persistencia import ColoresEstadosDienteModel

@receiver(post_migrate)
def crear_colores_por_defecto_condiciones_diente(sender, **kwargs):
    colores_por_defecto = [
        {"nombre": "Blanco", "descripcion": "Color para la condición Nuevo", "codigo_hexadecimal": "#FFFFFF"},
        {"nombre": "Rojo", "descripcion": "Color para la condición Amalgama", "codigo_hexadecimal": "#FF0000"},
        {"nombre": "Amarillo", "descripcion": "Color para la condición Caries", "codigo_hexadecimal": "#FFFF00"},
        {"nombre": "Naranja", "descripcion": "Color para la condición Endodoncia", "codigo_hexadecimal": "#FFA500"},
        {"nombre": "Coral Claro", "descripcion": "Color para la condición Ausente", "codigo_hexadecimal": "#FF7F50"},
        {"nombre": "Siena", "descripcion": "Color para la condición Resina", "codigo_hexadecimal": "#A0522D"},
        {"nombre": "Orquídea Media", "descripcion": "Color para la condición Implante", "codigo_hexadecimal": "#DA70D6"},
        {"nombre": "Verde", "descripcion": "Color para la condición Sellador", "codigo_hexadecimal": "#008000"},
        {"nombre": "Azul", "descripcion": "Color para la condición Corona", "codigo_hexadecimal": "#0000FF"},
        {"nombre": "Negro", "descripcion": "Color para la condición Normal", "codigo_hexadecimal": "#000000"},
    ]

    for color in colores_por_defecto:
        ColoresEstadosDienteModel.objects.get_or_create(
            nombre=color["nombre"],
            defaults={"descripcion": color["descripcion"], "codigo_hexadecimal": color["codigo_hexadecimal"]}
        )
