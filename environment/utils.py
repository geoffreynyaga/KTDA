#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/utils.py                                    #
# Project: /home/geoff/KTDA/environment                                          #
# Created Date: Friday, May 20th 2022, 4:24:01 pm                                #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Friday May 20th 2022 4:24:01 pm                                 #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

import csv


from environment.models import (
    LME,
    Factory,
    Region,
    SubCounty,
    Ward,
    Zone,
    County,
)


def save_factories_from_csv(file_path, command_str=""):

    print("Reading CSV file: {}".format(file_path))

    # read csv file
    with open(file_path, "r") as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=",")
        # skip header
        next(csv_reader)
        # iterate over rows

        for row in csv_reader:
            # create new account

            factory = row[3].strip()
            print(f"=============={factory}===============")
            print("Processing factory: {}".format(factory))
            # print(row)
            # print(f"=============={count}- {farmer_name}===============")

            region = row[0].strip()
            zone = row[1].strip()
            county = row[2].strip()

            try:
                county_object = County.objects.get(county=county)
                print(county_object, "county_object")
            except County.DoesNotExist:
                print("County does not exist")
                county_object = County.objects.create(county=county)

            try:
                zone_object = Zone.objects.get(zone=zone)
                print(zone_object, "zone_object")
            except Zone.DoesNotExist:
                print("Zone does not exist")
                zone_object = Zone.objects.create(zone=zone)

            try:
                region_object = Region.objects.get(region=region)
                print(region_object, "region_object")
            except Region.DoesNotExist:
                print("Region does not exist")
                region_object = Region.objects.create(region=region)

            try:
                print("we are here")
                factory_object = Factory.objects.filter(
                    name=factory,
                    region=region_object,
                    zone=zone_object,
                    county=county_object,
                ).last()

                print(factory_object, "factory_object")

                if factory_object:
                    print("factory_object exists")
                    # update factory
                    factory_object.name = factory
                    factory_object.region = region_object
                    factory_object.zone = zone_object
                    factory_object.county = county_object
                    factory_object.save()
                else:
                    factory = Factory(
                        name=factory,
                        region=region_object,
                        zone=zone_object,
                        county=county_object,
                    )
                    factory.save()

            except Exception as e:
                print(e, "error saving")


def save_LMEs_from_csv(file_path, command_str=""):

    print("Reading CSV file: {}".format(file_path))

    # read csv file
    with open(file_path, "r") as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=",")
        # skip header
        next(csv_reader)
        # iterate over rows

        for row in csv_reader:

            # Organization Name
            # 1.Factory
            # 2.Cluster
            # 3.County
            # 4.SubCounty
            # 5.Ward
            # 6.Entreprise Name/LME Name
            # 7.Contact person
            # 8.PhoneNumber
            # 9.Email
            # 10.Total membership(if group) & Employees ( if individual)
            # 11.# of male
            # 12.# of females

            factory = row[1].strip()
            # cluster = row[2].strip()
            county = row[3].strip()
            sub_county = row[4].strip()
            ward = row[5].strip()
            lme_name = row[6].strip()
            contact_person = row[7].strip()
            phone_number = row[8].strip()
            email = row[9].strip()
            employees = row[10].strip()
            male_employees = row[11].strip()
            female_employees = row[12].strip()

            print(f"=============={factory}===============")
            print("Processing factory: {}".format(factory))
            # print(row)
            # print(f"=============={count}- {farmer_name}===============")

            county_obj = County.objects.filter(county=county).last()
            if not county_obj:
                county_obj = County.objects.create(county=county)
                print(county_obj, "county_obj")

            sub_county_obj = SubCounty.objects.filter(sub_county=sub_county).last()
            if not sub_county_obj:
                sub_county_obj = SubCounty.objects.create(
                    sub_county=sub_county, county=county_obj
                )
                print(sub_county_obj, "sub_county_obj")

            ward_obj = Ward.objects.filter(ward=ward).last()
            if not ward_obj:
                ward_obj = Ward.objects.create(ward=ward, sub_county=sub_county_obj)
                print(ward_obj, "ward_obj")

            factory_obj = Factory.objects.filter(name=factory).last()
            print(factory_obj, "factory_obj")

            if not factory_obj:
                print("Factory does not exist")
                factory_obj = Factory.objects.create(name=factory, county=county_obj)
                print(factory_obj, "factory_obj")

            try:
                lme = LME.objects.filter(name=lme_name, factory=factory_obj).last()
                print(lme, "lme")

                if lme:
                    print("lme exists, ...updating")

                    # update lme
                    lme.name = lme_name
                    lme.factory = factory_obj if factory_obj else lme.factory
                    lme.county = county_obj if county_obj else lme.county
                    lme.sub_county = (
                        sub_county_obj if sub_county_obj else lme.sub_county
                    )
                    lme.ward = ward_obj if ward_obj else lme.ward
                    lme.contact_person = (
                        contact_person if contact_person else lme.contact_person
                    )
                    lme.phone_number = (
                        phone_number if phone_number else lme.phone_number
                    )

                    lme.email = email if email else lme.email

                    lme.no_of_employees = (
                        int(employees) if employees else lme.no_of_employees
                    )

                    lme.no_of_male_employees = (
                        int(male_employees)
                        if male_employees
                        else lme.no_of_male_employees
                    )
                    lme.no_of_female_employees = (
                        int(female_employees)
                        if female_employees
                        else lme.no_of_female_employees
                    )
                else:
                    print("lme doesn't exist, creating a new one")
                    try:
                        lme = LME(
                            name=lme_name,
                            factory=factory_obj,
                            email=email,
                            no_of_employees=int(employees) if employees else 0,
                            no_of_female_employees=int(female_employees)
                            if female_employees
                            else 0,
                            no_of_male_employees=int(male_employees)
                            if male_employees
                            else 0,
                            county=county_obj,
                            sub_county=sub_county_obj,
                            ward=ward_obj,
                            contact_person=contact_person,
                            phone_number=phone_number,
                        )

                        lme.save()
                    except Exception as e:
                        print(e)
                        print("error saving")

            except Exception as e:
                print(e, "final error saving")
