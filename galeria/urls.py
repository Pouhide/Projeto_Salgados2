from django.urls import path
from galeria.views import index, sobre
from . import views

urlpatterns = [
    path('', index),
    path('sobre/', sobre, name='sobre'),
    path('', views.loja_view, name='loja'),
]