from django.db import models

# Create your models here.
class Date(models.Model):
    # Il DateField si aspetta un dato in formato datetime.datetime.date(), quindi il server
    # che accetta la richiesta in post di axios deve assicurarsi di convertire il dato in
    # formato str(aaaa/mm/dd) in formato datetime.date()
    date = models.DateField()

    def __str__(self):
        return self.date


class Car(models.Model):
    name = models.CharField(max_length=64, unique=True)
    img = models.URLField()
    url = models.URLField()

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField(max_length=128, unique=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_start_date')
    end = models.ForeignKey(Date, on_delete=models.CASCADE, related_name='%(class)s_end_date')
    notes = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.name}: {self.email}"
