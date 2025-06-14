from django.urls import path
from .controladores import Cita, Dentista, DentistaDetalle

urlpatterns = [
    path('citas/',Cita.as_view(), name='citas'),
    path('dentistas/', Dentista.as_view(), name='dentistas'),
    path('dentistas-detalle/<int:dentista_id>', DentistaDetalle.as_view(), name='dentistas-detalle'),
]