from rest_framework import serializers
from ..models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    status_name = serializers.CharField(source='status.name', read_only=True)
    patient_name = serializers.CharField(source='patient.first_name', read_only=True)
    dentist_name = serializers.CharField(source='dentist.first_name', read_only=True)
    secretary_name = serializers.CharField(source='secretary.first_name', read_only=True)

    class Meta:

        model = Appointment
        fields = ['patient', 'secretary', 'dentist', 'date', 'created_on', 'status', 'status_name', 'patient_name', 'dentist_name', 'secretary_name']