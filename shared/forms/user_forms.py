from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from ..models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'gender', 'role', 'identification_card', 'url_image')
        widgets = {
            'url_image': forms.URLInput(attrs={'required': False}),
        }

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'gender', 'role', 'identification_card', 'url_image')
        widgets = {
            'url_image': forms.URLInput(attrs={'required': False}),
        }