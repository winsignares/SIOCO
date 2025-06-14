from django.http import Http404
import pytz

from .serializers import UsuarioSerializer, MostrarCitaSerializer
from shared.models import UsuarioModel
from django.db.models import Q
from rest_framework.response import Response
from ..persistencia import CitaModel
from datetime import timedelta, datetime

ID_ROL_DENTISTA = 2
ESTADO_PENDIENTE = 1

def obtener_dentistas(id_dentista):

    filtros = Q(rol_id=ID_ROL_DENTISTA)  # Empezamos filtrando solo por rol de dentista

    if id_dentista:
        filtros &= Q(id=id_dentista)

    dentistas = UsuarioModel.objects.filter(filtros)

    return Response({'data': UsuarioSerializer(dentistas, many=True).data})

def obtener_citas_pendientes(id_dentista):

    try:
        dentista = UsuarioModel.objects.get(id=id_dentista, rol_id=ID_ROL_DENTISTA)
    except UsuarioModel.DoesNotExist:
        raise Http404(f'El dentista con id {id_dentista} no ha sido encontrado.')

    filtros = Q(dentista_id=dentista.pk, estado_id=ESTADO_PENDIENTE)

    return MostrarCitaSerializer(CitaModel.objects.filter(filtros).all(), many=True).data

def generar_horario_disponible(fechas_ocupadas, fecha_inicio, dias=5, hora_inicio=8, hora_fin=19):
    espacios_disponibles = {}

    for dia in range(dias):
        fecha_actual = fecha_inicio + timedelta(days=dia)
        horas_disponibles = []

        for hora in range(hora_inicio, hora_fin):
            espacio = fecha_actual.replace(hour=hora, minute=0, second=0, microsecond=0)
            proximo_espacio = espacio + timedelta(hours=1)

            disponibilidad = True
            for ocupada in fechas_ocupadas:
                if ocupada == espacio or (espacio <= ocupada < proximo_espacio):
                    disponibilidad = False
                    break

            horas_disponibles.append({
                'fecha': espacio.strftime('%Y-%m-%dT%H:%M:%S%z'),
                'disponibilidad': disponibilidad
            })

        espacios_disponibles[fecha_actual.strftime('%Y-%m-%d')] = horas_disponibles

    return espacios_disponibles

def obtener_horario_dentista(dentista_id):

    citas_pendientes = obtener_citas_pendientes(dentista_id)

    fechas = []
    for cita in citas_pendientes:
        fechas.append(cita['fecha_cita'])

    fechas_ocupadas = [datetime.fromisoformat(fecha_str.replace("Z", "+00:00")) for fecha_str in fechas]
    fecha_actual = datetime.now(pytz.UTC)

    return Response({'horario': generar_horario_disponible(fechas_ocupadas=fechas_ocupadas, fecha_inicio=fecha_actual)})

