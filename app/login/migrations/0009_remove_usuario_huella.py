# Generated by Django 4.0.4 on 2022-10-04 00:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0008_alter_usuario_imagen'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='huella',
        ),
    ]
