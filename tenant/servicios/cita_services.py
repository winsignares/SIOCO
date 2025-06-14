from shared.servicios import (
    schema_valido,
    obtener_id_odontologia_de_schema,
    obtener_nombre_esquema,
    existe_relacion_usuario_odontologia,
    verificar_formato_cita,
    verificar_rol_usuario)

from rest_framework.response import Response

from ..persistencia import CitaModel
from .serializers import MostrarCitaSerializer
from django.db.models import Q

def validar_relaciones(id_usuario, id_paciente, id_secretaria, id_dentista, id_odontologia):

    if not existe_relacion_usuario_odontologia(id_usuario, id_odontologia):
        return {
            'status': False,
            'message': f'El usuario con id {id_usuario} no tiene relación con la odontología con id {id_odontologia}.',
        }

    if not existe_relacion_usuario_odontologia(id_dentista, id_odontologia):
        return {
            'status': False,
            'message': f'El usuario con id {id_dentista} no tiene relación con la odontología con id {id_odontologia}.',
        }

    if not existe_relacion_usuario_odontologia(id_paciente, id_odontologia):
        return {
            'status': False,
            'message': f'El usuario con id {id_paciente} no tiene relación con la odontología con id {id_odontologia}.',
        }

    if id_secretaria != 0:

        if not existe_relacion_usuario_odontologia(id_secretaria, id_odontologia):
            return {
                'status': False,
                'message': f'El usuario con id {id_secretaria} no tiene relación con la odontología con id {id_odontologia}.',
            }
    return {
        'status': True,
        'message': '',
    }

def verificar_roles(id_paciente, id_dentista, id_secretaria):

    if not verificar_rol_usuario(id_paciente, 'paciente'):
        return {
            'status': False,
            'message': f'Paciente con id {id_paciente} no encontrado.',
        }

    if not verificar_rol_usuario(id_dentista, 'dentista'):
        return {
            'status': False,
            'message': f'Dentista con id {id_dentista} no encontrado.',
        }

    if id_secretaria != 0:
        if not verificar_rol_usuario(id_secretaria, 'secretaria'):
            return {
                'status': False,
                'message': f'Secretaria con id {id_secretaria} no encontrada.',
            }

    return {
        'status': True,
        'message': '',
    }

def validar_fechas_citas(id_paciente, id_dentista, fecha):

    if CitaModel.objects.filter(paciente_id=id_paciente, hora=fecha).exists():
        return {
            'status': False,
            'message': 'El paciente ya tiene una cita en esa misma fecha.',
        }

    if CitaModel.objects.filter(dentista_id=id_dentista, hora=fecha).exists():
        return {
            'status': False,
            'message': 'El dentista ya tiene una cita en esa misma fecha.',
        }

    return {
        'status': True,
        'message': '',
    }


def crear_cita(id_usuario, id_paciente, id_dentista, id_secretaria, fecha_cita):

    from rest_framework import status

    if not schema_valido():
        return Response({'error': 'No se puede acceder desde el esquema público.'}, status=status.HTTP_404_NOT_FOUND)

    id_odontologia = obtener_id_odontologia_de_schema()
    if not id_odontologia:
        return Response({'error': 'Odontología no encontrada para el esquema.'}, status=status.HTTP_404_NOT_FOUND)

    relaciones_validadas = validar_relaciones(id_usuario, id_paciente, id_secretaria, id_dentista, id_odontologia)

    if not relaciones_validadas['status']:
        return Response(data={'mensaje': relaciones_validadas['message']}, status=status.HTTP_404_NOT_FOUND)

    roles_validados = verificar_roles(id_paciente, id_dentista, id_secretaria)

    if not roles_validados['status']:
        return Response(data={'mensaje': roles_validados['message']}, status=status.HTTP_400_BAD_REQUEST)

    if id_usuario != int(id_paciente) and id_usuario != int(id_secretaria):
        return Response({'error': 'No tienes autorización para crear una cita.'},
                        status=status.HTTP_401_UNAUTHORIZED)

    if not verificar_formato_cita(fecha_cita):
        return Response({'error': 'Formato inválido o fecha ya expirada. Por favor, use este formato: YYYY-MM-DDTHH:MM:SS'},
            status=status.HTTP_400_BAD_REQUEST)

    cita_existente = validar_fechas_citas(id_paciente, id_dentista, fecha_cita)

    if not cita_existente['status']:
        return Response({'error': cita_existente['message']}, status=status.HTTP_400_BAD_REQUEST)

    nueva_cita = CitaModel.objects.create(
        paciente_id=id_paciente,
        dentista_id=id_dentista,
        hora=fecha_cita,
        secretaria_id=id_secretaria
    )

    return Response({'data': MostrarCitaSerializer(nueva_cita, many=False).data}, status=status.HTTP_200_OK)

def obtener_citas(id_cita, id_paciente, id_dentista, id_secretaria, fecha):
    filtros = Q()

    if id_cita != -1:
        filtros &= Q(id=id_cita)

    if id_paciente != -1:
        filtros &= Q(paciente_id=id_paciente)

    if id_dentista != -1:
        filtros &= Q(dentista_id=id_dentista)

    if id_secretaria != -1:
        filtros &= Q(secretaria_id=id_secretaria)

    if fecha:
        filtros &= Q(hora=fecha)

    if filtros:
        citas = CitaModel.objects.filter(filtros)
        return Response({'data': MostrarCitaSerializer(citas, many=True).data})
    else:
        return Response({'data': MostrarCitaSerializer(CitaModel.objects.all(), many=True).data})