# Generated by Django 5.0.6 on 2024-10-10 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0003_alter_odontologydomain_tenant'),
    ]

    operations = [
        migrations.AddField(
            model_name='odontology',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
