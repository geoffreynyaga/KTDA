#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/KTDA/settings/__init__.py                               #
# Project: /home/geoff/KTDA/KTDA/settings                                        #
# Created Date: Tuesday, May 24th 2022, 11:50:08 pm                              #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday May 24th 2022 11:50:08 pm                               #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


# from .local import *

try:
    from .production import *
except ImportError:
    pass
