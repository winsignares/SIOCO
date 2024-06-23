from django.urls import path
from .views import UserAppointments

urlpatterns = [
    path('appointments-u/', UserAppointments.as_view(), name='appointments')
]