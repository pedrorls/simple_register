from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            "id",
            "street",
            "number",
            "additional_adress",
            "zip_code",
            "city",
            "state",
        )
