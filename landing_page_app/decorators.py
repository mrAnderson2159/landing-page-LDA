from .functions import get_client_ip


def use_client_ip(callback = print):
    def inner(function):
        def wrapper(request):
            ip = get_client_ip(request)
            callback(ip)
            return function(request)
        return wrapper
    return inner
