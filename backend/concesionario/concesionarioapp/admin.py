from django.contrib import admin
from django.apps import apps
from datetime import date
from .models import *


@admin.register(Modelo)
class ModeloAdmin(admin.ModelAdmin):
	atributos_a_mostrar = ('id', 'nombre', 'año', 'carroceria', 'combustible', 'numeroPasajeros', 'precioBase')
	list_display = atributos_a_mostrar
	search_fields = atributos_a_mostrar
	list_filter = ('carroceria', 'combustible', 'numeroPasajeros',)




	








	