from django.contrib import admin
from django.apps import apps
from datetime import date
from .models import *


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero')
	list_display = atributos_a_mostrar
	list_filter = ('ciudad', 'genero',)
	

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero')
	list_display = atributos_a_mostrar


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'cargo', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero', 'fecha_ingreso', 'salario_base', 'tipo_sangre', 'cargo', 'sucursal')
	list_display = atributos_a_mostrar
	

@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_sucursal', 'nombre_sucursal', 'direccion_sucursal', 'ciudad_sucursal', 'telefono_sucursal')
	list_display = atributos_a_mostrar
	list_filter = ('ciudad_sucursal',)


@admin.register(Modelo)
class ModeloAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id', 'nombre', 'año', 'carroceria', 'combustible', 'numeroPasajeros', 'precioBase')
	list_display = atributos_a_mostrar
	

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_color', 'nombre_color', 'porcentanje_incremento_por_color')
	list_display = atributos_a_mostrar


@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('vin', 'nombre_modelo', 'anho_modelo', 'carroceria', 'combustible', 'numero_pasajeros', 'nombre_color', 'sucursal', 'precio')
	list_display = atributos_a_mostrar


@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_venta', 'vendedor', 'nombre_vendedor', 'cliente', 'nombre_cliente', 'fecha_venta', 'lista_vehiculos', 'precio_total')
	list_display = atributos_a_mostrar
	list_filter = ('vendedor', 'cliente',)


@admin.register(Venta_Vehiculo)
class Venta_VehiculoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_venta_vehiculo', 'venta', 'vehiculo', 'nombre_modelo', 'anho_modelo', 'carroceria', 'combustible', 'numero_pasajeros', 'nombre_color', 'precio')
	list_display = atributos_a_mostrar
	list_filter = ('venta',)


	








	