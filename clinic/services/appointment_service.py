from django.db import connection
from ..serializers import AppointmentResultSerializer
from ..db import consultar_citas


def consultar_citas_view(schema_name, patient_id, dentist_id, secretary_id, status_id, date):
    results = consultar_citas(
        schema_name, patient_id, dentist_id, secretary_id, status_id, date
    )
    return AppointmentResultSerializer(results, many=True)
