# to parse data from a client
from rest_framework.parsers import JSONParser
# to bypass having a csrf token
from django.views.decorators.csrf import csrf_exempt
# to send the response to the client
from django.http import JsonResponse

from termcolor import colored
from datetime import datetime

def str_to_date(strdate: str):
    return datetime(*list(map(int, strdate.split('-'))))




def visualization(request_object):
    car = request_object['car']
    user = request_object['userName']
    email = request_object['email']
    start = request_object['from']
    stop = request_object['to']
    notes = request_object['notes']

    start, stop = map(str_to_date, (start, stop))

    return f"{colored(user, 'cyan')} con indirizzo email {colored(email, 'cyan')} " \
           f"ha prenotato una {colored(car, 'green')} per la data\n\t{colored(start, 'yellow')}\n" \
           f"da restituire in data\n\t{colored(stop, 'red')}\ne ha scritto le seguenti note:" \
           f"{colored(notes, 'magenta')}"



# Create your views here.

@csrf_exempt
def form(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(visualization(data))
        return JsonResponse(data, safe=False)
