from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse #, HttpResponse
from django.core.handlers.wsgi import WSGIRequest
from django.db.utils import IntegrityError
from .models import *
from .functions import str_to_date, jsonify, visualization, get_client_ip
from .colors import green
from .decorators import use_client_ip

USE_CLIENT_IP_CALLBACK = lambda ip: green(', '.join(ip))

# Create your views here.
@use_client_ip(green)
def index(request: WSGIRequest):
    return render(request, 'landing_page_app/index.html')


@use_client_ip(green)
def cars(request: WSGIRequest):
    if request.method == 'GET':
        cars = Car.objects.all()
        return JsonResponse(data=jsonify(cars), content_type='application/json', safe=False)


@use_client_ip(green)
@csrf_exempt
def form(request: WSGIRequest):
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
