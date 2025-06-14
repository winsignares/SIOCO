from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotAcceptable
from ..servicios import CrearCitaSerializer, crear_cita, ObtenerCitaSerializer, obtener_citas
from shared.servicios import obtener_id_usuario_por_token, validar_usuario

class Cita(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        validar_usuario(request)

        serializer = ObtenerCitaSerializer(data=request.data)

        if serializer.is_valid():
            id_cita = serializer.validated_data['id_cita']
            paciente_id = serializer.validated_data['paciente_id']
            dentista_id = serializer.validated_data['dentista_id']
            secretaria_id = serializer.validated_data['secretaria_id']
            fecha = serializer.validated_data.get('fecha', None)
            return obtener_citas(id_cita, paciente_id, dentista_id, secretaria_id, fecha)

        raise NotAcceptable({'error': 'Datos inválidos.', 'detalles': serializer.errors})

    def post(self, request, *args, **kwargs):

        id_usuario = obtener_id_usuario_por_token(request)
        if not id_usuario:
            return Response({'error': 'Token inválido.'},
                            status=status.HTTP_401_UNAUTHORIZED)

        serializer = CrearCitaSerializer(data=request.data)
        if serializer.is_valid():
            id_paciente = serializer.validated_data['paciente_id']
            id_dentista = serializer.validated_data['dentista_id']
            id_secretaria = serializer.validated_data['secretaria_id']
            fecha = serializer.validated_data['fecha']
            return crear_cita(id_usuario, id_paciente, id_dentista, id_secretaria, fecha)

        raise NotAcceptable({'error': 'Datos inválidos.', 'detalles': serializer.errors})
