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
    CapacityBuildingIndividualAddView,
    CoachingAndMentorshipCreateView,
    LessonLearntCreateView,
    LessonLearntListView,
    LMECreateView,
    LMEDetailView,
    LMEIndividualCNMListView,
    LMEIndividualSalesCreateView,
    LMEIndividualTrainingListView,
    LMEMainView,
    SalesCreateView,
    TrainingCreateView,
    TreeGrowingCreateView,
    TreeGrowingMainView,
)

urlpatterns = [
    path("lme/", LMEMainView.as_view(), name="LMEMain"),
    # path("lme/add/", LMEAddView.as_view(), name="add_lme"),
    path("lme/create/", LMECreateView.as_view(), name="lme_create"),
    path("lme/<str:slug>/", LMEDetailView.as_view(), name="lme-detail"),
    path("lme/sales/create/", SalesCreateView.as_view(), name="lme_sales_create"),
    path(
        "lme/sales/individual/create/",
        LMEIndividualSalesCreateView.as_view(),
        name="lme_sales_individual_create",
    ),
    path(
        "lme/training/individual/",
        LMEIndividualTrainingListView.as_view(),
        name="lme_training_individual_list",
    ),
    path(
        "lme/cnm/individual/",
        LMEIndividualCNMListView.as_view(),
        name="lme_cnm_individual_list",
    ),
    # path("lme/sales/list/", SalesListView.as_view(), name="sales_list_lme"),
    path(
        "lme/capacity/individual-add/",
        CapacityBuildingIndividualAddView.as_view(),
        name="add_individual_capacity_building",
    ),
    path(
        "cnm/create/",
        CoachingAndMentorshipCreateView.as_view(),
        name="add_capacity_building",
    ),
    path(
        "training/create/",
        TrainingCreateView.as_view(),
        name="cnm_create",
    ),
    path(
        "tree-growing/",
        TreeGrowingMainView.as_view(),
        name="tree_growing_main",
    ),
    path(
        "tree-growing/create/",
        TreeGrowingCreateView.as_view(),
        name="tree_growing_create",
    ),
    path(
        "lessons/",
        LessonLearntListView.as_view(),
        name="lessons_list",
    ),
    path(
        "lessons/create/",
        LessonLearntCreateView.as_view(),
        name="lessons_create",
    ),
]
