from .functions import get_client_ip, date_to_datetime
from .models import Blacklist
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import HttpResponse


def unlocked(function):
    def wrapper(request):
        client_ip = get_client_ip(request)
        try:
            blocked_ip = Blacklist.objects.get(ipaddress=client_ip)
            record_date = date_to_datetime(blocked_ip.record)
            block_days = timedelta(days=3)
            today = datetime.today()
            expiration_date = record_date + block_days

            if expiration_date < today:
                blocked_ip.delete()
                return function(request)

            return HttpResponse(f"<h1><strong>USER BLOCKED UNTIL DAY {expiration_date}</strong></h1>")
        except ObjectDoesNotExist:
            return function(request)
    return wrapper
