from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed
from .serializer import *
from .models import *


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
        

class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

    def destroy(self, request, *args, **kwargs):
        cliente = self.get_object()

        if cliente.usuario.is_superuser:
            return Response({'detail': 'No se puede eliminar un usuario administrador'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente.usuario.delete()
        
        self.perform_destroy(cliente)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class EmpleadoView(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()

    def destroy(self, request, *args, **kwargs):
        empleado = self.get_object()

        if empleado.usuario.is_superuser:
            return Response({'detail': 'No se puede eliminar un usuario administrador'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            empleado.usuario.delete()
        
        self.perform_destroy(empleado)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModelView(viewsets.ModelViewSet):
    serializer_class = ModeloSerializer
    queryset = Modelo.objects.all()


class VehiculoView(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    queryset = Vehiculo.objects.all()


class VentaVehiculoView(viewsets.ModelViewSet):
    serializer_class = VentaVehiculoSerializer
    queryset = Venta_Vehiculo.objects.all()


class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

    def destroy(self, request, *args, **kwargs):
        return MethodNotAllowed('DELETE', detail='No se puede eliminar una venta')




