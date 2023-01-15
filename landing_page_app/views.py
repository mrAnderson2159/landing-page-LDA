import json
from django.shortcuts import render
# to parse data from a client
from rest_framework.parsers import JSONParser
# to bypass having a csrf token
from django.views.decorators.csrf import csrf_exempt
# to send the response to the client
from django.http import JsonResponse, HttpResponse

from django.db.utils import IntegrityError

from .models import *
from .functions import str_to_date, jsonify

from termcolor import colored

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

        errors = []

        car = data['car']
        username = data['userName'].title()
        email = data['email']
        start = data['from']
        stop = data['to']
        notes = data['notes']

        start, stop = map(str_to_date, (start, stop))

        car = Car.objects.get_or_create(name=car)[0]
        start = Date.objects.get_or_create(date=start)[0]
        stop = Date.objects.get_or_create(date=stop)[0]
        query = user = None
        query_created = user_created = False

        try:
            user, user_created = User.objects.get_or_create(name=username, email=email)
        except IntegrityError:
            errors.append('CONFLICT_USER_EMAIL')

        if user_created:
            user.name = username
        if user:
            try:
                query, query_created = Request.objects.get_or_create(
                    user=user,
                    car=car,
                    start=start,
                    stop=stop,
                    notes=notes
                )
            except IntegrityError:
                errors.append('QUERY_EXISTS')

        if not query_created:
            errors.append('QUERY_EXISTS')

        if len(errors):
            return JsonResponse({'code':1, 'errors':errors})
        else:
            for field in (car, start, stop, user, query):
                field.save()
            return JsonResponse({'code':0}, safe=False)

def main_background(request):
    if request.method == 'GET':
        with open('static/images/main_background.png', 'rb') as image:
            img = image.read()
            return HttpResponse(img, content_type="image/jpeg")


def cars(request):
    if request.method == 'GET':
        cars = Car.objects.all()
        return JsonResponse(data=jsonify(cars), content_type='application/json', safe=False)