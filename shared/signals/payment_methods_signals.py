from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import PaymentMethod

@receiver(post_migrate)
def create_default_payment_methods(sender, **kwargs):
    default_payment_methods = [
        {"name": "Credit Card", "description": "Payment via credit card."},
        {"name": "Cash", "description": "Payment in cash."},
        {"name": "Insurance", "description": "Payment through insurance."},
    ]

    for method in default_payment_methods:
        PaymentMethod.objects.get_or_create(name=method["name"], defaults={"description": method["description"]})
