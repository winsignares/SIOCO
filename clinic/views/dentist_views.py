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
    get_all_dentists,
    get_user_id_from_token
)

class Dentists(APIView):
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
        
        dentists_data = get_all_dentists()
        print(f'Dentistas obtenidos: {dentists_data}')
        
        return Response({'dentists': dentists_data}, status=status.HTTP_200_OK)