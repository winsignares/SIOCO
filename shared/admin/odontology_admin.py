from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from ..models import Odontology

class OdontologyAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at', 'exp_token')
    search_fields = ('name', 'is_active', 'created_at', 'exp_token')
    readonly_fields = ('exp_token',)

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if obj:
            return fields
        else:
            return [field for field in fields if field != 'exp_token']

admin.site.register(Odontology, OdontologyAdmin)
