#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/api/urls.py                                    #
# Project: /home/geoff/KTDA/accounts/api                                         #
# Created Date: Tuesday, May 24th 2022, 9:12:34 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:12:34 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Geoffrey Nyaga Kinyua.                                               #
# -----                                                                          #
# Copyright (c) 2022 Geoffrey Nyaga Kinyua.                                          #
##################################################################################

from django.conf.urls import url

from .views import (
    LoginAPIView,
    SignUpAPIView,
)

urlpatterns = [
    url(r"^login/$", LoginAPIView.as_view(), name="login_api"),
    url(r"^signup/$", SignUpAPIView.as_view(), name="signup_api"),
]
