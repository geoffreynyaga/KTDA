from django.db import models


class Factory(models.Model):
    class Meta:
        verbose_name = "Factory"
        verbose_name_plural = "Factories"

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Retailer(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Stove(models.Model):
    name = models.CharField(max_length=50)
    retailer = models.ForeignKey(
        Retailer, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.name


class LME(models.Model):
    name = models.CharField(max_length=50)
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE)
    email = models.EmailField(max_length=254, blank=True, null=True)
    no_of_employees = models.IntegerField(blank=True, null=True)
    no_of_female_employees = models.IntegerField(default=0)
    no_of_male_employees = models.IntegerField(default=0)
    county = models.CharField(max_length=50)
    sub_county = models.CharField(max_length=50)
    ward = models.CharField(max_length=50)

    types_of_stove = models.ManyToManyField("environment.Stove")

    contact_person = models.CharField(max_length=50)
    year_of_birth = models.DateField(help_text="YYYY-MM-DD")
    phone_number = models.CharField(max_length=20, help_text="07xx xxx xxx")

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.no_of_employees = self.no_of_female_employees + self.no_of_male_employees
        super().save(*args, **kwargs)


class CoachingAndMentorship(models.Model):
    lme = models.ForeignKey(LME, on_delete=models.CASCADE)
    date = models.DateField()
    topic_covered = models.CharField(max_length=100)
    remarks_by_mentor = models.TextField()
    action_points = models.TextField()
    next_meeting_date = models.DateField()

    def __str__(self):
        return self.lme.name


class LMESales(models.Model):
    class Meta:

        verbose_name = "LME Sales"
        verbose_name_plural = "LME Sales"

    lme = models.ForeignKey(LME, on_delete=models.CASCADE)

    customer_name = models.CharField(max_length=100)

    customer_phone_number = models.CharField(max_length=100)
    stove = models.ForeignKey("environment.Stove", on_delete=models.CASCADE)
    stove_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_of_purchase = models.DateField(help_text="YYYY-MM-DD")

    def __str__(self):
        return self.customer_name
