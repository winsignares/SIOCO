from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from ..servicios import iniciar_sesion, AutenticacionSerializer

class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = AutenticacionSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['usuario']
            password = serializer.validated_data['contrasenia']
            return iniciar_sesion(username, password)

        return Response({'error': 'Datos inválidos.', 'detalles': serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)
