from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from shared.serializers import UserSerializer
from datetime import datetime
import pytz

from shared.utils import (
    get_all_dentists,
    get_dentist_pending_appointments,
    is_schema_valid,
    generate_available_slots,
    get_odontology_id_from_schema,
    user_has_relation_with_odontology,
)

class Dentists(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({'dentists': UserSerializer(get_all_dentists(), many=True).data}, status=status.HTTP_200_OK)

class DentistDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, dentist_id, *args, **kwargs):

        if not is_schema_valid():
            return Response({'error': 'Cannot access data with schema public context'},
                            status=status.HTTP_400_BAD_REQUEST)

        odontology_id = get_odontology_id_from_schema()
        if not odontology_id:
            return Response({'error': 'Odontology not found for the schema'}, status=status.HTTP_404_NOT_FOUND)

        if not user_has_relation_with_odontology(dentist_id, odontology_id):
            return Response(
                {'error': f'Secretary does not have a relation with the Odontology with id {odontology_id}.'},
                status=status.HTTP_409_CONFLICT)

        appointments = get_dentist_pending_appointments(dentist_id)
        dates = []
        for appointment in appointments:
            dates.append(appointment['date'])

        dates = [datetime.fromisoformat(date_str.replace("Z", "+00:00")) for date_str in dates]
        now = datetime.now(pytz.UTC)
        return Response({'schedule': generate_available_slots(occupied_datetimes=dates, start_date=now)}, status=status.HTTP_200_OK)
