# Generated by Django 4.0.2 on 2022-05-24 23:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0005_alter_peticionesimpresion_cordinador_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peticionesimpresion',
            name='estado',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='intranet.estados'),
        ),
    ]
