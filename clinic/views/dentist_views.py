from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from shared.serializers import UserSerializer

from shared.utils import (
    get_all_dentists,
)

class Dentists(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({'dentists': UserSerializer(get_all_dentists(), many=True).data}, status=status.HTTP_200_OK)