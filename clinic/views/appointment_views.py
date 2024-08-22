from io import BytesIO

from django.db.models import Q
from django.db.utils import IntegrityError

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from ..models import Appointment

from shared.utils import (
    serialize_appointment,
    verify_date,
    verify_appointment_availability,
    get_user_appointments,
    verify_user_role,
    get_user_id_from_token,
    get_odontology_id_from_schema,
    user_has_relation_with_odontology,
    is_schema_valid,
)


class AppointmentAPI(APIView):
    """
    API endpoint to retrieve user appointments.
    
    Attributes:
        permission_classes (list): List of permissions required to access this view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests to retrieve user appointments.
        
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        
        Returns:
            Response: A response object containing the appointment data or an error message.
        """
        user_id = get_user_id_from_token(request)
        if not user_id:
            return Response({'error': 'Invalid Token or Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)
        
        odontology_id = get_odontology_id_from_schema()
        if not odontology_id:
            return Response({'error': 'Odontology not found for the schema'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user_has_relation_with_odontology(user_id, odontology_id):
            return Response({'error': f'User does not have a relation with the Odontology with id {odontology_id}.'}, status=status.HTTP_409_CONFLICT)
        
        if not is_schema_valid():
            return Response({'error': 'Cannot access data with schema public context'}, status=status.HTTP_409_CONFLICT)
        
        appointments_data = get_user_appointments(user_id)
        print(f'Debug: Appointments obtenidas: {appointments_data}')
        
        return Response({'appointments': appointments_data}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        user_id = get_user_id_from_token(request)
        if not user_id:
            return Response({'error': 'Invalid Token or Authorization header missing'},
                            status=status.HTTP_401_UNAUTHORIZED)
        
        odontology_id = get_odontology_id_from_schema()
        if not odontology_id:
            return Response({'error': 'Odontology not found for the schema'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user_has_relation_with_odontology(user_id, odontology_id):
            return Response({'error': f'User does not have a relation with the Odontology with id {odontology_id}.'},
                            status=status.HTTP_409_CONFLICT)
        
        if not is_schema_valid():
            return Response({'error': 'Cannot access data with schema public context'}, status=status.HTTP_409_CONFLICT)
        
        stream = BytesIO(request.body)
        data = JSONParser().parse(stream)
        print(f'data: {data}')
        
        try:
            patient_id = data['patient_id']
            dentist_id = data['dentist_id']
            secretary_id = data['secretary_id']
            appointment_date = data['date']
            
            if user_id != int(patient_id) and user_id != int(secretary_id):
                return Response({'error': 'You do not have authorization to create an appointment.'},
                                status=status.HTTP_401_UNAUTHORIZED)
            
            if not verify_date(appointment_date):
                return Response({'error': 'Invalid date format or the date must be in the future. Please use the '
                                          'format YYYY-MM-DDTHH:MM:SS'}, status=status.HTTP_400_BAD_REQUEST)
            
            if not verify_user_role(patient_id, "patient"):
                return Response({'error': f'Patient with id {patient_id} not found'}, status=status.HTTP_404_NOT_FOUND)
            
            if not verify_user_role(dentist_id, "dentist"):
                return Response({'error': f'Dentist with id {dentist_id} not found'}, status=status.HTTP_404_NOT_FOUND)
            
            if not verify_user_role(secretary_id, "secretary"):
                return Response({'error': f'Secretary with id {secretary_id} not found'}, status=status.HTTP_404_NOT_FOUND)
            
            if not user_has_relation_with_odontology(patient_id, odontology_id):
                return Response({'error': f'Patient does not have a relation with the Odontology with id {odontology_id}.'}, status=status.HTTP_409_CONFLICT)
            
            if not user_has_relation_with_odontology(dentist_id, odontology_id):
                return Response({'error': f'Dentist does not have a relation with the Odontology with id {odontology_id}.'}, status=status.HTTP_409_CONFLICT)
            
            if not user_has_relation_with_odontology(secretary_id, odontology_id):
                return Response({'error': f'Secretary does not have a relation with the Odontology with id {odontology_id}.'}, status=status.HTTP_409_CONFLICT)

            patient_appointment = Appointment.objects.get(patient_id=patient_id, date=appointment_date)

            if patient_appointment:
                return Response({'error': 'Patient has another appointment at same date.'},
                                status=status.HTTP_400_BAD_REQUEST)

            dentist_appointment = Appointment.objects.get(dentist_id=dentist_id, date=appointment_date)
            
            if dentist_appointment:
                return Response({'error': 'Dentist has another appointment at same date.'},
                                status=status.HTTP_400_BAD_REQUEST)

            patient_appointments = get_user_appointments(user_id=patient_id)
            dentist_appointments = get_user_appointments(user_id=dentist_id)
            
            if not verify_appointment_availability(patient_appointments, appointment_date):
                return Response({'error': 'Patient has another appointment within 3 hours of the requested time'},
                                status=status.HTTP_400_BAD_REQUEST)
            
            if not verify_appointment_availability(dentist_appointments, appointment_date):
                return Response({'error': 'Dentist has another appointment within 3 hours of the requested time'},
                                status=status.HTTP_400_BAD_REQUEST)
            
            new_appointment = AppointmentAPI.objects.create(
                patient_id=patient_id,
                dentist_id=dentist_id,
                date=appointment_date,
                secretary_id=secretary_id
            )
            
        except KeyError as e:
            return Response({'error': f'Missing required fields: {str(e)}'}, status=status.HTTP_409_CONFLICT)
        except IntegrityError as e:
            return Response({'error': f'Integrity Error: {str(e)}'}, status=status.HTTP_409_CONFLICT)

        return Response({'data': serialize_appointment(new_appointment)}, status=status.HTTP_200_OK)