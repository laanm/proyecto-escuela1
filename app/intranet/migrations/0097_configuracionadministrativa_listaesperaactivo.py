# Generated by Django 4.0.4 on 2023-03-03 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0096_registropublico_curso'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuracionadministrativa',
            name='listaesperaactivo',
            field=models.IntegerField(default=1),
        ),
    ]
