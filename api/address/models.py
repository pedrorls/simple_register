from django.db import models
from patient.models import Patient
from .utils import validate_zip_code


class Address(models.Model):
    street = models.CharField(max_length=250)
    number = models.PositiveIntegerField()
    additional_adress = models.TextField(max_length=100, null=True, blank=True)
    zip_code = models.IntegerField(validators=[validate_zip_code])
    city = models.CharField(max_length=250)
    state = models.CharField(max_length=250)
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name="address")