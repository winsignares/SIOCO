from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import AppointmentStatus

@receiver(post_migrate)
def create_default_appointment_status(sender, **kwargs):
    default_statuses = [
        {"name": "Pending", "description": "The appointment is pending."},
        {"name": "Confirmed", "description": "The appointment is confirmed."},
        {"name": "Completed", "description": "The appointment has been completed."},
        {"name": "Cancelled", "description": "The appointment was cancelled."},
    ]

    for status in default_statuses:
        AppointmentStatus.objects.get_or_create(name=status["name"], defaults={"description": status["description"]})