from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import MethodNotAllowed
from django.db.models.deletion import ProtectedError
from .serializer import *
from .models import *
import requests


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
        

class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

    def destroy(self, request, *args, **kwargs):
        cliente = self.get_object()
        
        try:
            cliente.usuario.delete()
            self.perform_destroy(cliente)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protected_objects = list(e.protected_objects)

            if protected_objects:
                first_protected_object = protected_objects[0]
                table_name = first_protected_object._meta.verbose_name
            else: 
                table_name = ''

            raise serializers.ValidationError({'protected': f'No se puede eliminar el cliente porque está referenciado en la tabla {table_name}.'})
        
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})
    

class EmpleadoView(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()

    def destroy(self, request, *args, **kwargs):
        empleado = self.get_object()


        try:
            empleado.usuario.delete()
            self.perform_destroy(empleado)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protected_objects = list(e.protected_objects)

            if protected_objects:
                first_protected_object = protected_objects[0]
                table_name = first_protected_object._meta.verbose_name
            else: 
                table_name = ''

            raise serializers.ValidationError({'protected': f'No se puede eliminar el empleado porque está referenciado en la tabla {table_name}.'})
    
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})
        

class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()


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

    def destroy(self, request, *args, **kwargs):
        vehiculo = self.get_object()

        try:
            self.perform_destroy(vehiculo)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protectec_objects = list(e.protected_objects)

            if protectec_objects:
                first_protected_object = protectec_objects[0]
                table_name  = first_protected_object._meta.verbose_name_plural
            else:
                table_name = ''
            
            raise serializers.ValidationError({'protected': f'No se puede eliminar el vehiculo porque esta referenciado en {table_name}'})
        
        except Exception as e:
            raise serializers.ValidationError({'error': e})

class ColorView(viewsets.ModelViewSet):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()

class VentaVehiculoView(viewsets.ModelViewSet):
    serializer_class = VentaVehiculoSerializer
    queryset = Venta_Vehiculo.objects.all()


class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

    def destroy(self, request, *args, **kwargs):
        return MethodNotAllowed('DELETE', detail='No se puede eliminar una venta')

class CotizacionModeloView(viewsets.ModelViewSet):
    serializer_class = CotizacionModeloSerializer
    queryset = Cotizacion_Modelo.objects.all()

class CotizacionView(viewsets.ModelViewSet):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()


@api_view(['POST'])
def recaptcha(request):
    captcha_token = request.data.get('captcha_token')

    if not captcha_token:
        return Response({"missing_captcha": "El captcha es requerido"}, status=400)
    
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
        'secret': '6LcaL_8oAAAAAKsq5c-ImF_wkAQdhX4Xb4xWKfYf',
        'response': captcha_token
    })

    result = response.json()
    
    if result.get('success'):
        return Response({"success": "El captcha es válido"})
    else:
        return Response({"fail": result.get('error-codes')[0]}, status=400)
    