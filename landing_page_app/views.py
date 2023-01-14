from django.shortcuts import render
# to parse data from a client
from rest_framework.parsers import JSONParser
# to bypass having a csrf token
from django.views.decorators.csrf import csrf_exempt
# to send the response to the client
from django.http import JsonResponse, HttpResponse

from .models import *

from termcolor import colored
from datetime import datetime

def str_to_date(strdate: str):
    return datetime(*list(map(int, strdate.split('-'))))

def visualization(request_object):
    car = request_object['car']
    user = request_object['userName']
    email = request_object['email']
    start = request_object['from']
    stop = request_object['to']
    notes = request_object['notes']

    start, stop = map(str_to_date, (start, stop))

    return f"{colored(user, 'cyan')} con indirizzo email {colored(email, 'cyan')} " \
           f"ha prenotato una {colored(car, 'green')} per la data\n\t{colored(start, 'yellow')}\n" \
           f"da restituire in data\n\t{colored(stop, 'red')}\ne ha scritto le seguenti note: " \
           f"{colored(notes, 'magenta')}"

# Create your views here.
def index(request):
    return render(request, 'landing_page_app/index.html')

@csrf_exempt
def form(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(visualization(data))

        car = data['car']
        username = data['userName']
        email = data['email']
        start = data['from']
        stop = data['to']
        notes = data['notes']

        start, stop = map(str_to_date, (start, stop))

        car = Car.objects.get_or_create(name=car)[0]
        start = Date.objects.get_or_create(date=start)[0]
        stop = Date.objects.get_or_create(date=stop)[0]
        user, user_created = User.objects.get_or_create(email=email)
        if user_created:
            user.name = username
        query = Request.objects.get_or_create(
            user=user,
            car=car,
            start=start,
            stop=stop,
            notes=notes
        )[0]

        for field in (car, start, stop, user, query):
            field.save()

        return JsonResponse(data, safe=False)

def main_background(request):
    if request.method == 'GET':
        with open('static/images/main_background.png', 'rb') as image:
            img = image.read()
            return HttpResponse(img, content_type="image/jpeg")