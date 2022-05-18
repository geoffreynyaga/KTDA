#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/urls.py                                     #
# Project: /home/geoff/KTDA/environment                                          #
# Created Date: Saturday, May 7th 2022, 8:34:25 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday May 7th 2022 8:34:25 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django.urls import path
from environment.views import (
    CapacityBuildingAddView,
    CapacityBuildingIndividualAddView,
    LMEAddView,
    LMEMainView,
    LMESalesAddView,
    SalesCreateView,
    SalesListView,
    LMECreateView,
)

urlpatterns = [
    path("lme/", LMEMainView.as_view(), name="LMEMain"),
    # path("lme/add/", LMEAddView.as_view(), name="add_lme"),
    path("lme/create/", LMECreateView.as_view(), name="lme_create"),
    # path("lme/sales/add/", LMESalesAddView.as_view(), name="sales_add_lme"),
    path("lme/sales/create/", SalesCreateView.as_view(), name="lme_sales_create"),
    path("lme/sales/list/", SalesListView.as_view(), name="sales_list_lme"),
    path(
        "lme/capacity/individual-add/",
        CapacityBuildingIndividualAddView.as_view(),
        name="add_individual_capacity_building",
    ),
    path(
        "lme/capacity/add/",
        CapacityBuildingAddView.as_view(),
        name="add_capacity_building",
    ),
]
