#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/urls.py                                        #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Tuesday, May 24th 2022, 9:10:34 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:10:34 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


from django.urls import include, path, re_path


from .views import SignUp, LoginView, logout_view, PasswordResetView

urlpatterns = [
    re_path(r"^signup/$", SignUp.as_view(), name="signup"),
    re_path(r"^login/$", LoginView.as_view(), name="login"),
    re_path(r"^logout/$", logout_view, name="logout"),
    re_path(r"^password-reset/$", PasswordResetView.as_view(), name="password_reset"),
]
