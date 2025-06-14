from django.db.models.signals import post_save
from django_tenants.utils import schema_context, get_public_schema_name
from django.dispatch import receiver
from ...persistencia import OdontologiaUsuarioModel, DienteEstadosModel, ColoresEstadosDienteModel
from tenant.persistencia import OdontogramaModel, DienteModel, DienteSeccionModel, HistorialMedicoModel

@receiver(post_save, sender=OdontologiaUsuarioModel)
def crear_odontograma(sender, instance, created, **kwargs):
    if not created or instance.usuario.rol.nombre != 'paciente':
        return

    schema_name = instance.odontologia.schema_name

    diente_estado = obtener_o_crear_diente_estado("Nuevo", "Blanco", "Condición por defecto")

    if schema_name != get_public_schema_name():
        with schema_context(schema_name):
            odontograma_usuario = OdontogramaModel.objects.create(paciente=instance.usuario)
            crear_dientes_con_secciones(odontograma_usuario, diente_estado)


def obtener_o_crear_diente_estado(nombre_condicion, nombre_color, descripcion):
    try:
        return DienteEstadosModel.objects.get(nombre=nombre_condicion)
    except DienteEstadosModel.DoesNotExist:
        default_color, _ = ColoresEstadosDienteModel.objects.get_or_create(nombre=nombre_color, defaults={
            "descripcion": f"Color para la condición {nombre_condicion}", "codigo_hexadecimal": "#FFFFFF"})
        return DienteEstadosModel.objects.create(nombre=nombre_condicion, descripcion=descripcion, color=default_color)


def crear_dientes_con_secciones(odontograma, diente_estado):
    DIENTES_SECCIONES = ["Mesial", "Distal", "Bucal", "Lingual", "Oclusal"]
    DIENTES_RANGOS = {
        "superiores_derecho_izquierdo": range(11, 29),
        "inferiores_derecho": range(41, 49),
        "inferiores_izquierdo": range(31, 39),
    }

    for rango_diente in DIENTES_RANGOS.values():
        for numero_diente in rango_diente:
            diente = DienteModel.objects.create(odontograma=odontograma, numero=numero_diente)
            crear_secciones_diente(diente, DIENTES_SECCIONES, diente_estado)


def crear_secciones_diente(diente, secciones, diente_estado):
    for seccion in secciones:
        seccion_diente = DienteSeccionModel.objects.create(diente=diente, nombre=seccion)
        HistorialMedicoModel.objects.create(diente_seccion=seccion_diente, diente_condicion=diente_estado)