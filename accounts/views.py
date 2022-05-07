from django.shortcuts import render

# Create your views here.

from django.views.generic import TemplateView


class ReactView(TemplateView):
    template_name = "ui/index.html"
