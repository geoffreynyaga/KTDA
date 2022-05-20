from django.shortcuts import redirect, render

# Create your views here.

from django.views.generic import TemplateView

# LoginRequiredMixin import django
from django.contrib.auth.mixins import LoginRequiredMixin


class ReactView(TemplateView, LoginRequiredMixin):
    template_name = "ui/index.html"


# loginrequired decorator
def login_required(view):
    def wrapper_function(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view(request, *args, **kwargs)
        else:
            return redirect("/accounts/login/")

    return wrapper_function


# redirect page to home
@login_required
def home(request):
    return redirect("/ui/lme/list/")
