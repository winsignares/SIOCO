from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied
from .schema_utils import existe_relacion_usuario_odontologia, obtener_id_odontologia_de_schema, schema_valido

def obtener_id_usuario_por_token(request):

    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    try:
        token_key = auth_header.split(' ')[1]
        token = Token.objects.get(key=token_key)
        user_id = token.user.pk
        return user_id
    except Token.DoesNotExist:
        return None


def verificar_rol_usuario(user_id, rol):
    from shared.models import UsuarioModel

    try:
        usuario = UsuarioModel.objects.get(id=user_id)
        return usuario.rol.nombre == rol
    except UsuarioModel.DoesNotExist:
        return False

def validar_usuario(request):

    if not schema_valido():
        raise PermissionDenied("No puedes acceder a este recurso desde el esquema público.")

    id_usuario = obtener_id_usuario_por_token(request)

    if not id_usuario:
        raise PermissionDenied("Necesitas autorización para acceder a este recurso.")

    id_odontologia = obtener_id_odontologia_de_schema()

    if not existe_relacion_usuario_odontologia(id_usuario, id_odontologia):
        raise PermissionDenied("El usuario no tiene relación con esta odontología.")