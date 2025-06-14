from rest_framework import serializers
from ...persistencia import OdontologiaDomain


class OdontologiaDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = OdontologiaDomain
        fields = ['domain']