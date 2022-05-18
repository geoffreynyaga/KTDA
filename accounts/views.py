from django.shortcuts import redirect, render

# Create your views here.

from django.views.generic import TemplateView


class ReactView(TemplateView):
    template_name = "ui/index.html"


# redirect page to home
def home(request):
    return redirect("/ui/lme/list/")
