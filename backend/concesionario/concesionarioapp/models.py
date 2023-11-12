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
        return 'Modelo: ' + str(self.id_modelo) + ' ' + self.nombre_modelo + ' ' + str(
            self.anho) + ' Carrocería: ' + str(self.carroceria) + ' Combustible: ' + str(
            self.combustible) + ' Pasajeros: ' + str(self.numero_pasajeros) + ' Precio: ' + str(self.precio_base)

class Color(models.Model):
    id_color = models.AutoField('ID del Color', primary_key=True)
    nombre_color = models.CharField('Nombre del Color', max_length=30, unique=True)
    hexadecimal_color = models.CharField('Hexadecimal del Color', max_length=7, unique=True)
    porcentanje_incremento_por_color = models.DecimalField('Porcentaje de Incremento por Color', max_digits=4,
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
        return 'Vehículo: ' + str(
            self.vin) + ' ' + self.modelo_vehiculo.nombre_modelo + ' ' + self.color_vehiculo.nombre_color + ' en ' + self.sucursal_vehiculo.nombre_sucursal + (
            ' disponible para venta.' if self.disponible_para_venta else ' ( ya vendido.)')

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
        return self.modelo_vehiculo.precio_base * (1 + (self.color_vehiculo.porcentanje_incremento_por_color))


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
    fecha_venta = models.DateField('Fecha de Creación', auto_now_add=True)

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
            precio_total += venta_vehiculo.precio()

        return precio_total


class Venta_Vehiculo(models.Model):
    id_venta_vehiculo = models.AutoField('ID de la Venta del Vehiculo', primary_key=True)
    venta = models.ForeignKey('Venta', on_delete=models.CASCADE)
    vehiculo = models.OneToOneField('Vehiculo', on_delete=models.PROTECT)
    extra = models.ForeignKey('Extra', on_delete=models.PROTECT)
    porcentaje_descuento = models.DecimalField('Porcentaje de Descuento', default=0, max_digits=4, decimal_places=2)

    class Meta:
        verbose_name = 'Vehículo en la Venta'
        verbose_name_plural = 'Vehículos en la Venta'
        ordering = ['id_venta_vehiculo']

    def __str__(self):
        return 'Venta del Vehículo: ' + self.vehiculo + ' en Venta: ' + str(
            self.venta.id_venta) + ' Extra: ' + self.extra.nombre_extra + ' Cantidad: ' + str(self.cantidad)

    def nombre_modelo(self):
        return self.vehiculo.nombre_modelo

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

    def precio(self):
        return (self.vehiculo.modelo_vehiculo.precio_base * (
                1 + (self.vehiculo.color_vehiculo.porcentanje_incremento_por_color)) * (
                        1 - (self.porcentaje_descuento)))

    def precio_str(self):
        return str(self.vehiculo.modelo_vehiculo.precio_base * (
                    1 + (self.vehiculo.color_vehiculo.porcentanje_incremento_por_color)) * (
                               1 - (self.porcentaje_descuento)))
    
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
     
class Cotizacion(models.Model):
	id_cotizacion = models.AutoField('ID de la Cotización', primary_key=True)
	vendedor = models.ForeignKey('Empleado', on_delete=models.PROTECT)
	cliente = models.ForeignKey('Cliente', on_delete=models.PROTECT)
	fecha_creacion = models.DateField('Fecha de Creación', auto_now_add=True)
	porcentaje_descuento = models.DecimalField('Porcentaje de Descuento', default=0, max_digits=5, decimal_places=4)
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
