from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import datetime, timedelta, date
from .managers import AdministradorUsuarios


class Usuario(AbstractBaseUser, PermissionsMixin):
	cedula = models.CharField('Cédula', max_length=15, primary_key=True, unique=True)
	email = models.EmailField('Correo Electrónico', unique=True)
	primer_nombre = models.CharField('Primer Nombre', max_length=30)
	segundo_nombre = models.CharField('Segundo Nombre', max_length=30, blank=True, null=True)
	primer_apellido = models.CharField('Primer Apellido', max_length=30)
	segundo_apellido = models.CharField('Segundo Apellido', max_length=30, blank=True, null=True)
	telefono = models.CharField('Teléfono', max_length=10, blank=True, null=True)
	celular = models.CharField('Celular', max_length=10, blank=True, null=True)
	direccion = models.CharField('Dirección', max_length=100, blank=True, null=True)
	ciudad = models.CharField('Ciudad', max_length=30, blank=True, null=True)
	fecha_nacimiento = models.DateField('Fecha de Nacimiento', blank=True, null=True)
	genero = models.CharField('Género', choices=(('Masculino', 'Masculino'), ('Femenino', 'Femenino'), ('Otro', 'Otro')), blank=True, null=True)
	is_active = models.BooleanField('Usuario activo', default=True)
	is_staff = models.BooleanField('Usuario parte del staff', default=False)
	is_superuser = models.BooleanField('Usuario es superusuario', default=False)

	objects = AdministradorUsuarios()

	USERNAME_FIELD = 'cedula'
	EMAIL_FIELD = 'email'
	REQUIRED_FIELDS = ['email', 'primer_nombre', 'primer_apellido']

	class Meta:
		verbose_name = 'Usuario'
		verbose_name_plural = 'Usuarios'
		ordering = ['primer_apellido', 'primer_nombre']

	def __str__(self):
		return 'Usuario: ' + str(self.cedula) + ' - ' + self.primer_nombre + ' ' + self.primer_apellido
	
	def edad(self):
		if self.fecha_nacimiento:
			edad = date.today().year - self.fecha_nacimiento.year
			return edad
		else:
			return None


class Cliente(models.Model):
	usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

	class Meta:
		verbose_name = 'Cliente'
		verbose_name_plural = 'Clientes'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']
	
	def __str__(self):
		return 'Cliente: ' + str(self.usuario.cedula) + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido
	
	def cedula(self):
		return self.usuario.cedula

	def email(self):
		return self.usuario.email
	
	def primer_nombre(self):
		return self.usuario.primer_nombre
	
	def primer_apellido(self):
		return self.usuario.primer_apellido
	
	def celular(self):
		return self.usuario.celular
	
	def direccion(self):
		return self.usuario.direccion
	
	def ciudad(self):
		return self.usuario.ciudad
	
	def edad(self):
		return self.usuario.edad()
	
	def genero(self):
		return self.usuario.genero
	

class Empleado(models.Model):
	usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
	fecha_ingreso = models.DateField('Fecha de Ingreso', blank=True, null=True)
	fecha_retiro = models.DateField('Fecha de Retiro', blank=True, null=True)
	salario_base = models.DecimalField('Salario', max_digits=10, decimal_places=2, blank=True, null=True)
	tipo_sangre = models.CharField('Tipo de Sangre', max_length=3, blank=True, null=True)
	eps = models.CharField('EPS', max_length=30, blank=True, null=True)
	arl = models.CharField('ARL', max_length=30, blank=True, null=True)
	cargo = models.CharField('Cargo', choices=(('Gerente', 'Gerente'), ('Vendedor', 'Vendedor'), ('Jefe de Taller', 'Jefe de taller')))
	sucursal = models.ForeignKey('Sucursal', on_delete=models.PROTECT, blank=True, null=True)

	class Meta:
		verbose_name = 'Empleado'
		verbose_name_plural = 'Empleados'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']
	
	def __str__(self):
		return 'Empleado: ' + str(self.usuario.cedula) + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido + ' Cargo: ' + self.cargo
	
	def cedula(self):
		return self.usuario.cedula

	def email(self):
		return self.usuario.email
	
	def primer_nombre(self):
		return self.usuario.primer_nombre
	
	def primer_apellido(self):
		return self.usuario.primer_apellido
	
	def celular(self):
		return self.usuario.celular
	
	def direccion(self):
		return self.usuario.direccion
	
	def ciudad(self):
		return self.usuario.ciudad
	
	def edad(self):
		return self.usuario.edad()
	
	def genero(self):
		return self.usuario.genero
	
	def nombre_sucursal(self):
		return self.sucursal.nombre_sucursal


class Sucursal(models.Model):
	id_sucursal = models.AutoField('ID de la Sucursal', primary_key=True)
	nombre_sucursal = models.CharField('Nombre de la Sucursal', max_length=30, unique=True)
	direccion_sucursal = models.CharField('Dirección de la Sucursal', max_length=100, blank=True, null=True)
	ciudad_sucursal = models.CharField('Ciudad de la Sucursal', max_length=30, blank=True, null=True)
	telefono_sucursal = models.CharField('Teléfono de la Sucursal', max_length=10, blank=True, null=True)

	class Meta:
		verbose_name = 'Sucursal'
		verbose_name_plural = 'Sucursales'
		ordering = ['nombre_sucursal']
	
	def __str__(self):
		return 'Sucursal: ' + str(self.id_sucursal) + ' ' + self.nombre_sucursal
	

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
