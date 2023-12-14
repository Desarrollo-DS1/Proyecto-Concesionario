from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import IsAuthenticated
from django.db.models.deletion import ProtectedError
from django.db import connection
from django.utils import timezone
from datetime import timedelta, datetime
from .permissions import EsEmpleado, EsGerente, EsVendedorOGerente, EsJefeDeTallerOGerente
from .serializer import *
from .models import *
from .utils import *
from decouple import config
import requests
import calendar


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    permission_classes = [IsAuthenticated, EsEmpleado]
        

class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()
    permission_classes = [IsAuthenticated, EsEmpleado]

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
    permission_classes = [IsAuthenticated, EsGerente]

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
    permission_classes = [IsAuthenticated, EsGerente]

    def destroy(self, request, *args, **kwargs):
        sucursal = self.get_object()

        try:
            self.perform_destroy(sucursal)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protectec_objects = list(e.protected_objects)

            if protectec_objects:
                first_protected_object = protectec_objects[0]
                table_name  = first_protected_object._meta.verbose_name_plural
            else:
                table_name = ''
            
            raise serializers.ValidationError({'protected': f'No se puede eliminar la sucursal porque esta referenciado en {table_name}'})
        
        except Exception as e:
            raise serializers.ValidationError({'error': e})


class ModelView(viewsets.ModelViewSet):
    serializer_class = ModeloSerializer
    queryset = Modelo.objects.all()
    permission_classes = [IsAuthenticated, EsVendedorOGerente]

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
    permission_classes = [IsAuthenticated, EsVendedorOGerente]

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
    

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        vehiculos = Vehiculo.objects.filter(disponible_para_venta=True)
        serializer = self.get_serializer(vehiculos, many=True)
        return Response(serializer.data)

class ColorView(viewsets.ModelViewSet):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [IsAuthenticated, EsEmpleado]


class VentaVehiculoView(viewsets.ModelViewSet):
    serializer_class = VentaVehiculoSerializer
    queryset = Venta_Vehiculo.objects.all()
    permission_classes = [IsAuthenticated, EsVendedorOGerente]


class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
    permission_classes = [IsAuthenticated, EsVendedorOGerente]

    @action(detail=False, methods=['get'])
    def ventas_por_mes(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)
        
        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)
        
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE_TRUNC('month', venta.fecha_venta) AS mes, SUM(auxiliar.precio_total) as total_ventas FROM concesionarioapp_venta AS venta
                INNER JOIN (
                    SELECT venta_id,
                    SUM(modelo.precio_base * (1 - venta_vehiculo.porcentaje_descuento) * (1 + color.porcentaje_incremento_por_color)) as precio_total
                    FROM concesionarioapp_venta_vehiculo as venta_vehiculo
                    INNER JOIN concesionarioapp_vehiculo as vehiculo ON venta_vehiculo.vehiculo_id=vehiculo.vin
                    INNER JOIN concesionarioapp_modelo as modelo ON vehiculo.modelo_vehiculo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON vehiculo.color_vehiculo_id=color.id_color
                    GROUP BY venta_id
                ) AS auxiliar ON venta.id_venta=auxiliar.venta_id
                WHERE venta.fecha_venta BETWEEN %s AND %s
                GROUP BY mes
                ORDER BY mes;
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchall()
            json_resultado = [{'mes': mes.month, 'total_Ventas': total_ventas} for mes, total_ventas in resultado]

            return Response(json_resultado)
        
    
    @action(detail=False, methods=['get'])
    def modelos_en_ventas(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)
        
        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE_TRUNC('month', venta.fecha_venta) AS mes, modelo.nombre_modelo as modelo, COUNT(modelo.id_modelo) as cantidad_ventas_modelo
                FROM concesionarioapp_venta AS venta
                INNER JOIN concesionarioapp_venta_vehiculo as venta_vehiculo ON venta.id_venta=venta_vehiculo.venta_id
                INNER JOIN concesionarioapp_vehiculo as vehiculo ON venta_vehiculo.vehiculo_id=vehiculo.vin
                INNER JOIN concesionarioapp_modelo as modelo ON vehiculo.modelo_vehiculo_id=modelo.id_modelo
                WHERE venta.fecha_venta BETWEEN %s AND %s
                GROUP BY mes, modelo
                ORDER BY mes;
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchall()
            json_resultado = [{'mes': mes.month, 'modelo': modelo, 'cantidadVentasModelo': cantidad_ventas_modelo} for mes, modelo, cantidad_ventas_modelo in resultado]
            
            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def ventas_por_sucursal(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT sucursal.nombre_sucursal as sucursal, SUM(auxiliar.precio_total) as total_ventas
                FROM concesionarioapp_venta AS venta 
                INNER JOIN (
                    SELECT venta_id, vehiculo.sucursal_vehiculo_id, SUM(modelo.precio_base * (1 - venta_vehiculo.porcentaje_descuento) * (1 + color.porcentaje_incremento_por_color)) as precio_total
                    FROM concesionarioapp_venta_vehiculo as venta_vehiculo
                    INNER JOIN concesionarioapp_vehiculo as vehiculo ON venta_vehiculo.vehiculo_id=vehiculo.vin
                    INNER JOIN concesionarioapp_modelo as modelo ON vehiculo.modelo_vehiculo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON vehiculo.color_vehiculo_id=color.id_color
                    GROUP BY venta_id, vehiculo.sucursal_vehiculo_id
                ) AS auxiliar ON venta.id_venta=auxiliar.venta_id
                INNER JOIN concesionarioapp_sucursal as sucursal ON auxiliar.sucursal_vehiculo_id=sucursal.id_sucursal
                WHERE venta.fecha_venta BETWEEN %s AND %s
                GROUP BY sucursal 
                ORDER BY sucursal;
                """, [fecha_inicio, fecha_fin])
        
            resultado = cursor.fetchall()
            json_resultado = [{'label': sucursal, 'value': total_ventas} for sucursal, total_ventas in resultado]

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def extras_en_ventas(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT extra.nombre_extra as extra, COUNT(extra.id_extra) as cantidad_extras
                FROM concesionarioapp_venta AS venta 
                INNER JOIN concesionarioapp_venta_vehiculo as venta_vehiculo ON venta.id_venta=venta_vehiculo.venta_id
                INNER JOIN concesionarioapp_extra as extra ON venta_vehiculo.extra_id=extra.id_extra
                WHERE venta.fecha_venta BETWEEN %s AND %s
                GROUP BY extra.id_extra
                ORDER BY extra.id_extra;
                """, [fecha_inicio, fecha_fin])
        
            resultado = cursor.fetchall()
            json_resultado = [{'label': extra, 'value': total_ventas} for extra, total_ventas in resultado]

            return Response(json_resultado)
    

    

    @action(detail=False, methods=['get'])
    def ventas_anuales(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)
        
        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT SUM(auxiliar.precio_total) as total FROM concesionarioapp_venta as venta
                INNER JOIN (
                    SELECT venta_id,
                    SUM(modelo.precio_base * (1 - venta_vehiculo.porcentaje_descuento) * (1 + color.porcentaje_incremento_por_color)) as precio_total
                    FROM concesionarioapp_venta_vehiculo as venta_vehiculo
                    INNER JOIN concesionarioapp_vehiculo as vehiculo ON venta_vehiculo.vehiculo_id=vehiculo.vin
                    INNER JOIN concesionarioapp_modelo as modelo ON vehiculo.modelo_vehiculo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON vehiculo.color_vehiculo_id=color.id_color
                    GROUP BY venta_id
                ) AS auxiliar ON venta.id_venta=auxiliar.venta_id
                WHERE venta.fecha_venta BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchone()
            json_resultado = {'totalVentas': resultado[0]}

            return Response(json_resultado)
    
    
    @action(detail=False, methods=['get'])
    def numero_ventas_anuales(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)

        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*) as numero_ventas FROM concesionarioapp_venta as venta
                WHERE venta.fecha_venta BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchone()
            json_resultado = {'numeroVentas': resultado[0]}

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def ventas_mensuales(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT SUM(auxiliar.precio_total) as total FROM concesionarioapp_venta as venta
                INNER JOIN (
                    SELECT venta_id,
                    SUM(modelo.precio_base * (1 - venta_vehiculo.porcentaje_descuento) * (1 + color.porcentaje_incremento_por_color)) as precio_total
                    FROM concesionarioapp_venta_vehiculo as venta_vehiculo
                    INNER JOIN concesionarioapp_vehiculo as vehiculo ON venta_vehiculo.vehiculo_id=vehiculo.vin
                    INNER JOIN concesionarioapp_modelo as modelo ON vehiculo.modelo_vehiculo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON vehiculo.color_vehiculo_id=color.id_color
                    GROUP BY venta_id
                ) AS auxiliar ON venta.id_venta=auxiliar.venta_id
                WHERE venta.fecha_venta BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchone()
            json_resultado = {'totalVentas': resultado[0]}

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def numero_ventas_mensuales(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*) as numero_ventas FROM concesionarioapp_venta as venta
                WHERE venta.fecha_venta BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchone()
            json_resultado = {'numeroVentas': resultado[0]}

            return Response(json_resultado)


    def destroy(self, request, *args, **kwargs):
        return MethodNotAllowed('DELETE', detail='No se puede eliminar una venta')


class CotizacionModeloView(viewsets.ModelViewSet):
    serializer_class = CotizacionModeloSerializer
    queryset = Cotizacion_Modelo.objects.all()
    permission_classes = [IsAuthenticated, EsVendedorOGerente]


class CotizacionView(viewsets.ModelViewSet):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()
    permission_classes = [IsAuthenticated, EsVendedorOGerente]


    @action(detail=False, methods=['get'])
    def cotizaciones_por_mes(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)
        
        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE_TRUNC('month', cotizacion.fecha_creacion) AS mes, COUNT(cotizacion.id_cotizacion) AS cantidad_cotizaciones
                FROM concesionarioapp_cotizacion AS cotizacion
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                GROUP BY mes
                ORDER BY mes;
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchall()
            json_resultado = [{'mes': mes.month, 'cantidadCotizaciones': cantidad_cotizaciones} for mes, cantidad_cotizaciones in resultado]

            cursor.execute(
                """
                SELECT DATE_TRUNC('month', venta.fecha_venta) AS mes, COUNT(venta.id_venta) AS cantidad_ventas
                FROM concesionarioapp_venta AS venta
                WHERE venta.fecha_venta BETWEEN %s AND %s
                GROUP BY mes
                ORDER BY mes;
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchall()
            for res, json_res in zip(resultado, json_resultado):
                mes, cantidad_ventas = res
                if json_res['mes'] == mes.month:
                    json_res['cantidadVentas'] = cantidad_ventas

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def modelos_en_cotizaciones(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)
        
        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE_TRUNC('month', cotizacion.fecha_creacion) AS mes, modelo.nombre_modelo as modelo, COUNT(modelo.id_modelo) as cantidad_cotizaciones_modelo
                FROM concesionarioapp_cotizacion AS cotizacion
                INNER JOIN concesionarioapp_cotizacion_modelo as cotizacion_modelo ON cotizacion.id_cotizacion=cotizacion_modelo.cotizacion_id
                INNER JOIN concesionarioapp_modelo as modelo ON cotizacion_modelo.modelo_id=modelo.id_modelo
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                GROUP BY mes, modelo
                ORDER BY mes;
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchall()
            json_resultado = [{'mes': mes.month, 'modelo': modelo, 'cantidadCotizacionesModelo': cantidad_cotizaciones_modelo} for mes, modelo, cantidad_cotizaciones_modelo in resultado]
            
            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def cotizaciones_por_sucursal(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT sucursal.nombre_sucursal as sucursal, COUNT(cotizacion.id_cotizacion) as cantidad_cotizaciones
                FROM concesionarioapp_cotizacion AS cotizacion
                INNER JOIN concesionarioapp_empleado as empleado ON cotizacion.vendedor_id=empleado.usuario_id
                INNER JOIN concesionarioapp_sucursal as sucursal ON empleado.sucursal_id=sucursal.id_sucursal
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                GROUP BY sucursal 
                ORDER BY sucursal;
                """, [fecha_inicio, fecha_fin])
        
            resultado = cursor.fetchall()
            json_resultado = [{'label': sucursal, 'value': cantidad_cotizaciones} for sucursal, cantidad_cotizaciones in resultado]

            return Response(json_resultado)
        
    
    @action(detail=False, methods=['get'])
    def colores_en_cotizacion(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT color.nombre_color as color, COUNT(color.id_color) as cantidad_colores
                FROM concesionarioapp_cotizacion AS cotizacion
                INNER JOIN concesionarioapp_cotizacion_modelo as cotizacion_modelo ON cotizacion.id_cotizacion=cotizacion_modelo.cotizacion_id
                INNER JOIN concesionarioapp_color as color ON cotizacion_modelo.color_id=color.id_color
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                GROUP BY color.id_color
                ORDER BY color.id_color;
                """, [fecha_inicio, fecha_fin])
        
            resultado = cursor.fetchall()
            json_resultado = [{'label': color, 'value': cantidad_colores} for color, cantidad_colores in resultado]

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def cotizaciones_anuales(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)

        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT SUM(auxiliar.total_cotizacion) as total_cotizaciones FROM concesionarioapp_cotizacion as cotizacion
                INNER JOIN (
                    SELECT cotizacion_id, SUM(modelo.precio_base * (1 + color.porcentaje_incremento_por_color)) as total_cotizacion
                    FROM concesionarioapp_cotizacion_modelo as cotizacion_modelo
                    INNER JOIN concesionarioapp_modelo as modelo ON cotizacion_modelo.modelo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON cotizacion_modelo.color_id=color.id_color
                    GROUP BY cotizacion_id
                ) AS auxiliar ON cotizacion.id_cotizacion=auxiliar.cotizacion_id
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchone()
            json_resultado = {'totalCotizaciones': resultado[0]}

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def numero_cotizaciones_anuales(self, request):
        anho = request.query_params.get('anho', None)
        validar_anho(anho)
        anho = int(anho)

        fecha_inicio = datetime(anho, 1, 1)
        fecha_fin = datetime(anho, 12, 31)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*) as numero_cotizaciones FROM concesionarioapp_cotizacion as cotizacion
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchone()
            json_resultado = {'numeroCotizaciones': resultado[0]}

            return Response(json_resultado)


    @action(detail=False, methods=['get'])
    def cotizaciones_mensuales(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT SUM(auxiliar.total_cotizacion) as total_cotizaciones FROM concesionarioapp_cotizacion as cotizacion
                INNER JOIN (
                    SELECT cotizacion_id, SUM(modelo.precio_base * (1 + color.porcentaje_incremento_por_color)) as total_cotizacion
                    FROM concesionarioapp_cotizacion_modelo as cotizacion_modelo
                    INNER JOIN concesionarioapp_modelo as modelo ON cotizacion_modelo.modelo_id=modelo.id_modelo
                    INNER JOIN concesionarioapp_color as color ON cotizacion_modelo.color_id=color.id_color
                    GROUP BY cotizacion_id
                ) AS auxiliar ON cotizacion.id_cotizacion=auxiliar.cotizacion_id
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])
            
            resultado = cursor.fetchone()
            json_resultado = {'totalCotizaciones': resultado[0]}

            return Response(json_resultado)
    

    @action(detail=False, methods=['get'])
    def numero_cotizaciones_mensuales(self, request):
        anho = request.query_params.get('anho', None)
        mes = request.query_params.get('mes', None)
        validar_anho(anho)
        validar_mes(mes)
        anho = int(anho)
        mes = int(mes)
        
        fecha_inicio = datetime(anho, mes, 1)
        fecha_fin = datetime(anho, mes, calendar.monthrange(anho, mes)[1])

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*) as numero_cotizaciones FROM concesionarioapp_cotizacion as cotizacion
                WHERE cotizacion.fecha_creacion BETWEEN %s AND %s
                """, [fecha_inicio, fecha_fin])

            resultado = cursor.fetchone()
            json_resultado = {'numeroCotizaciones': resultado[0]}

            return Response(json_resultado)


class ExtraView(viewsets.ModelViewSet):
    serializer_class = ExtraSerializer
    queryset = Extra.objects.all()
    permission_classes = [IsAuthenticated, EsEmpleado]

class UsoRepuestoView(viewsets.ModelViewSet):
    serializer_class = UsoRepuestoSerializer
    queryset = Uso_Repuesto.objects.all()
    permission_classes = [IsAuthenticated, EsJefeDeTallerOGerente]

class InventarioRepuestoView(viewsets.ModelViewSet):
    serializer_class = InventarioRepuestoSerializer
    queryset = Inventario_Repuesto.objects.all()
    #permission_classes = [IsAuthenticated, EsJefeDeTallerOGerente]

    @action(detail=False, methods=['get'])
    def getInventariosRepuesto(self, request):
        id_repuesto = request.query_params.get('idRepuesto', None)

        id_repuesto = int(id_repuesto)
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT ir.id_repuesto_id as id,
                s.nombre_sucursal as nombre_sucursal,
                ir.cantidad
                FROM concesionarioapp_inventario_repuesto ir
                JOIN concesionarioapp_sucursal s ON ir.id_sucursal_id = s.          id_sucursal
                WHERE ir.id_repuesto_id =  %s;
                """, [id_repuesto])
        
            resultado = cursor.fetchall()
            json_resultado = [{'id': id, 'sucursal': nombre_sucursal, 'cantidad': cantidad } for id, nombre_sucursal, cantidad in resultado]

        return Response(json_resultado)
        
class RepuestoView(viewsets.ModelViewSet):
    serializer_class = RepuestoSerializer
    queryset = Repuesto.objects.all()
    permission_classes = [IsAuthenticated, EsJefeDeTallerOGerente]

    def destroy(self, request, *args, **kwargs):
        Repuesto = self.get_object()

        try:
            self.perform_destroy(Repuesto)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ProtectedError as e:
            protectec_objects = list(e.protected_objects)

            if protectec_objects:
                first_protected_object = protectec_objects[0]
                table_name  = first_protected_object._meta.verbose_name_plural
            else:
                table_name = ''
            
            raise serializers.ValidationError({'protected': f'No se puede eliminar el repuesto porque esta referenciado en {table_name}'})
        
        except Exception as e:
            raise serializers.ValidationError({'error': e})


@api_view(['POST'])
def recaptcha(request):
    captcha_token = request.data.get('captcha_token')

    if not captcha_token:
        return Response({"missing_captcha": "El captcha es requerido"}, status=400)
    
    response = requests.post('https://www.google.com/recaptcha/api/siteverify',
                             data={
                                 'secret': config('RECAPTCHA_SECRET_KEY'),
                                 'response': captcha_token
    })

    result = response.json()
    
    if result.get('success'):
        return Response({"success": "El captcha es válido"}, status=200)
    else:
        return Response({"fail": result.get('error-codes')[0]}, status=400)
    