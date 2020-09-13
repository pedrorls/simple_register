import pytest
from model_bakery import baker

from address.serializers import AddressSerializer



@pytest.mark.django_db
def test_serializer_create():
    address = {
        "street": "test test",
        "number": 10,
        "zip_code": "00000000",
        "city": "SP",
        "state": "SP"
    }
    serializer = AddressSerializer(data=address)
    serializer.is_valid(raise_exception=True)
    serializer.save()

@pytest.mark.django_db
def test_serializer_invalid_zip_code():
    address = {
        "street": "test test",
        "number": 10,
        "zip_code": "000000",
        "city": "SP",
        "state": "SP"
    }
    serializer = AddressSerializer(data=address)
    assert not serializer.is_valid()
