# Generated by Django 4.0.4 on 2022-06-07 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0002_lme_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lme',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]