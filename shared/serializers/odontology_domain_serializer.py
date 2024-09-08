from rest_framework import serializers
from ..models import OdontologyDomain


class OdontologyDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = OdontologyDomain
        fields = ['domain']