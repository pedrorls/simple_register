from rest_framework import routers
from account.viewsets import AccountViewSet
from patient.viewsets import PatientViewSet

router = routers.DefaultRouter()
router.register(r"accounts", AccountViewSet)
router.register(r"patients", PatientViewSet)