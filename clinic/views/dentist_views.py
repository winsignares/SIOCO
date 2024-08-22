from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from shared.serializers import UserSerializer

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

        dentists_data = []

        dentists_data = get_all_dentists()
        # Serializa los datos de los dentistas
        serialized_dentists = UserSerializer(dentists_data, many=True).data

        return Response({'dentists': serialized_dentists}, status=status.HTTP_200_OK)