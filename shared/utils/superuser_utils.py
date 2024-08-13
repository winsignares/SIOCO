from django.contrib.auth import get_user_model
from django_tenants.utils import schema_context

def create_superuser_tenant(tenant_name, username, email, password):
    
    from shared.models import Odontology
    
    try:
        tenant = Odontology.objects.get(schema_name=tenant_name)
    except Odontology.DoesNotExist:
        print(f' Tenant {tenant_name} does not exist.')
        return
    
    with schema_context(tenant.schema_name):
        
        User = get_user_model()
        
        User.objects.create_superuser(username=username, email=email, password=password)