from rest_framework import viewsets
from .models import Address
from .serializer import AddressSerialier


class AddressViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerialier