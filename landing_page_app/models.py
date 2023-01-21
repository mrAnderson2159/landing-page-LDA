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


# Create your models here.
class Date(models.Model):
    # Il DateField si aspetta un dato in formato datetime.datetime.date(), quindi il server
    # che accetta la richiesta in post di axios deve assicurarsi di convertire il dato in
    # formato str(aaaa/mm/dd) in formato datetime.date()
    date = models.DateField(unique=True)

    def __str__(self):
        return str(self.date)


class Car(models.Model):
    name = models.CharField(max_length=64, unique=True)
    img = models.URLField()
    url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.name}"


class Client(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=128, unique=True)

    def __str__(self):
        return f"{self.name}, {self.email}"


class Request(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_start_date')
    stop = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_end_date')
    notes = models.CharField(max_length=256, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} for {self.car} from {self.start} to {self.stop}"


class Blacklist(models.Model):
    name = models.CharField(max_length=128, blank=True)
    ipaddress = models.GenericIPAddressField(protocol='IPv4', unique=True)
    record = models.DateField(auto_now_add=True)
    path = models.CharField(max_length=512, blank=True)
    blocked_forever = models.BooleanField(default=False)

    def __str__(self):
        res = ''
        if self.name:
            res = f"{self.name} - "
        res += f"{self.ipaddress} - {self.record} - GET {self.path}"
        return res


class Whitelist(models.Model):
    ipaddress = models.GenericIPAddressField(protocol='IPv4', unique=True)
    #user: User = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    client: Client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        res = ''
        # if self.user:
        #     fn = self.user.first_name
        #     ln = self.user.last_name
        #     if not (fn or ln):
        #         res = f"{self.user.username} - "
        #     else:
        #         if fn:
        #             res += fn + ' '
        #         if ln:
        #             res += ln + ' '
        #         res += '- '
        # elif self.client:
        #     res = f"{self.client.name} - "

        return res + self.ipaddress
