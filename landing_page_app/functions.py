from typing import *
from hashlib import sha512

def encrypt(string: str, algorithm: Callable[AnyStr, Hashable] = sha512):
    alg = algorithm()
    alg.update(string.encode())
    return alg.hexdigest()