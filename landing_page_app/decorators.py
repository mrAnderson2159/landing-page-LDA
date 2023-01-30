from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import HttpResponse

from .global_settings import BLOCK_DAYS
from .functions import get_client_ip, date_to_datetime, format_EN_date
from .models import Blacklist, IpAddress
from .colors import red, green, cyan


def unlocked(*,
             increase_views: bool = False,
             increase_bad_requests: bool = False):
    def init(function):
        def wrapper(request, *args, **kwargs):
            print()
            client_ip = get_client_ip(request)
            ip, created = IpAddress.objects.get_or_create(address=client_ip)
            ip: IpAddress
            if created:
                cyan("NEW USER")
            try:
                blacklist_ip: Blacklist = Blacklist.objects.get(ipaddress=ip)  # Questo genera l'eccezione
                red(ip.address, ip.name)

                if increase_bad_requests:
                    ip.increase_bad_requests()

                    if not ip.name and ip.bad_requests >= 45:
                        cyan(f'{ip.address} just became an HACKERMAN')
                        ip.name = "HACKERMAN"
                    elif not blacklist_ip.blocked_forever and ip.bad_requests >= 10:
                        blacklist_ip.block_forever()
                        blacklist_ip.save()
                        red(f'{ip.address} surpassed 10 bad requests, BLOCKED FOREVER')

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
                green(ip)
                if increase_views:
                    ip.increase_views()
                ip.save()
                return function(request, *args, **kwargs)  # <<<< SALVA DATABASE PRIMA DELLA FUNZIONE

        return wrapper

    return init
