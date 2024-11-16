from django.urls import path
from galeria.views import index
from .views import get_entries, add_entry

urlpatterns = [
    path('', index),
    path('api/entries/', get_entries, name='get_entries'),
    path('api/entries/add/', add_entry, name='add_entry'),
]
