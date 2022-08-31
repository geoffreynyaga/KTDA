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
    CoachingAndMentorshipCreateApiView,
    LMEIndividualMonthlySalesListAPIView,
    LMEListCreateApiView,
    LMESalesCreateAPIView,
    LMESalesCustomReportAPIView,
    LMESalesCustomReportPDFAPIView,
    LMESalesListAPIView,
    LMESandStovesAPIView,
    TrainingListCreateApiView,
    TreeGrowingListCreateApiView,
)

urlpatterns = [
    path("lme/", LMEListCreateApiView.as_view(), name="lme-list-create-api"),
    path("lme/sales/list/", LMESalesListAPIView.as_view(), name="lme-sales-list-api"),
    path("lme/sales/lmeandstoves/", LMESandStovesAPIView.as_view(), name="lme-and-stoves-api"),
    path("lme/sales/create/", LMESalesCreateAPIView.as_view(), name="lme-create-api"),
    path(
        "lme/sales/list/individual/",
        LMEIndividualMonthlySalesListAPIView.as_view(),
        name="lme-sales-individual-api",
    ),
    path(
        "lme/sales/report/",
        LMESalesCustomReportAPIView.as_view(),
        name="lme-sales-report-api",
    ),
    path(
        "lme/sales/report/<int:pk>/",
        LMESalesCustomReportPDFAPIView.as_view(),
        name="lme-sales-report-pdf-api",
    ),
    path(
        "training/",
        TrainingListCreateApiView.as_view(),
        name="cnm-sales-list-api",
    ),
    path(
        "cnm/",
        CoachingAndMentorshipCreateApiView.as_view(),
        name="cnm-create",
    ),
    path(
        "tree-growing/",
        TreeGrowingListCreateApiView.as_view(),
        name="tree-growing-list-create-api",
    ),
]
