# Generated by Django 4.0.4 on 2023-02-22 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0093_registropublico_delete_permisosusuarios_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='configuracionadministrativa',
            name='iniciodelistadeespera',
            field=models.IntegerField(default=1),
        ),
    ]
