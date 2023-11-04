from rest_framework import viewsets
from .serializer import *
from .models import *


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

class VendedorView(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()


class ModelView(viewsets.ModelViewSet):
    serializer_class = ModeloSerializer
    queryset = Modelo.objects.all()


