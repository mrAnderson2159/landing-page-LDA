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
            return JsonResponse({'code': 1, 'errors': errors})
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
    forbidden = {'/db/phpMyAdmin-5/index.php?lang=en', 'config.json', '/phpmyadmin2013/index.php?lang=en', '/phpMyAdmin-5.1.3/index.php?lang=en', '/aaa9', '/administrator/PMA/index.php?lang=en', 'phpMyAdmin-2.11.4/scripts/setup.php', '/phpMyAdmin-3/index.php?lang=en', '.env', '/phpmyadmin_/index.php?lang=en', '/db/phpMyAdmin-4/index.php?lang=en', 'sitemap.xml', '/__phpmyadmin/index.php?lang=en', '/test/bedesk1.1/.env', '/index.php?lang=en', '/phpMyAdmin5.1/index.php?lang=en', 'HNAP1/', '/1phpmyadmin/index.php?lang=en', '/bedesk1.1/.env', '/phpmyadmin2011/index.php?lang=en', '/db/phpmyadmin/index.php?lang=en', 'debug/default/view?panel=config', '/phpmyadmin/index.php?lang=en', '/sql/websql/index.php?lang=en', '/mysql/pMA/index.php?lang=en', '/php-myadmin/index.php?lang=en', '/_phpMyAdmin/index.php?lang=en', '/admin/db/index.php?lang=en', '/phpMyAdmin-5/index.php?lang=en', 'hudson', '/phpMyAdmin/index.php?lang=en', 'wp-comments-post.php', '/actuator/health', "/admin/'", '/phpMyAdmin-5.2.0/index.php?lang=en', '/mysqlmanager/index.php?lang=en', '/2phpmyadmin/index.php?lang=en', '/admin/phpmyadmin/index.php?lang=en', '/admin/web/index.php?lang=en', '/phpMyAdmin2/index.php?lang=en', '/db/webadmin/index.php?lang=en', '/phpmyadmin2018/index.php?lang=en', '/db/phpMyAdmin3/index.php?lang=en', '/phpmyadmin2022/index.php?lang=en', 'portal/redlion', '/program/index.php?lang=en', '/phpMyAdmin5.2/index.php?lang=en', '/db/index.php?lang=en', '/php-my-admin/index.php?lang=en', '/sql/sqladmin/index.php?lang=en', '/db/dbweb/index.php?lang=en', '/phpMyAdmin-4.9.7/index.php?lang=en', '/phpMyAdmin-latest-all-languages/index.php?lang=en', '/phpmyadmin2019/index.php?lang=en', '/phpMyAdmin-5.1.0/index.php?lang=en', '/phpMyAdmin-5.3.0-all-languages/index.php?lang=en', '/db/phpmyadmin3/index.php?lang=en', '/sql/php-myadmin/index.php?lang=en', '/mysql/pma/index.php?lang=en', '/admin/index.php?lang=en', '/metrics', '_profiler/phpinfo', '/phpMyAdmin5/index.php?lang=en', '/administrator/phpMyAdmin/index.php?lang=en', '/PMA/index.php?lang=en', '/db/websql/index.php?lang=en', '/mysql/index.php?lang=en', '/api/jsonws/', '/admin/sysadmin/index.php?lang=en', '/phpmy-admin/index.php?lang=en', '/phpmyadmin2012/index.php?lang=en', '/db/dbadmin/index.php?lang=en', '/dbadmin/index.php?lang=en', '/phpMyAdmin_/index.php?lang=en', '/_phpmyadmin_/index.php?lang=en', '/db/db-admin/index.php?lang=en', 'mysqlmanager/scripts/setup.php', '/sql/phpmyadmin5/index.php?lang=en', '/phpmyadmin2015/index.php?lang=en', '/phpmyadmin4/index.php?lang=en', '/mysql/admin/index.php?lang=en', '.git/config', '/db/phpmyadmin4/index.php?lang=en', '/phpMyAdmin-5.1.1/index.php?lang=en', '/phpmyAdmin/index.php?lang=en', 'mysql-admin/scripts/setup.php', '/v2', '/phpMyAdmin4/index.php?lang=en', 'mgmt/tm/util/bash', '/mysql/sqlmanager/index.php?lang=en', '/phpMyAdmin3/index.php?lang=en', '/mysql/dbadmin/index.php?lang=en', '/phpMyAdmin-4.9.10-all-languages/index.php?lang=en', '/phpmyadmin2016/index.php?lang=en', '/phpMyAdmin-5.2.0-all-languages/index.php?lang=en', '/phpmyadmin2/index.php?lang=en', '/sql/phpMyAdmin2/index.php?lang=en', '/sql/webadmin/index.php?lang=en', '/sql/sql-admin/index.php?lang=en', 'boaform/admin/formLogin', '/administrator/pma/index.php?lang=en', '/phpmyadmin2020/index.php?lang=en', '/phpMyadmin/index.php?lang=en', '/sql/sqlweb/index.php?lang=en', '/mysql/db/index.php?lang=en', '/sql/phpmy-admin/index.php?lang=en', '/mysql/web/index.php?lang=en', '/sql/sql/index.php?lang=en', '/phpMyAdmin1/index.php?lang=en', 'robots.txt', 'druid/index.html', '/phpmyadmin1/index.php?lang=en', '/sqlmanager/index.php?lang=en', '/db/webdb/index.php?lang=en', '/db/phpMyAdmin-3/index.php?lang=en', '/aab8', '/sql/phpMyAdmin/index.php?lang=en', '/phpmyadmin5/index.php?lang=en', '/sql/phpmyadmin3/index.php?lang=en', '/phpmyadmin2021/index.php?lang=en', 'mat', '/phpMyAdmin-latest-english/index.php?lang=en', '/database/index.php?lang=en', '/phpMyAdmin-5.3.0/index.php?lang=en', '/phpmyadmin3/index.php?lang=en', '/administrator/web/index.php?lang=en'
                 }
    if url in forbidden:
        block_user(request=request)
        return HttpResponse("<h1><strong>MALICIOUS REQUEST DETECTED, USER BLOCKED</strong></h1>\n", status=403)

    try:
        Whitelist.objects.get(ipaddress=get_client_ip(request))
    except ObjectDoesNotExist:
        yellow(f'MAYBE TO BE BLOCKED USER {get_client_ip(request)} for {request}')
    raise Http404
