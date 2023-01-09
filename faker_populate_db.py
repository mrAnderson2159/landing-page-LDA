import os
import django
import random
from faker import Faker
from faker.providers import DynamicProvider
from landing_page_app.models import *

# prima di manipolare i models bisogna configurare le impostazioni del progetto come segue
# *************************************************************************
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'landing_page_lda.settings')
# *************************************************************************

django.setup()

# FAKE POPULATION SCRIPT
car_provider = DynamicProvider(
    provider_name='car',
    elements=["Tesla","BMW","Ferrari","Ford","Porsche","Honda","Lamborghini","Toyota",
    "Bentley","Maserati","Audi","Jeep","Subaru","Cadillac","Chrysler",
    "Chevrolet Corvette","Dodge","Hyundai","Jaguar","Mazda",
    "Ford Mustang","Nissan","Alfa Romeo","Bugatti","Buick",
    "Lexus","Rolls-Royce","Acura","Aston Martin","Chevrolet",
    "Kia","Mercedes-Benz","Volkswagen","Volvo","McLaren","Mitsubishi",
    "GMC","Infiniti","Lincoln","Peugeot","Pontiac","Saab","Genesis",
    "Suzuki","Citroën","Fiat","Lotus","Mini"]
)

fake = Faker('it_IT')

fake.add_provider(car_provider)

def add_car():
    car = Car.objects.get_or_create(
        name=fake.car(),
        img=fake.image_url(),
        url=fake.url()
    )



