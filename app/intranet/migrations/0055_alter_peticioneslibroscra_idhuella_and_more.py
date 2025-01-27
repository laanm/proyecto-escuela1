# Generated by Django 4.0.4 on 2022-11-07 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0054_libroscra_editorial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peticioneslibroscra',
            name='idhuella',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.huellaalumno'),
        ),
        migrations.AlterField(
            model_name='peticioneslibroscra',
            name='idproducto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.libroscra'),
        ),
        migrations.AlterField(
            model_name='peticionesproductocra',
            name='idproducto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.productocra'),
        ),
        migrations.AlterField(
            model_name='peticionesproductocra',
            name='idprofesor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='intranet.huellaalumno'),
        ),
    ]
