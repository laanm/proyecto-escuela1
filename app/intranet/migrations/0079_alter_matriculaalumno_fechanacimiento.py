# Generated by Django 4.0.4 on 2022-12-06 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0078_alter_matriculaalumno_aceptoelusoderegistrodehuellaconfinesderegistrodehorario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matriculaalumno',
            name='fechanacimiento',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]