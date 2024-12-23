# Generated by Django 4.0.4 on 2022-08-16 12:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0006_usuario_huella'),
        ('intranet', '0024_peticionesimpresion_fechaimpresionentregada'),
    ]

    operations = [
        migrations.CreateModel(
            name='NoticiasFront',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=300)),
                ('portada', models.ImageField(blank=True, null=True, upload_to='')),
                ('encabezado', models.CharField(max_length=300)),
                ('contenido', models.TextField(blank=True, null=True)),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('orden', models.IntegerField(blank=True, null=True)),
                ('activo', models.BooleanField(default=True)),
                ('creador', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='login.usuario')),
            ],
        ),
    ]
