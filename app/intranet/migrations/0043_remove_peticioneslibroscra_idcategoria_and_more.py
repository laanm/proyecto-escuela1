# Generated by Django 4.0.4 on 2022-10-04 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0042_huellaalumno_idprofesor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='peticioneslibroscra',
            name='idcategoria',
        ),
        migrations.RemoveField(
            model_name='peticionesproductocra',
            name='idcategoria',
        ),
    ]
