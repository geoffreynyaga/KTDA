# Generated by Django 4.0.4 on 2022-08-24 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0003_alter_lme_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lme',
            name='year_of_birth',
        ),
        migrations.AddField(
            model_name='lme',
            name='age_group',
            field=models.CharField(blank=True, choices=[('18-25', '18-25'), ('25-35', '25-35'), ('35-45', '35-45'), ('45-55', '45-55'), ('55-65', '55-65'), ('75-75', '75-75'), ('75-85', '75-85'), ('85-AB', '85 and above')], max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='lme',
            name='factory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lme_factory', to='environment.factory'),
        ),
    ]
