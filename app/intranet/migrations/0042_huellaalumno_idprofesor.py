# Generated by Django 4.0.4 on 2022-10-04 00:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0009_remove_usuario_huella'),
        ('intranet', '0041_alter_peticioneslibroscra_idproducto_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='huellaalumno',
            name='idprofesor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='login.usuario'),
        ),
    ]
