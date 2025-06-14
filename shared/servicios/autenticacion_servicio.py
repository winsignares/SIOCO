from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from ..persistencia import OdontologiaUsuarioModel, OdontologiaDomain
from .serializers import OdontologiaDomainSerializer

def iniciar_sesion(nombre_usuario: str, contrasenia: str):

    usuario = authenticate(username=nombre_usuario, password=contrasenia)

    if usuario is not None:
        token, created = Token.objects.get_or_create(user=usuario)
        odontologias = OdontologiaUsuarioModel.objects.filter(usuario_id=usuario.id).select_related('odontologia')

        usuario_odontologias = []
        for o in odontologias:
            odontologia = {
                'id': o.odontologia.pk,
                'name': o.odontologia.nombre,
                'domain_url': OdontologiaDomainSerializer(OdontologiaDomain.objects.filter(tenant_id=o.odontologia.pk).all(), many=True).data
            }
            usuario_odontologias.append(odontologia)

        token_data = {
            'token': token.key,
            'id_usuario': usuario.id,
            'odontologias': usuario_odontologias,
            'rol': usuario.rol.nombre if usuario.rol is not None else 'NO ESPECIFICADO'
        }

        return Response(token_data, status=status.HTTP_200_OK)
    else:
        return Response(data={'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
