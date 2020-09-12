from django.db import models
from .utils import validate_cpf, validate_phone
from address.models import Address
class Patient(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    cpf = models.BigIntegerField(validators=[validate_cpf], unique=True)
    birth_date = models.DateField()
    phone = models.BigIntegerField(validators=[validate_phone])
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, related_name="address", null=True)


    def __str__(self):
        return self.name


