# Generated by Django 4.0.4 on 2022-05-18 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0008_remove_stove_retailer_lme_retailer_or_installer_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MonthlyLMESales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.DateField()),
                ('month_string', models.CharField(blank=True, max_length=15, null=True)),
                ('year_number', models.IntegerField(blank=True, null=True)),
                ('jiko_kisasa', models.IntegerField(default=0)),
                ('kcj', models.IntegerField(default=0)),
                ('multipurpose', models.IntegerField(default=0)),
                ('liners', models.IntegerField(default=0)),
                ('rocket', models.IntegerField(default=0)),
                ('lme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.lme')),
            ],
            options={
                'verbose_name': 'Monthly LME Sales',
                'verbose_name_plural': 'Monthly LME Sales',
            },
        ),
    ]