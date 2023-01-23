from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import HttpResponse

from .functions import get_client_ip, date_to_datetime, format_EN_date
from .models import Blacklist, IpAddress
from .colors import red, green


def unlocked(*, increase_views: bool):
    def init(function):
        BLOCK_DAYS = 7

        def wrapper(request, *args, **kwargs):
            client_ip = get_client_ip(request)
            ip: IpAddress = IpAddress.objects.get_or_create(address=client_ip)[0]
            try:
                blacklist_ip: Blacklist = Blacklist.objects.get(ipaddress=ip)
                if blacklist_ip.blocked_forever:
                    red(f'{request} rejected from user {client_ip} due to ETERNAL BLOCK')
                    return HttpResponse(f"<h1><strong>YOU ARE BLOCKED FOREVER</strong></h1>\n", status=403)
                record_date = date_to_datetime(blacklist_ip.record)
                block_days = timedelta(days=BLOCK_DAYS)
                today = datetime.today()
                expiration_date = record_date + block_days

                if expiration_date < today:
                    blacklist_ip.delete()
                    ip.unlock()
                    return function(request, *args, **kwargs)

                red(f'{request} rejected from user {client_ip} due to block in date {format_EN_date(record_date)}')
                return HttpResponse(f"<h1><strong>YOU ARE BLOCKED UNTIL DAY {format_EN_date(expiration_date).upper()}</strong></h1>\n", status=403)
            except ObjectDoesNotExist:
                if increase_views:
                    ip.increase_views()
                ip.save()
                green(client_ip)
                return function(request, *args, **kwargs)
        return wrapper
    return init