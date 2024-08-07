#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/admin.py                                       #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Saturday, May 7th 2022, 2:12:13 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )                     #
# -----                                                                          #
# Last Modified: Saturday May 7th 2022 2:12:13 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Geoffrey Nyaga Kinyua.                                               #
# -----                                                                          #
# Copyright (c) 2022 Geoffrey Nyaga Kinyua.                                          #
##################################################################################

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .forms import MyAdminPasswordChangeForm, UserAdminChangeForm, UserAdminCreationForm
from .models import User


class UserAdmin1(BaseUserAdmin):
    # The forms to add and change user instances

    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    change_password_form = MyAdminPasswordChangeForm
    change_user_password_template: str = "admin/auth/user/change_password.html"

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ("phone_number", "is_lme", "first_name", "last_name", "admin")
    list_filter = ("admin", "is_lme")
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("staff", "active", "is_lme")}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("phone_number", "password1", "password2"),
            },
        ),
    )
    search_fields = ("phone_number",)
    ordering = ("phone_number",)
    filter_horizontal = ()


admin.site.register(User, UserAdmin1)
