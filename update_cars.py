import os
import django
# *************************************************************************
os.environ['DJANGO_SETTINGS_MODULE'] = 'landing_page_lda.settings'
django.setup()
print('\n' * 3)
# *************************************************************************

from landing_page_app.functions import save_car
from os import listdir, getcwd
from django.templatetags.static import static

if __name__ == '__main__':
    cars = (img for img in listdir(static('images/cars')[1:]) if 'jpg' in img.lower())
    for car in cars:
        save_car(car)