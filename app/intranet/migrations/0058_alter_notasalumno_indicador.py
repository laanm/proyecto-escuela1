# Generated by Django 4.0.4 on 2022-11-09 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0057_notasalumno_indicador'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notasalumno',
            name='indicador',
            field=models.CharField(default='A', max_length=50),
        ),
    ]
