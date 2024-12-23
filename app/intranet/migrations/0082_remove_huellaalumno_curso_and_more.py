# Generated by Django 4.0.4 on 2022-12-26 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0009_remove_usuario_huella'),
        ('intranet', '0081_rename_diasasistidos_notasalumno_porcentaje1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='huellaalumno',
            name='curso',
        ),
        migrations.RemoveField(
            model_name='huellaalumno',
            name='idprofesor',
        ),
        migrations.RemoveField(
            model_name='medicamentoenfermedades',
            name='enfermedad',
        ),
        migrations.RemoveField(
            model_name='medicamentoenfermedades',
            name='medicamento',
        ),
        migrations.RemoveField(
            model_name='medicamentoentienda',
            name='idmedicamento',
        ),
        migrations.RemoveField(
            model_name='medicamentoentienda',
            name='idtienda',
        ),
        migrations.RemoveField(
            model_name='sintomasdeenfermedades',
            name='enfermedad',
        ),
        migrations.RemoveField(
            model_name='sintomasdeenfermedades',
            name='sintoma',
        ),
        migrations.DeleteModel(
            name='usuariosyomi',
        ),
        migrations.RemoveField(
            model_name='peticioneslibroscra',
            name='idhuella',
        ),
        migrations.AddField(
            model_name='matriculaalumno',
            name='huella',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='peticioneslibroscra',
            name='idalumno',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaalumno'),
        ),
        migrations.AddField(
            model_name='peticioneslibroscra',
            name='idprofesor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.usuario'),
        ),
        migrations.AddField(
            model_name='peticionesproductocra',
            name='idalumno',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaalumno'),
        ),
        migrations.AlterField(
            model_name='asitenciaalumno',
            name='alumno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaalumno'),
        ),
        migrations.AlterField(
            model_name='peticionesproductocra',
            name='idprofesor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.usuario'),
        ),
        migrations.AlterField(
            model_name='problemaasistencia',
            name='alumno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intranet.matriculaalumno'),
        ),
        migrations.DeleteModel(
            name='enfermedades',
        ),
        migrations.DeleteModel(
            name='HuellaAlumno',
        ),
        migrations.DeleteModel(
            name='medicamentoenfermedades',
        ),
        migrations.DeleteModel(
            name='medicamentoentienda',
        ),
        migrations.DeleteModel(
            name='medicamentos',
        ),
        migrations.DeleteModel(
            name='sintomas',
        ),
        migrations.DeleteModel(
            name='sintomasdeenfermedades',
        ),
        migrations.DeleteModel(
            name='tiendasmedicamentos',
        ),
    ]
