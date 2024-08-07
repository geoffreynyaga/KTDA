#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/environment/sitemaps.py                                 #
# Project: /home/geoff/KTDA/environment                                          #
# Created Date: Tuesday, June 7th 2022, 7:45:31 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )                     #
# -----                                                                          #
# Last Modified: Tuesday June 7th 2022 7:45:31 pm                                #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Geoffrey Nyaga Kinyua.                                               #
# -----                                                                          #
# Copyright (c) 2022 Geoffrey Nyaga Kinyua.                                          #
##################################################################################


from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import LME


class LMESitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return LME.objects.all()

    def lastmod(self, obj):
        return obj.date_modified
