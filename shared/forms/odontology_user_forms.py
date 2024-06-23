from django import forms
from django.db import models
from ..models import OdontologyUser, User

class OdontologyUserForm(forms.ModelForm):
    class Meta:
        model = OdontologyUser
        fields = ['user', 'odontology']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        if not self.instance.pk:
            # Obtener IDs de usuarios que ya tienen una relación con una odontología
            assigned_users_ids = OdontologyUser.objects.values_list('user_id', flat=True)
            
            # Filtrar usuarios con el rol 'patient'
            patient_users = User.objects.filter(role__name='patient')
            
            # Filtrar usuarios con rol 'secretary' o 'dentist' que no tienen relación con ninguna odontología
            unassigned_secretary_dentist_users = User.objects.filter(
                (models.Q(role__name='secretary') | models.Q(role__name='dentist')) &
                ~models.Q(id__in=assigned_users_ids)
            )
            
            # Combinar los conjuntos de resultados
            eligible_users = patient_users | unassigned_secretary_dentist_users
            
            # Limitar el queryset del campo de usuario
            self.fields['user'].queryset = eligible_users
