# to parse data from a client
from rest_framework.parsers import JSONParser
# to bypass having a csrf token
from django.views.decorators.csrf import csrf_exempt
# to send the response to the client
from django.http import JsonResponse


# Create your views here.

@csrf_exempt
def form(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        return JsonResponse(data, safe=False)
