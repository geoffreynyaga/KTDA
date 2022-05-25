#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/api/serializers.py                             #
# Project: /home/geoff/KTDA/accounts/api                                         #
# Created Date: Tuesday, May 24th 2022, 9:11:58 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:11:58 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

from phonenumber_field.serializerfields import PhoneNumberField

from django.core.exceptions import ValidationError


class LoginSerializer(serializers.Serializer):

    phone_number = PhoneNumberField()
    password = serializers.CharField()

    def validate(self, data):

        # print(data, "this is data")

        """
        # print(data, "this is data")
        OrderedDict(
            [
                ('phone_number', PhoneNumber(country_code=254,
                                national_number=718821114,
                                 extension=None,
                                  italian_leading_zero=None,
                                   number_of_leading_zeros=None,
                                   country_code_source=1,
                                   preferred_domestic_carrier_code=None
                            )
                ),
                ('password', 'mypassword'
                )
            ]
            ) this is data
        """
        phone_number = data.get("phone_number", "")
        password = data.get("password", "")

        if phone_number and password:
            user = authenticate(phone_number=phone_number, password=password)

            if user:
                if user.is_active:
                    data["user"] = user

                else:
                    msg = "user is deactivated"
                    raise exceptions.ValidationError(msg)

            else:
                msg = "Unable to login with the given phone and password"
                data["err1"] = msg
                raise exceptions.ValidationError(msg)

        else:
            msg = "You must provide both Phone and Password"
            data["err1"] = msg
            raise exceptions.ValidationError(msg)

        return data


class SignupSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()

    class Meta:
        model = User
        fields = ["phone_number", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_phone_number(self, value):

        phone_number = str(value)
        # str because it comes in a a PhoneNumberField class

        # URGENT : add phone number verification as well(safaricom)
        # No need to check e164 standard, serializer field already does that
        # FIXED:
        from mpesa.phone import phone_number_conversions

        try:
            x = phone_number_conversions.check_phone_number_carrier_name(phone_number)
            print(x, "should be saf")
            print(type(x), "should be saf")
            print(x == "Safaricom", "should be false")
            print(x != "Safaricom", "should be true")

            if x != "Safaricom":
                print(f"number is not safaricom but {x}")
                raise ValidationError(f"We do not accept {x} numbers, only Safaricom")
            else:
                print(f"number is  safaricom <> {x}")
                pass

        except:
            raise ValidationError(f"We do not accept {x} numbers, only Safaricom")

        user_qs = User.objects.filter(phone_number=phone_number)  # why not get?
        # user_obj = User.objects.get(phone_number=phone_number)  # why not get?

        # if user_qs.exists():
        #     # check if active. If Active return the error below else proceed to return phone_number

        #     raise ValidationError("This phone number has already been registered.")
        # else:
        #     return phone_number

        if user_qs.exists():
            # check if active. If Active return the error below else proceed to return phone_number
            if user_qs.count() > 1:
                raise ValidationError(
                    "Internal Error, kindly contact us to resolve this"
                )
            elif user_qs.count() == 1:
                print("sweet spot")
                user = user_qs[0]
                print(user, "should be the single user")
                if user.is_active == False:
                    print("user is registered but not confirmed")
                    return phone_number
                else:
                    raise ValidationError(
                        "This phone number has already been registered."
                    )
            else:
                print("user count is zero")
                return phone_number
        else:
            return phone_number


class UserPushNotificationTokenCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPushNotificationsToken
        fields = ("token", "user")

    # def create(self, validated_data):
    #     token_obj = UserPushNotificationsToken.objects.update_or_create(
    #         user=validated_data.get("user", None),
    #         defaults={"token": validated_data.get("token", None)},
    #     )
    #     token_obj.save()
    #     return validated_data


class UserDetailSerializer(serializers.ModelSerializer):

    full_name = serializers.ReadOnlyField(source="get_full_name")

    class Meta:
        model = User
        fields = ("id", "phone_number", "full_name", "first_name", "last_name")


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    profile_pic_thumbnail = serializers.SerializerMethodField()

    def get_profile_pic_thumbnail(self, instance):
        request = self.context.get("request")
        if instance.profile_pic_thumbnail:
            return request.build_absolute_uri(instance.get_user_profile_pic_thumbnail())
        else:
            return None

    # def get_profile_pic_thumbnail(self, userprofile: UserProfile): #works btw
    #     return userprofile.profile_pic_thumbnail.url

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "user",
            "status",
            "profile_pic",
            "profile_pic_thumbnail",
            "id_number",
        )
