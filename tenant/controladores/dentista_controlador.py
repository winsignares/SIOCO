from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..servicios import obtener_dentistas, obtener_horario_dentista
from shared.servicios import validar_usuario

class Dentista(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        validar_usuario(request)

        id_dentista = request.query_params.get('id_dentista', None)
        return obtener_dentistas(id_dentista)

class DentistaDetalle(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, dentista_id, *args, **kwargs):

        validar_usuario(request)

        return obtener_horario_dentista(dentista_id)