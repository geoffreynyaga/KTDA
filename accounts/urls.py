#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/urls.py                                        #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Tuesday, May 24th 2022, 9:10:34 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:10:34 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Geoffrey Nyaga Kinyua.                                               #
# -----                                                                          #
# Copyright (c) 2022 Geoffrey Nyaga Kinyua.                                          #
##################################################################################


from django.urls import include, path, re_path

from .views import LoginView, PasswordResetView, ProfileEdit, SignUp, logout_view

urlpatterns = [
    re_path(r"^signup/$", SignUp.as_view(), name="signup"),
    path("profile/edit/<int:pk>/", ProfileEdit.as_view(), name="profile_edit"),
    re_path(r"^login/$", LoginView.as_view(), name="login"),
    re_path(r"^logout/$", logout_view, name="logout"),
    re_path(r"^password-reset/$", PasswordResetView.as_view(), name="password_reset"),
]
