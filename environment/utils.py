#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/utils.py                                    #
# Project: /home/geoff/KTDA/environment                                          #
# Created Date: Friday, May 20th 2022, 4:24:01 pm                                #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Wednesday May 25th 2022 8:38:40 am                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

import csv
from accounts.utils import convert_local_to_e164


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
                    factory_object.name = factory if factory else factory_object.name
                    factory_object.region = (
                        region_object if region_object else factory_object.region
                    )
                    factory_object.zone = (
                        zone_object if zone_object else factory_object.zone
                    )
                    factory_object.county = (
                        county_object if county_object else factory_object.county
                    )
                    factory_object.save()
                else:
                    print("factory_object does not exist")
                    print(factory)
                    print(type(factory), "should be str")

                    print(region_object)
                    print(type(region_object), "should be Region")

                    print(zone_object)
                    print(type(zone_object), "should be Zone")
                    print(county_object)
                    print(type(county_object), "should be County")
                    try:
                        factory = Factory.objects.create(
                            name=factory,
                            # region=region_object if region_object else None,
                            # zone=zone_object if zone_object else None,
                            # county=county_object if county_object else None,
                        )
                        print(factory, "factory <<<< ")
                        # factory.save()
                    except Exception as e:
                        print(e, "factory creation failed")

            except Exception as e:
                print(e, "error saving")


def save_factories_from_json(
    json,
):

    for factory_item in json:
        #     factory_item  = {
        #     "Region": "Region 1",
        #     "Zone": "Zone 1",
        #     "County": "Kiambu",
        #     "Factory": "Kagwe"
        #   },

        factory = factory_item["Factory"].strip()
        print(f"=============={factory}===============")
        print("Processing factory: {}".format(factory))
        # print(row)
        # print(f"=============={count}- {farmer_name}===============")

        region = factory_item["Region"].strip()
        zone = factory_item["Zone"].strip()
        county = factory_item["County"].strip()

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
                factory_object.name = factory if factory else factory_object.name
                factory_object.region = (
                    region_object if region_object else factory_object.region
                )
                factory_object.zone = (
                    zone_object if zone_object else factory_object.zone
                )
                factory_object.county = (
                    county_object if county_object else factory_object.county
                )
                factory_object.save()
            else:
                print("factory_object does not exist")
                print(factory)
                print(type(factory), "should be str")

                print(region_object)
                print(type(region_object), "should be Region")

                print(zone_object)
                print(type(zone_object), "should be Zone")
                print(county_object)
                print(type(county_object), "should be County")
                try:
                    factory = Factory.objects.create(
                        name=factory,
                        region=region_object if region_object else None,
                        zone=zone_object if zone_object else None,
                        county=county_object if county_object else None,
                    )
                    print(factory, "factory <<<< ")
                    # factory.save()
                except Exception as e:
                    print(e, "factory creation failed")

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
            # 6.LME Name
            # 7.Contact person
            # 8.PhoneNumber
            # 9.Email
            # 10.Total Employees
            # 11.male employees
            # 12.female employees

            factory = row[1].strip()
            # cluster = row[2].strip()
            county = row[3].strip()
            sub_county = row[4].strip()
            ward = row[5].strip()
            lme_name = row[6].strip()
            contact_person = row[7].strip()
            phone_number = row[8].strip()
            try:
                if phone_number:
                    if phone_number[0] == "+":
                        pass
                    elif phone_number[0] == "0":
                        phone_number = convert_local_to_e164(phone_number)
                    else:
                        phone_number = "0" + phone_number
                        phone_number = convert_local_to_e164(phone_number)
            except Exception as e:
                print(e, "error")

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


def save_LMEs_from_json(json, command_str=""):

    for lme_item in json:

        # lme_item = {
        #     "Organization Name": "KTDA F",
        #     "Factory": "Mudete",
        #     "Cluster": "Western",
        #     "County": "Vihiga",
        #     "SubCounty": "",
        #     "Ward": "",
        #     "LME Name": "Connie Mutesi",
        #     "Contact person": "Connie Mutesi",
        #     "PhoneNumber": 713704597,
        #     "Email": "",
        #     "Total Employees": "",
        #     "male employees": "",
        #     "female employees": "",
        # }

        factory = lme_item["Factory"]
        # cluster = row[2].strip()
        county = lme_item["County"]
        sub_county = lme_item["SubCounty"]
        ward = lme_item["Ward"]
        lme_name = lme_item["LME Name"]
        contact_person = lme_item["Contact person"]
        phone_number = str([lme_item["PhoneNumber"]])
        try:
            if phone_number:
                if phone_number[0] == "+":
                    pass
                elif phone_number[0] == "0":
                    phone_number = convert_local_to_e164(phone_number)
                else:
                    phone_number = "0" + phone_number
                    phone_number = convert_local_to_e164(phone_number)
        except Exception as e:
            print(e, "error")

        email = lme_item["Email"]
        employees = lme_item["Total Employees"]
        male_employees = lme_item["male employees"]
        female_employees = lme_item["female employees"]

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
                lme.sub_county = sub_county_obj if sub_county_obj else lme.sub_county
                lme.ward = ward_obj if ward_obj else lme.ward
                lme.contact_person = (
                    contact_person if contact_person else lme.contact_person
                )
                lme.phone_number = phone_number if phone_number else lme.phone_number

                lme.email = email if email else lme.email

                lme.no_of_employees = (
                    int(employees) if employees else lme.no_of_employees
                )

                lme.no_of_male_employees = (
                    int(male_employees) if male_employees else lme.no_of_male_employees
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
