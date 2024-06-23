from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import Role

@receiver(post_migrate)
def create_default_roles(sender, **kwargs):
    default_roles = [
        {"name": "patient", "description": "Patient role."},
        {"name": "dentist", "description": "Dentist role."},
        {"name": "secretary", "description": "Secretary role."},
    ]

    for role in default_roles:
        Role.objects.get_or_create(name=role["name"], defaults={"description": role["description"]})