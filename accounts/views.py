from django.shortcuts import redirect, render

# Create your views here.

from django.views.generic import TemplateView


from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect

from django.views.generic.edit import CreateView
from django.views import generic

from rest_framework.response import Response

from .forms import UserAdminCreationForm


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


class SignUp(CreateView):
    template_name = "accounts/register.html"
    form_class = UserAdminCreationForm
    success_url = "/"

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()
        return super(SignUp, self).form_valid(form)


class LoginView(generic.FormView):
    form_class = AuthenticationForm
    success_url = "/"
    template_name = "accounts/login.html"

    def get_form(self, form_class=None):
        if form_class is None:
            form_class = self.get_form_class()
        return form_class(self.request, **self.get_form_kwargs())

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super().form_valid(form)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/accounts/login")
