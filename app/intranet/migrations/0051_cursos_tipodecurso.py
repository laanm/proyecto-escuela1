# Generated by Django 4.0.4 on 2022-10-12 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0050_matriculasdatosopcion_idopcion_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cursos',
            name='tipodecurso',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]