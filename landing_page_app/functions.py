import json
import landing_page_app.views as views
from typing import *
from hashlib import sha512
from datetime import datetime
from typing import Type
from django.db.models import Model
from django.core.serializers import serialize
from django.core.handlers.wsgi import WSGIRequest
from django.urls import path
from .colors import c_yellow, c_cyan, c_green, c_red, c_magenta


def encrypt(string: str, algorithm: Callable[AnyStr, Hashable] = sha512) -> str:
    alg = algorithm()
    alg.update(string.encode())
    return alg.hexdigest()

def str_to_date(strdate: str) -> datetime:
    return datetime(*list(map(int, strdate.split('-'))))

def jsonify(models: list[Type[Model]]) -> str:
    serialized = serialize('json', models)
    objectified = json.loads(serialized)
    fields_filtered = list(map(lambda o: o['fields'], objectified))
    return json.dumps(fields_filtered)

def standard_view(name):
    return path(f'{name}/', getattr(views, name), name=name)

def encrypted_view(name):
    return path(f'{encrypt(name)}/', getattr(views, name), name=name)

def visualization(request_object: dict):
    car = request_object['car']
    user = request_object['userName']
    email = request_object['email']
    start = request_object['from']
    stop = request_object['to']
    notes = request_object['notes']

    start, stop = map(str_to_date, (start, stop))

    return f"{c_cyan(user)} con indirizzo email {c_cyan(email)} " \
           f"ha prenotato una {c_green(car)} per la data\n\t{c_yellow(start)}\n" \
           f"da restituire in data\n\t{c_red(stop)}\ne ha scritto le seguenti note: " \
           f"{c_magenta(notes)}"

def get_client_ip(request: WSGIRequest) -> list[str]:
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')
    else:
        return [request.META.get('REMOTE_ADDR')]
