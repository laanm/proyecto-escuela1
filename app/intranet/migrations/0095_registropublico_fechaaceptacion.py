# Generated by Django 4.0.4 on 2023-02-22 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranet', '0094_configuracionadministrativa_iniciodelistadeespera'),
    ]

    operations = [
        migrations.AddField(
            model_name='registropublico',
            name='fechaaceptacion',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
