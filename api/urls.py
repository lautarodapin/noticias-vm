from django.conf.urls import url
from django.urls import path, re_path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'api'
router = DefaultRouter()
router.register('users', UserViewset, 'user')

urlpatterns = [
    path('auth/', obtain_auth_token),
]

urlpatterns += router.urls