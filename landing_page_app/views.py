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
    forbidden = ('sitemap.xml', '/administrator/PMA/index.php?lang=en', '/phpmyadmin2019/index.php?lang=en', '_profiler/phpinfo', '/sql/sqlweb/index.php?lang=en', '/phpMyAdmin-5.2.0-all-languages/index.php?lang=en', '/phpMyAdmin2/index.php?lang=en', '/phpmyadmin4/index.php?lang=en', '/_phpmyadmin_/index.php?lang=en', '/db/phpMyAdmin-5/index.php?lang=en', 'phpMyAdmin-2.11.4/scripts/setup.php', '/phpMyAdmin-5.1.0/index.php?lang=en', '/administrator/web/index.php?lang=en', 'robots.txt', '/sql/phpmyadmin5/index.php?lang=en', '/phpmy-admin/index.php?lang=en', '.git/config', '/phpmyadmin_/index.php?lang=en', '/aaa9', 'mysqlmanager/scripts/setup.php', '/db/phpMyAdmin3/index.php?lang=en', 'HNAP1/', '/dbadmin/index.php?lang=en', '/index.php?lang=en', '/1phpmyadmin/index.php?lang=en', '/phpmyadmin2022/index.php?lang=en', '/phpMyAdmin-5.3.0/index.php?lang=en', '/db/webdb/index.php?lang=en', 'mgmt/tm/util/bash', '/phpMyAdmin_/index.php?lang=en', '/phpMyAdmin5/index.php?lang=en', '/mysql/web/index.php?lang=en', 'mat', '/phpmyadmin2016/index.php?lang=en', '/phpMyAdmin-5.3.0-all-languages/index.php?lang=en', 'wp-comments-post.php', '/db/websql/index.php?lang=en', '/db/dbadmin/index.php?lang=en', '/sql/sqladmin/index.php?lang=en', '/sql/phpmyadmin3/index.php?lang=en', '/test/bedesk1.1/.env', '/phpMyAdmin-latest-all-languages/index.php?lang=en', '/phpMyAdmin-4.9.10-all-languages/index.php?lang=en', 'mysql-admin/scripts/setup.php', 'debug/default/view?panel=config', '/bedesk1.1/.env', 'portal/redlion', '/sql/php-myadmin/index.php?lang=en', '/database/index.php?lang=en', 'hudson', '/phpMyAdmin-3/index.php?lang=en', '/sql/phpmy-admin/index.php?lang=en', '/sql/phpMyAdmin/index.php?lang=en', '/sql/sql-admin/index.php?lang=en', '/mysqlmanager/index.php?lang=en', '/phpMyAdmin5.2/index.php?lang=en', '/phpMyAdmin-5.1.1/index.php?lang=en', '/db/dbweb/index.php?lang=en', '/phpmyadmin2/index.php?lang=en', '/administrator/pma/index.php?lang=en', '/db/phpmyadmin4/index.php?lang=en', 'druid/index.html', 'boaform/admin/formLogin', '/phpMyAdmin4/index.php?lang=en', '/phpmyadmin2021/index.php?lang=en', '/sql/websql/index.php?lang=en', '.env', '/program/index.php?lang=en', '/aab8', '/sql/phpMyAdmin2/index.php?lang=en', '/mysql/db/index.php?lang=en', '/phpMyAdmin-5.2.0/index.php?lang=en', 'config.json', '/php-myadmin/index.php?lang=en', '/PMA/index.php?lang=en', '/phpMyAdmin3/index.php?lang=en', '/mysql/admin/index.php?lang=en', '/2phpmyadmin/index.php?lang=en', '/phpMyadmin/index.php?lang=en', '/phpmyadmin2012/index.php?lang=en', '/administrator/phpMyAdmin/index.php?lang=en', '/_phpMyAdmin/index.php?lang=en', '/mysql/pMA/index.php?lang=en', '/db/phpmyadmin3/index.php?lang=en', '/db/phpMyAdmin-4/index.php?lang=en', '/__phpmyadmin/index.php?lang=en', '/phpMyAdmin1/index.php?lang=en', '/mysql/pma/index.php?lang=en', '/mysql/index.php?lang=en'
                 )
    # print(request.path, request.path_info, type(request))
    if url in forbidden:
        block_user(request=request)
        return HttpResponse("<h1><strong>MALICIUS REQUEST DETECTED, USER BLOCKED</strong></h1>\n", status=403)
    yellow(f'MAYBE TO BE BLOCKED USER {get_client_ip(request)} for {request}')
    raise Http404
