from rest_framework import serializers

class AutenticacionSerializer(serializers.Serializer):
    usuario = serializers.CharField(label="Usuario")
    contrasenia = serializers.CharField(label="Contraseña", style={'input_type': 'password'})