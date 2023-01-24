from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import HttpResponse

from .functions import get_client_ip, date_to_datetime, format_EN_date
from .models import Blacklist, IpAddress
from .colors import red, green


def unlocked(*,
             increase_views: bool = False,
             increase_bad_requests: bool = False):
    def init(function):
        BLOCK_DAYS = 7

        def wrapper(request, *args, **kwargs):
            client_ip = get_client_ip(request)
            ip: IpAddress = IpAddress.objects.get_or_create(address=client_ip)[0]
            try:
                blacklist_ip: Blacklist = Blacklist.objects.get(ipaddress=ip)  # Questo genera l'eccezione
                if ip.bad_requests >= 10 and not blacklist_ip.blocked_forever:
                    blacklist_ip.block_forever()
                    blacklist_ip.save()
                    red(f'{ip} surpassed 10 bad requests, BLOCKED FOREVER')

                if increase_bad_requests:
                    ip.increase_bad_requests()
                    ip.save()

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
                    blacklist_ip.save()
                    ip.save()
                    return function(request, *args, **kwargs)  # <<<< SALVA DATABASE PRIMA DELLA FUNZIONE

                red(f'{request} rejected from user {client_ip} '
                    f'due to block in date {format_EN_date(record_date)}')

                return HttpResponse(
                    f"<h1><strong>YOU ARE BLOCKED UNTIL DAY "
                    f"{format_EN_date(expiration_date).upper()}</strong></h1>\n",
                    status=403)
            except ObjectDoesNotExist:
                green(client_ip)
                if increase_views:
                    ip.increase_views()
                ip.save()
                return function(request, *args, **kwargs)  # <<<< SALVA DATABASE PRIMA DELLA FUNZIONE

        return wrapper

    return init
