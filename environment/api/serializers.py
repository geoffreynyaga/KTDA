#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/api/serializers.py                          #
# Project: /home/geoff/KTDA/environment/api                                      #
# Created Date: Sunday, May 15th 2022, 1:52:34 pm                                #
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


from rest_framework import serializers

from environment.models import LME, CoachingAndMentorship, LMESales
from django.db.models import Sum


class LMESerializer(serializers.ModelSerializer):
    factory = serializers.SerializerMethodField()
    all_sales = serializers.SerializerMethodField()

    def get_factory(self, obj):
        return obj.factory.name

    def get_all_sales(self, obj):
        sales = LMESales.objects.filter(lme=obj).aggregate(Sum("stove_price"))
        return sales

    class Meta:
        model = LME
        fields = "__all__"
        # fields = (
        #     "name",
        #     "factory",
        #     "county",
        #     "sub_county",
        #     "ward",
        #     "contact_person",
        #     "phone_number",
        #     "all_sales",
        # )


class CoachingAndMentorshipSerializer(serializers.ModelSerializer):
    # lme = LMESerializer(read_only=True)
    lme = serializers.SerializerMethodField()

    def get_lme(self, obj):
        return obj.lme.name

    class Meta:
        model = CoachingAndMentorship
        fields = (
            "lme",
            "date",
            "topic_covered",
            "remarks_by_mentor",
            "action_points",
            "next_meeting_date",
        )
