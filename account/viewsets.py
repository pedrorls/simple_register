from django.contrib.auth.models import User
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserSerializer


class AccountViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=["GET"], detail=False, url_path="current_user")
    def get_current_user(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)