from genericpath import exists
import json
from _pytest.config import console_main
import pytest
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from patient.models import Patient
from address.models import Address 

address = {
        "street": "test test",
        "number": 10,
        "zip_code": "00000000",
        "city": "SP",
        "state": "SP"
        
    }
patient = {
    "name": "teste",
    "email": "teste@mail.com",
    "cpf": "00000000000",
    "phone": "00000000",
    "birth_date": "2020-09-11",        
    "address": address
}

@pytest.mark.django_db
def test_list_patients(client, django_user_model):
    token  = _create_authenticated_user(client, django_user_model)
    baker.make(Patient, _quantity=5)
    response = client.get(reverse("api:patient-list"), **{'HTTP_AUTHORIZATION': f'JWT {token}'})
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 5


@pytest.mark.django_db
def test_create_patient(client, django_user_model):
    token = _create_authenticated_user(client, django_user_model)
    response = client.post(
        reverse("api:patient-list"),
        content_type="application/json",
        data=json.dumps(patient),  
        **{'HTTP_AUTHORIZATION': f'JWT {token}'}
        )
    assert response.status_code == status.HTTP_201_CREATED
    assert Patient.objects.filter(id=response.data["id"]).exists()

@pytest.mark.django_db
def test_cannot_create_patient_with_same_cpf(client, django_user_model):
    baker.make(Patient, cpf="00000000000")
    token = _create_authenticated_user(client, django_user_model)
    response = client.post(
        reverse("api:patient-list"),
        content_type="application/json",
        data=json.dumps(patient),  
        **{'HTTP_AUTHORIZATION': f'JWT {token}'}
        )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert Patient.objects.count() == 1


@pytest.mark.django_db
def test_update_patient(client, django_user_model):
    existed_patient = baker.make(Patient, cpf="00000000000", address=baker.make(Address))
    token = _create_authenticated_user(client, django_user_model)
    response = client.patch(
        reverse("api:patient-detail", kwargs={"pk": existed_patient.id}),
        content_type="application/json",
        data=json.dumps(patient),  
        **{'HTTP_AUTHORIZATION': f'JWT {token}'}
        )
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_delete_patient(client, django_user_model):
    patient = baker.make(Patient, address=baker.make(Address))
    token = _create_authenticated_user(client, django_user_model)
    response = client.delete(
        reverse("api:patient-detail", kwargs={"pk": patient.id}),
        content_type="application/json",
        **{'HTTP_AUTHORIZATION': f'JWT {token}'}
        )
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Patient.objects.filter(id=patient.id).exists()
    assert not Address.objects.filter(id=patient.address.id).exists()


def _create_authenticated_user(client, django_user_model):
    user = baker.prepare(
        django_user_model, email="test@test.com", is_active=True, username="Pedro"
    )
    user.set_password("fakepassword")
    user.save()
    response = client.post(reverse("token"), data={"username": user.username, "password": "fakepassword"})
    return response.data["token"]