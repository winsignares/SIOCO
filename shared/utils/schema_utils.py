from django.db import connection

def get_odontology_id_from_schema():
    
    from ..models import Odontology
    
    """
    Retrieve the odontology ID based on the current schema name.
    
    Returns:
        int: The odontology ID if found, otherwise None.
    """
    schema_name = connection.schema_name
    try:
        odontology = Odontology.objects.get(schema_name=schema_name)
        odontology_id = odontology.pk
        print(f'Debug: Id de la odontología obtenida: {odontology_id}')
        return odontology_id
    except Odontology.DoesNotExist:
        return None

def user_has_relation_with_odontology(user_id, odontology_id):
    
    from ..models import OdontologyUser
    
    """
    Check if the user has a relation with the specified odontology.
    
    Args:
        user_id (int): The user ID.
        odontology_id (int): The odontology ID.
    
    Returns:
        bool: True if the user has a relation with the odontology, otherwise False.
    """
    try:
        user_odontologies = OdontologyUser.objects.filter(user_id=user_id).values_list('odontology_id', flat=True)
        print(f'Debug: Odontologies del usuario obtenidas: {list(user_odontologies)}')
        return odontology_id in user_odontologies
    except OdontologyUser.DoesNotExist:
        return False

def is_schema_valid():
    """
    Check if the current schema is valid (not 'public').
    
    Returns:
        bool: True if the schema is valid, otherwise False.
    """
    schema_name = connection.schema_name
    print(f'Debug: Nombre del esquema obtenido: {schema_name}')
    return schema_name != 'public'
