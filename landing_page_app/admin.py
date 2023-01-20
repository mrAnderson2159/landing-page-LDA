from django.contrib import admin
import landing_page_app.models as models

# Register your models here.
for field in dir(models):
    if field[0].isupper():
        model = getattr(models, field)
        admin.site.register(model)
        print(f'Registered "{field}" model to admin site')
