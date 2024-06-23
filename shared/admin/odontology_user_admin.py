from django.contrib import admin
from ..models import OdontologyUser, Role, User
from ..forms import OdontologyUserForm

class OdontologyUserAdmin(admin.ModelAdmin):
    form = OdontologyUserForm
    list_display = ('user_full_name', 'odontology_name', 'role_name')
    
    def user_full_name(self, obj):
        return obj.user.get_full_name()
    user_full_name.short_description = 'User Full Name'
    
    def odontology_name(self, obj):
        return obj.odontology.name
    odontology_name.short_description = 'Odontology Name'
    
    def role_name(self, obj):
        return obj.user.role.name
    role_name.short_description = 'Role'

admin.site.register(OdontologyUser, OdontologyUserAdmin)
