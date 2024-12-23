# Generated by Django 4.0.4 on 2022-12-23 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0080_alter_matriculaalumno_correoinstitucional_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notasalumno',
            old_name='diasasistidos',
            new_name='porcentaje1',
        ),
        migrations.RenameField(
            model_name='notasalumno',
            old_name='diasnoasistidos',
            new_name='porcentaje2',
        ),
        migrations.AddField(
            model_name='matriculaalumno',
            name='diasasistidos',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='porcentaje3',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='porcentaje4',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
