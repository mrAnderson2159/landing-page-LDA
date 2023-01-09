import os
import django
# prima di manipolare i models bisogna configurare le impostazioni del progetto come segue
# *************************************************************************
os.environ['DJANGO_SETTINGS_MODULE'] = 'landing_page_lda.settings'
# *************************************************************************
django.setup()

from datetime import datetime
from random import randint
from faker import Faker
from faker.providers import DynamicProvider
from landing_page_app.models import *


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
    # Model.objects.get_or_create() restituisce la tupla (object: Model, created: bool),
    # quindi selezioniamo [0] per ottenere un puntatore all'oggetto creato
    car = Car.objects.get_or_create(
        name=fake.car(),
        img=fake.image_url(),
        url=fake.url()
    )[0]
    car.save()
    return car

def new_date(y_range: tuple,
             m_range: tuple,
             d_range: tuple,
             before: datetime = None,
             after: datetime = None
             ):
    if before is None:
        before = datetime(y_range[1], m_range[1], d_range[1])
    if after is None:
        after = datetime(y_range[0], m_range[0], d_range[0])
    if after == before:
        return after

    while True:
        y = randint(*y_range)
        m = randint(*m_range)
        d = randint(*d_range)
        date = datetime(y, m, d)

        if after <= date <= before:
            return date

def add_date(date: datetime):
    d = Date.objects.get_or_create(date=date)[0]
    d.save()
    return d

def add_user(car: Car, start: Date, end: Date):
    name = fake.name()
    email = fake.free_email()
    notes = fake.sentence(nb_words=10)
    user = User.objects.get_or_create(
        name=name,
        email=email,
        car=car,
        start=start,
        end=end,
        notes=notes
    )[0]
    user.save()
    return user


def populate(n: int = 5):
    y_range = 2023, 2023
    m_range = 1, 3
    d_range = 1, 28

    timestg = y_range, m_range, d_range

    for i in range(n):
        car = add_car()
        start = new_date(*timestg)
        end = new_date(*timestg, after=start)
        start = add_date(start)
        end = add_date(end)
        add_user(car, start, end)


if __name__ == '__main__':
    print("Populating script!")
    populate(20)
    print("Populated!")




