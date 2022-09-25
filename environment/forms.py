#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/forms.py                                    #
# Project: /home/geoff/KTDA/environment                                          #
# Created Date: Wednesday, May 18th 2022, 5:46:32 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Wednesday May 18th 2022 5:46:32 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django import forms

from leaflet.forms.widgets import LeafletWidget

from environment.models import (
    LME,
    CoachingAndMentorship,
    LMESales,
    Training,
    TreeGrowing,
)


class DatePickerInput(forms.DateInput):
    input_type = "date"
    format = "%Y-%m-%d"


class LMESalesForm(forms.ModelForm):
    class Meta:
        model = LMESales

        fields = (
            "lme",
            "customer_name",
            "customer_phone_number",
            "stove",
            "stove_price",
            "date_of_purchase",
        )

        from environment.models import STOVE_NAMES

        widgets = {
            "stove": forms.RadioSelect(
                choices=STOVE_NAMES,
                attrs={"class": "form-control"},
            ),
            "date_of_purchase": DatePickerInput(),
        }


class LMEIndividualSalesForm(forms.ModelForm):
    class Meta:
        model = LMESales

        fields = (
            # "lme",
            "customer_name",
            "customer_phone_number",
            "stove",
            "stove_price",
            "date_of_purchase",
        )

        from environment.models import STOVE_NAMES

        widgets = {
            "stove": forms.RadioSelect(
                choices=STOVE_NAMES,
                attrs={"class": "form-control"},
            ),
            "date_of_purchase": DatePickerInput(),
        }


class TrainingForm(forms.ModelForm):
    class Meta:
        model = Training

        # Representing the many to many related field in Pizza
        # lme_attendees = forms.ModelMultipleChoiceField(queryset=LME.objects.all())
        lme_attendees = forms.ModelMultipleChoiceField(
            queryset=LME.objects.all(),
            widget=forms.CheckboxSelectMultiple(attrs={"class": "form-check-inline"}),
        )
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

        widgets = {
            # "lme_attendees": forms.CheckboxSelectMultiple(
            #     attrs={"class": "form-control"},
            # ),
            "start_date": DatePickerInput(),
            "end_date": DatePickerInput(),
        }

    # # Overriding __init__ here allows us to provide initial
    # # data for 'toppings' field
    # def __init__(self, *args, **kwargs):
    #     # Only in case we build the form from an instance
    #     # (otherwise, 'toppings' list should be empty)
    #     if kwargs.get("instance"):
    #         # We get the 'initial' keyword argument or initialize it
    #         # as a dict if it didn't exist.
    #         initial = kwargs.setdefault("initial", {})
    #         # The widget for a ModelMultipleChoiceField expects
    #         # a list of primary key for the selected data.
    #         initial["lme_attendees"] = [t.pk for t in kwargs["instance"].lme_set.all()]

    #     forms.ModelForm.__init__(self, *args, **kwargs)

    #     # Overriding save allows us to process the value of 'toppings' field
    #     def save(self, commit=True):
    #         # Get the unsave Pizza instance
    #         instance = forms.ModelForm.save(self, False)

    #         # Prepare a 'save_m2m' method for the form,
    #         old_save_m2m = self.save_m2m

    #         def save_m2m():
    #             # old_save_m2m()
    #             # This is where we actually link the pizza with toppings
    #             instance.lme_set.clear()
    #             instance.lme_set.add(*self.cleaned_data["toppings"])

    #         self.save_m2m = save_m2m

    #         # Do we need to save all changes now?
    #         if commit:
    #             instance.save()
    #             self.save_m2m()

    #         return instance


class CoachingAndMentorshipForm(forms.ModelForm):
    class Meta:
        model = CoachingAndMentorship

        fields = (
            "lme",
            "topic_covered",
            "date",
            "next_meeting_date",
            "remarks_by_mentor",
            "action_points",
        )

        widgets = {
            # "lme_attendees": forms.CheckboxSelectMultiple(
            #     attrs={"class": "form-control"},
            # ),
            "date": DatePickerInput(),
            "next_meeting_date": DatePickerInput(),
        }


class TreeGrowingForm(forms.ModelForm):
    class Meta:
        model = TreeGrowing

        fields = (
            "factory",
            "partner",
            "venue",
            "trees_planted",
            "date",
            "indigenous_trees",
            "exotic_trees",
            "fruit_trees",
            "planting_location",
        )

        widgets = {"date": DatePickerInput(), "planting_location": LeafletWidget()}
