from rest_framework.authtoken.models import Token

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

def get_all_dentists():
    
    from ..models import User
    
    """
    Get all the users with the role_id 2 (dentist)
    
    Returns:
        All the dentists
    """

    DENTIST_ID = 2

    try:
        dentists = User.objects.get(role_id=DENTIST_ID)
        return dentists
    except User.DoesNotExist:
        return []