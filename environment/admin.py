from django.contrib import admin

# Register your models here.

from environment.models import (
    Factory,
    LMESales,
    Stove,
    LME,
    CoachingAndMentorship,
    MonthlyLMESales,
    Training,
    TreeGrowing,
    Region,
    Zone,
    County,
    SubCounty,
    Ward,
    CSVUpload,
    CustomSalesReport,
)


class CSVUploadAdmin(admin.ModelAdmin):
    list_display = ("id", "file", "date_uploaded")
    list_display_links = ("id", "file")
    search_fields = ("file",)
    # list_per_page = 25


admin.site.register(CSVUpload, CSVUploadAdmin)


class CountyAdmin(admin.ModelAdmin):
    list_display = ("county",)
    ordering = ("county",)


admin.site.register(County, CountyAdmin)


class SubCountyAdmin(admin.ModelAdmin):
    list_display = ("sub_county", "county")
    ordering = ("sub_county",)


admin.site.register(SubCounty, SubCountyAdmin)


class WardAdmin(admin.ModelAdmin):
    list_display = ("ward", "sub_county")
    ordering = ("ward",)


admin.site.register(Ward, WardAdmin)


class RegionAdmin(admin.ModelAdmin):
    list_display = ("region",)
    ordering = ("region",)


admin.site.register(Region, RegionAdmin)


class ZoneAdmin(admin.ModelAdmin):
    list_display = ("zone",)
    ordering = ("zone",)


admin.site.register(Zone, ZoneAdmin)


class FactoryAdmin(admin.ModelAdmin):
    list_display = ("name", "region", "zone", "county")
    search_fields = ("name",)
    list_filter = ("zone", "region")


admin.site.register(Factory, FactoryAdmin)


class StoveAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


admin.site.register(Stove, StoveAdmin)


class LMEAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_person",
        "factory",
        "retailer_or_installer",
        "phone_number",
        "no_of_employees",
        "county",
        "sub_county",
        "ward",
    )
    search_fields = (
        "name",
        "factory",
        "email",
        "contact_person",
        "phone_number",
    )
    list_filter = ("retailer_or_installer",)


admin.site.register(LME, LMEAdmin)


class CoachingAndMentorshipAdmin(admin.ModelAdmin):
    list_display = (
        "lme",
        "date",
        "topic_covered",
        "next_meeting_date",
    )
    search_fields = (
        "lme",
        "topic_covered",
        "remarks_by_mentor",
        "action_points",
    )


admin.site.register(CoachingAndMentorship, CoachingAndMentorshipAdmin)


class LMESalesAdmin(admin.ModelAdmin):
    list_display = (
        "lme",
        "customer_name",
        "customer_phone_number",
        "stove",
        "stove_price",
        "date_of_purchase",
    )
    search_fields = ("lme", "customer_phone_number")


admin.site.register(LMESales, LMESalesAdmin)


class MonthlyLMESalesAdmin(admin.ModelAdmin):
    list_display = (
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
    search_fields = ("lme", "month_string", "year")


admin.site.register(MonthlyLMESales, MonthlyLMESalesAdmin)


class CustomSalesReportAdmin(admin.ModelAdmin):
    list_display = (
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
    search_fields = ("query_lme",)


admin.site.register(CustomSalesReport, CustomSalesReportAdmin)


class TrainingAdmin(admin.ModelAdmin):
    list_display = (
        "course_name",
        "factory",
        "venue",
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

    search_fields = (
        "course_name",
        "factory",
        "venue",
    )


admin.site.register(Training, TrainingAdmin)


class TreeGrowingAdmin(admin.ModelAdmin):
    list_display = (
        "factory",
        "partner",
        "venue",
        "trees_planted",
        "date",
        "indigenous_trees",
        "exotic_trees",
        "fruit_trees",
    )


admin.site.register(TreeGrowing, TreeGrowingAdmin)
