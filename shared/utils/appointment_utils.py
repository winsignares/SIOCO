from django.db.models import Q
from datetime import datetime
from dateutil import parser
import pytz

def serialize_appointment(appointment):
    """
    Serialize the appointment object to a dictionary.
    
    Args:
        appointment (Appointment): The appointment object to serialize.
    
    Returns:
        dict: The serialized appointment data.
    """
    return {
        'id': appointment.pk,
        'date': appointment.date,
        'patient': appointment.patient.username,
        'dentist': appointment.dentist.username,
        'secretary': appointment.secretary.username,
        'status': appointment.status.name
    }

def verify_date(appointment_date):
    """
    Verify if the given date is valid and in the future.
    
    Args:
        appointment_date (str): The date to verify.
    
    Returns:
        bool: True if the date is valid and in the future, otherwise False.
    """
    try:
        parsed_date = parser.parse(appointment_date)
        return parsed_date > datetime.now()
    except (ValueError, TypeError):
        return False

def verify_appointment_availability(appointments, appointment_date):
    """
    Verify if the appointment date is available.
    
    Args:
        appointments (list): List of existing appointments.
        appointment_date (str or datetime): The date to verify.
    
    Returns:
        bool: True if the date is available, otherwise False.
    """
    if isinstance(appointment_date, datetime):
        appointment_date = appointment_date.isoformat()
    
    parsed_date = parser.parse(appointment_date).astimezone(pytz.UTC)
    for appointment in appointments:
        existing_date = appointment['date']
        if isinstance(existing_date, str):
            existing_date = parser.parse(existing_date).astimezone(pytz.UTC)
        elif existing_date.tzinfo is None:
            existing_date = existing_date.replace(tzinfo=pytz.UTC)
        
        if existing_date.date() == parsed_date.date():
            return False
        
        if abs((existing_date - parsed_date).total_seconds()) < 10800:
            return False
            
    return True

def get_user_appointments(user_id):
    
    from clinic.models import Appointment
    
    """
    Retrieve the appointments for the user.
    
    Args:
        user_id (int): The user ID.
    
    Returns:
        list: A list of dictionaries containing appointment details.
    """
    appointments = Appointment.objects.filter(
        Q(patient_id=user_id) | Q(dentist_id=user_id) | Q(secretary_id=user_id)
    )
    return [
        {
            'id': app.pk,
            'date': app.date,
            'patient': app.patient.username,
            'dentist': app.dentist.username,
            'secretary': app.secretary.username,
            'status': app.status.name
        } for app in appointments
    ]
