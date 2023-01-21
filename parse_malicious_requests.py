from sys import argv
from typing import *


def add_or_update(dict_: dict[str, int], key: str) -> None:
    if key not in dict_:
        dict_[key] = 1
    else:
        dict_[key] += 1


def main(argv: list[str]):
    filename = argv[0]

    with open(filename, 'r') as file:
        lines = file.readlines()

    to_be_blocked = [l for l in lines if l.startswith('MAYBE TO BE BLOCKED USER')]
    users = {ip for ip in map(lambda l: l[25:37], to_be_blocked)}
    malicious_freq = {}

    checked = []

    for ip in users:
        for i in range(len(to_be_blocked)):
            if i not in checked and ip in to_be_blocked[i]:
                add_or_update(malicious_freq, ip)
                checked.append(i)

    bad_requests = set(map(lambda l: l[l.index('GET ') + 5:-3], to_be_blocked))

    print(malicious_freq)
    print(bad_requests)

if __name__ == '__main__':
    main(argv[1:])
