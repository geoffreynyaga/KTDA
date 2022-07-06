#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/forms.py                                       #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Tuesday, May 24th 2022, 9:07:52 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:07:52 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from click import password_option
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField, AdminPasswordChangeForm

from django.core.validators import RegexValidator
from pkg_resources import require

from environment.models import LME
from phonenumber_field.formfields import PhoneNumberField


from .models import User


class LoginForm(forms.Form):

    # get user field
    phone_number = PhoneNumberField(
        initial="+254",
        help_text="Enter your phone number in +254",
        required=True,
    )
    password = forms.CharField(
        help_text="Enter your new password",
        widget=forms.PasswordInput,
        required=True,
    )

    # class Meta:
    #     model = User
    #     fields = ("phone_number", "password")

    def clean_phone_number(self):
        # print("in clean phone number")
        phone_number = self.cleaned_data.get("phone_number")
        qs = User.objects.filter(phone_number=phone_number)

        # print(qs, "qs")
        if qs.exists():
            print("qs exists")

        if not qs.exists():
            raise forms.ValidationError("This Phone Number is not registered")

        return phone_number

    def clean_password(self):
        print("in clean password")
        phone_number = self.cleaned_data.get("phone_number")
        password = self.cleaned_data.get("password")
        qs = User.objects.filter(phone_number=phone_number)

        print(qs, "qs")
        if qs.exists():
            print("qs exists")

        if qs.count() == 1 and self.cleaned_data.get("password"):
            print("in clean phone number and password")
            from django.contrib.auth import authenticate, login, logout

            try:
                user = authenticate(
                    phone_number=self.cleaned_data["phone_number"],
                    password=self.cleaned_data["password"],
                )
                print(user, "user")
                if user is None:
                    raise forms.ValidationError("Invalid  Password")
            except Exception as e:
                print(e)
                raise forms.ValidationError("Invalid Phone Number or Password")
        else:
            pass
        return password

    def save(self, commit=False):
        print("in save")
        user = super(LoginForm, self).save(commit=False)
        print(user, "we are here")
        # login the user
        from django.contrib.auth import authenticate, login, logout

        try:
            user = authenticate(
                phone_number=self.cleaned_data["phone_number"],
                password=self.cleaned_data["password"],
            )
            print(user, "user")

        except Exception as e:
            print(e)

        print(user, "user")
        if user is not None:
            if user.is_active:
                login(self.request, user)
        return user


class UserAdminCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    phone_number = forms.CharField(max_length=13, initial="+254")
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = ("phone_number",)

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format

        user = super(UserAdminCreationForm, self).save(commit=False)
        print(dir(user), "uer")
        user.phone_number = self.cleaned_data["phone_number"]
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()

            # create a new LME
            # check if LME with phone number exists
            lme_qs = LME.objects.filter(phone_number=user.phone_number)
            print(lme_qs, "any LME with phone number")
            if lme_qs.count() == 1:
                lme = lme_qs.first()
                lme.owner = user
                lme.save()
                user.is_lme = True
                user.save()
        return user


class MyAdminPasswordChangeForm(AdminPasswordChangeForm):
    def save(self, commit=True):
        """
        Saves the new password.
        """
        password = self.cleaned_data["password1"]
        self.user.set_password(password)
        if commit:
            self.user.save()
        return self.user


class UserAdminChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """

    password = ReadOnlyPasswordHashField()

    # # password reset
    # new_password1 = forms.CharField(label="New password", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ("phone_number", "password", "active", "admin")

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]


class PasswordResetForm(forms.Form):

    # get user field
    phone_number = PhoneNumberField(
        initial="+254",
        help_text="Enter your phone number in +254",
        required=True,
    )
    password = forms.CharField(
        help_text="Enter your new password",
        widget=forms.PasswordInput,
        required=True,
    )

    def clean_phone_number(self):
        print("in save...")
        phone_number = self.cleaned_data.get("phone_number")
        qs = User.objects.filter(phone_number=phone_number)

        if not qs.exists():
            raise forms.ValidationError("This Phone Number is not registered")
        return phone_number

    def save(self, commit=False):
        print("in save method")
        user = super(PasswordResetForm, self).save(commit=False)
        # print(user, "we are here")
        # login the user

        # >>> from django.contrib.auth.models import User
        # >>> u = User.objects.get(username='john')
        # >>> u.set_password('new password')
        # >>> u.save()

        # try:
        #     user = User.objects.get(phone_number=self.cleaned_data.get("phone_number"))
        #     user.set_password(self.cleaned_data.get("password"))
        #     user.save()

        # except Exception as e:
        #     print(e)

        return user
