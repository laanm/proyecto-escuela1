# Generated by Django 4.0.4 on 2022-08-01 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0019_rename_revisarinformacionmediantemediosdecomunicacionestablecida_matriculaalumno_revisaryresponderin'),
    ]

    operations = [
        migrations.AddField(
            model_name='peticionesimpresion',
            name='doblecara',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='peticionesimpresion',
            name='razon',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='peticionesimpresion',
            name='tamanohoja',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='peticionesimpresion',
            name='archivo',
            field=models.ImageField(upload_to=''),
        ),
    ]
