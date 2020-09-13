import pytest
from model_bakery import baker

from patient.models import Patient
from patient.serializers import PatientSerializer
from address.models import Address

address = {
    "street": "test test",
    "number": 10,
    "zip_code": "00000000",
    "city": "SP",
    "state": "SP"
}

@pytest.mark.django_db
def test_serializer_create():
    patient = {
        "name": "teste",
        "email": "teste@mail.com",
        "cpf": "00000000000",
        "phone": "00000000",
        "birth_date": "2020-09-11",        
        "address": address
    }
    serializer = PatientSerializer(data=patient)
    serializer.is_valid(raise_exception=True)
    serializer.save()


@pytest.mark.django_db
def test_serializer_create_same_cpf():
    patient = {
        "name": "teste",
        "email": "teste@mail.com",
        "cpf": "00000000000",
        "phone": "00000000",
        "birth_date": "2020-09-11",        
        "address": address
    }
    baker.make(Patient, cpf="00000000000")
    serializer = PatientSerializer(data=patient)
    assert not serializer.is_valid()

@pytest.mark.django_db
def test_serializer_create_invalid_cpf():
    patient = {
        "name": "teste",
        "email": "teste@mail.com",
        "cpf": "000000000",
        "phone": "00000000",
        "birth_date": "2020-09-11",        
        "address": address
    }
    serializer = PatientSerializer(data=patient)
    assert not serializer.is_valid()

@pytest.mark.django_db
def test_serializer_create_invalid_phone():
    patient = {
        "name": "teste",
        "email": "teste@mail.com",
        "cpf": "00000000000",
        "phone": "00000",
        "birth_date": "2020-09-11",        
        "address": address
    }
    serializer = PatientSerializer(data=patient)
    assert not serializer.is_valid()


