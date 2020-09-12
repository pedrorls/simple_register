from django.db import models
from .utils import validate_zip_code


class Address(models.Model):
    street = models.CharField(max_length=250)
    number = models.PositiveIntegerField()
    additional_adress = models.TextField(max_length=100, null=True, blank=True)
    zip_code = models.CharField(max_length=8, validators=[validate_zip_code])
    city = models.CharField(max_length=250)
    state = models.CharField(max_length=250)