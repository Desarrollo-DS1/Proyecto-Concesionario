from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import datetime, timedelta
from .managers import AdministradorUsuarios


class Usuario(AbstractBaseUser, PermissionsMixin):
	cedula = models.CharField(verbose_name='Cédula', max_length=15, primary_key=True, unique=True)
	email = models.EmailField(verbose_name='Correo Electrónico', unique=True)
	primer_nombre = models.CharField(verbose_name='Primer Nombre', max_length=30)
	segundo_nombre = models.CharField(verbose_name='Segundo Nombre', max_length=30, blank=True, null=True)
	primer_apellido = models.CharField(verbose_name='Primer Apellido', max_length=30)
	segundo_apellido = models.CharField(verbose_name='Segundo Apellido', max_length=30, blank=True, null=True)
	telefono = models.CharField(verbose_name='Teléfono', max_length=10, blank=True, null=True)
	celular = models.CharField(verbose_name='Celular', max_length=10, blank=True, null=True)
	direccion = models.CharField(verbose_name='Dirección', max_length=100, blank=True, null=True)
	ciudad = models.CharField(verbose_name='Ciudad', max_length=30, blank=True, null=True)
	fecha_nacimiento = models.DateField(verbose_name='Fecha de Nacimiento', blank=True, null=True)
	genero = models.CharField(verbose_name='Género', max_length=1, choices=(('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')), blank=True, null=True)
	is_active = models.BooleanField(verbose_name='Usuario activo', default=True)
	is_staff = models.BooleanField(verbose_name='Usuario parte del staff', default=False)
	is_superuser = models.BooleanField(verbose_name='Usuario es superusuario', default=False)

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
	

class Cliente(models.Model):
	usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

	class Meta:
		verbose_name = 'Cliente'
		verbose_name_plural = 'Clientes'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']
	
	def __str__(self):
		return 'Cliente: ' + self.usuario.cedula + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido
	

class Empleado(models.Model):
	usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
	fecha_ingreso = models.DateField(verbose_name='Fecha de Ingreso', blank=True, null=True)
	fecha_retiro = models.DateField(verbose_name='Fecha de Retiro', blank=True, null=True)
	salario_base = models.DecimalField(verbose_name='Salario', max_digits=10, decimal_places=2, blank=True, null=True)
	tipo_sangre = models.CharField(verbose_name='Tipo de Sangre', max_length=3, blank=True, null=True)
	eps = models.CharField(verbose_name='EPS', max_length=30, blank=True, null=True)
	arl = models.CharField(verbose_name='ARL', max_length=30, blank=True, null=True)
	cargo = models.CharField(verbose_name='Cargo', max_length=1, choices=(('A', 'Administrador'), ('V', 'Vendedor'), ('J', 'Jefe de taller')))
	sucursal = models.ForeignKey(verbose_name='Sucursal', to='Sucursal', on_delete=models.PROTECT, blank=True, null=True)

	class Meta:
		verbose_name = 'Empleado'
		verbose_name_plural = 'Empleados'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']
	
	def __str__(self):
		return 'Empleado: ' + self.usuario.cedula + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido
	

class Sucursal(models.Model):
	id_sucursal = models.AutoField(verbose_name='ID de la Sucursal', primary_key=True)
	nombre_sucursal = models.CharField(verbose_name='Nombre de la Sucursal', max_length=30, unique=True)
	direccion_sucursal = models.CharField(verbose_name='Dirección de la Sucursal', max_length=100, blank=True, null=True)
	ciudad_sucursal = models.CharField(verbose_name='Ciudad de la Sucursal', max_length=30, blank=True, null=True)
	telefono_sucursal = models.CharField(verbose_name='Teléfono de la Sucursal', max_length=10, blank=True, null=True)

	class Meta:
		verbose_name = 'Sucursal'
		verbose_name_plural = 'Sucursales'
		ordering = ['nombre_sucursal']
	
	def __str__(self):
		return 'Sucursal: ' + self.id_sucursal + ' ' + self.nombre_sucursal


class Modelo(models.Model):
	id_modelo = models.AutoField(verbose_name='ID del Modelo', primary_key=True)
	nombre_modelo = models.CharField(verbose_name='Nombre del Modelo', max_length=30, unique=True)
	anho_modelo = models.IntegerField(verbose_name='Año del Modelo', blank=True, null=True)
	carroceria = models.CharField(verbose_name='Carrocería', max_length=30, blank=True, null=True)
	cilindraje = models.IntegerField(verbose_name='Cilindraje', blank=True, null=True)
	potencia = models.IntegerField(verbose_name='Potencia', blank=True, null=True)
	combustible = models.CharField(verbose_name='Combustible', max_length=1, choices=(('G', 'Gasolina'), ('D', 'Diesel'), ('E', 'Eléctrico'), ('H', 'Híbrido')), blank=True, null=True)
	numero_pasajeros = models.IntegerField(verbose_name='Número de Pasajeros', blank=True, null=True)
	precio_base = models.DecimalField(verbose_name='Precio Base', max_digits=10, decimal_places=2, blank=True, null=True)

	class Meta:
		verbose_name = 'Modelo'
		verbose_name_plural = 'Modelos'
		ordering = ['nombre_modelo']
	
	def __str__(self):
		return 'Modelo: ' + self.id_modelo + ' ' + self.nombre_modelo
	

class Color(models.Model):
	id_color = models.AutoField(verbose_name='ID del Color', primary_key=True)
	nombre_color = models.CharField(verbose_name='Nombre del Color', max_length=30, unique=True)
	porcentanje_incremento_por_color = models.DecimalField(verbose_name='Porcentaje de Incremento por Color', max_digits=4, decimal_places=2)

	class Meta:
		verbose_name = 'Color'
		verbose_name_plural = 'Colores'
		ordering = ['nombre_color']
	
	def __str__(self):
		return 'Color: ' + self.id_color + ' ' + self.nombre_color


class Carro(models.Model):
	vin = models.CharField(verbose_name='VIN', max_length=17, primary_key=True, unique=True)
	modelo_carro = models.ForeignKey(verbose_name='Modelo del Carro', to='Modelo', on_delete=models.PROTECT)
	color_carro = models.ForeignKey(verbose_name='Color del Carro', to='Color', on_delete=models.PROTECT)
	sucursal_carro = models.ForeignKey(verbose_name='Sucursal del Carro', to='Sucursal', on_delete=models.PROTECT)
	disponible_para_venta = models.BooleanField(verbose_name='Disponible para Venta', default=True)

	class Meta:
		verbose_name = 'Carro'
		verbose_name_plural = 'Carros'
		ordering = ['vin']

	def __str__(self):
		return 'Carro: ' + self.vin + ' ' + self.modelo_carro.nombre_modelo + ' ' + self.color_carro.nombre_color + ' en ' + self.sucursal_carro.nombre_sucursal + (' disponible para venta.' if self.disponible_para_venta else ' ( ya vendido.)')


class Repuesto(models.Model):
	id_repuesto = models.AutoField(verbose_name='ID del Repuesto', primary_key=True)
	nombre_repuesto = models.CharField(verbose_name='Nombre del Repuesto', max_length=30, unique=True)
	precio_repuesto = models.DecimalField(verbose_name='Precio del Repuesto', max_digits=10, decimal_places=2, blank=True, null=True)
	descrpcion_repuesto = models.CharField(verbose_name='Descripción del Repuesto', max_length=100, blank=True, null=True)
	modelos = models.ManyToManyField(verbose_name='Modelos que pueden usar este repuesto', to='Modelo')
	sucursales = models.ManyToManyField(verbose_name='Sucursales que tienen este repuesto', to='Sucursal', through='InventarioRepuesto')

	class Meta:
		verbose_name = 'Repuesto'
		verbose_name_plural = 'Repuestos'
		ordering = ['nombre_repuesto']
	
	def __str__(self):
		return 'Repuesto: ' + self.id_repuesto + ' ' + self.nombre_repuesto


class InventarioRepuesto(models.Model):
	sucursal = models.ForeignKey(verbose_name='Sucursal', to='Sucursal', on_delete=models.PROTECT)
	repuesto = models.ForeignKey(verbose_name='Repuesto', to='Repuesto', on_delete=models.PROTECT)
	cantidad = models.IntegerField(verbose_name='Cantidad de Repuestos en Inventario', default=0)

	class Meta:
		verbose_name = 'Inventario de Repuesto'
		verbose_name_plural = 'Inventarios de Repuestos'
		ordering = ['sucursal__nombre_sucursal', 'repuesto__nombre_repuesto']
		unique_together = ('sucursal', 'repuesto')
	
	def __str__(self):
		return 'Inventario de Repuesto: ' + self.repuesto.nombre_repuesto + ' en ' + self.sucursal.nombre_sucursal + ' con ' + self.cantidad + ' unidades.'


class Orden_Trabajo(models.Model):
	id_orden_trabajo = models.AutoField(verbose_name='ID de la Orden de Trabajo', primary_key=True)
	jefe_taller = models.ForeignKey(verbose_name='Jefe de Taller', to='Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey(verbose_name='Cliente', to='Cliente', on_delete=models.PROTECT)
	modelo = models.ForeignKey(verbose_name='Modelo', to='Modelo', on_delete=models.PROTECT)
	placa_carro = models.CharField(verbose_name='Placa del Carro', max_length=6, blank=True, null=True)
	comentarios_estado_carro = models.CharField(verbose_name='Comentarios del Estado del Carro', max_length=300, blank=True, null=True)
	fecha_creacion = models.DateField(verbose_name='Fecha de Creación', auto_now_add=True)
	fecha_entrega_esperada = models.DateField(verbose_name='Fecha de Entrega Esperada', default=datetime.now()+timedelta(days=20))
	fecha_entrega_real = models.DateField(verbose_name='Fecha de Entrega Real', blank=True, null=True)
	estado_reparacion = models.CharField(verbose_name='Estado de la Reparación', max_length=1, choices=(('P', 'En Proceso'), ('R', 'Retrasada'), ('E', 'A la espera de repuestos'), ('F', 'Finalizada')), default='P')
	repuestos_en_orden_trabajo = models.ManyToManyField(verbose_name='Repuestos en la Orden de Trabajo', to='Repuesto')

	class Meta:
		verbose_name = 'Orden de Trabajo'
		verbose_name_plural = 'Ordenes de Trabajo'
		ordering = ['id_orden_trabajo']
	
	def __str__(self):
		return 'Orden de Trabajo: ' + self.id_orden_trabajo + ' ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' ' + self.modelo.nombre_modelo + ' ' + self.placa_carro + ' ' + self.estado_reparacion


class Trabajo(models.Model):
	id_trabajo = models.AutoField(verbose_name='ID del Trabajo', primary_key=True)
	orden_trabajo = models.ForeignKey(verbose_name='Orden de Trabajo', to='Orden_Trabajo', on_delete=models.CASCADE)
	descripcion_trabajo = models.CharField(verbose_name='Descripción del Trabajo', max_length=300, blank=True, null=True)
	precio_trabajo = models.DecimalField(verbose_name='Precio del Trabajo', max_digits=10, decimal_places=2)
	
	class Meta:
		verbose_name = 'Trabajo en la Orden de Trabajo'
		verbose_name_plural = 'Trabajos en la Orden de Trabajo'
		ordering = ['id_trabajo']
	
	def __str__(self):
		return 'Trabajo: ' + self.id_trabajo


class Extra(models.Model):
	id_extra = models.AutoField(verbose_name='ID del Extra', primary_key=True)
	nombre_extra = models.CharField(verbose_name='Nombre del Extra', max_length=30, unique=True)
	descripcion_extra = models.CharField(verbose_name='Descripción del Extra', max_length=300, blank=True, null=True)

	class Meta:
		verbose_name = 'Extra'
		verbose_name_plural = 'Extras'
		ordering = ['nombre_extra']
	
	def __str__(self):
		return 'Extra: ' + self.id_extra + ' ' + self.nombre_extra


class Cotizacion(models.Model):
	id_cotizacion = models.AutoField(verbose_name='ID de la Cotización', primary_key=True)
	vendedor = models.ForeignKey(verbose_name='Vendedor', to='Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey(verbose_name='Cliente', to='Cliente', on_delete=models.PROTECT)
	fecha_creacion = models.DateField(verbose_name='Fecha de Creación', auto_now_add=True)
	porcentaje_descuento = models.DecimalField(verbose_name='Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)
	fecha_vencimiento = models.DateField(verbose_name='Fecha de Vencimiento', default=datetime.now()+timedelta(days=20))
	modelos = models.ManyToManyField(verbose_name='Modelos', to='Modelo', through='Cotizacion_Modelo')

	class Meta:
		verbose_name = 'Cotización'
		verbose_name_plural = 'Cotizaciones'
		ordering = ['id_cotizacion']

	def __str__(self):
		return 'Cotización: ' + self.id_cotizacion + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Vendedor: ' + self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido + ' Fecha: ' + self.fecha_creacion
	

class Cotizacion_Modelo(models.Model):
	id_cotizacion_modelo = models.AutoField(verbose_name='ID de la Cotización del Modelo', primary_key=True)
	cotizacion = models.ForeignKey(verbose_name='Cotización', to='Cotizacion', on_delete=models.CASCADE)
	modelo = models.ForeignKey(verbose_name='Modelo', to='Modelo', on_delete=models.PROTECT)
	color = models.ForeignKey(verbose_name='Color', to='Color', on_delete=models.PROTECT)
	extras = models.ForeignKey(verbose_name='Extras', to='Extra', on_delete=models.PROTECT)
	cantidad = models.IntegerField(verbose_name='Cantidad', default=1)

	class Meta:
		verbose_name = 'Modelo en la Cotización'
		verbose_name_plural = 'Modelos en la Cotización'
		ordering = ['id_cotizacion_modelo']
	
	def __str__(self):
		return 'Cotización del Modelo: ' + self.id_cotizacion_modelo + ' Cotización: ' + self.cotizacion.id_cotizacion + ' Modelo: ' + self.modelo.nombre_modelo + ' Color: ' + self.color.nombre_color + ' Extras: ' + self.extras.nombre_extra + ' Cantidad: ' + self.cantidad


class Venta(models.Model):
	id_venta = models.AutoField(verbose_name='ID de la Venta', primary_key=True)
	vendedor = models.ForeignKey(verbose_name='Vendedor', to='Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey(verbose_name='Cliente', to='Cliente', on_delete=models.PROTECT)
	fecha_venta = models.DateField(verbose_name='Fecha de Creación', auto_now_add=True)
	carros = models.ManyToManyField(verbose_name='Carros', to='Carro', through='Venta_Carro')

	class Meta:
		verbose_name = 'Venta'
		verbose_name_plural = 'Ventas'
		ordering = ['id_venta']

	def __str__(self):
		return 'Venta: ' + self.id_venta + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Vendedor: ' + self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido + ' Fecha: ' + self.fecha_venta


class Venta_Carro(models.Model):
	id_venta_carro = models.AutoField(verbose_name='ID de la Venta del Carro', primary_key=True)
	venta = models.ForeignKey(verbose_name='Venta', to='Venta', on_delete=models.CASCADE)
	carro = models.ForeignKey(verbose_name='Carro', to='Carro', on_delete=models.PROTECT)
	extras = models.ForeignKey(verbose_name='Extras', to='Extra', on_delete=models.PROTECT)
	porcentaje_descuento = models.DecimalField(verbose_name='Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)
	cantidad = models.IntegerField(verbose_name='Cantidad', default=1)

	class Meta:
		verbose_name = 'Carro en la Venta'
		verbose_name_plural = 'Carros en la Venta'
		ordering = ['id_venta_carro']
	
	def __str__(self):
		return 'Venta del Carro: ' + self.carro + ' en Venta: ' + self.venta.id_venta + ' Extras: ' + self.extras.nombre_extra + ' Cantidad: ' + self.cantidad

	