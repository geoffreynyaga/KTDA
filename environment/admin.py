from django.contrib import admin

# Register your models here.

from environment.models import (
    Factory,
    LMESales,
    Retailer,
    Stove,
    LME,
    CoachingAndMentorship,
)


class FactoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


admin.site.register(Factory, FactoryAdmin)


class RetailerAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


admin.site.register(Retailer, RetailerAdmin)


class StoveAdmin(admin.ModelAdmin):
    list_display = ("name", "retailer")
    search_fields = ("name", "retailer")


admin.site.register(Stove, StoveAdmin)


class LMEAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_person",
        "factory",
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
