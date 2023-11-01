from django.contrib import admin
from django.apps import apps
from datetime import date
from .models import *

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('ciudad', 'genero',)
	

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('cedula', 'primer_nombre', 'primer_apellido', 'email', 'celular', 'direccion', 'ciudad', 'edad', 'genero', 'fecha_ingreso', 'salario_base', 'tipo_sangre', 'cargo', 'sucursal')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_sucursal', 'nombre_sucursal', 'direccion_sucursal', 'ciudad_sucursal', 'telefono_sucursal')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('ciudad_sucursal',)


@admin.register(Modelo)
class ModeloAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_modelo', 'nombre_modelo', 'anho_modelo', 'carroceria', 'combustible', 'numero_pasajeros', 'precio_base')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('carroceria', 'combustible', 'numero_pasajeros',)


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_color', 'nombre_color', 'porcentanje_incremento_por_color')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(Carro)
class CarroAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('vin', 'nombre_modelo', 'nombre_modelo', 'anho_modelo', 'carroceria', 'combustible', 'numero_pasajeros', 'nombre_color', 'sucursal', 'precio')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(Repuesto)
class RepuestoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_repuesto', 'nombre_repuesto', 'precio_repuesto', 'lista_modelos')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(InventarioRepuesto)
class InventarioRepuestoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_inventario_repuesto', 'sucursal', 'nombre_sucursal', 'repuesto', 'nombre_repuesto', 'cantidad')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('sucursal', 'repuesto',)


@admin.register(Orden_Trabajo)
class Orden_TrabajoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_orden_trabajo', 'jefe_taller', 'nombre_jefe_taller', 'sucursal', 'nombre_sucursal', 'cliente', 'nombre_cliente', 'modelo', 'nombre_modelo', 'placa_carro', 'lista_repuestos', 'lista_trabajos', 'fecha_creacion', 'fecha_entrega_esperada', 'fecha_entrega_real', 'estado_reparacion', 'costo_total')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('jefe_taller', 'cliente', 'estado_reparacion',)


@admin.register(Trabajo)
class TrabajoAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_trabajo', 'descripcion_trabajo', 'orden_trabajo', 'precio_trabajo')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('orden_trabajo',)


@admin.register(Extra)
class ExtraAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_extra', 'nombre_extra', 'descripcion_extra')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar


@admin.register(Cotizacion)
class CotizacionAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_cotizacion', 'vendedor', 'nombre_vendedor', 'cliente', 'nombre_cliente', 'lista_modelos', 'precio_total')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('vendedor', 'cliente',)


@admin.register(Cotizacion_Modelo)
class Cotizacion_ModeloAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_cotizacion_modelo', 'cotizacion', 'modelo', 'nombre_modelo', 'color', 'nombre_color', 'extra', 'nombre_extra', 'precio')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('cotizacion',)


@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_venta', 'vendedor', 'nombre_vendedor', 'cliente', 'nombre_cliente', 'fecha_venta', 'lista_carros', 'precio_total')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('vendedor', 'cliente',)


@admin.register(Venta_Carro)
class Venta_CarroAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_venta_carro', 'venta', 'carro', 'nombre_modelo', 'anho_modelo', 'carroceria', 'combustible', 'numero_pasajeros', 'nombre_color', 'precio')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('venta',)
	




	








	











