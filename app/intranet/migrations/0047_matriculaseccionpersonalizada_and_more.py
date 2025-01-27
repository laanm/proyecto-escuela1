# Generated by Django 4.0.4 on 2022-10-07 02:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0046_alter_matriculaalumno_estudiantenuevo_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatriculaSeccionPersonalizada',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombreseccion', models.CharField(max_length=200)),
                ('orden', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='MatriculasOpcionPersonalizada',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombreopcion', models.CharField(max_length=200)),
                ('tipodeopcion', models.IntegerField()),
                ('idseccion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaseccionpersonalizada')),
            ],
        ),
        migrations.CreateModel(
            name='MatriculasDatosOpcion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('idmatricula', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaalumno')),
            ],
        ),
        migrations.CreateModel(
            name='MatriculasAlternativasOpcion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('valor', models.TextField()),
                ('idopcion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculasopcionpersonalizada')),
            ],
        ),
    ]
