from django.core.management.base import BaseCommand
from shared.utils import create_superuser_tenant

class Command(BaseCommand):
    help = 'Create a superuser for a specific tenant'

    def add_arguments(self, parser):
        parser.add_argument('tenant_name', type=str, help='The name of the tenant schema')
        parser.add_argument('username', type=str, help='The username for the superuser')
        parser.add_argument('email', type=str, help='The email for the superuser')
        parser.add_argument('password', type=str, help='The password for the superuser')

    def handle(self, *args, **kwargs):
        tenant_name = kwargs['tenant_name']
        username = kwargs['username']
        email = kwargs['email']
        password = kwargs['password']

        create_superuser_tenant(tenant_name, username, email, password)

        self.stdout.write(self.style.SUCCESS(f'Superuser {username} created successfully for tenant {tenant_name}'))
