# Generated by Django 4.0.4 on 2022-08-30 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0006_alter_stove_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stove',
            name='name',
            field=models.CharField(choices=[('KCJ', 'KCJ'), ('JIKO_KISASA', 'Jiko Kisasa'), ('MULTIPURPOSE', 'Multipurpose'), ('LINERS', 'Liners'), ('ROCKET', 'Rocket'), ('JIKO_SMART', 'Jiko Smart'), ('WISDOM_JIKO', 'Wisdom Jiko'), ('OTHER', 'Other')], max_length=20),
        ),
    ]
