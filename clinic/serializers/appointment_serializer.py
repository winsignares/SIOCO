from rest_framework import serializers
from ..models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient', 'secretary', 'dentist', 'date', 'created_on', 'status']

class AppointmentResultSerializer(serializers.Serializer):
    cita_id = serializers.IntegerField()
    cita_date = serializers.DateTimeField()
    created_on = serializers.DateField()
    dentist_id = serializers.IntegerField()
    patient_id = serializers.IntegerField()
    secretary_id = serializers.IntegerField()
    status_id = serializers.IntegerField()
    status_name = serializers.CharField()
    patient_first_name = serializers.CharField()
    patient_last_name = serializers.CharField()
    dentist_first_name = serializers.CharField()
    dentist_last_name = serializers.CharField()
    secretary_first_name = serializers.CharField()
    secretary_last_name = serializers.CharField()