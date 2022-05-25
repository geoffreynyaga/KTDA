#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/utils.py                                       #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Tuesday, May 24th 2022, 10:56:20 pm                              #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 10:56:20 pm                               #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

import phonenumbers

# phone_number = "0718821114"

prefixes = [
    "701",
    "702",
    "703",
    "704",
    "705",
    "706",
    "707",
    "708",
    "710",
    "711",
    "712",
    "713",
    "714",
    "715",
    "716",
    "717",
    "718",
    "719",
    "720",
    "721",
    "722",
    "723",
    "724",
    "725",
    "726",
    "727",
    "728",
    "729",
    "740",
    "741",
    "742",
    "743",
    "746",
    "748",
    "790",
    "791",
    "792",
    "793",
    "794",
    "795",
    "796",
    "797",
    "798",
    "799",
]


def clean_international_phone_number_to_safcom(phone_number):
    """
    This function is used to convert phone numbers to Safaricom format i.e 254...
    If a function is passed from E164 format wit "+" sign at the start, the sign
    is removed
    """
    e164_phone_number = str(phone_number)

    phone_number = e164_phone_number.translate({ord(c): None for c in "+"})

    print(phone_number)
    return phone_number


# phone_number = "+254718821114"


def convert_safcom_to_e164(phone_number):
    """
    This takes in a safaricom API phone number of the format 2547......
    and converts it to e164 format which is the format used to store the
    usernames of users in the app. This makes it possible to query the users and do lookups
    """
    str_phone_number = "+" + str(phone_number)
    print(str_phone_number, "should be with a plus")
    phone_number = phonenumbers.parse(str_phone_number, None)

    e164 = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.E164)

    return e164


# convert_safcom_to_e164("254718821114")


def convert_local_to_e164(phone_number):
    """
    This takes in a safaricom API phone number of the format 0720... or 2547......
    and converts it to e164 format which is the format used to store the
    usernames of users in the app. This makes it possible to query the users and do lookups
    """
    str_phone_number = str(phone_number)

    phone_number = phonenumbers.parse(str_phone_number, "KE")

    e164 = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.E164)

    return e164


# x = convert_local_to_e164("0718821114")
# print(x)


def check_phone_number_carrier_name(phone_number):
    """Takes in a E.164 number and checks for carrier name"""

    print("checking phone number is safaricom")

    from phonenumbers import carrier

    ro_number = phonenumbers.parse(phone_number, "RO")

    carrier_name = carrier.name_for_number(ro_number, "en")
    print(carrier_name, "<<<<-----carrier_name")
    return carrier_name


# print(check_phone_number_carrier_name("+25478821114"),"should be saf")


def check_phone_valid(phone_number):
    # return true/false
    pass


def check_is_possible_number(phone_number):
    # return true/false
    pass


# def clean_phone_number(phone_number):

#     phone_number = str(phone_number)

#     # phone_number = phonenumbers.parse(phone_number, None)
#     # national = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.NATIONAL)
#     # international = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
#     # e164 = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.E164)
#     # print(national, "national")
#     # print(international, "international")
#     # print(e164, "e164")

#     # check_is_possible_number(phone_number)
#     # TODO: Connvert first using phonenumbers lib?
#     # maybe will help with the +25407, 25470, 2547000007 situations

#     first_five_digits = phone_number[:5]

#     if first_five_digits == "+2547":
#         print("its +254")
#         # convert using phonenumbers lib to local
#         # check if valid using phonenumber
#         # check with prefixes if a safaricom number

#     elif first_five_digits[:4] == "2547":
#         print("its 254")
#         # convert using phonenumbers lib to local
#         # check if valid using phonenumber
#         # check with prefixes if a safaricom number

#     elif first_five_digits[:2] == "07":
#         print("its a 07 number")
#         # convert using phonenumbers lib to local
#         # check if valid using phonenumber
#         # check with prefixes if a safaricom number

#     else:
#         print("a very invalid non-kenyan number")


def standardize_phone_number_to_e164(phone_number):

    phone_number = str(phone_number).replace(" ", "")

    first_five_digits = phone_number[:5]

    if first_five_digits == "+2547":
        # print("its +254")

        return phone_number
        # convert using phonenumbers lib to local
        # check if valid using phonenumber
        # check with prefixes if a safaricom number

    elif first_five_digits[:4] == "2547":
        # print("its 254")
        x = convert_safcom_to_e164(phone_number)
        return x

    elif first_five_digits[:2] == "07":
        # print("its a 07 number")
        x = convert_local_to_e164(phone_number)
        return x

    else:
        return None


# x = "+254 722 620296"

# print(standardize_phone_number_to_e164(x))


def e164_to_safaricom(phone_number):
    """
    This function is used to convert phone numbers to Safaricom format i.e 254...
    If a function is passed from E164 format wit "+" sign at the start, the sign is removed
    """
    e164_phone_number = str(phone_number)
    phone_number = e164_phone_number.translate({ord(c): None for c in "+"})

    return phone_number
