from django.db import connection

def obtener_id_odontologia_de_schema():
    from ...persistencia import OdontologiaModel

    nombre_esquema = connection.schema_name
    try:
        odontologia = OdontologiaModel.objects.get(schema_name=nombre_esquema)
        id_odontologia = odontologia.pk
        print(f'Debug: id de la odontología obtenida: {id_odontologia}')
        return id_odontologia
    except OdontologiaModel.DoesNotExist:
        return None


def obtener_nombre_esquema():
    return connection.schema_name


def existe_relacion_usuario_odontologia(id_usuario, id_odontologia):
    from ...persistencia import OdontologiaUsuarioModel

    try:
        odontologias_usuario = OdontologiaUsuarioModel.objects.filter(usuario_id=id_usuario).values_list('odontologia_id', flat=True)
        return id_odontologia in odontologias_usuario
    except OdontologiaUsuarioModel.DoesNotExist:
        return False


def schema_valido():
    schema_name = connection.schema_name
    return schema_name != 'public'
