#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/api/views.py                                #
# Project: /home/geoff/KTDA/environment/api                                      #
# Created Date: Sunday, May 15th 2022, 1:52:41 pm                                #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Sunday May 15th 2022 2:00:39 pm                                 #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from environment.api.serializers import (
    TrainingSerializer,
    CoachingAndMentorshipSerializer,
    LMESerializer,
    MonthlyLMESalesSerializer,
    TreeGrowingSerializer,
)
from environment.models import (
    LME,
    CoachingAndMentorship,
    Training,
    LMESales,
    MonthlyLMESales,
    TreeGrowing,
)


from django.db.models import Sum


class TrainingListCreateApiView(generics.ListCreateAPIView):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer


class CoachingAndMentorshipCreateApiView(generics.ListCreateAPIView):
    queryset = CoachingAndMentorship.objects.all()
    serializer_class = CoachingAndMentorshipSerializer


class LMEListCreateApiView(generics.ListCreateAPIView):
    queryset = LME.objects.all()
    serializer_class = LMESerializer


class LMESalesListAPIView(generics.ListCreateAPIView):
    queryset = MonthlyLMESales.objects.all()
    serializer_class = MonthlyLMESalesSerializer

    def get_queryset(self):
        return super().get_queryset().order_by("-month")


class TreeGrowingListCreateApiView(generics.ListCreateAPIView):
    queryset = TreeGrowing.objects.all()
    serializer_class = TreeGrowingSerializer
