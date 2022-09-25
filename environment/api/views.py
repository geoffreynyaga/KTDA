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


from itertools import count

from django.db.models import Sum

from rest_framework import generics, status
from rest_framework.authentication import (
    BasicAuthentication,
    SessionAuthentication,
    TokenAuthentication,
)
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from environment.api.serializers import (
    CoachingAndMentorshipSerializer,
    LMESerializer,
    MonthlyLMEIndividualSalesSerializer,
    MonthlyLMESalesSerializer,
    StoveSerializer,
    TrainingSerializer,
    TreeActivityListGeoSerializer,
    TreeGrowingSerializer,
)
from environment.models import (
    LME,
    CoachingAndMentorship,
    CustomSalesReport,
    LMESales,
    MonthlyLMESales,
    Stove,
    Training,
    TreeGrowing,
)


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


class LMEIndividualMonthlySalesListAPIView(generics.ListAPIView):
    queryset = MonthlyLMESales.objects.all()
    serializer_class = MonthlyLMEIndividualSalesSerializer

    def get_queryset(self):
        print("heeeeey")
        lme = LME.objects.filter(owner=self.request.user).last()
        print(lme, "lme")
        return super().get_queryset().filter(lme=lme).order_by("-month")


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
                    queryset = queryset.filter(lme__factory__name__icontains=data["factory"])
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
                            end_date_datetime = datetime.strptime(x, "%Y-%m-%dT%H:%M:%S.%fZ")

                            print(e, "error 2")
                except Exception as e:
                    print(e, "error 3")

                serializer = MonthlyLMESalesSerializer(queryset, many=True)

                try:
                    x.save()
                    # print(x, "x")
                    print(x.pk, "x.pk")
                except Exception as e:
                    print(e, "error 4")

                return Response(
                    {"data": serializer.data, "report_pk": x.pk, "success": True},
                    status=status.HTTP_200_OK,
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)


class LMESalesCustomReportPDFAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [
        AllowAny,
    ]

    def get(self, args, **kwargs):

        from datetime import datetime

        try:
            id = int(self.kwargs.get("pk"))
        except Exception as e:
            print(e, "error 1")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        saved_queries = CustomSalesReport.objects.get(pk=id)

        if id:
            try:
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

                if saved_queries.query_lme:
                    queryset = queryset.filter(lme__name__icontains=saved_queries.query_lme)
                if saved_queries.query_factory:
                    queryset = queryset.filter(
                        lme__factory__name__icontains=saved_queries.query_factory
                    )
                if saved_queries.query_month:
                    queryset = queryset.filter(month_string__icontains=saved_queries.query_month)
                if saved_queries.query_year:
                    queryset = queryset.filter(year_number__icontains=saved_queries.query_year)

                # print(queryset, "queryset")

                if saved_queries.query_start_date:
                    queryset = queryset.filter(month__gte=saved_queries.query_start_date)
                    print(queryset, "queryset after datetime")

                try:
                    if saved_queries.query_end_date:
                        queryset = queryset.filter(month__lte=saved_queries.query_end_date)
                        # print(queryset, "queryset after datetime")
                except Exception as e:
                    print(e, "error 3")

                # get sum of all jiko_kisasa
                jiko_kisasa_sum = queryset.aggregate(Sum("jiko_kisasa"))["jiko_kisasa__sum"]

                # print((jiko_kisasa_sum), "jiko_kisasa_sum")
                kcj_sum = queryset.aggregate(Sum("kcj"))["kcj__sum"]
                # print(kcj_sum, "kcj_sum")
                multipurpose_sum = queryset.aggregate(Sum("multipurpose"))["multipurpose__sum"]
                # print(multipurpose_sum, "multipurpose_sum")
                liners_sum = queryset.aggregate(Sum("liners"))["liners__sum"]
                # print(liners_sum, "liners_sum")
                rocket_sum = queryset.aggregate(Sum("rocket"))["rocket__sum"]
                # print(rocket_sum, "rocket_sum")

                stove_sums = {
                    "jiko_kisasa": jiko_kisasa_sum,
                    "kcj": kcj_sum,
                    "multipurpose": multipurpose_sum,
                    "liners": liners_sum,
                    "rocket": rocket_sum,
                }

                serializer = MonthlyLMESalesSerializer(queryset, many=True)

                lme_pk = []
                factory_pk = []
                for monthly_sale in queryset:
                    lme_pk.append(monthly_sale.lme.pk)
                    factory_pk.append(monthly_sale.lme.factory.pk)
                lme_pk_set = list(set(lme_pk))
                factory_pk_set = list(set(factory_pk))
                lme_pk_set_len = len(lme_pk_set)
                factory_pk_set_len = len(factory_pk_set)
                # print(lme_pk_set_len, "lme_pk_set_len")
                # print(factory_pk_set_len, "factory_pk_set_len")

                return Response(
                    {
                        "data": serializer.data,
                        "sales_entries": queryset.count(),
                        "created_by": str(saved_queries.created_by.phone_number),
                        "stove_sums": stove_sums,
                        "lmes_number": lme_pk_set_len,
                        "factories_number": factory_pk_set_len,
                        "success": True,
                        "query_data": {
                            "query_lme": saved_queries.query_lme,
                            "query_factory": saved_queries.query_factory,
                            "query_month": saved_queries.query_month,
                            "query_year": saved_queries.query_year,
                            "query_start_date": saved_queries.query_start_date,
                            "query_end_date": saved_queries.query_end_date,
                            "query_jiko_kisasa": saved_queries.query_jiko_kisasa,
                            "query_kcj": saved_queries.query_kcj,
                            "query_multipurpose": saved_queries.query_multipurpose,
                            "query_liners": saved_queries.query_liners,
                            "query_rocket": saved_queries.query_rocket,
                        },
                    },
                    status=status.HTTP_200_OK,
                )

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)


class TreeGrowingListCreateApiView(generics.ListCreateAPIView):
    queryset = TreeGrowing.objects.all()
    serializer_class = TreeGrowingSerializer


class LMESandStovesAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [
        AllowAny,
    ]

    def get(self, args, **kwargs):

        all_stoves = Stove.objects.all()
        serialized_stoves = StoveSerializer(all_stoves, many=True).data
        # print(serialized_stoves, "serialized stoves")
        all_lmes = LME.objects.all()
        serialized_lmes = LMESerializer(all_lmes, many=True).data
        # print(serialized_lmes, "serialized_lmes")

        return Response({"lmes": serialized_lmes, "stoves": serialized_stoves})


class LMESalesCreateAPIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [
        AllowAny,
    ]

    def post(self, args, **kwargs):
        from django.utils.dateparse import parse_datetime

        data = self.request.data
        print(data, "data")
        # print(type(data), "type of data")

        """
        data_example = {
            "lme": selectedLME,
            "customerName": selectedCustomerName,
            "customerPhone": selectedCustomerPhoneNumber,
            "stovesList": [selectedStovesArray],
            "dateSold": startDate,
        }
        """
        lme = data["lme"]
        customer_name = data["customerName"]
        customer_phone = data["customerPhone"]

        date_sold = parse_datetime(data["dateSold"])
        print(date_sold)

        stoves_list = data["stovesList"]
        print(stoves_list, "stoves_list")

        # LMESales
        """
        lme
        customer_name
        customer_phone_number
        stove
        stove_price
        date_of_purchase
        """
        try:
            #
            lme_obj = LME.objects.filter(name=lme).first()
            print(lme_obj, "lme_obj")
        except Exception as e:
            print(e, "error getting LME")

        for stove_item in stoves_list:
            """
            id?: number;
            price?: number;
            name?: string;
            """

            stove_id = stove_item["id"]
            stove_price = stove_item["price"]

            try:
                if stove_item["name"] and len(stove_item["name"]) > 0:
                    stove_obj = Stove.objects.get_or_create(name=stove_item["name"])
                    print(stove_obj, "stove_obj")
            except:
                # get stove
                stove_obj = Stove.objects.get(pk=stove_id)
                print(stove_obj, "stove_obj")
            # create sale

            try:
                sale = LMESales.objects.create(
                    lme=lme_obj,
                    customer_name=customer_name,
                    customer_phone_number=customer_phone,
                    stove=stove_obj,
                    stove_price=stove_price,
                    date_of_purchase=date_sold,
                )

                print(sale, "sale")
            except Exception as e:
                print(e, "e")

        return Response(
            {"message": "Created Sale", "success": True},
            status=status.HTTP_200_OK,
        )


class TreeActivityPinsListAPIView(APIView):
    """
    List all County Boundaries
    """

    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        all_activities_qs = TreeGrowing.objects.all()

        serialized_data = TreeActivityListGeoSerializer(all_activities_qs, many=True)

        return Response(serialized_data.data)
