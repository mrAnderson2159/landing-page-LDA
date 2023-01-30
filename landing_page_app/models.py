# __all__ = [
#     "Date",
#     "Client",
#     "Whitelist",
#     "Blacklist",
#     "Request",
#     "Car",
#
# ]
import json
import re

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from typing import Union as _Union, Union, Optional


# Create your models here.
class Date(models.Model):
    # Il DateField si aspetta un dato in formato datetime.datetime.date(), quindi il server
    # che accetta la richiesta in post di axios deve assicurarsi di convertire il dato in
    # formato str(aaaa/mm/dd) in formato datetime.date()
    date = models.DateTimeField(unique=True)

    @classmethod
    def format_IT_date(cls, date_object: _Union[datetime, 'Date']):
        if isinstance(date_object, cls):
            date_object = date_object.date
        giorni = tuple(map(str.capitalize, "lunedì martedì mercoledì giovedì venerdì sabato domenica".split(' ')))
        mesi = "gennaio febbraio marzo aprile maggio giugno luglio " \
               "agosto settembre ottobre novembre dicembre"
        mesi = list(map(str.capitalize, mesi.split(' ')))

        weekday = giorni[date_object.weekday()]
        day = date_object.day
        month = mesi[date_object.month - 1]
        year = date_object.year
        hour = date_object.hour
        minute = date_object.minute

        return f"{weekday} {day} {month} {year} - {hour}:{minute}"

    def __str__(self):
        return self.format_IT_date(self.date)


class Car(models.Model):
    name = models.CharField(max_length=64, unique=True)
    path = models.CharField(max_length=1024, blank=True)
    url = models.URLField(blank=True)
    active = models.BooleanField(default=True)
    engine_capacity = models.PositiveIntegerField(blank=True, default=0)
    horse_power = models.PositiveIntegerField(blank=True, default=0)
    supply = models.CharField(max_length=32, blank=True)
    daily_km = models.PositiveIntegerField(blank=True, default=0)
    price = models.FloatField(blank=True, default=0.)

    def activate(self):
        self.active = True

    def deactivate(self):
        self.active = False

    def __str__(self):
        res = f"{self.name}"
        if not self.active:
            res += ' - INACTIVE'
        return res

class Client(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=128, unique=True)

    def __str__(self):
        return f"{self.name}"


class Request(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_start_date')
    stop = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_end_date')
    notes = models.CharField(max_length=256, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} ha prenotato una {self.car} da {Date.format_IT_date(self.start)} a {Date.format_IT_date(self.stop)}"


class IpAddress(models.Model):
    name = models.CharField(max_length=64, blank=True)
    address = models.GenericIPAddressField(protocol='IPv4', unique=True)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    client: Client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    blocked = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    bad_requests = models.PositiveIntegerField(default=0)
    subscriptions = models.PositiveIntegerField(default=0)

    def increase_views(self):
        self.views += 1

    def increase_subscriptions(self):
        self.subscriptions += 1

    def increase_bad_requests(self):
        self.bad_requests += 1

    def block(self):
        self.blocked = True

    def unlock(self):
        self.blocked = False

    def __str__(self):
        res = ''
        if self.name:
            res += f"{self.name} - "
        elif self.user:
            fn = self.user.first_name
            ln = self.user.last_name
            if not (fn or ln):
                res = f"{self.user.username} - "
            else:
                if fn:
                    res += fn + ' '
                if ln:
                    res += ln + ' '
                res += '- '
        elif self.client:
            res = f"{self.client.name} - "

        res += self.address

        if self.blocked:
            res += ' - BLOCKED'

        return res

# print('\n'.join(map(str,(IpAddress.objects.filter(blocked=True).order_by('-bad_requests').values('address','bad_requests')))))

class Blacklist(models.Model):
    ipaddress: IpAddress = models.ForeignKey(IpAddress, on_delete=models.CASCADE, blank=True, null=True)
    record = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=512, blank=True)
    blocked_forever = models.BooleanField(default=False)

    def block_forever(self):
        self.blocked_forever = True

    def __str__(self):
        ip = str(self.ipaddress).replace(' - BLOCKED', '')
        res = f"{ip} - {Date.format_IT_date(self.record)} - GET {self.path}"
        if self.blocked_forever:
            res += ' --- FOREVER'
        return res


class Whitelist(models.Model):
    ipaddress: IpAddress = models.ForeignKey(IpAddress, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        res = ''
        if self.ipaddress.user:
            fn = self.ipaddress.user.first_name
            ln = self.ipaddress.user.last_name
            if not (fn or ln):
                res = f"{self.ipaddress.user.username} - "
            else:
                if fn:
                    res += fn + ' '
                if ln:
                    res += ln + ' '
                res += '- '
        elif self.ipaddress.client:
            res = f"{self.ipaddress.client.name} - "

        return res + self.ipaddress.address


class TextLayout(models.Model):
    name = models.CharField(max_length=32, unique=True)
    data = models.JSONField(max_length=65536)
    date_modified = models.DateTimeField(auto_now=True)

    @classmethod
    @property
    def text_layout(cls):
        return cls.objects.get(name='text_layout')

    def add_field(self, name: str,
                  label: str,
                  *,
                  fields: Union[list[str], tuple[str]] = [],
                  before: str = '') -> dict:
        fields = ["value", "label", *fields]
        text_layout = json.loads(self.data)

        if name in text_layout:
            raise ValueError(f"{name} already exists in text layout")

        if not re.match(r'^[^0-9][a-zA-Z0-9]+$', name):
            raise ValueError(f"{name} must be a valid camelCase javascript identifier")

        new_field = {field: '' for field in fields}
        new_field["label"] = label

        if before:
            if before not in text_layout:
                raise ValueError(f"There's no field named {before} to append {name} before")
            listed: list[tuple[str, dict]] = list(json.loads(self.data).items())
            pos = list(map(lambda t: t[0], listed)).index(before)
            listed.insert(pos, (name, new_field))
            text_layout = dict(listed)
        else:
            text_layout[name] = new_field

        self.data = json.dumps(text_layout)
        self.save()
        return {'name': name, **new_field}

    def remove_field(self, name: str) -> dict:
        text_layout = json.loads(self.data)
        if name in text_layout:
            delated = text_layout[name]
            del text_layout[name]
            self.data = json.dumps(text_layout)
            self.save()
            return {'name': name, **delated}
        return None

    def __str__(self):
        return self.name