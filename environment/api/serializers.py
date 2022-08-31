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


from django.db.models import Sum

from rest_framework import serializers

from environment.models import (
    LME,
    CoachingAndMentorship,
    LMESales,
    MonthlyLMESales,
    Stove,
    Training,
    TreeGrowing,
)


class StoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stove
        fields = ("id","name")

class LMESerializer(serializers.ModelSerializer):
    factory = serializers.SerializerMethodField()
    all_sales = serializers.SerializerMethodField()

    def get_factory(self, obj):
        # print(obj,"obj")
        return obj.factory.name
        # if obj.factory:
        #     return obj.factory.name 
        # else:
        #     return"None"

    def get_all_sales(self, obj):
        sales = LMESales.objects.filter(lme=obj).aggregate(Sum("stove_price"))
        return sales

    class Meta:
        model = LME
        fields = "__all__"


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


class TrainingSerializer(serializers.ModelSerializer):
    factory = serializers.SerializerMethodField()

    def get_factory(self, obj):
        return obj.factory.name

    class Meta:
        model = Training
        fields = (
            "course_name",
            "factory",
            "venue",
            "lme_attendees",
            "start_date",
            "end_date",
            "number_of_attendees",
            "number_of_female_attendees",
            "number_of_male_attendees",
            "number_below_20",
            "number_20_29",
            "number_30_39",
            "number_40_49",
            "number_50_59",
            "number_60_69",
            "number_70_79",
            "number_80_above",
        )


class MonthlyLMESalesSerializer(serializers.ModelSerializer):
    factory = serializers.SerializerMethodField()
    lme = serializers.SerializerMethodField()

    def get_factory(self, obj):
        return obj.lme.factory.name

    def get_lme(self, obj):
        return obj.lme.name

    class Meta:
        model = MonthlyLMESales
        # fields = "__all__"
        fields = (
            "lme",
            "factory",
            "month",
            "month_string",
            "year_number",
            "jiko_kisasa",
            "kcj",
            "multipurpose",
            "liners",
            "rocket",
        )


class MonthlyLMEIndividualSalesSerializer(serializers.ModelSerializer):
    # factory = serializers.SerializerMethodField()
    # lme = serializers.SerializerMethodField()

    # def get_factory(self, obj):
    #     return obj.lme.factory.name

    # def get_lme(self, obj):
    #     return obj.lme.name

    class Meta:
        model = MonthlyLMESales
        # fields = "__all__"
        fields = (
            # "lme",
            # "factory",
            "month",
            "month_string",
            "year_number",
            "jiko_kisasa",
            "kcj",
            "multipurpose",
            "liners",
            "rocket",
        )


# ('lme', 'month', 'month_string', 'year_number', 'jiko_kisasa', 'kcj', 'multipurpose', 'liners', 'rocket', )
# Factory,LME,ContactPerson,PhoneNumber, --->Search
# Factory,LME,Month, Year, Jiko sasa.... ,


class TreeGrowingSerializer(serializers.ModelSerializer):
    factory = serializers.SerializerMethodField()

    def get_factory(self, obj):
        return obj.factory.name

    class Meta:
        model = TreeGrowing
        fields = "__all__"
