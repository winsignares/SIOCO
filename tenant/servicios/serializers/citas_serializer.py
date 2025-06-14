from rest_framework import serializers
from ...persistencia import CitaModel

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitaModel
        fields = ['paciente', 'secretaria', 'dentista', 'hora', 'creada_en', 'estado']

class MostrarCitaSerializer(serializers.Serializer):
    id_cita = serializers.IntegerField(source='id')
    fecha_cita = serializers.DateTimeField(source='hora')
    creada_en = serializers.DateField()
    id_dentista = serializers.IntegerField(source='dentista.id')
    id_paciente = serializers.IntegerField(source='paciente.id')
    id_secretaria = serializers.IntegerField(source='secretaria.id')
    id_estado = serializers.IntegerField(source='estado.id')
    estado_nombre = serializers.CharField(source='estado.nombre')
    paciente_nombres = serializers.CharField(source='paciente.first_name')
    paciente_apellidos = serializers.CharField(source='paciente.last_name')
    dentista_nombres = serializers.CharField(source='dentista.first_name')
    dentista_apellidos = serializers.CharField(source='dentista.last_name')
    secretaria_nombres = serializers.CharField(source='secretaria.first_name')
    secretaria_apellidos = serializers.CharField(source='secretaria.last_name')

class CrearCitaSerializer(serializers.Serializer):
    paciente_id = serializers.IntegerField(label="ID Paciente")
    secretaria_id = serializers.IntegerField(label="ID Secretaria")
    dentista_id = serializers.IntegerField(label="ID Dentista")
    fecha = serializers.DateTimeField(label="Fecha y Hora de la Cita")

class ObtenerCitaSerializer(serializers.Serializer):
    id_cita = serializers.IntegerField(label="ID Cita", required=True)
    paciente_id = serializers.IntegerField(label="ID Paciente", required=True)
    secretaria_id = serializers.IntegerField(label="ID Secretaria", required=True)
    dentista_id = serializers.IntegerField(label="ID Dentista", required=True)
    fecha = serializers.DateTimeField(label="Fecha y Hora de la Cita", required=False)