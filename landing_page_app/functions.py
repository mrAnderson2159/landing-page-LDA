import json
import re
from datetime import datetime, date
from hashlib import sha512
from os import PathLike
from os.path import exists, splitext
from pathlib import Path
from typing import *
from typing import Type

from django.core.exceptions import ObjectDoesNotExist
from django.core.handlers.wsgi import WSGIRequest
from django.core.serializers import serialize
from django.db.models import Model
from django.templatetags.static import static
from django.urls import path

from .colors import c_yellow, c_cyan, c_green, c_red, c_magenta, red, green, yellow
from .global_settings import FORBIDDEN_REQUESTS
from .models import Blacklist, Date, Whitelist, IpAddress, Car, SiteHash


def encrypt(string: str, algorithm: Callable[AnyStr, Hashable] = sha512) -> str:
    alg = algorithm()
    alg.update(string.encode())
    return alg.hexdigest()


def str_to_date(str_date: str) -> datetime:
    return datetime(*list(map(int, str_date.split('-'))))


def jsonify(models: list[Type[Model]]) -> str:
    serialized = serialize('json', models)
    objectified = json.loads(serialized)
    fields_filtered = list(map(lambda o: o['fields'], objectified))
    return json.dumps(fields_filtered)


def standard_view(views):
    def init(name):
        return path(f'{name}/', getattr(views, name), name=name)

    return init


def encrypted_view(views):
    def init(name):
        return path(f'{encrypt(name)}/', getattr(views, name), name=name)

    return init


def visualization(request_object: dict):
    car = request_object['car']
    user = request_object['userName']
    email = request_object['email']
    start = request_object['from']
    stop = request_object['to']
    notes = request_object['notes']

    start, stop = map(str_to_date, (start, stop))

    return f"{c_cyan(user)} con indirizzo email {c_cyan(email)} " \
           f"ha prenotato una {c_green(car)} per la data\n\t{c_yellow(format_IT_date(start))}\n" \
           f"da restituire in data\n\t{c_red(format_IT_date(stop))}\ne ha scritto le seguenti note: " \
           f"{c_magenta(notes)}"


def date_to_datetime(datetime_date: date):
    return datetime.combine(datetime_date, datetime.min.time())


def get_client_ip(request: WSGIRequest) -> list[str]:
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    else:
        return request.META.get('REMOTE_ADDR')


def block_user(*, request=None, ip=None) -> Blacklist:
    if request:
        ip = get_client_ip(request)
    elif not ip:
        raise TypeError("block_user() needs at least 1 keyword argument: 'request' or 'ip'")
    ip, created = IpAddress.objects.get_or_create(address=ip)
    ip: IpAddress
    if not created:
        try:
            Whitelist.objects.get(ipaddress=ip)
            green(f"{ip} not blocked because in whitelist")
            return None
        except ObjectDoesNotExist:
            pass

    blocked: Blacklist = Blacklist.objects.get_or_create(ipaddress=ip)[0]
    blocked.path = request.path
    blocked.save()
    ip.block()
    ip.increase_bad_requests()
    ip.save()
    red('BLOCKED USER', blocked)
    return blocked


def format_IT_date(date_object: Union[datetime, Date]) -> str:
    if isinstance(date_object, Date):
        date_object = date_object.date
    giorni = tuple(map(str.capitalize, "lunedì martedì mercoledì giovedì venerdì sabato domenica".split(' ')))
    mesi = "gennaio febbraio marzo aprile maggio giugno luglio " \
           "agosto settembre ottobre novembre dicembre"
    mesi = list(map(str.capitalize, mesi.split(' ')))
    return f"{giorni[date_object.weekday()]} {date_object.day} {mesi[date_object.month - 1]} {date_object.year}"


def format_EN_date(date_object: Union[datetime, Date]) -> str:
    if isinstance(date_object, Date):
        date_object = date_object.date
    return date_object.strftime("%A %d of %B %Y")


def latest_text_layout_mod(request):
    return SiteHash.objects.get(name='site_hash').date_modified


def save_car(image_basename: Union[str, PathLike], car_data: dict[str, dict[str, Union[float, bool]]]) -> Car:
    car_path = Path(static('images/cars/')[1:]) / image_basename
    car_abs_path = Path('.').resolve() / car_path
    if exists(car_abs_path):
        car_name = splitext(image_basename)[0]
        new_car, created = Car.objects.get_or_create(name=car_name.title(), **car_data)
        if created:
            new_car.path = str(car_path)
            new_car.save()
            green(f"{new_car} registered")
        else:
            yellow(f"{new_car} already exists")
        return new_car
    else:
        raise IOError(f"{car_abs_path} does not exist")


def is_malicious(url: str) -> bool:
    for pattern in FORBIDDEN_REQUESTS:
        if re.search(pattern, url, re.IGNORECASE):
            return True
    return False
