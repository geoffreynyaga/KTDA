#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/api/urls.py                                 #
# Project: /home/geoff/KTDA/environment/api                                      #
# Created Date: Sunday, May 15th 2022, 1:52:49 pm                                #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Sunday May 15th 2022 1:52:49 pm                                 #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django.urls import path
from environment.api.views import (
    CoachingAndMentorshipListCreateApiView,
    LMEListCreateApiView,
)


urlpatterns = [
    path("lme/", LMEListCreateApiView.as_view(), name="lme-list-create-api"),
    path(
        "cnm/",
        CoachingAndMentorshipListCreateApiView.as_view(),
        name="cnm-list-create-api",
    ),
]
