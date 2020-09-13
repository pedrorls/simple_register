import pytest
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from address.models import Address 


@pytest.mark.django_db
def test_list_addresses(client, django_user_model):
    token  = _create_authenticated_user(client, django_user_model)
    baker.make(Address, _quantity=5)
    response = client.get(reverse("api:address-list"), **{'HTTP_AUTHORIZATION': f'JWT {token}'})
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 5


def _create_authenticated_user(client, django_user_model):
    user = baker.prepare(
        django_user_model, email="test@test.com", is_active=True, username="Pedro"
    )
    user.set_password("fakepassword")
    user.save()
    response = client.post(reverse("token"), data={"username": user.username, "password": "fakepassword"})
    return response.data["token"]