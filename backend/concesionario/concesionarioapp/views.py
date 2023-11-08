from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed
from django.db.models.deletion import ProtectedError
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

    def destroy(self, request, *args, **kwargs):
        modelo = self.get_object()

        try:
            self.perform_destroy(modelo)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protectec_objects = list(e.protected_objects)

            if protectec_objects:
                first_protected_object = protectec_objects[0]
                table_name  = first_protected_object._meta.verbose_name_plural
            else:
                table_name = ''
            
            raise serializers.ValidationError({'protected': f'No se puede eliminar el modelo porque esta referenciado en {table_name}'})
        
        except Exception as e:
            raise serializers.ValidationError({'error': e})


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




