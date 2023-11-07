from django.contrib import admin
from django.apps import apps
from datetime import date
from .models import *


@admin.register(Modelo)
class ModeloAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id_modelo', 'nombre_modelo', 'anho', 'carroceria', 'combustible', 'numero_pasajeros', 'precio_base', 'potencia', 'cilindraje')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('carroceria', 'combustible', 'numero_pasajeros',)




	








	