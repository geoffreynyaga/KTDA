# Generated by Django 4.0.4 on 2022-05-24 20:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('county', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Counties',
            },
        ),
        migrations.CreateModel(
            name='CSVUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='factories/')),
                ('date_uploaded', models.DateTimeField(auto_now_add=True)),
                ('is_lme_file', models.BooleanField(default=False)),
                ('is_factory_file', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': ' CSV Upload',
                'verbose_name_plural': ' CSV Uploads',
            },
        ),
        migrations.CreateModel(
            name='Factory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('county', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.county')),
            ],
            options={
                'verbose_name': 'Factory',
                'verbose_name_plural': 'Factories',
            },
        ),
        migrations.CreateModel(
            name='LME',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('no_of_employees', models.IntegerField(blank=True, null=True)),
                ('no_of_female_employees', models.IntegerField(default=0)),
                ('no_of_male_employees', models.IntegerField(default=0)),
                ('contact_person', models.CharField(blank=True, max_length=50, null=True)),
                ('year_of_birth', models.DateField(blank=True, help_text='YYYY-MM-DD', null=True)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('retailer_or_installer', models.CharField(choices=[('RET', 'RETAILER'), ('INS', 'INSTALLER')], max_length=3)),
                ('county', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.county')),
                ('factory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.factory')),
                ('owner', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('KCJ', 'KCJ'), ('JIKO_KISASA', 'Jiko Kisasa'), ('MULTIPURPOSE', 'Multipurpose'), ('LINERS', 'Liners'), ('ROCKET', 'Rocket')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SubCounty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sub_county', models.CharField(max_length=20, unique=True)),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.county')),
            ],
            options={
                'verbose_name_plural': 'Sub-Counties',
            },
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zone', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ward',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ward', models.CharField(max_length=20, unique=True)),
                ('sub_county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.subcounty')),
            ],
        ),
        migrations.CreateModel(
            name='TreeGrowing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partner', models.CharField(blank=True, max_length=120, null=True)),
                ('venue', models.CharField(blank=True, max_length=60, null=True)),
                ('trees_planted', models.IntegerField(default=0)),
                ('date', models.DateField()),
                ('indigenous_trees', models.IntegerField(default=0)),
                ('exotic_trees', models.IntegerField(default=0)),
                ('fruit_trees', models.IntegerField(default=0)),
                ('factory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.factory')),
            ],
            options={
                'verbose_name': 'Tree Growing',
                'verbose_name_plural': 'Tree Growing',
            },
        ),
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_name', models.CharField(max_length=140)),
                ('venue', models.CharField(max_length=50)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('number_of_attendees', models.IntegerField(default=0)),
                ('number_of_female_attendees', models.IntegerField(default=0)),
                ('number_of_male_attendees', models.IntegerField(default=0)),
                ('number_below_20', models.IntegerField(default=0)),
                ('number_20_29', models.IntegerField(default=0)),
                ('number_30_39', models.IntegerField(default=0)),
                ('number_40_49', models.IntegerField(default=0)),
                ('number_50_59', models.IntegerField(default=0)),
                ('number_60_69', models.IntegerField(default=0)),
                ('number_70_79', models.IntegerField(default=0)),
                ('number_80_above', models.IntegerField(default=0)),
                ('factory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.factory')),
                ('lme_attendees', models.ManyToManyField(blank=True, related_name='activities', to='environment.lme')),
            ],
            options={
                'verbose_name': 'Training Activity',
                'verbose_name_plural': 'Training Activities',
            },
        ),
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
        migrations.CreateModel(
            name='LMESales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=100)),
                ('customer_phone_number', models.CharField(max_length=100)),
                ('stove_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('date_of_purchase', models.DateField(help_text='DD-MM-YYYY')),
                ('lme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.lme')),
                ('stove', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.stove')),
            ],
            options={
                'verbose_name': 'LME Sales',
                'verbose_name_plural': 'LME Sales',
            },
        ),
        migrations.AddField(
            model_name='lme',
            name='sub_county',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.subcounty'),
        ),
        migrations.AddField(
            model_name='lme',
            name='types_of_stove',
            field=models.ManyToManyField(to='environment.stove'),
        ),
        migrations.AddField(
            model_name='lme',
            name='ward',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.ward'),
        ),
        migrations.AddField(
            model_name='factory',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.region'),
        ),
        migrations.AddField(
            model_name='factory',
            name='zone',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='environment.zone'),
        ),
        migrations.CreateModel(
            name='CustomSalesReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query_lme', models.CharField(blank=True, max_length=60, null=True)),
                ('query_month', models.CharField(blank=True, max_length=15, null=True)),
                ('query_year', models.IntegerField(blank=True, null=True)),
                ('query_factory', models.CharField(blank=True, max_length=50, null=True)),
                ('query_jiko_kisasa', models.BooleanField(default=False)),
                ('query_kcj', models.BooleanField(default=False)),
                ('query_multipurpose', models.BooleanField(default=False)),
                ('query_liners', models.BooleanField(default=False)),
                ('query_rocket', models.BooleanField(default=False)),
                ('query_start_date', models.DateField(blank=True, null=True)),
                ('query_end_date', models.DateField(blank=True, null=True)),
                ('no_query_results', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Custom Sales Report',
                'verbose_name_plural': 'Custom Sales Reports',
            },
        ),
        migrations.CreateModel(
            name='CoachingAndMentorship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('topic_covered', models.CharField(max_length=100)),
                ('remarks_by_mentor', models.TextField()),
                ('action_points', models.TextField()),
                ('next_meeting_date', models.DateField()),
                ('lme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='environment.lme')),
            ],
        ),
    ]
