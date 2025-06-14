from rest_framework import serializers

class UsuarioSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='id')
    usuario = serializers.CharField(label='Usuario', source='username')
    nombres = serializers.CharField(label='Nombres', source='first_name')
    apellidos = serializers.CharField(label='Apellidos', source='last_name')
    correo_electronico = serializers.CharField(label='Correo electrónico', source='email')
    activo = serializers.BooleanField(label='Is active', source='is_active')
    numero_identificacion = serializers.IntegerField(label='Numero de identificación')
    genero = serializers.CharField(label='Género')
    descripcion = serializers.CharField(label='Descripción')
    url_imagen = serializers.CharField(label='URL imagen')
    nombre_rol = serializers.CharField(label='Nombre rol', source='rol.nombre')
    id_rol = serializers.IntegerField(label='Id rol', source='rol_id')
