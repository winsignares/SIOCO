from rest_framework.authtoken.models import Token
from datetime import timedelta

DENTIST_ID = 2
PENDING_STATUS = 1

def verify_user_role(user_id, role):
    
    from ..models import User
    
    """
    Verify if the user exists and has the specified role.
    
    Args:
        user_id (int): The user ID.
        role (str): The role to verify.
    
    Returns:
        bool: True if the user exists and has the specified role, otherwise False.
    """
    try:
        user = User.objects.get(id=user_id)
        return user.role.name == role
    except User.DoesNotExist:
        return False

def get_user_id_from_token(request):
    """
    Retrieve the user ID from the authorization token.
    
    Args:
        request: The HTTP request object.
    
    Returns:
        int: The user ID if the token is valid, otherwise None.
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    try:
        token_key = auth_header.split(' ')[1]
        token = Token.objects.get(key=token_key)
        user_id = token.user.pk
        print(token.user.role)
        print(f'Debug: Token obtenido para user_id={user_id}')
        return user_id
    except Token.DoesNotExist:
        return None

def get_all_dentists(odontology_id):
    
    from ..models import User, OdontologyUser
    from shared.serializers import UserSerializer
    
    """
    Get all the users with the role_id 2 (dentist)
    
    Returns:
        All the dentists
    """
    return UserSerializer(User.objects.filter(
        role_id=DENTIST_ID,
        odontologyuser__odontology_id=odontology_id
    ), many=True).data

def get_dentist_pending_appointments(dentist_id):

    from clinic.serializers import AppointmentSerializer
    from clinic.models import Appointment
    from shared.models import User
    from ..exceptions import DentistNotFoundException

    try:
        dentist = User.objects.get(pk=dentist_id, role_id=DENTIST_ID)
    except User.DoesNotExist:
        raise DentistNotFoundException(f'Dentists with id {dentist_id} not found.')

    return AppointmentSerializer(Appointment.objects.filter(dentist_id=dentist.pk, status=PENDING_STATUS), many=True).data


def generate_available_slots(occupied_datetimes, start_date, days=5, start_hour=8, end_hour=19):
    available_slots = {}

    for day_offset in range(days):
        current_date = start_date + timedelta(days=day_offset)
        available_times = []

        for hour in range(start_hour, end_hour):
            slot_time = current_date.replace(hour=hour, minute=0, second=0, microsecond=0)
            next_slot_time = slot_time + timedelta(hours=1)

            availability = True
            for occupied in occupied_datetimes:
                if occupied == slot_time or (slot_time <= occupied < next_slot_time):
                    availability = False
                    break

            available_times.append({
                'time': slot_time.strftime('%Y-%m-%dT%H:%M:%S%z'),
                'availability': availability
            })

        available_slots[current_date.strftime('%Y-%m-%d')] = available_times

    return available_slots