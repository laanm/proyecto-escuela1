# Generated by Django 4.0.2 on 2022-05-29 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0005_alter_perfiles_options_alter_usuario_options'),
        ('intranet', '0008_alter_peticionesimpresion_estado_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Impresor',
        ),
        migrations.AlterField(
            model_name='asignaturasasignadas',
            name='idprofe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.usuario'),
        ),
        migrations.AlterField(
            model_name='peticionesimpresion',
            name='cordinador',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Cordinador', to='login.usuario'),
        ),
        migrations.AlterField(
            model_name='peticionesimpresion',
            name='datosProfesor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Profesor', to='login.usuario'),
        ),
        migrations.AlterField(
            model_name='salaspedidas',
            name='idProfesor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='login.usuario'),
        ),
        migrations.DeleteModel(
            name='Cordinador',
        ),
        migrations.DeleteModel(
            name='Profesores',
        ),
    ]
