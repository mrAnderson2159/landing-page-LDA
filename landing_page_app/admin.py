from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
import landing_page_app.models as models
import typing

# Register your models here.
TYPES = dir(typing)
fields = [field for field in dir(models) if field[0].isupper() and field not in TYPES ]

for field in fields:
    try:
        admin.site.register(getattr(models, field))
        print(f'Registered "{field}" model to admin site')
    except AlreadyRegistered:
        continue

print("\nImport shortcats")
for field in fields:
    print(f"from landing_page_app.models import {field}")
print()