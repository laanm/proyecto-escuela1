# Generated by Django 4.0.4 on 2023-03-29 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0015_horariolaboral_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horariolaboral',
            name='domingo',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='jueves',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='lunes',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='martes',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='miercoles',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='sabado',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='horariolaboral',
            name='viernes',
            field=models.BooleanField(default=False),
        ),
    ]
