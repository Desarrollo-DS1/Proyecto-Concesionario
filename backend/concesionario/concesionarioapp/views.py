from django.http import JsonResponse
from rest_framework import viewsets
from .serializer import ModeloSerializer
from .models import Modelo

"""
def get_data(request):
    data_list = ["Hola"]
    return JsonResponse(data_list, safe=False)
"""
class ModelView(viewsets.ModelViewSet):
    serializer_class = ModeloSerializer
    queryset = Modelo.objects.all()
