# Generated by Django 4.0.4 on 2022-09-14 02:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0031_huellaalumno_correoapoderado_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaMantencion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Mantencion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.IntegerField()),
                ('prioridad', models.IntegerField()),
                ('tipoobra', models.IntegerField()),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='')),
                ('texto', models.TextField()),
                ('fechaemision', models.DateTimeField(blank=True, null=True)),
                ('fechaultimamodificacion', models.DateTimeField(blank=True, null=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.categoriamantencion')),
            ],
        ),
    ]
