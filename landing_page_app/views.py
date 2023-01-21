import re

from django.core.exceptions import ObjectDoesNotExist
from django.core.handlers.wsgi import WSGIRequest
from django.db.utils import IntegrityError
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from .decorators import unlocked
from .functions import str_to_date, jsonify, visualization, block_user, get_client_ip
from .models import *
from .colors import yellow
from .email_sender import send_admin_email


# Create your views here.
@unlocked
def index(request: WSGIRequest):
    return render(request, 'landing_page_app/index.html')


@unlocked
def cars(request: WSGIRequest):
    if request.method == 'GET':
        car_list = Car.objects.all()
        return JsonResponse(data=jsonify(car_list), content_type='application/json', safe=False)


@csrf_exempt
@unlocked
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
            user, user_created = Client.objects.get_or_create(name=username, email=email)
        except IntegrityError:
            yellow("FORM COMPILING ERROR: CONFLICT_USER_EMAIL")
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
                if not query_created:
                    errors.append('QUERY_EXISTS')
            except IntegrityError as e:
                yellow(e)
                errors.append('QUERY_EXISTS')


        if len(errors):
            e = {'name': 'FORM_ERROR', 'code': 1, 'errors': errors}
            yellow(e)
            return JsonResponse(e)
        else:
            send_admin_email({
                "car": car.name,
                "img": car.img,
                "username": user.name,
                "email": email,
                "start": start,
                "stop": stop,
                "notes": notes
            })
            for field in (car, start, stop, user, query):
                field.save()
            return JsonResponse({'code': 0}, safe=False)


@unlocked
def botcatcher(request, url):
    try:
        Whitelist.objects.get(ipaddress=get_client_ip(request))
    except ObjectDoesNotExist:
        forbidden = {
        r'php', r'admin/', r'debug', r'^\.', r'actuator', r'api', r'console',
        r'owa', r'solr', r'wp-content', r'bedesk', r'metrics', r'test',
        r'v2', r'HNAP1', r'config', r'druid', r'hudson', r'mat', r'mgmt',
        r'portal', r'robots', r'\.xml'

    }

        for pattern in forbidden:
            if re.search(pattern, url):
                block_user(request=request)
                return HttpResponse("<h1><strong>MALICIOUS REQUEST DETECTED, USER BLOCKED</strong></h1>\n", status=403)

        yellow(f'MAYBE TO BE BLOCKED USER {get_client_ip(request)} for {request}')
    raise Http404
