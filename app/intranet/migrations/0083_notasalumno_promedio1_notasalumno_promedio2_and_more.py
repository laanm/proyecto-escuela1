# Generated by Django 4.0.4 on 2022-12-28 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0082_remove_huellaalumno_curso_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notasalumno',
            name='promedio1',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='promedio2',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='promedio3',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='promedio4',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='notasalumno',
            name='promedioanual',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
