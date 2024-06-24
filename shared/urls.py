from django.urls import path
from .views import Login, DecodeToken

urlpatterns = [
    path('auth/', Login.as_view(), name='api_token_auth'),
    path('decode-token/', DecodeToken.as_view(), name='decode_token')
]