from django.db import models

# Create your models here.

from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models.signals import post_save
from django.dispatch import receiver

from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None):
        """
        Creates and saves a User with the given phone_number and password.
        """
        if not phone_number:
            raise ValueError("Users must have an phone_number ")

        # user = self.model(
        #     email=self.normalize_email(email),
        # )

        user = self.model(phone_number=phone_number)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, phone_number, password):
        """
        Creates and saves a staff user with the given phone_number and password.
        """
        user = self.create_user(phone_number, password=password)
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password):
        """
        Creates and saves a superuser with the given phone_number and password.
        """
        user = self.create_user(phone_number, password=password)
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    phone_number = PhoneNumberField(unique=True)

    email = models.EmailField(
        verbose_name="email address", max_length=255, blank=True, null=True
    )
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)

    is_lme = models.BooleanField(default=False)

    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser
    # notice the absence of a "Password field", that's built in.

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS: list = []  # phone_number & Password are required by default.

    def get_full_name(self):
        # The user is identified by their phone_number address
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name and not self.last_name:
            return f"{self.first_name}"
        elif self.last_name and not self.first_name:
            return f"{self.last_name}"
        else:
            return str(self.phone_number)

    def get_short_name(self):
        # The user is identified by their phone_number
        if self.first_name and self.last_name:
            return f"{self.first_name}"
        elif self.first_name and not self.last_name:
            return f"{self.first_name}"
        elif self.last_name and not self.first_name:
            return f"{self.last_name}"
        else:
            return str(self.phone_number)

    def __str__(self):  # __unicode__ on Python 2
        # NOTE: Never change this as it is used in prompt_for_payment as an input
        return str(self.phone_number)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active

    @property
    def is_lme_member(self):
        "Is the user a lme member?"
        return self.is_lme

    objects = UserManager()
