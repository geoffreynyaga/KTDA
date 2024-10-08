"""KTDA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap

# from django.conf.urls import url
from django.urls import include, path, re_path

from accounts.views import home, react_view
from environment.sitemaps import LMESitemap

sitemaps = {
    "lmes": LMESitemap,
}

admin.site.site_header = "KTDA M&E Admin"
admin.site.site_title = "KTDA M&E Admin"
admin.site.index_title = "Welcome to KTDA M&E Admin Portal"

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("accounts/", include("allauth.urls")),
    path("accounts/", include("accounts.urls")),
    path("", home, name="home"),
    path("environment/", include("environment.urls")),
    path("api/v1/environment/", include("environment.api.urls")),
    # path("ui/", ReactView.as_view(), name="react"),
    re_path(r"ui/.*", react_view, name="react"),
    path("__reload__/", include("django_browser_reload.urls")),
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
