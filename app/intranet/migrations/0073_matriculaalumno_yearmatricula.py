# Generated by Django 4.0.4 on 2022-12-05 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0072_configuracionadministrativa_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='matriculaalumno',
            name='yearmatricula',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
