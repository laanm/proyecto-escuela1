# Generated by Django 4.0.4 on 2023-06-19 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0104_cajacategoria_cajaproducto_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cajaproducto',
            name='categoria',
            field=models.IntegerField(default=1),
        ),
    ]