# __all__ = [
#     "Date",
#     "Client",
#     "Whitelist",
#     "Blacklist",
#     "Request",
#     "Car",
#
# ]
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from typing import Union as _Union


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
    engine_capacity = models.IntegerField(blank=True, default=0)
    horse_power = models.IntegerField(blank=True, default=0)
    supply = models.CharField(max_length=32, blank=True)
    daily_km = models.IntegerField(blank=True, default=0)
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
    address = models.GenericIPAddressField(protocol='IPv4', unique=True)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    client: Client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    blocked = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    bad_requests = models.IntegerField(default=0)
    subscriptions = models.IntegerField(default=0)

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
        if self.user:
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



class Blacklist(models.Model):
    name = models.CharField(max_length=128, blank=True)
    ipaddress: IpAddress = models.ForeignKey(IpAddress, on_delete=models.CASCADE, blank=True, null=True)
    record = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=512, blank=True)
    blocked_forever = models.BooleanField(default=False)

    def block_forever(self):
        self.blocked_forever = True

    def __str__(self):
        res = ''
        if self.name:
            res = f"{self.name} - "
        res += f"{self.ipaddress.address} - {Date.format_IT_date(self.record)} - GET {self.path}"
        if self.blocked_forever:
            res += ' --- FOREVER'
        return res


class Whitelist(models.Model):
    ipaddress: IpAddress = models.ForeignKey(IpAddress, on_delete=models.CASCADE, blank=True, null=True)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    client: Client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        res = ''
        if self.user:
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

        return res + self.ipaddress.address


class TextLayout(models.Model):
    name = models.CharField(max_length=32, unique=True)
    data = models.JSONField(max_length=65536)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name