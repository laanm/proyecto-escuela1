# Generated by Django 4.0.4 on 2023-03-24 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0100_asistenciadocente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asistenciadocente',
            name='horasalida',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
