import json
from typing import *
from hashlib import sha512
from datetime import datetime
from typing import Type
from json import dumps, loads
from django.db.models import Model
from django.core.serializers import serialize
from django.urls import path
import landing_page_app.views as views


def encrypt(string: str, algorithm: Callable[AnyStr, Hashable] = sha512) -> str:
    alg = algorithm()
    alg.update(string.encode())
    return alg.hexdigest()

def str_to_date(strdate: str) -> datetime:
    return datetime(*list(map(int, strdate.split('-'))))

def jsonify(models: list[Type[Model]]) -> str:
    serialized = serialize('json', models)
    objectified = loads(serialized)
    fields_filtered = list(map(lambda o: o['fields'], objectified))
    return json.dumps(fields_filtered)

def standard_view(name):
    return path(f'{name}/', getattr(views, name), name=name)

def encrypted_view(name):
    return path(f'{encrypt(name)}/', getattr(views, name), name=name)