from django.contrib import admin
from .persistencia import (
    OdontologiaModel,
    OdontologiaUsuarioModel,
    RolModel,
    OdontologiaDomain,
    PagoEstadosModel,
    PagoMetodosModel,
    CitaEstadosModel,
    DienteEstadosModel,
    ColoresEstadosDienteModel
)
from .models import UsuarioModel

admin.site.register(OdontologiaModel)
admin.site.register(OdontologiaUsuarioModel)
admin.site.register(RolModel)
admin.site.register(OdontologiaDomain)
admin.site.register(PagoEstadosModel)
admin.site.register(PagoMetodosModel)
admin.site.register(CitaEstadosModel)
admin.site.register(DienteEstadosModel)
admin.site.register(ColoresEstadosDienteModel)
admin.site.register(UsuarioModel)
