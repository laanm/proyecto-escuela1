# Generated by Django 4.0.4 on 2023-02-15 07:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0009_remove_usuario_huella'),
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
        migrations.AddField(
            model_name='usuario',
            name='permisos',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='login.permisosusuarios'),
        ),
    ]