from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import timedelta, date
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
	genero = models.CharField('Género',
							  choices=(('Masculino', 'Masculino'), ('Femenino', 'Femenino'), ('Otro', 'Otro')),
							  blank=True, null=True)
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
		return 'Cliente: ' + str(
			self.usuario.cedula) + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido

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
	cargo = models.CharField('Cargo', choices=(
		('Gerente', 'Gerente'), ('Vendedor', 'Vendedor'), ('Jefe de Taller', 'Jefe de taller')))
	sucursal = models.ForeignKey('Sucursal', on_delete=models.PROTECT, blank=True, null=True)

	class Meta:
		verbose_name = 'Empleado'
		verbose_name_plural = 'Empleados'
		ordering = ['usuario__primer_apellido', 'usuario__primer_nombre']

	def __str__(self):
		return 'Empleado: ' + str(
			self.usuario.cedula) + ' - ' + self.usuario.primer_nombre + ' ' + self.usuario.primer_apellido + ' Cargo: ' + self.cargo

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
	id_modelo = models.AutoField('ID del Modelo', primary_key=True)
	nombre_modelo = models.CharField('Nombre del Modelo', max_length=60, unique=True)
	anho = models.IntegerField('Año del Modelo')
	carroceria = models.CharField('Carrocería', choices=(
	('Sedan', 'Sedan'), ('Hatchback', 'Hatchback'), ('Station Wagon', 'Station Wagon'), ('Pickup', 'Pickup'),
	('SUV', 'SUV'), ('Van', 'Van'), ('Convertible', 'Convertible'), ('Coupe', 'Coupe'), ('Roadster', 'Roadster'),
	('Camion', 'Camion'), ('Camioneta', 'Camioneta'), ('Bus', 'Bus'), ('Minivan', 'Minivan'), ('Microbus', 'Microbus'),
	('Micro', 'Micro'), ('Tracto Camion', 'Tracto Camion'), ('Trailer', 'Trailer')), blank=True, null=True)
	cilindraje = models.IntegerField('Cilindraje')
	potencia = models.IntegerField('Potencia')
	combustible = models.CharField('Combustible', choices=(
	('Gasolina', 'Gasolina'), ('Diesel', 'Diesel'), ('Electrico', 'Electrico'), ('Hibrido', 'Hibrido'), ('Gas', 'Gas'),
	('Gas Natural', 'Gas Natural'), ('Gas Licuado', 'Gas licuado')))
	numero_pasajeros = models.IntegerField('Número de Pasajeros')
	precio_base = models.IntegerField('Precio Base')

	class Meta:
		verbose_name = 'Modelo'
		verbose_name_plural = 'Modelos'
		ordering = ['id_modelo']

	def __str__(self):
		return self.nombre_modelo

class Color(models.Model):
	id_color = models.AutoField('ID del Color', primary_key=True)
	nombre_color = models.CharField('Nombre del Color', max_length=30, unique=True)
	hexadecimal_color = models.CharField('Hexadecimal del Color', max_length=7, unique=True)
	porcentaje_incremento_por_color = models.DecimalField('Porcentaje de Incremento por Color', max_digits=4,
														   decimal_places=2)

	class Meta:
		verbose_name = 'Color'
		verbose_name_plural = 'Colores'
		ordering = ['nombre_color']

	def __str__(self):
		return 'Color: ' + str(self.id_color) + ' ' + self.nombre_color


class Vehiculo(models.Model):
	vin = models.CharField('VIN', max_length=17, primary_key=True, unique=True)
	modelo_vehiculo = models.ForeignKey('Modelo', on_delete=models.PROTECT)
	color_vehiculo = models.ForeignKey('Color', on_delete=models.PROTECT)
	sucursal_vehiculo = models.ForeignKey('Sucursal', on_delete=models.PROTECT)
	disponible_para_venta = models.BooleanField('Disponible para Venta', default=True)

	class Meta:
		verbose_name = 'Vehículo'
		verbose_name_plural = 'Vehículos'
		ordering = ['vin']

	def __str__(self):
		return str(self.vin) + ' ' + self.modelo_vehiculo.nombre_modelo + ' ' + self.color_vehiculo.nombre_color

	def nombre_modelo(self):
		return self.modelo_vehiculo.nombre_modelo

	def anho_modelo(self):
		return self.modelo_vehiculo.anho

	def carroceria(self):
		return self.modelo_vehiculo.carroceria

	def combustible(self):
		return self.modelo_vehiculo.combustible

	def numero_pasajeros(self):
		return self.modelo_vehiculo.numero_pasajeros

	def nombre_color(self):
		return self.color_vehiculo.nombre_color
	
	def hexadecimal_color(self):
		return self.color_vehiculo.hexadecimal_color

	def sucursal(self):
		return self.sucursal_vehiculo.nombre_sucursal

	def precio(self):
		return self.modelo_vehiculo.precio_base * (1 + (self.color_vehiculo.porcentaje_incremento_por_color))


class Extra(models.Model):
	id_extra = models.AutoField('ID del Extra', primary_key=True)
	nombre_extra = models.CharField('Nombre del Extra', max_length=30, unique=True)
	descripcion_extra = models.CharField('Descripción del Extra', max_length=300, blank=True, null=True)

	class Meta:
		verbose_name = 'Extra'
		verbose_name_plural = 'Extras'
		ordering = ['nombre_extra']

	def __str__(self):
		return 'Extra: ' + str(self.id_extra) + ' ' + self.nombre_extra


class Venta(models.Model):
	id_venta = models.AutoField('ID de la Venta', primary_key=True)
	vendedor = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	fecha_venta = models.DateField('Fecha de Creación')

	class Meta:
		verbose_name = 'Venta'
		verbose_name_plural = 'Ventas'
		ordering = ['id_venta']

	def __str__(self):
		return 'Venta: ' + str(
			self.id_venta) + ' Cliente: ' + self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido + ' Vendedor: ' + self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido + ' Fecha: ' + str(
			self.fecha_venta)

	def nombre_vendedor(self):
		return self.vendedor.usuario.primer_nombre + ' ' + self.vendedor.usuario.primer_apellido

	def nombre_cliente(self):
		return self.cliente.usuario.primer_nombre + ' ' + self.cliente.usuario.primer_apellido

	def lista_vehiculos(self):
		return ', '.join([str(venta_vehiculo.vehiculo) for venta_vehiculo in Venta_Vehiculo.objects.filter(venta=self)])

	def precio_total(self):
		precio_total = 0

		for venta_vehiculo in Venta_Vehiculo.objects.filter(venta=self):
			precio_total += (venta_vehiculo.precio() * (1 - (venta_vehiculo.porcentaje_descuento)))

		return precio_total


class Venta_Vehiculo(models.Model):
	id_venta_vehiculo = models.AutoField('ID de la Venta del Vehiculo', primary_key=True)
	venta = models.ForeignKey('Venta', on_delete=models.CASCADE)
	vehiculo = models.OneToOneField('Vehiculo', on_delete=models.PROTECT)
	extra = models.ForeignKey('Extra', on_delete=models.PROTECT, blank=True, null=True)
	porcentaje_descuento = models.DecimalField('Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)

	class Meta:
		verbose_name = 'Vehículo en la Venta'
		verbose_name_plural = 'Vehículos en la Venta'
		ordering = ['id_venta_vehiculo']

	def __str__(self):
		return 'Venta del Vehículo: ' + self.vehiculo + ' en Venta: ' + str(
			self.venta.id_venta) + ' Extra: ' + self.extra.nombre_extra + ' Cantidad: ' + str(self.cantidad)

	def nombre_modelo(self):
		return self.vehiculo.nombre_modelo()

	def anho_modelo(self):
		return str(self.vehiculo.anho_modelo)

	def carroceria(self):
		return self.vehiculo.carroceria

	def combustible(self):
		return self.vehiculo.combustible

	def numero_pasajeros(self):
		return self.vehiculo.numero_pasajeros

	def nombre_color(self):
		return self.vehiculo.nombre_color
	
	def hexadecimal_color(self):
		return self.vehiculo.hexadecimal_color()
	
	def nombre_extra(self):
		return self.extra.nombre_extra

	def precio(self):
		return (self.vehiculo.precio())

	def precio_str(self):
		return str(self.vehiculo.precio())
	

class Cotizacion_Modelo(models.Model):
	id_cotizacion_modelo = models.AutoField('ID de la Cotización del Modelo', primary_key=True)
	cotizacion = models.ForeignKey('Cotizacion', on_delete=models.CASCADE)
	modelo = models.ForeignKey('Modelo', on_delete=models.PROTECT)
	color = models.ForeignKey('Color', on_delete=models.PROTECT)
	extra = models.ForeignKey('Extra', on_delete=models.PROTECT, blank=True, null=True)
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
	 
	def hexadecimal_color(self):
		return self.color.hexadecimal_color
	
	def porcentaje_incremento_por_color(self):
		return self.color.porcentaje_incremento_por_color
	
	def nombre_extra(self):
		return self.extra.nombre_extra
	
	def precio_base_modelo(self):
		return self.modelo.precio_base
	
	def precio(self):
		return self.cantidad * (self.modelo.precio_base * (1 + (self.color.porcentaje_incremento_por_color)))
	 
class Cotizacion(models.Model):
	id_cotizacion = models.AutoField('ID de la Cotización', primary_key=True)
	vendedor = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	fecha_creacion = models.DateField('Fecha de Creación')
	fecha_vencimiento = models.DateField('Fecha de Vencimiento')
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
			precio_total += cotizacion_modelo.precio()	

		return precio_total

class Repuesto(models.Model):
    id_repuesto = models.AutoField('ID del Repuesto', primary_key=True)
    nombre_repuesto = models.CharField('Nombre del Repuesto', unique=True)
    precio_repuesto = models.DecimalField('Precio del Repuesto', max_digits=10, decimal_places=2, blank=True, null=True)
    descripcion_repuesto = models.CharField('Descripción del Repuesto', max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = 'Repuesto'
        verbose_name_plural = 'Repuestos'
        ordering = ['nombre_repuesto']
    
    def __str__(self):
        return 'Repuesto: ' + str(self.id_repuesto) + ' ' + self.nombre_repuesto + ' con precio ' + str(self.precio_repuesto) + ' y descripción ' + self.descripcion_repuesto
    

class Uso_Repuesto(models.Model):
    id_uso_repuesto = models.AutoField('ID del Uso del Repuesto', primary_key=True)
    id_repuesto = models.ForeignKey('Repuesto', on_delete=models.CASCADE)
    id_modelo = models.ForeignKey('Modelo', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Uso del Repuesto'
        verbose_name_plural = 'Usos de los Repuestos'
        ordering = ['id_uso_repuesto']
        unique_together = ('id_repuesto', 'id_modelo') 
    
    def __str__(self):
        return 'Uso del Repuesto: ' + self.id_uso_repuesto + ' ' + self.id_repuesto.nombre_repuesto + ' en ' + self.id_modelo.nombre_modelo + ' con ' + self.cantidad + ' unidades.'
    
    def nombre_repuesto(self):
        return self.id_repuesto.nombre_repuesto

    def nombre_modelo(self):
        return self.id_modelo.nombre_modelo

class Inventario_Repuesto(models.Model):
    id_inventario_repuesto = models.AutoField('ID del Inventario de Repuesto', primary_key=True)
    id_repuesto = models.ForeignKey('Repuesto', on_delete=models.CASCADE)
    id_sucursal = models.ForeignKey('Sucursal', on_delete=models.CASCADE)
    cantidad = models.IntegerField('Cantidad de Repuestos en Inventario', default=0)

    class Meta:
        verbose_name = 'Inventario de Repuesto'
        verbose_name_plural = 'Inventarios de Repuestos'
        ordering = ['id_inventario_repuesto']
        unique_together = ('id_repuesto', 'id_sucursal')
    
    def __str__(self):
        return 'Inventario de Repuesto: ' + self.id_inventario_repuesto + ' ' + self.id_repuesto.nombre_repuesto + ' en ' + self.id_sucursal.nombre_sucursal + ' con ' + self.cantidad + ' unidades.'
    
    def nombre_sucursal(self):
        return self.id_sucursal.nombre_sucursal

    def nombre_repuesto(self):
        return self.id_repuesto.nombre_repuesto

"""
class Orden_Trabajo(models.Model):
    id_orden_trabajo = models.AutoField('ID de la Orden de Trabajo', primary_key=True)
    id_jefe_taller = models.ForeignKey('Empleado', on_delete=models.PROTECT)
    id_cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
    id_modelo = models.ForeignKey('Modelo', on_delete=models.PROTECT)
    placa_carro = models.CharField('Placa del Carro', max_length=6, blank=True, null=True)
    comentarios_estado_carro = models.CharField('Comentarios del Estado del Carro', max_length=300, blank=True, null=True)
    fecha_creacion = models.DateField('Fecha de Creación', auto_now_add=True)
    fecha_entrega_esperada = models.DateField('Fecha de Entrega Esperada', default=date.today() + timedelta(days=20))
    fecha_entrega_real = models.DateField('Fecha de Entrega Real', blank=True, null=True)
    estado_reparacion = models.CharField('Estado de la Reparación', max_length=1, choices=(('P', 'En Proceso'), ('R', 'Retrasada'), ('E', 'A la espera de repuestos'), ('F', 'Finalizada')), default='P')

    class Meta:
        verbose_name = 'Orden de Trabajo'
        verbose_name_plural = 'Ordenes de Trabajo'
        ordering = ['id_orden_trabajo']
    
    def __str__(self):
        return 'Orden de Trabajo: ' + str(self.id_orden_trabajo) + ' Cliente: ' + self.id_cliente.usuario.primer_nombre + ' ' + self.id_cliente.usuario.primer_apellido + ' Jefe de Taller: ' + self.id_jefe_taller.usuario.primer_nombre + ' ' + self.id_jefe_taller.usuario.primer_apellido + ' Fecha de Creación: ' + str(self.fecha_creacion) + ' Fecha de Entrega Esperada: ' + str(self.fecha_entrega_esperada) + ' Fecha de Entrega Real: ' + str(self.fecha_entrega_real) + ' Estado de la Reparación: ' + self.estado_reparacion
    
    def nombre_jefe_taller(self):
        return self.id_jefe_taller.usuario.primer_nombre + ' ' + self.id_jefe_taller.usuario.primer_apellido
    
    def sucursal(self):
        return self.id_jefe_taller.sucursal

    def nombre_sucursal(self):
        return self.id_jefe_taller.nombre_sucursal
    
    def nombre_cliente(self):
        return self.id_cliente.usuario.primer_nombre + ' ' + self.id_cliente.usuario.primer_apellido
    
    def nombre_modelo(self):
        return self.id_modelo.nombre_modelo + ' ' + self.id_modelo.anho_modelo + ' ' + self.id_modelo.combustible

    def lista_trabajos(self):
        return ', '.join([trabajo.descripcion_trabajo for trabajo in Trabajo.objects.filter(orden_trabajo=self)])

class Trabajo(models.Model):
    id_trabajo = models.AutoField('ID del Trabajo', primary_key=True)
    id_orden_trabajo = models.ForeignKey('Orden_Trabajo', on_delete=models.CASCADE)
    descripcion_trabajo = models.CharField('Descripción del Trabajo', max_length=300, blank=True, null=True)
    precio_trabajo = models.DecimalField('Precio del Trabajo', max_digits=10, decimal_places=2)
    
    class Meta:
        verbose_name = 'Trabajo en la Orden de Trabajo'
        verbose_name_plural = 'Trabajos en la Orden de Trabajo'
        ordering = ['id_trabajo']
    
    def __str__(self):
        return 'Trabajo: ' + str(self.id_trabajo) + ' Orden de Trabajo: ' + str(self.id_orden_trabajo) + ' Descripción: ' + self.descripcion_trabajo + ' Precio: ' + str(self.precio_trabajo)
    
class Repuesto_Orden(models.Model):
    id_repuesto_orden = models.AutoField('ID del Repuesto en la Orden', primary_key=True)
    id_orden_trabajo = models.ForeignKey('Orden_Trabajo', on_delete=models.CASCADE)
    id_inventario_rep = models.ForeignKey('Inventario_Repuesto', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Repuesto en la 
"""