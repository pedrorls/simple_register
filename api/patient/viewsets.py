from rest_framework import viewsets

from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.select_related("address")