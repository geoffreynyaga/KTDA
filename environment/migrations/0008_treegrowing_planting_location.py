# Generated by Django 4.0.4 on 2022-09-25 16:35

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0007_alter_stove_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='treegrowing',
            name='planting_location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
    ]