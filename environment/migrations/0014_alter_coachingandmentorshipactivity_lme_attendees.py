# Generated by Django 4.0.4 on 2022-05-18 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('environment', '0013_rename_coachingandmentorshipactivities_coachingandmentorshipactivity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coachingandmentorshipactivity',
            name='lme_attendees',
            field=models.ManyToManyField(blank=True, related_name='activities', to='environment.lme'),
        ),
    ]