from django.shortcuts import render
from django.http import JsonResponse
from .models import Entry

def index(request):
    return render(request, 'galeria/index.html')

#Banco de dados
def get_entries(request):
    entries = list(Entry.objects.values())
    return JsonResponse(entries, safe=False)

def add_entry(request):
    if request.method == 'POST':
        data = request.POST
        entry = Entry.objects.create(name=data['name'], description=data['description'])
        return JsonResponse({'id': entry.id, 'name': entry.name, 'description': entry.description})