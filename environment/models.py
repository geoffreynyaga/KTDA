from django.conf import settings
from django.contrib.gis.db import models as gis_models
from django.db import models
from django.db.models.signals import post_save
from django.urls import reverse

from decouple import config
from phonenumber_field.modelfields import PhoneNumberField

# from django.contrib.auth import get_user_model
# User = get_user_model()


User = settings.AUTH_USER_MODEL

import logging

logger = logging.getLogger(__name__)


class County(models.Model):
    class Meta:
        verbose_name_plural = "Counties"

    county = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.county


class SubCounty(models.Model):
    class Meta:
        verbose_name_plural = "Sub-Counties"

    county = models.ForeignKey(County, on_delete=models.CASCADE)
    sub_county = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.sub_county


class Ward(models.Model):
    sub_county = models.ForeignKey(SubCounty, on_delete=models.CASCADE)
    ward = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.ward


class Zone(models.Model):
    zone = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.zone


class Region(models.Model):
    region = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.region


class Factory(models.Model):
    class Meta:
        verbose_name = "Factory"
        verbose_name_plural = "Factories"

    name = models.CharField(max_length=50)

    region = models.ForeignKey(Region, on_delete=models.CASCADE, blank=True, null=True)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, blank=True, null=True)
    county = models.ForeignKey(County, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name


class CSVUpload(models.Model):
    class Meta:
        verbose_name = " CSV Upload"
        verbose_name_plural = " CSV Uploads"

    file = models.FileField(upload_to="factories/")
    date_uploaded = models.DateTimeField(auto_now_add=True)
    is_lme_file = models.BooleanField(default=False)
    is_factory_file = models.BooleanField(default=False)

    def __str__(self):
        return self.file.name


def parse_csv_file(sender, instance, created, **kwargs):

    if created:
        # get the file path
        if not settings.IS_CONTABO:
            file_path = instance.file.path

            print(file_path, "file path")
            logger.debug(file_path)
        else:
            logger.info("IS_CONTABO is true")
            # logger.info(f"instance.file.path: {instance.file.path}")
            # file_path = config("S3_ENDPOINT_URL") + instance.file.url
            # file_path = config("TEST_S3_URL") + instance.file.url
            # file_path = "s3://ktda-bucket/media/factories/Factories_per_region_and_Zone.xlsx_-_Sheet1.csv"
            file_path = "https://ktda-bucket.s3.eu-west-1.amazonaws.com/media/factories/Factories_per_region_and_Zone.xlsx_-_Sheet1.csv"

            logger.info(f"file_path: {file_path}")
            # logger.info(f"file_path2: {file_path2}")

        command_str = ""
        print(command_str, "command string")
        # print(instance.is_update_file, "instance.is_update_file")
        # if instance.is_update_file == True:
        #     command_str = "update"
        # print(command_str, "command string")

        print(command_str, "command string")
        # logger.info(file_path, "file path")
        print(file_path, "file_path string")

        # open the file
        try:
            from environment.utils import save_factories_from_csv, save_LMEs_from_csv

            if instance.is_lme_file:
                save_LMEs_from_csv(file_path, command_str)
            elif instance.is_factory_file:
                save_factories_from_csv(file_path, command_str)
            else:
                print("no category type")
        except Exception as e:
            # logger.info(e, "error from models")
            print(e, "error from models")


post_save.connect(parse_csv_file, sender=CSVUpload)


STOVE_NAMES = (
    ("KCJ", "KCJ"),
    ("JIKO_KISASA", "Jiko Kisasa"),
    ("MULTIPURPOSE", "Multipurpose"),
    ("LINERS", "Liners"),
    ("ROCKET", "Rocket"),
    ("JIKO_SMART", "Jiko Smart"),
    ("WISDOM_JIKO", "Wisdom Jiko"),
    ("OTHER", "Other"),
)


class Stove(models.Model):
    name = models.CharField(max_length=20, choices=STOVE_NAMES)

    def __str__(self):
        return str(self.name)


RETAILER_OR_INSTALLER_CHOICES = (("RET", "RETAILER"), ("INS", "INSTALLER"))
AGE_GROUPS_CHOICES = (
    ("18-25", "18-25"),
    ("25-35", "25-35"),
    ("35-45", "35-45"),
    ("45-55", "45-55"),
    ("55-65", "55-65"),
    ("75-75", "75-75"),
    ("75-85", "75-85"),
    ("85-AB", "85 and above"),
)
GENDER_CHOICES = (("M", "MALE"), ("F", "FEMALE"))


# A LME is a person who sells or installs stoves
class LME(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)

    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, blank=True, null=True)
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE, related_name="lme_factory")
    email = models.EmailField(max_length=254, blank=True, null=True)
    no_of_employees = models.IntegerField(blank=True, null=True)
    no_of_female_employees = models.IntegerField(default=0)
    no_of_male_employees = models.IntegerField(default=0)
    county = models.ForeignKey(County, on_delete=models.CASCADE, blank=True, null=True)
    sub_county = models.ForeignKey(SubCounty, on_delete=models.CASCADE, blank=True, null=True)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, blank=True, null=True)

    types_of_stove = models.ManyToManyField("environment.Stove")

    contact_person = models.CharField(max_length=50, blank=True, null=True)
    # year_of_birth = models.DateField(help_text="YYYY-MM-DD", blank=True, null=True)
    # phone_number = models.CharField(max_length=20, help_text="07xx xxx xxx")
    age_group = models.CharField(max_length=5, choices=AGE_GROUPS_CHOICES, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True)

    retailer_or_installer = models.CharField(max_length=3, choices=RETAILER_OR_INSTALLER_CHOICES)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        The __str__ function is a special function that is called when you print an object
        :return: The name of the object.
        """
        return str(self.name)

    def save(self, *args, **kwargs):
        """
        The function is called when the model is saved. It adds the number of female employees and the
        number of male employees and saves the result in the no_of_employees field
        """
        self.no_of_employees = self.no_of_female_employees + self.no_of_male_employees

        if self.name:
            from django.utils.text import slugify

            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "lme-detail",
            args=[
                self.slug,
            ],
        )


class CoachingAndMentorship(models.Model):
    lme = models.ForeignKey(LME, on_delete=models.CASCADE)
    date = models.DateField()
    topic_covered = models.CharField(max_length=100)
    remarks_by_mentor = models.TextField()
    action_points = models.TextField()
    next_meeting_date = models.DateField()

    def __str__(self):
        """
        The __str__ function is a special function that is called when you print an object
        :return: The name of the LME
        """
        return self.lme.name


class Training(models.Model):
    class Meta:
        verbose_name = "Training Activity"
        verbose_name_plural = "Training Activities"

    course_name = models.CharField(max_length=140)
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE)
    venue = models.CharField(max_length=50)

    lme_attendees = models.ManyToManyField(LME, related_name="activities", blank=True)
    start_date = models.DateField()
    end_date = models.DateField()

    number_of_attendees = models.IntegerField(default=0)
    number_of_female_attendees = models.IntegerField(default=0)
    number_of_male_attendees = models.IntegerField(default=0)

    number_below_20 = models.IntegerField(default=0)
    number_20_29 = models.IntegerField(default=0)
    number_30_39 = models.IntegerField(default=0)
    number_40_49 = models.IntegerField(default=0)
    number_50_59 = models.IntegerField(default=0)
    number_60_69 = models.IntegerField(default=0)
    number_70_79 = models.IntegerField(default=0)
    number_80_above = models.IntegerField(default=0)

    def __str__(self):
        return self.course_name


class LMESales(models.Model):
    class Meta:

        verbose_name = "LME Sales"
        verbose_name_plural = "LME Sales"

    lme = models.ForeignKey(LME, on_delete=models.CASCADE)

    customer_name = models.CharField(max_length=100)
    # TODO: shorten this
    customer_phone_number = models.CharField(max_length=100)
    stove = models.ForeignKey("environment.Stove", on_delete=models.CASCADE)
    stove_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_of_purchase = models.DateField(help_text="DD-MM-YYYY")

    def __str__(self):
        return str(self.customer_name)

    # if created post_save signal


def post_save_lme_sales_create(sender, instance, created, *args, **kwargs):
    if created:
        # get stove_price

        print("created!!!!")
        print("instance: ", instance)
        print("instance.lme: ", instance.lme)
        month_string = instance.date_of_purchase.strftime("%B")
        print(month_string, "month string in post save")
        year_number = instance.date_of_purchase.strftime("%Y")
        print(year_number, "year number in post save")

        try:
            x = MonthlyLMESales.objects.get(
                month_string=month_string, year_number=year_number, lme=instance.lme
            )
        except Exception as e:
            print(e, "no monthly sales found")
            x = MonthlyLMESales.objects.create(lme=instance.lme, month=instance.date_of_purchase)

        print(instance.stove.name, "stove name in post save")
        if instance.stove.name == "KCJ":
            x.kcj = x.kcj + 1
        elif instance.stove.name == "JIKO_KISASA":
            x.jiko_kisasa = x.jiko_kisasa + 1

        elif instance.stove.name == "MULTIPURPOSE":
            x.multipurpose = x.multipurpose + 1
        elif instance.stove.name == "LINERS":
            x.liners = x.liners + 1
        elif instance.stove.name == "ROCKET":
            x.rocket = x.rocket + 1
        else:
            print("no stove name")

        x.save()


post_save.connect(post_save_lme_sales_create, sender=LMESales)


class MonthlyLMESales(models.Model):
    class Meta:

        verbose_name = "Monthly LME Sales"
        verbose_name_plural = "Monthly LME Sales"

    lme = models.ForeignKey(LME, on_delete=models.CASCADE)

    month = models.DateField()
    month_string = models.CharField(max_length=15, blank=True, null=True)
    year_number = models.IntegerField(blank=True, null=True)

    jiko_kisasa = models.IntegerField(default=0)
    kcj = models.IntegerField(default=0)
    multipurpose = models.IntegerField(default=0)
    liners = models.IntegerField(default=0)
    rocket = models.IntegerField(default=0)

    def __str__(self):
        return f" {self.lme.name}: {self.month_string} "

    def save(self, *args, **kwargs):
        # get month from date time
        self.month_string = self.month.strftime("%B")
        self.year_number = int(self.month.strftime("%Y"))

        print(self.month_string, "month string")
        print(self.year_number, "year number")
        super().save(*args, **kwargs)


# # A tuple of tuples. It is used to create a dropdown menu in the admin panel.
# TREE_CHOICES = (
#     ("INDIGENOUS", "Indigenous"),
#     ("EXOTIC", "Exotic"),
#     ("FRUIT_TREES", "Fruit Trees"),
# )


class TreeGrowing(models.Model):
    class Meta:
        verbose_name = "Tree Growing"
        verbose_name_plural = "Tree Growing"

    factory = models.ForeignKey(Factory, on_delete=models.CASCADE)
    partner = models.CharField(max_length=120, blank=True, null=True)
    venue = models.CharField(max_length=60, blank=True, null=True)
    trees_planted = models.IntegerField(default=0)

    date = models.DateField()
    # tree_type = models.CharField(max_length=15, choices=TREE_CHOICES)

    indigenous_trees = models.IntegerField(default=0)
    exotic_trees = models.IntegerField(default=0)
    fruit_trees = models.IntegerField(default=0)

    planting_location = gis_models.PointField(
        blank=True, null=True, help_text="click on the top right to search"
    )

    def __str__(self):
        return self.factory.name


class CustomSalesReport(models.Model):
    class Meta:
        verbose_name = "Custom Sales Report"
        verbose_name_plural = "Custom Sales Reports"

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    query_lme = models.CharField(max_length=60, blank=True, null=True)
    query_month = models.CharField(max_length=15, blank=True, null=True)
    query_year = models.IntegerField(blank=True, null=True)
    query_factory = models.CharField(max_length=50, blank=True, null=True)

    query_jiko_kisasa = models.BooleanField(default=False)
    query_kcj = models.BooleanField(default=False)
    query_multipurpose = models.BooleanField(default=False)
    query_liners = models.BooleanField(default=False)
    query_rocket = models.BooleanField(default=False)

    query_start_date = models.DateField(blank=True, null=True)
    query_end_date = models.DateField(blank=True, null=True)

    no_query_results = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.date_created.strftime("%d-%m-%Y")

    def save(self, *args, **kwargs):
        if (
            self.query_lme == ""
            and self.query_month == ""
            and self.query_year == ""
            and self.query_factory == ""
        ):
            self.no_query_results = True
        else:
            self.no_query_results = False
        super().save(*args, **kwargs)


class LessonLearnt(models.Model):
    class Meta:
        verbose_name_plural = "Lessons Learnt"

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    topic_summary = models.CharField(max_length=120, blank=True, null=True)
    message = models.TextField(blank=True, null=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # query_month = models.CharField(max_length=15, blank=True, null=True)
    # query_year = models.IntegerField(blank=True, null=True)
    # query_factory = models.CharField(max_length=50, blank=True, null=True)
