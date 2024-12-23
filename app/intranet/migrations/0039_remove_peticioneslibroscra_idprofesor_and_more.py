# Generated by Django 4.0.4 on 2022-10-01 16:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0038_categorialibroscra_peticioneslibroscra_libroscra'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='peticioneslibroscra',
            name='idprofesor',
        ),
        migrations.AddField(
            model_name='peticioneslibroscra',
            name='idhuella',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='intranet.huellaalumno'),
        ),
    ]