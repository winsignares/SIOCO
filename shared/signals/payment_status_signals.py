from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import PaymentStatus

@receiver(post_migrate)
def create_default_payment_status(sender, **kwargs):
    default_statuses = [
        {"name": "Pending", "description": "The pay is pending."},
        {"name": "Confirmed", "description": "The pay is confirmed."},
        {"name": "Cancelled", "description": "The pay was cancelled."},
    ]

    for pay_status in default_statuses:
        PaymentStatus.objects.get_or_create(name=pay_status["name"], defaults={"description": pay_status["description"]})