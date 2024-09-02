# Generated by Django 5.0.6 on 2024-09-02 02:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='odontologydomain',
            name='tenant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='domain', to='shared.odontology', unique=True),
        ),
    ]
