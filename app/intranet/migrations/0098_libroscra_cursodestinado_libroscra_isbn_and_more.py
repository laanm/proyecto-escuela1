# Generated by Django 4.0.4 on 2023-03-07 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0097_configuracionadministrativa_listaesperaactivo'),
    ]

    operations = [
        migrations.AddField(
            model_name='libroscra',
            name='cursodestinado',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='libroscra',
            name='isbn',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='libroscra',
            name='yearedicion',
            field=models.TextField(blank=True, null=True),
        ),
    ]
