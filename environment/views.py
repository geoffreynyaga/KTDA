from django.shortcuts import render

# Create your views here.

from django.views.generic import TemplateView
from django.views.generic import CreateView

from environment.models import LME, LMESales


class LMEMainView(TemplateView):
    template_name = "environment/LMEMain.html"


class LMEAddView(TemplateView):
    template_name = "environment/LMEAdd.html"


class LMESalesAddView(TemplateView):
    template_name = "environment/LMESalesAdd.html"


class CapacityBuildingIndividualAddView(TemplateView):
    template_name = "environment/CapacityBuildingIndividualAdd.html"


class CapacityBuildingAddView(TemplateView):
    template_name = "environment/CapacityBuildingAdd.html"


class SalesListView(TemplateView):
    template_name = "environment/SalesList.html"


class LMECreateView(CreateView):
    queryset = LME.objects.all()
    template_name = "environment/LMECreate.html"
    fields = (
        "name",
        "factory",
        "email",
        # "no_of_employees",
        "no_of_female_employees",
        "no_of_male_employees",
        "county",
        "sub_county",
        "ward",
        "types_of_stove",
        "contact_person",
        "year_of_birth",
        "phone_number",
    )
    success_url = "/ui/lme/list/"


class SalesCreateView(CreateView):
    queryset = LMESales.objects.all()
    template_name = "environment/LMESalesCreate.html"
    fields = (
        "lme",
        "customer_name",
        "customer_phone_number",
        "stove",
        "stove_price",
        "date_of_purchase",
    )
    success_url = "/environment/lme/sales/list/"
