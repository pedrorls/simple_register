from rest_framework import serializers
from .models import Patient
from address.serializers import AddressSerializer
from address.models import Address

class PatientSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    class Meta:
        model = Patient
        fields = ("id", "name", "email", "cpf", "birth_date", "phone", "address")

    def create(self, validated_data):
        address = Address.objects.create(**validated_data["address"])
        validated_data["address"] = address
        Patient.objects.create(**validated_data)

        return validated_data


    def update(self, instance, validated_data):
        Address.objects.filter(pk=instance.address.pk).update(
            **validated_data["address"]
        )
        instance.name = validated_data["name"]
        instance.email = validated_data["email"]
        instance.cpf = validated_data["cpf"]
        instance.birth_date = validated_data["birth_date"]
        instance.phone = validated_data["phone"]
        instance.save()
        return validated_data
