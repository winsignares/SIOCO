from django.urls import path
from .views import AppointmentAPI, Dentists, DentistDetail

urlpatterns = [
    path('appointments/', AppointmentAPI.as_view(), name='appointments'),
    path('dentists/', Dentists.as_view(), name='dentists'),
    path('dentist-details/<int:dentist_id>', DentistDetail.as_view(), name='dentist-details'),
]