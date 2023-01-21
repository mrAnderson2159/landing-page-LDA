from django.urls import path
from landing_page_app.views import index, botcatcher
from landing_page_app.functions import encrypted_view, standard_view

urlpatterns = [
    encrypted_view('form'),
    encrypted_view("cars"),
    standard_view("login"),
]
