from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import HttpResponse

from .functions import get_client_ip, date_to_datetime
from .models import Blacklist
from .colors import red, green

BLOCK_DAYS = 7

def unlocked(function):
    def wrapper(request, *args, **kwargs):
        client_ip = get_client_ip(request)
        try:
            blocked_ip = Blacklist.objects.get(ipaddress=client_ip)
            if blocked_ip.blocked_forever:
                red(f'{request} rejected from user {client_ip} due to ETERNAL BLOCK')
                return HttpResponse(f"<h1><strong>YOU ARE BLOCKED FOREVER</strong></h1>\n", status=403)
            record_date = date_to_datetime(blocked_ip.record)
            block_days = timedelta(days=BLOCK_DAYS)
            today = datetime.today()
            expiration_date = record_date + block_days

            if expiration_date < today:
                blocked_ip.delete()
                return function(request, *args, **kwargs)

            red(f'{request} rejected from user {client_ip} due to block in date {record_date}')
            return HttpResponse(f"<h1><strong>YOU ARE BLOCKED UNTIL DAY {expiration_date.strftime('%A %d of %B %Y').upper()}</strong></h1>\n", status=403)
        except ObjectDoesNotExist:
            green(client_ip)
            return function(request, *args, **kwargs)
    return wrapper
