from sys import argv
from time import sleep
from os import chdir
from os.path import dirname
from landing_page_app.colors import yellow
import re

chdir(dirname(__file__))

class ChangeFields:
    def __init__(self, django_secret_key, email_sender_password):
        self.django_secret_key = django_secret_key
        self.email_sender_password = email_sender_password
        self.prev = {}

    def __x_settings_py(self, direction):
        assert direction in ('invert', 'revert')
        path = 'landing_page_lda/settings.py'
        with open(path, 'r') as file:
            settings = file.read()
        django_secret_key_placeholder = "{{secret_key}}"

        if direction == 'invert':
            self.prev['debug'] = debug = re.search(r'DEBUG = (\w+)', settings).group(1)
            settings = settings.replace(f"DEBUG = {debug}", "DEBUG = False")\
                .replace(django_secret_key_placeholder, self.django_secret_key)
        else:
            settings = settings.replace("DEBUG = False", f"DEBUG = {self.prev['debug']}")\
                .replace(self.django_secret_key, django_secret_key_placeholder)

        with open(path, 'w') as file:
            file.write(settings)

    def __x_email_sender_py(self, direction):
        assert direction in ('invert', 'revert')
        path = 'landing_page_app/email_sender.py'
        with open(path, 'r') as file:
            email_sender = file.read()
        password_placeholder = "{{password}}"

        if direction == 'invert':
            email_sender = email_sender.replace(password_placeholder, self.email_sender_password)
        else:
            email_sender = email_sender.replace(self.email_sender_password, password_placeholder)

        with open(path, 'w') as file:
            file.write(email_sender)
# currentPage:"HomePage"
    def __x_index_js(self, direction):
        assert direction in ('invert', 'revert')
        path = 'static/src/vue/dist/assets/index.js'
        with open(path, 'r') as file:
            index_js = file.read()

        if direction == 'invert':
            self.prev['currentPage'] = currentPage = re.search(r'currentPage:"(\w+)"', index_js).group(1)
            index_js = index_js.replace(f'currentPage:"{currentPage}"', 'currentPage:"HomePage"')
        else:
            index_js = index_js.replace('currentPage:"HomePage"', f'currentPage:"{self.prev["currentPage"]}"')

        with open(path, 'w') as file:
            file.write(index_js)

    def __call__(self):
        methods = [getattr(self, method) for method in dir(self) if '__x_' in method]
        for direction in ('invert', 'revert'):
            yellow(f"{direction.upper()} KEYS")
            for method in methods:
                method(direction)
            sleep(3)





if __name__ == '__main__':
    DJANGO_SECRET_KEY, EMAIL_SENDER_PASSWORD = argv[1:]
    ChangeFields(DJANGO_SECRET_KEY, EMAIL_SENDER_PASSWORD)()