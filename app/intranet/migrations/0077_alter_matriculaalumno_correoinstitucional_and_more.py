# Generated by Django 4.0.4 on 2022-12-06 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0076_alter_matriculaalumno_fechanacimiento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matriculaalumno',
            name='correoinstitucional',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreemail',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreemail',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
