# Generated by Django 4.0.4 on 2022-11-09 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0058_alter_notasalumno_indicador'),
    ]

    operations = [
        migrations.AddField(
            model_name='noticiasfront',
            name='interno',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
