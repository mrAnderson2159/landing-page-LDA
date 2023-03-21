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
import pandas as pd

if __name__ == '__main__':
    cars_data = pd.read_csv(static('data/cars_data.csv')[1:], sep=';').to_dict('index').values()
    cars_data = {car['name'].lower(): {k:v for k,v in car.items() if k != 'name'} for car in cars_data}
    cars = (img for img in listdir(static('images/cars')[1:]) if '.jpg' in img.lower())
    for car in cars:
        save_car(car, cars_data[car[:-4].lower()])
        print(f'updating {car}: {cars_data[car[:-4].lower()]}')