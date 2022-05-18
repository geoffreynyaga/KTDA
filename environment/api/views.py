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

from environment.api.serializers import CoachingAndMentorshipSerializer, LMESerializer
from environment.models import LME, CoachingAndMentorship


class CoachingAndMentorshipListCreateApiView(generics.ListCreateAPIView):
    queryset = CoachingAndMentorship.objects.all()
    serializer_class = CoachingAndMentorshipSerializer


class LMEListCreateApiView(generics.ListCreateAPIView):
    queryset = LME.objects.all()
    serializer_class = LMESerializer
