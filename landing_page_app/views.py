from os import listdir
from random import randint, shuffle
from datetime import timedelta

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db.utils import IntegrityError
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import last_modified
from rest_framework.parsers import JSONParser

from .colors import yellow, magenta
from .decorators import unlocked
from .email_sender import send_admin_email
from .forms import LoginForm
from .functions import *
from .models import *


# Create your views here.
@last_modified(last_modified_func=latest_text_layout_mod)
@unlocked()
def index(request: WSGIRequest):
    magenta('HOMEPAGE')
    return render(request, 'landing_page_app/index.html')


@unlocked()
def cars(request: WSGIRequest):
    if request.method == 'GET':
        magenta('CAR LIST')
        car_list = Car.objects.filter(active=True)
        return JsonResponse(data=jsonify(car_list), content_type='application/json', safe=False)


@csrf_exempt
@unlocked()
def form(request: WSGIRequest):
    if request.method == 'POST':
        magenta('FORM SUBMIT')
        data = JSONParser().parse(request)
        # print(visualization(data))

        print(data)

        errors = []

        car = data['car']
        username = data['userName'].title()
        email = data['email']
        startHour = data['fromHour']
        startDate = data['fromDate']
        stopHour = data['toHour']
        stopDate = data['toDate']
        notes = data['notes']

        startDate, stopDate = map(str_to_date, (startDate, stopDate))
        startHour, stopHour = map(lambda t: tuple(map(int, t.split(':'))), (startHour, stopHour))

        startDate += timedelta(hours=startHour[0], minutes=startHour[1])
        stopDate += timedelta(hours=stopHour[0], minutes=stopHour[1])

        car = Car.objects.get_or_create(name=car)[0]
        startDate = Date.objects.get_or_create(date=startDate)[0]
        stopDate = Date.objects.get_or_create(date=stopDate)[0]
        query = user = None
        user_created = False

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
                    start=startDate,
                    stop=stopDate,
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
            try:
                send_admin_email({
                    "car": car.name,
                    "path": car.path,
                    "username": user.name,
                    "email": email,
                    "start": startDate,
                    "stop": stopDate,
                    "notes": notes
                })
            except Exception as e:
                code, msg = e.args
                red(f"EMAIL ERROR {code}: {str(msg)}")

            for field in (car, startDate, stopDate, user, query):
                field.save()

            ip: IpAddress = IpAddress.objects.get(address=get_client_ip(request))
            ip.increase_subscriptions()
            ip.save()

            green(f"{ip} SUBSCRIPTED")
            return JsonResponse({'code': 0}, safe=False)


@unlocked(increase_bad_requests=True)
def botcatcher(request, url):
    magenta('BOTCATCHER')
    address = get_client_ip(request)
    ip = IpAddress.objects.get(address=address)
    try:
        w = Whitelist.objects.get(ipaddress=ip)
        green(f"{w} WHITELIST PASS")
    except ObjectDoesNotExist:
        if is_malicious(url):
            block_user(request=request)
            return HttpResponse("<h1><strong>MALICIOUS REQUEST DETECTED, USER BLOCKED</strong></h1>\n", status=403)

        yellow(f'MAYBE TO BE BLOCKED USER {ip} for {request}')
    raise Http404


@unlocked()
def user_login(request):
    magenta('LOGIN')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('text_management'))
            else:
                return HttpResponse("ACCOUNT NOT ACTIVE")
        else:
            print(f"Someone tried to login and failed: {username}")
            return HttpResponse("INVALID USERNAME AND PASSWORD")
    else:
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse('text_management'))
        else:
            context = {'form': LoginForm()}
            return render(request, 'landing_page_app/login.html', context)


@login_required
@unlocked()
def user_logout(request):
    magenta('LOGOUT')
    logout(request)
    return HttpResponseRedirect(reverse('index'))


@login_required
@unlocked()
def requests_management(request):
    magenta('REQUESTS MANAGEMENT')
    return render(request, 'landing_page_app/requests_management.html')


@login_required
@unlocked()
def text_management(request):
    magenta('TEXT MANAGEMENT')
    raw_json = TextLayout.objects.get(name='text_layout').data
    context = {
        'fields': json.loads(raw_json),
        'type': 'modify',
    }
    if request.method == 'POST':
        data = request.POST
        text_layout = TextLayout.objects.get(name='text_layout')
        text_layout_data = json.loads(text_layout.data)
        for key, value in data.items():
            if key in text_layout_data:
                text_layout_data[key]['value'] = value
        text_layout.data = json.dumps(text_layout_data)
        diffs = {key: (context['fields'][key]['value'], text_layout_data[key]['value']) for key in
                 text_layout_data.keys() if context['fields'][key] != text_layout_data[key]}

        if len(diffs):
            green('TEXT LAYOUT UPDATED\n\nDIFFERENCES:')
            for key, value in diffs.items():
                print(f'\t{key}:\t{c_cyan(value[0])} {c_yellow("->")} {c_cyan(value[1])}')
            print()

            text_layout.save()

        context = {"type": "thanks", "redirect_time": randint(1000, 3000)}
        return render(request, 'landing_page_app/text_management.html', context)

    return render(request, 'landing_page_app/text_management.html', context)


@unlocked(increase_views=True)
def text_layout(request):
    magenta('TEXT LAYOUT')
    if request.method == 'GET':
        text_layout = TextLayout.objects.get(name='text_layout')
        return JsonResponse(text_layout.data, safe=False)

@unlocked()
def main_background(request):
    magenta('MAIN BACKGROUND')
    dev_path = Path('src/assets/images/background-carousel')
    prod_path = Path(static('images/background-carousel')[1:])
    dev_images = []
    prod_images = []
    for image in listdir(prod_path):
        dev_images.append(str(dev_path / image))
        prod_images.append(str(prod_path / image))
    shuffle(dev_images)
    shuffle(prod_images)
    return JsonResponse({
        'prod': {'mainBackground': prod_images},
        'dev': {'mainBackground': dev_images}
    }, safe=False)


@login_required
@unlocked()
def mod_store(request):
    magenta('MOD STORE')
    context = {
        'ideas': [
            {'title': 'idea1', 'explanation': 'this is my first idea'},
            {'title': 'idea1', 'explanation': 'this is my first idea'},
            {'title': 'idea1', 'explanation': 'this is my first idea'}
        ],
    
    }
    return render(request, 'landing_page_app/mod_store.html', context)
