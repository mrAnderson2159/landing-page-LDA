"""landing_page_lda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from landing_page_app import views
from landing_page_app.views import index, botcatcher
from landing_page_app.functions import encrypted_view, standard_view

standard_view = standard_view(views)
encrypted_view = encrypted_view(views)

urlpatterns = [
    path('', index, name='index'),
    path('admin-lrcp/', admin.site.urls),
    encrypted_view('form'),
    encrypted_view("cars"),
    standard_view("user_login"),
    standard_view("user_logout"),
    encrypted_view("requests_management"),
    encrypted_view("text_management"),
    encrypted_view("text_layout"),
    encrypted_view("main_background"),
    # encrypted_view("mod_store"),
    path('<path:url>', botcatcher, name='default')
]