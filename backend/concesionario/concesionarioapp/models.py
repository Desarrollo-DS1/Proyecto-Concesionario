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
	genero = models.CharField('Género', max_length=1, choices=(('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')), blank=True, null=True)
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
		return 'Usuario: ' + self.cedula + ' - ' + self.primer_nombre + ' ' + self.primer_apellido
	
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
		return 'Cliente: ' + self.usuario.cedula + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido
	
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
	cargo = models.CharField('Cargo', max_length=1, choices=(('A', 'Administrador'), ('V', 'Vendedor'), ('J', 'Jefe de taller')))
	sucursal = models.ForeignKey('Sucursal', on_delete=models.PROTECT, blank=True, null=True)

	class Meta:
		verbose_name = 'Empleado'
		verbose_name_plural = 'Empleados'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']
	
	def __str__(self):
		return 'Empleado: ' + self.usuario.cedula + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido + ' Cargo: ' + self.cargo
	
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
		return 'Sucursal: ' + self.id_sucursal + ' ' + self.nombre_sucursal


class Modelo(models.Model):
	id_modelo = models.AutoField('ID del Modelo', primary_key=True)
	nombre_modelo = models.CharField('Nombre del Modelo', max_length=30, unique=True)
	anho_modelo = models.IntegerField('Año del Modelo', blank=True, null=True)
	carroceria = models.CharField('Carrocería', max_length=30, blank=True, null=True)
	cilindraje = models.IntegerField('Cilindraje', blank=True, null=True)
	potencia = models.IntegerField('Potencia', blank=True, null=True)
	combustible = models.CharField('Combustible', max_length=1, choices=(('G', 'Gasolina'), ('D', 'Diesel'), ('E', 'Eléctrico'), ('H', 'Híbrido')), blank=True, null=True)
	numero_pasajeros = models.IntegerField('Número de Pasajeros', blank=True, null=True)
	precio_base = models.DecimalField('Precio Base', max_digits=10, decimal_places=2, blank=True, null=True)

	class Meta:
		verbose_name = 'Modelo'
		verbose_name_plural = 'Modelos'
		ordering = ['nombre_modelo']
	
	def __str__(self):
		return 'Modelo: ' + self.id_modelo + ' ' + self.nombre_modelo + ' ' + self.anho_modelo + ' Carroceria: ' + self.carroceria + ' Combustible: ' + self.combustible + ' Pasajeros: ' + self.numero_pasajeros
	

class Color(models.Model):
	id_color = models.AutoField('ID del Color', primary_key=True)
	nombre_color = models.CharField('Nombre del Color', max_length=30, unique=True)
	porcentanje_incremento_por_color = models.DecimalField('Porcentaje de Incremento por Color', max_digits=4, decimal_places=2)

	class Meta:
		verbose_name = 'Color'
		verbose_name_plural = 'Colores'
		ordering = ['nombre_color']
	
	def __str__(self):
		return 'Color: ' + self.id_color + ' ' + self.nombre_color


class Carro(models.Model):
	vin = models.CharField('VIN', max_length=17, primary_key=True, unique=True)
	modelo_carro = models.ForeignKey('Modelo', on_delete=models.PROTECT)
	color_carro = models.ForeignKey('Color', on_delete=models.PROTECT)
	sucursal_carro = models.ForeignKey('Sucursal', on_delete=models.PROTECT)
	disponible_para_venta = models.BooleanField('Disponible para Venta', default=True)

	class Meta:
		verbose_name = 'Carro'
		verbose_name_plural = 'Carros'
		ordering = ['vin']

	def __str__(self):
		return 'Carro: ' + self.vin + ' ' + self.modelo_carro.nombre_modelo + ' ' + self.color_carro.nombre_color + ' en ' + self.sucursal_carro.nombre_sucursal + (' disponible para venta.' if self.disponible_para_venta else ' ( ya vendido.)')

	def nombre_modelo(self):
		return self.modelo_carro.nombre_modelo
	
	def anho_modelo(self):
		return self.modelo_carro.anho_modelo
	
	def carroceria(self):
		return self.modelo_carro.carroceria
	
	def combustible(self):
		return self.modelo_carro.combustible
	
	def numero_pasajeros(self):
		return self.modelo_carro.numero_pasajeros
	
	def nombre_color(self):
		return self.color_carro.nombre_color
	
	def sucursal(self):
		return self.sucursal_carro.nombre_sucursal
	
	def precio(self):
		return self.modelo_carro.precio_base * (1 + (self.color_carro.porcentanje_incremento_por_color / 100))


class Repuesto(models.Model):
	id_repuesto = models.AutoField('ID del Repuesto', primary_key=True)
	nombre_repuesto = models.CharField('Nombre del Repuesto', max_length=30, unique=True)
	precio_repuesto = models.DecimalField('Precio del Repuesto', max_digits=10, decimal_places=2, blank=True, null=True)
	descrpcion_repuesto = models.CharField('Descripción del Repuesto', max_length=100, blank=True, null=True)
	modelos = models.ManyToManyField('Modelo')
	sucursales = models.ManyToManyField('Sucursal', through='InventarioRepuesto')

	class Meta:
		verbose_name = 'Repuesto'
		verbose_name_plural = 'Repuestos'
		ordering = ['nombre_repuesto']
	
	def __str__(self):
		return 'Repuesto: ' + self.id_repuesto + ' ' + self.nombre_repuesto
	
	def lista_modelos(self):
		return ', '.join([modelo.nombre_modelo for modelo in self.modelos.all()])


class InventarioRepuesto(models.Model):
	id_inventario_repuesto = models.AutoField('ID del Inventario de Repuesto', primary_key=True)
	sucursal = models.ForeignKey('Sucursal', on_delete=models.PROTECT)
	repuesto = models.ForeignKey('Repuesto', on_delete=models.PROTECT)
	cantidad = models.IntegerField('Cantidad de Repuestos en Inventario', default=0)

	class Meta:
		verbose_name = 'Inventario de Repuesto'
		verbose_name_plural = 'Inventarios de Repuestos'
		ordering = ['sucursal__nombre_sucursal', 'repuesto__nombre_repuesto']
		unique_together = ('sucursal', 'repuesto')
	
	def __str__(self):
		return 'Inventario de Repuesto: ' + self.id_inventario_repuesto + ' ' + self.repuesto.nombre_repuesto + ' en ' + self.sucursal.nombre_sucursal + ' con ' + self.cantidad + ' unidades.'
	
	def nombre_sucursal(self):
		return self.sucursal.nombre_sucursal

	def nombre_repuesto(self):
		return self.repuesto.nombre_repuesto
	

class Orden_Trabajo(models.Model):
	id_orden_trabajo = models.AutoField('ID de la Orden de Trabajo', primary_key=True)
	jefe_taller = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	modelo = models.ForeignKey('Modelo', on_delete=models.PROTECT)
	placa_carro = models.CharField('Placa del Carro', max_length=6, blank=True, null=True)
	comentarios_estado_carro = models.CharField('Comentarios del Estado del Carro', max_length=300, blank=True, null=True)
	fecha_creacion = models.DateField('Fecha de Creación', auto_now_add=True)
	fecha_entrega_esperada = models.DateField('Fecha de Entrega Esperada', default=datetime.now()+timedelta(days=20))
	fecha_entrega_real = models.DateField('Fecha de Entrega Real', blank=True, null=True)
	estado_reparacion = models.CharField('Estado de la Reparación', max_length=1, choices=(('P', 'En Proceso'), ('R', 'Retrasada'), ('E', 'A la espera de repuestos'), ('F', 'Finalizada')), default='P')
	repuestos_en_orden_trabajo = models.ManyToManyField('Repuesto')

	class Meta:
		verbose_name = 'Orden de Trabajo'
		verbose_name_plural = 'Ordenes de Trabajo'
		ordering = ['id_orden_trabajo']
	
	def __str__(self):
		return 'Orden de Trabajo: ' + self.id_orden_trabajo + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Carro: ' + self.placa_carro + self.placa_carro + ' Estado: ' + self.estado_reparacion
	
	def nombre_jefe_taller(self):
		return self.jefe_taller.usuario.primer_nombre + ' ' + self.jefe_taller.usuario.primer_apellido
	
	def sucursal(self):
		return self.jefe_taller.sucursal

	def nombre_sucursal(self):
		return self.jefe_taller.nombre_sucursal
	
	def nombre_cliente(self):
		return self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido
	
	def nombre_modelo(self):
		return self.modelo.nombre_modelo + ' ' + self.modelo.anho_modelo + ' ' + self.modelo.combustible
	
	def lista_repuestos(self):
		return ', '.join([repuesto.nombre_repuesto for repuesto in self.repuestos_en_orden_trabajo.all()])

	def lista_trabajos(self):
		return ', '.join([trabajo.descripcion_trabajo for trabajo in Trabajo.objects.filter(orden_trabajo=self)])
	
	def costo_total(self):
		costo_total = 0

		for repuesto in self.repuestos_en_orden_trabajo.all():
			costo_total += repuesto.precio_repuesto

		for trabajo in Trabajo.objects.filter(orden_trabajo=self):
			costo_total += trabajo.precio_trabajo

		return costo_total


class Trabajo(models.Model):
	id_trabajo = models.AutoField('ID del Trabajo', primary_key=True)
	orden_trabajo = models.ForeignKey('Orden_Trabajo', on_delete=models.CASCADE)
	descripcion_trabajo = models.CharField('Descripción del Trabajo', max_length=300, blank=True, null=True)
	precio_trabajo = models.DecimalField('Precio del Trabajo', max_digits=10, decimal_places=2)
	
	class Meta:
		verbose_name = 'Trabajo en la Orden de Trabajo'
		verbose_name_plural = 'Trabajos en la Orden de Trabajo'
		ordering = ['id_trabajo']
	
	def __str__(self):
		return 'Trabajo: ' + self.id_trabajo + ' ' + self.descripcion_trabajo 
	


class Extra(models.Model):
	id_extra = models.AutoField('ID del Extra', primary_key=True)
	nombre_extra = models.CharField('Nombre del Extra', max_length=30, unique=True)
	descripcion_extra = models.CharField('Descripción del Extra', max_length=300, blank=True, null=True)

	class Meta:
		verbose_name = 'Extra'
		verbose_name_plural = 'Extras'
		ordering = ['nombre_extra']
	
	def __str__(self):
		return 'Extra: ' + self.id_extra + ' ' + self.nombre_extra


class Cotizacion(models.Model):
	id_cotizacion = models.AutoField('ID de la Cotización', primary_key=True)
	vendedor = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	fecha_creacion = models.DateField('Fecha de Creación', auto_now_add=True)
	porcentaje_descuento = models.DecimalField('Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)
	fecha_vencimiento = models.DateField('Fecha de Vencimiento', default=datetime.now()+timedelta(days=20))
	modelos = models.ManyToManyField('Modelo', through='Cotizacion_Modelo')

	class Meta:
		verbose_name = 'Cotización'
		verbose_name_plural = 'Cotizaciones'
		ordering = ['id_cotizacion']

	def __str__(self):
		return 'Cotización: ' + self.id_cotizacion + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Vendedor: ' + self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido + ', Fecha: ' + self.fecha_creacion
	
	def nombre_vendedor(self):
		return self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido
	
	def nombre_cliente(self):
		return self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido
	
	def lista_modelos(self):
		return ', '.join([(cotizacion_modelo.cantidad + ' ' + cotizacion_modelo.modelo.nombre_modelo + ' ' + cotizacion_modelo.color.nombre_color + ' con extra ' + cotizacion_modelo.extras.nombre_extra) for cotizacion_modelo in Cotizacion_Modelo.objects.filter(cotizacion=self)])
	
	def precio_total(self):
		precio_total = 0

		for cotizacion_modelo in Cotizacion_Modelo.objects.filter(cotizacion=self):
			precio_total += cotizacion_modelo.cantidad * (cotizacion_modelo.modelo.precio_base * (1 + (cotizacion_modelo.color.porcentanje_incremento_por_color / 100)))

		return precio_total
	

class Cotizacion_Modelo(models.Model):
	id_cotizacion_modelo = models.AutoField('ID de la Cotización del Modelo', primary_key=True)
	cotizacion = models.ForeignKey('Cotizacion', on_delete=models.CASCADE)
	modelo = models.ForeignKey('Modelo', on_delete=models.PROTECT)
	color = models.ForeignKey('Color', on_delete=models.PROTECT)
	extra = models.ForeignKey('Extra', on_delete=models.PROTECT)
	cantidad = models.IntegerField('Cantidad', default=1)

	class Meta:
		verbose_name = 'Modelo en la Cotización'
		verbose_name_plural = 'Modelos en la Cotización'
		ordering = ['id_cotizacion_modelo']
	
	def __str__(self):
		return 'Cotización del Modelo: ' + self.id_cotizacion_modelo + ' Cotización: ' + self.cotizacion.id_cotizacion + ' Modelo: ' + self.modelo.nombre_modelo + ' Color: ' + self.color.nombre_color + ' Extras: ' + self.extra.nombre_extra + ' Cantidad: ' + self.cantidad
	
	def nombre_modelo(self):
		return self.modelo.nombre_modelo
	
	def nombre_color(self):
		return self.color.nombre_color
	
	def nombre_extra(self):
		return self.extra.nombre_extra
	
	def precio(self):
		return self.cantidad * (self.modelo.precio_base * (1 + (self.color.porcentanje_incremento_por_color / 100)))


class Venta(models.Model):
	id_venta = models.AutoField('ID de la Venta', primary_key=True)
	vendedor = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	fecha_venta = models.DateField('Fecha de Creación', auto_now_add=True)
	carros = models.ManyToManyField('Carro', through='Venta_Carro')

	class Meta:
		verbose_name = 'Venta'
		verbose_name_plural = 'Ventas'
		ordering = ['id_venta']

	def __str__(self):
		return 'Venta: ' + self.id_venta + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Vendedor: ' + self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido + ' Fecha: ' + self.fecha_venta
	
	def nombre_vendedor(self):
		return self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido
	
	def nombre_cliente(self):
		return self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido
	
	def lista_carros(self):
		return ', '.join([(venta_carro.cantidad + ' ' + venta_carro.carro.nombre_modelo + ' ' + venta_carro.carro.color.nombre_color + ' con extra ' + venta_carro.extras.nombre_extra) for venta_carro in Venta_Carro.objects.filter(venta=self)])
	
	def precio_total(self):
		precio_total = 0

		for venta_carro in Venta_Carro.objects.filter(venta=self):
			precio_total += venta_carro.precio()

		return precio_total


class Venta_Carro(models.Model):
	id_venta_carro = models.AutoField('ID de la Venta del Carro', primary_key=True)
	venta = models.ForeignKey('Venta', on_delete=models.CASCADE)
	carro = models.ForeignKey('Carro', on_delete=models.PROTECT)
	extra = models.ForeignKey('Extra', on_delete=models.PROTECT)
	porcentaje_descuento = models.DecimalField('Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)
	cantidad = models.IntegerField('Cantidad', default=1)

	class Meta:
		verbose_name = 'Carro en la Venta'
		verbose_name_plural = 'Carros en la Venta'
		ordering = ['id_venta_carro']
	
	def __str__(self):
		return 'Venta del Carro: ' + self.carro + ' en Venta: ' + self.venta.id_venta + ' Extra: ' + self.extra.nombre_extra + ' Cantidad: ' + self.cantidad

	def nombre_modelo(self):
		return self.carro.nombre_modelo
	
	def anho_modelo(self):
		return self.carro.anho_model
	
	def carroceria(self):
		return self.carro.carroceria
	
	def combustible(self):
		return self.carro.combustible
	
	def numero_pasajeros(self):
		return self.carro.numero_pasajeros
	
	def nombre_color(self):
		return self.carro.nombre_color
	
	def precio(self):
		return self.cantidad * (self.carro.modelo.precio_base * (1 + (self.carro.color.porcentanje_incremento_por_color / 100)) * (1 - (self.porcentaje_descuento / 100)))
	

	