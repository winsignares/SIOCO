from django.apps import AppConfig

class SharedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shared'
    
    def ready(self) -> None:
        from .signals import create_default_appointment_status, create_default_roles, create_default_payment_methods, create_default_payment_status, create_default_tooth_condition_colors, create_default_tooth_conditions, create_odontogram