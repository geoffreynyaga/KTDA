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

from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)
from rest_framework.authentication import (
    TokenAuthentication,
    SessionAuthentication,
    BasicAuthentication,
)
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
    CustomSalesReport,
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


class LMESalesCustomReportAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [
        AllowAny,
    ]

    def post(self, args, **kwargs):

        from datetime import datetime

        data = self.request.data
        print(data, "data")
        # print(type(data), "type of data")

        data_example = {
            "lme": "sam",
            "factory": "kan",
            "month": "",
            "year": "",
            "jikoSasa": True,
            "liners": True,
            "multiPurpose": True,
            "kcj": True,
            "rocket": True,
            "startDate": "2022-04-30T21:00:00.000Z",
            "endDate": "2022-05-21T21:14:36.386Z",
        }

        # we need to return a pk of generated report class instance
        fields = (
            "created_by",
            "query_lme",
            "query_month",
            "query_year",
            "query_factory",
            "query_jiko_kisasa",
            "query_kcj",
            "query_multipurpose",
            "query_liners",
            "query_rocket",
            "query_start_date",
            "query_end_date",
        )

        x = CustomSalesReport(
            created_by=self.request.user,
            query_lme=data["lme"],
            query_month=data["month"],
            query_year=int(data["year"]) if data["year"] else None,
            query_factory=data["factory"],
            query_jiko_kisasa=data["jikoSasa"],
            query_kcj=data["kcj"],
            query_multipurpose=data["multiPurpose"],
            query_liners=data["liners"],
            query_rocket=data["rocket"],
        )

        if data:
            try:
                # queryset = MonthlyLMESales.objects.filter(
                #     month__gte=data["start_date"], month__lte=data["end_date"]
                # )
                queryset = MonthlyLMESales.objects.all()

                sales_fields = (
                    "lme",
                    "month",
                    "month_string",
                    "year_number",
                    "jiko_kisasa",
                    "kcj",
                    "multipurpose",
                    "liners",
                    "rocket",
                )

                if data["lme"]:
                    queryset = queryset.filter(lme__name__icontains=data["lme"])
                if data["factory"]:
                    queryset = queryset.filter(
                        lme__factory__name__icontains=data["factory"]
                    )
                if data["month"]:
                    queryset = queryset.filter(month_string__icontains=data["month"])
                if data["year"]:
                    queryset = queryset.filter(year_number__icontains=int(data["year"]))

                print(queryset, "queryset")

                if data["startDate"]:
                    start_date_string = data["startDate"]
                    print(start_date_string, "start_date_string")

                    # 2022-04-30T21:00:00.000Z
                    # convert to datetime

                    try:
                        start_date_datetime = datetime.strptime(
                            start_date_string, "%Y-%m-%dT%H:%M:%S.%fZ"
                        )
                        print(start_date_datetime, "start_date_datetime")
                        print(type(start_date_datetime), "type start_date_datetime")

                        if start_date_datetime:
                            x.query_start_date = start_date_datetime
                            queryset = queryset.filter(month__gte=start_date_datetime)
                            print(queryset, "queryset after datetime")

                    except Exception as e:
                        print(e, "error 2")

                try:
                    if data["endDate"]:
                        end_date_string = data["endDate"]
                        print(end_date_string, "end_date_string")

                        # 2022-04-30T21:00:00.000Z
                        # convert to datetime

                        try:
                            end_date_datetime = datetime.strptime(
                                end_date_string, "%Y-%m-%dT%H:%M:%S.%fZ"
                            )
                            print(end_date_datetime, "end_date_datetime")
                            print(type(end_date_datetime), "type end_date_datetime")

                            if end_date_datetime:
                                x.query_end_date = end_date_datetime
                                queryset = queryset.filter(month__lte=end_date_datetime)
                                print(queryset, "queryset after datetime")

                        except Exception as e:
                            x = "2022-05-21T21:14:36.386Z"
                            end_date_datetime = datetime.strptime(
                                x, "%Y-%m-%dT%H:%M:%S.%fZ"
                            )

                            print(e, "error 2")
                except Exception as e:
                    print(e, "error 3")

                serializer = MonthlyLMESalesSerializer(queryset, many=True)

                try:
                    x.save()
                    print(x, "x")
                    print(x.pk, "x.pk")
                except Exception as e:
                    print(e, "error 4")

                return Response(
                    {"data": serializer.data, "success": True},
                    status=status.HTTP_200_OK,
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST
            )


class TreeGrowingListCreateApiView(generics.ListCreateAPIView):
    queryset = TreeGrowing.objects.all()
    serializer_class = TreeGrowingSerializer
