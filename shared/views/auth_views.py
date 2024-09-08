from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny
from ..serializers import AuthTokenSerializer
from ..models import OdontologyDomain, OdontologyUser


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        from ..serializers import OdontologyDomainSerializer

        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                odontologies = []

                print(f'user role: {user.role}')
                if str(user.role) == "patient":

                    clinics = OdontologyUser.objects.filter(user_id=user.id).select_related('odontology')
                    for clinic in clinics:
                        odontology = {
                            'id': clinic.odontology.pk,
                            'name': clinic.odontology.name,
                            'domain_url': OdontologyDomainSerializer(
                                OdontologyDomain.objects.filter(tenant_id=clinic.odontology.pk), many=True).data
                        }
                        odontologies.append(odontology)

                    token_data = {
                        'token': token.key,
                        'odontologies': odontologies,
                        'role': user.role.name
                    }

                else:
                    token_data = {
                        'token': token.key,
                        'role': user.role.name
                    }

                return Response(token_data)
            else:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
