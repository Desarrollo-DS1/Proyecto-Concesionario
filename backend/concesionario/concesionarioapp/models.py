from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import datetime, timedelta, date

class Modelo(models.Model):
	id = models.AutoField('ID del Modelo', primary_key=True)
	nombre = models.CharField('Nombre del Modelo', max_length=30, unique=True)
	año = models.IntegerField('Año del Modelo', blank=True, null=True)
	carroceria = models.IntegerField('Carrocería', max_length=30, choices=((1, 'Sedan'), (2, 'Hatchback'), (3, 'Station Wagon'), (4, 'Pickup'), (5, 'SUV'), (6, 'Van'), (7, 'Convertible'), (8, 'Coupe'), (9, 'Roadster'), (10, 'Camion'), (11, 'Camioneta'), (12, 'Bus'), (13, 'Minivan'), (14, 'Microbus'), (15, 'Micro'), (16, 'Tracto Camion'), (17, 'Trailer')),blank=True, null=True)
	cilindraje = models.IntegerField('Cilindraje', blank=True, null=True)
	potencia = models.IntegerField('Potencia', blank=True, null=True)
	combustible = models.IntegerField('Combustible', max_length=2, choices=((1, 'Gasolina'), (2, 'Diesel'), (3, 'Electrico'), (4, 'Hibrido'), (5, 'Gas'), (6, 'Gas Natural'), (7, 'Gas Licuado')), blank=True, null=True)
	numeroPasajeros = models.IntegerField('Número de Pasajeros', blank=True, null=True)
	precioBase = models.DecimalField('Precio Base', max_digits=10, decimal_places=2, blank=True, null=True)

	class Meta:
		verbose_name = 'Modelo'
		verbose_name_plural = 'Modelos'
		ordering = ['nombre']
	
	def __str__(self):
		return 'Modelo: ' + str(self.id) + ' ' + self.nombre + ' ' + str(self.año) + ' Carrocería: ' + str(self.carroceria) + ' Combustible: ' + str(self.combustible) + ' Pasajeros: ' + str(self.numeroPasajeros) + ' Precio: ' + str(self.precioBase)
