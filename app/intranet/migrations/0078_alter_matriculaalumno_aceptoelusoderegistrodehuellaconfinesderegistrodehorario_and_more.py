# Generated by Django 4.0.4 on 2022-12-06 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0077_alter_matriculaalumno_correoinstitucional_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matriculaalumno',
            name='aceptoelusoderegistrodehuellaconfinesderegistrodehorario',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='aceptolosprotocoloscontraelcovid19',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='apellidomaterno',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='apellidopaterno',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='asistiratodaslasreunionescitacionesollamadas',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='comuna',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='conoceyaceptareglamentodeevaluaciondelestablecimiento',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='conoceyaceptareglamentointernodelestablecimiento',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='cumplirhorariodeentradaysalida',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='cursosqueharepetido',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='domicilio',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='encuestaparalaasistenciadereligion',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='establecimientoprocedencia',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='estudiantenuevo',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='etnia',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='ipe',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='justificarinasistenciascondocumentospertinentes',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreapellidos',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreapoderado',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madrecomuna',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madredomicilio',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreestudios',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreipa',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madrenacionalidad',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madrenombres',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madrenpasaporte',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madreocupacion',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madrerun',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madretelefono1',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='madretelefono2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='nacionalidad',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='nombres',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='optaporreligion',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='optaporuncredo',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreapellidos',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreapoderado',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padrecomuna',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padredomicilio',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreestudios',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreipa',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padrenacionalidad',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padrenombres',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padrenpasaporte',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padreocupacion',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padrerun',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padretelefono1',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='padretelefono2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='particaendiferentesactividadesprogramadasporelestablecimiento',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='perteneceaproyectodeintegracionescolar',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='quienmatricula',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='religion',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='revisaryresponderinformacionmediantemediosdecomunicacion',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='runalumno',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='sexo',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='sistemadematricula',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='telefono',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='ultimoyearcursado',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='matriculaalumno',
            name='vivecon',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]