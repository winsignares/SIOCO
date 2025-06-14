from django.apps import AppConfig


class SharedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shared'

    def ready(self) -> None:
        from .servicios import (
            crear_estados_citas_por_defecto,
            crear_roles_defecto,
            crear_metodos_pago_default,
            crear_estados_pago_defecto,
            crear_colores_por_defecto_condiciones_diente,
            crear_condiciones_diente_por_defecto,
            crear_odontograma
        )
