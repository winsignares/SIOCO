from django.urls import path
from .views import UserAppointments, Dentists

urlpatterns = [
    path('appointments-u/', UserAppointments.as_view(), name='appointments'),
    path('dentists/', Dentists.as_view(), name='dentists')
]