import pytest
from model_bakery import baker
from django.urls import reverse

@pytest.mark.django_db
def test_get_token(client, django_user_model):
    user = _create_user(django_user_model)
    response = client.post(reverse("token"), data={"username": user.username, "password": "fakepassword"})
    assert response.status_code == 200
    assert response.data["token"] != None
    assert response.data["user"]["username"] == user.username


@pytest.mark.django_db
def test_refresh_token(client, django_user_model):
    user = _create_user(django_user_model)
    response = client.post(reverse("token"), data={"username": user.username, "password": "fakepassword"})
    token = response.data["token"]
    response = client.post(reverse("refresh-token"), data={"token": token})
    assert response.status_code == 200
    assert response.data["token"] != None
    assert response.data["user"]["username"] == user.username



def _create_user(django_user_model):
    user = baker.prepare(
        django_user_model, email="test@test.com", is_superuser=True, username="Pedro"
    )
    user.set_password("fakepassword")
    user.save()
    return user