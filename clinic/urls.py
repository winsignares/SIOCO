from django.urls import path
from .views import AppointmentAPI, Dentists

urlpatterns = [
    path('appointments/', AppointmentAPI.as_view(), name='appointments'),
    path('dentists/', Dentists.as_view(), name='dentists')
]