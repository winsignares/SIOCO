from django.contrib import admin
from django_tenants.utils import get_public_schema_name
from ..models import PaymentMethod, PaymentStatus, Role, OdontologyUser, ToothCondition, ToothConditionColor, OdontologyDomain, AppointmentStatus

class SharedModelsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.tenant.schema_name == get_public_schema_name()

    def has_change_permission(self, request, obj=None):
        return request.tenant.schema_name == get_public_schema_name()

    def has_delete_permission(self, request, obj=None):
        return request.tenant.schema_name == get_public_schema_name()

admin.site.register(PaymentMethod, SharedModelsAdmin)
admin.site.register(PaymentStatus, SharedModelsAdmin)
admin.site.register(Role, SharedModelsAdmin)
admin.site.register(ToothCondition, SharedModelsAdmin)
admin.site.register(ToothConditionColor, SharedModelsAdmin)
admin.site.register(OdontologyDomain, SharedModelsAdmin)
admin.site.register(AppointmentStatus, SharedModelsAdmin)