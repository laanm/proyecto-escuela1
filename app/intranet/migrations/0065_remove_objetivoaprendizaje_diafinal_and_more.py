# Generated by Django 4.0.4 on 2022-11-22 02:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0064_remove_calendario_abril_remove_calendario_agosto_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='objetivoaprendizaje',
            name='diafinal',
        ),
        migrations.RemoveField(
            model_name='objetivoaprendizaje',
            name='diainicio',
        ),
        migrations.AddField(
            model_name='objetivoaprendizaje',
            name='estado',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='objetivoaprendizaje',
            name='nsemana',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.CreateModel(
            name='Eventos',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.TextField(blank=True, null=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('requisitos', models.TextField(blank=True, null=True)),
                ('hora', models.TextField(blank=True, null=True)),
                ('diafinal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diafinal', to='intranet.calendario')),
                ('diainicio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.calendario')),
            ],
        ),
    ]
