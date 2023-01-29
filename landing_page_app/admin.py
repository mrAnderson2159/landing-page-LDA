from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
import landing_page_app.models as models
import typing

# Register your models here.
TYPES = dir(typing)

for field in dir(models):
    if field[0].isupper() and field not in TYPES:
        model = getattr(models, field)
        try:
            # print(model)
            admin.site.register(model)
            print(f'Registered "{field}" model to admin site')
        except AlreadyRegistered:
            continue
