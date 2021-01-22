from django.conf.urls import url
from django.urls import path, re_path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.views.decorators.csrf import csrf_exempt

app_name = 'api'
router = DefaultRouter()
router.register(r'users', UserViewset, basename='user')
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'nota', NotaViewSet, basename="nota")
router.register(r'comentario', ComentarioViewSet, basename="comentario")


urlpatterns = [
    # path('auth/', csrf_exempt(obtain_auth_token)),
    path('auth/', csrf_exempt(ExtendedObtainAuthToken.as_view())),
    path('login/', LoginView.as_view()),
    path('get-csrf-token/', set_csrf_token),
]

urlpatterns += router.urls