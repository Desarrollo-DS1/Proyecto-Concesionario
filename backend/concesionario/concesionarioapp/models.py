from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class Modelo(models.Model):
	id = models.AutoField('ID del Modelo', primary_key=True)
	nombre = models.CharField('Nombre del Modelo', max_length=30, unique=True)
	anho_modelo = models.IntegerField('Año del Modelo', blank=True, null=True)
	carroceria = models.CharField('Carrocería', choices=(('Sedan', 'Sedan'), ('Hatchback', 'Hatchback'), ('Station Wagon', 'Station Wagon'), ('Pickup', 'Pickup'), ('SUV', 'SUV'), ('Van', 'Van'), ('Convertible', 'Convertible'), ('Coupe', 'Coupe'), ('Roadster', 'Roadster'), ('Camion', 'Camion'), ('Camioneta', 'Camioneta'), ('Bus', 'Bus'), ('Minivan', 'Minivan'), ('Microbus', 'Microbus'), ('Micro', 'Micro'), ('Tracto Camion','Tracto Camion'), ('Trailer', 'Trailer')),blank=True, null=True)
	cilindraje = models.IntegerField('Cilindraje', blank=True, null=True)
	potencia = models.IntegerField('Potencia', blank=True, null=True)
	combustible = models.CharField('Combustible', choices=(('Gasolina', 'Gasolina'), ('Diesel', 'Diesel'), ('Electrico', 'Electrico'), ('Hibrido', 'Hibrido'), ('Gas', 'Gas'), ('Gas Natural', 'Gas Natural'), ('Gas Licuado', 'Gas licuado')), blank=True, null=True)
	numero_pasajeros = models.IntegerField('Número de Pasajeros', blank=True, null=True)
	precio_base = models.DecimalField('Precio Base', max_digits=12, decimal_places=2, blank=True, null=True)

	class Meta:
		verbose_name = 'Modelo'
		verbose_name_plural = 'Modelos'
		ordering = ['nombre']
	
	def __str__(self):
		return 'Modelo: ' + str(self.id) + ' ' + self.nombre + ' ' + str(self.anho_modelo) + ' Carrocería: ' + str(self.carroceria) + ' Combustible: ' + str(self.combustible) + ' Pasajeros: ' + str(self.numero_pasajeros) + ' Precio: ' + str(self.precio_base)