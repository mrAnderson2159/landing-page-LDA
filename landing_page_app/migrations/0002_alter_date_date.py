# Generated by Django 4.1 on 2023-01-09 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing_page_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='date',
            name='date',
            field=models.DateField(unique=True),
        ),
    ]
