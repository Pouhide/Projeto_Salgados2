from django.urls import path
from .views import index, sobre, api_carrinho, api_carrinho_add

urlpatterns = [
    path('', index, name='index'),
    path('sobre/', sobre, name='sobre'),
    path('api/carrinho/', api_carrinho, name='api_carrinho'),  # Retorna o carrinho atual
    path('api/carrinho/add/', api_carrinho_add, name='api_carrinho_add'),  # Adiciona item ao carrinho
]
