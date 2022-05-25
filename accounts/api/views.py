#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/api/views.py                                   #
# Project: /home/geoff/KTDA/accounts/api                                         #
# Created Date: Tuesday, May 24th 2022, 9:13:06 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 9:13:06 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django.conf import settings

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView

from rest_framework.authtoken.models import Token

from .serializers import (
    LoginSerializer,
    SignupSerializer,
)

from django.contrib.auth import (
    login as django_login,
    logout as django_logout,
    authenticate as django_authenticate,
)
from django.contrib.auth import get_user_model

User = get_user_model()

from django.core.exceptions import ValidationError
from rest_framework.authentication import TokenAuthentication

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        # print(serializer, "serializer")
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        # print(user, "user")
        django_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        # return token.key

        return Response({"token": token.key}, status=200)


class SignUpAPIView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []
    serializer_class = SignupSerializer

    def post(self, request):
        # print(request.data,"this is signup request.data")
        serializer = SignupSerializer(data=request.data)

        # print(serializer,"serializer")

        if serializer.is_valid():
            phone_number = request.data["phone_number"]
            print(phone_number, "this should be the create phone_number")

            password = request.data["password"]
            print(password, "this should be the create password")

            try:
                user_obj = User(phone_number=phone_number)
                user_obj.set_password(password)

                print(user_obj, "this should be the create user_obj")

                user_obj.save()
                return Response(
                    {
                        "Response_Code": 0,
                        "ResultDesc": "Initial registration successful",
                    },
                    status=200,
                )

            except:
                print("cannot create user")
                return Response(
                    {"Response_Code": 2, "ResultDesc": "Cannot create user"}, status=200
                )

        else:
            print("error in signup")
            return Response(data=serializer.errors, status=200)
