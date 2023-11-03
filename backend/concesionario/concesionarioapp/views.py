from rest_framework import viewsets
from .serializer import ModeloSerializer
from .models import Modelo

class ModelView(viewsets.ModelViewSet):
    serializer_class = ModeloSerializer
    queryset = Modelo.objects.all()
