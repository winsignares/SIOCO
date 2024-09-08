from django.urls import path
from .views import Login

urlpatterns = [
    path('auth/', Login.as_view(), name='api_token_auth'),
]