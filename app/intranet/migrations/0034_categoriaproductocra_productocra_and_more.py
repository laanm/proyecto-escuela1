# Generated by Django 4.0.4 on 2022-09-27 20:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0008_alter_usuario_imagen'),
        ('intranet', '0033_recursosmantencion'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaProductoCra',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=300)),
                ('activo', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductoCra',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('cantidad', models.IntegerField()),
                ('limitecantidad', models.IntegerField()),
                ('img', models.ImageField(blank=True, null=True, upload_to='')),
                ('descripcion', models.TextField()),
                ('infinito', models.IntegerField()),
                ('Activo', models.IntegerField()),
                ('posicion', models.TextField()),
                ('codigobarra', models.TextField()),
                ('vecespedido', models.IntegerField()),
                ('idcategoria', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='intranet.categoriaproductocra')),
            ],
        ),
        migrations.CreateModel(
            name='PeticionesProductoCra',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.IntegerField()),
                ('cantidad', models.IntegerField()),
                ('fechapeticion', models.DateTimeField(blank=True, null=True)),
                ('fechadevolucion', models.DateTimeField(blank=True, null=True)),
                ('idcategoria', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='intranet.categoriaproductocra')),
                ('idproducto', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='intranet.productocra')),
                ('idprofesor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='login.usuario')),
            ],
        ),
    ]
