from rest_framework import status, viewsets, views
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from news.models import (Nota, Comentario)
from news.serializers import (NotaSerializer, ComentarioSerializer)


from chat.models import (Message, Room,)
from chat.serializers import (MessageSerializer, RoomSerializer, UserSerializer, UserSerializerWithToken)

from users.models import User
from users.serializers import UserSerializer
from rest_framework.response import Response
from typing import List
import json


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.all().order_by('-created_at')
    serializer_class = NotaSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def perform_create(self, serializer:NotaSerializer):
        return super().perform_create(serializer)

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticatedOrReadOnly,]
