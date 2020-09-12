from django.db import models
from .utils import validate_cpf, validate_phone
class Patient(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    cpf = models.BigIntegerField(validators=[validate_cpf])
    birth_date = models.DateField()
    phone = models.BigIntegerField(validators=[validate_phone])

    def __str__(self):
        return self.name


