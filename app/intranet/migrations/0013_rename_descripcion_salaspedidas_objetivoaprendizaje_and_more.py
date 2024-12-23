# Generated by Django 4.0.4 on 2022-06-13 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0012_archivossalaspedidas'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salaspedidas',
            old_name='descripcion',
            new_name='objetivoAprendizaje',
        ),
        migrations.RemoveField(
            model_name='salaspedidas',
            name='titulo',
        ),
        migrations.AddField(
            model_name='salaspedidas',
            name='numeroAprendizaje',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]