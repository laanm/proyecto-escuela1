# Generated by Django 4.0.4 on 2023-02-15 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0091_matriculaalumno_niveljunaeb_historialjunaeb'),
    ]

    operations = [
        migrations.CreateModel(
            name='PermisosUsuarios',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('pnoticias', models.IntegerField(default=0)),
                ('preservasalas', models.IntegerField(default=0)),
                ('pimpresiones', models.IntegerField(default=0)),
                ('pcra', models.IntegerField(default=0)),
                ('pasistencia', models.IntegerField(default=0)),
                ('pcalificaciones', models.IntegerField(default=0)),
                ('pmatricula', models.IntegerField(default=0)),
                ('pcalendario', models.IntegerField(default=0)),
                ('pjunaeb', models.IntegerField(default=0)),
                ('padmin', models.IntegerField(default=0)),
            ],
        ),
    ]
