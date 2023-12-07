from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Modelo
from django.utils.timezone import now
from django.db import transaction
from .models import *
from django.contrib.auth.models import Group


class TokenPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, usuario):
        token = super().get_token(usuario)

        token['email'] = usuario.email
        token['primerNombre'] = usuario.primer_nombre
        token['primerApellido'] = usuario.primer_apellido

        if usuario.is_superuser:
            token['tipoUsuario'] = 'Superusuario'
        elif usuario.is_staff:
            token['tipoUsuario'] = Empleado.objects.get(usuario_id=usuario.cedula).cargo
        else:
            token['tipoUsuario'] = 'Cliente'

        return token


class UsuarioSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField()
    clave = serializers.CharField(source='password', write_only=True)
    correo = serializers.EmailField(source='email')
    primerNombre = serializers.CharField(source='primer_nombre')
    segundoNombre = serializers.CharField(source='segundo_nombre', required=False, allow_blank=True)
    primerApellido = serializers.CharField(source='primer_apellido')
    segundoApellido = serializers.CharField(source='segundo_apellido', required=False, allow_blank=True)
    telefono = serializers.CharField()
    celular = serializers.CharField()
    direccion = serializers.CharField()
    ciudad = serializers.CharField()
    fechaNacimiento = serializers.DateField(source='fecha_nacimiento')
    genero = serializers.CharField()

    class Meta:
        model = Usuario
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero'
    
    def create(self, validated_data):
        if Usuario.objects.filter(cedula=validated_data['cedula']).exists():
            raise serializers.ValidationError({'cedula': 'Ya existe un usuario con esta cedula'})
        
        if Usuario.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'Ya existe un usuario con este correo'})
        
        usuario = Usuario.objects.create(**validated_data)

        usuario.set_password(validated_data['password'])
        usuario.save()

        return usuario


class ClienteSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula')
    clave = serializers.CharField(source='usuario.password', write_only=True, required=False, allow_blank=True)
    correo = serializers.EmailField(source='usuario.email')
    primerNombre = serializers.CharField(source='usuario.primer_nombre')
    segundoNombre = serializers.CharField(source='usuario.segundo_nombre', required=False, allow_blank=True)
    primerApellido = serializers.CharField(source='usuario.primer_apellido')
    segundoApellido = serializers.CharField(source='usuario.segundo_apellido', required=False, allow_blank=True)
    telefono = serializers.CharField(source='usuario.telefono')
    celular = serializers.CharField(source='usuario.celular')
    direccion = serializers.CharField(source='usuario.direccion')
    ciudad = serializers.CharField(source='usuario.ciudad')
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento')
    genero = serializers.CharField(source='usuario.genero')
                        
    class Meta:
        model = Cliente
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario = Usuario.objects.get(cedula=usuario_data['cedula'])

        cliente = Cliente.objects.create(usuario=usuario)

        grupo_clientes, created = Group.objects.get_or_create(name='Cliente')
        usuario.groups.add(grupo_clientes)

        return cliente
    

    def update(self, instance, validated_data):
        usuario_data = validated_data.pop('usuario')
        password = usuario_data.pop('password')

        if Usuario.objects.filter(email=usuario_data['email']).exclude(cedula=instance.usuario_id).exists():
            raise serializers.ValidationError({'email': 'Ya existe un usuario con este correo'})
        
        Usuario.objects.filter(cedula=instance.usuario_id).update(**usuario_data)

        if password:
            instance.usuario.set_password(password)
            instance.usuario.save()

        return instance


class CustomDateField(serializers.DateField):
    def to_internal_value(self, data):
        if data == '':
            return None
        return super().to_internal_value(data)

class EmpleadoSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula')
    clave = serializers.CharField(source='usuario.password', write_only=True, required=False, allow_blank=True)
    correo = serializers.EmailField(source='usuario.email')
    primerNombre = serializers.CharField(source='usuario.primer_nombre')
    segundoNombre = serializers.CharField(source='usuario.segundo_nombre', required=False, allow_blank=True)
    primerApellido = serializers.CharField(source='usuario.primer_apellido')
    segundoApellido = serializers.CharField(source='usuario.segundo_apellido', required=False, allow_blank=True)
    telefono = serializers.CharField(source='usuario.telefono')
    celular = serializers.CharField(source='usuario.celular')
    direccion = serializers.CharField(source='usuario.direccion')
    ciudad = serializers.CharField(source='usuario.ciudad')
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento')
    genero = serializers.CharField(source='usuario.genero')
    fechaIngreso = serializers.DateField(source='fecha_ingreso')
    fechaRetiro = CustomDateField(source='fecha_retiro', required=False, allow_null=True)
    salario = serializers.IntegerField(source='salario_base')
    tipoSangre = serializers.CharField(source='tipo_sangre')
    eps = serializers.CharField()
    arl = serializers.CharField()
    cargo = serializers.CharField()
    sucursal = serializers.PrimaryKeyRelatedField(queryset=Sucursal.objects.all())

    class Meta:
        model = Empleado
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero', 'fechaIngreso', 'fechaRetiro', 'salario', 'tipoSangre', 'eps', 'arl', 'cargo', 'sucursal'
    
    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario = Usuario.objects.get(cedula=usuario_data['cedula'])
        usuario.is_staff = True
        usuario.save()

        empleado = Empleado.objects.create(usuario=usuario, **validated_data)
        
        if empleado.cargo == 'Gerente':
            grupo_gerentes, created = Group.objects.get_or_create(name='Gerente')
            usuario.groups.add(grupo_gerentes)
        elif empleado.cargo == 'Vendedor':
            grupo_vendedores, created = Group.objects.get_or_create(name='Vendedor')
            usuario.groups.add(grupo_vendedores)
        elif empleado.cargo == 'Jefe de taller':
            grupo_jefes_taller, created = Group.objects.get_or_create(name='Jefe de taller')
            usuario.groups.add(grupo_jefes_taller)

        return empleado


    def update(self, instance, validated_data):
        usuario_data = validated_data.pop('usuario')
        password = usuario_data.pop('password')

        if Usuario.objects.filter(email=usuario_data['email']).exclude(cedula=instance.usuario_id).exists():
            raise serializers.ValidationError({'email': 'Ya existe un usuario con este correo'})

        Usuario.objects.filter(cedula=instance.usuario_id).update(**usuario_data)

        if password:
            instance.usuario.set_password(password)
            instance.usuario.save()

        Empleado.objects.filter(usuario_id=instance.usuario_id).update(**validated_data)
        return instance
    

class SucursalSerializer(serializers.ModelSerializer):
    sucursal = serializers.IntegerField(source='id_sucursal', read_only=True)
    nombreSucursal = serializers.CharField(source='nombre_sucursal')
    direccionSucursal = serializers.CharField(source='direccion_sucursal', write_only=True)
    ciudadSucursal = serializers.CharField(source='ciudad_sucursal', write_only=True)
    telefonoSucursal = serializers.CharField(source='telefono_sucursal', write_only=True)

    class Meta:
        model = Sucursal
        fields = 'sucursal', 'nombreSucursal', 'direccionSucursal', 'ciudadSucursal', 'telefonoSucursal'

    def create(self, validated_data):
        if Sucursal.objects.filter(id_sucursal=validated_data['id_sucursal']).exists():
            raise serializers.ValidationError({'id_sucursal': 'Ya existe una sucursal con este id'})
        
        if Sucursal.objects.filter(nombre_sucursal=validated_data['nombre_sucursal']).exists():
            raise serializers.ValidationError({'nombre_sucursal': 'Ya existe una sucursal con este nombre'})
        
        if Sucursal.objects.filter(direccion_sucursal=validated_data['direccion_sucursal']).exists():
            raise serializers.ValidationError({'direccion_sucursal': 'Ya existe una sucursal con esta dirección'})
        
        sucursal = Sucursal.objects.create(**validated_data)
        return sucursal

    def update(self, instance, validated_data):
        Sucursal.objects.filter(id_sucursal=instance.id_sucursal).update(**validated_data)
        return instance



class ModeloSerializer(serializers.ModelSerializer):

    class Meta:
        model = Modelo
        fields = 'id', 'nombre', 'año', 'numeroPasajeros', 'precioBase', 'cilindraje', 'potencia', 'combustible', 'carroceria'
    
    id = serializers.IntegerField(source='id_modelo', read_only=True)
    nombre = serializers.CharField(source='nombre_modelo')
    año = serializers.IntegerField(source='anho')
    numeroPasajeros = serializers.IntegerField(source='numero_pasajeros')
    precioBase = serializers.IntegerField(source='precio_base')
    cilindraje = serializers.IntegerField()
    potencia = serializers.IntegerField()
    combustible = serializers.CharField()
    carroceria = serializers.CharField()

    def validate(self, attrs):
        if(attrs['numero_pasajeros'] < 1):
            raise serializers.ValidationError("El número de pasajeros no puede ser menor a 1")
        
        if(attrs['precio_base'] < 0):
            raise serializers.ValidationError("El precio base no puede ser negativo")	
        
        anho_maximo = now().year + 1
        if(attrs['anho'] < 1900 or attrs['anho'] > anho_maximo):
            raise serializers.ValidationError("El año del modelo debe estar entre 1900 y el actual")
        
        if(attrs['cilindraje'] < 0 or attrs['cilindraje'] > 10000):
            raise serializers.ValidationError("El cilindraje debe estar entre 0 y 10000")
        
        if(attrs['potencia'] < 0 or attrs['potencia'] > 999):
            raise serializers.ValidationError("La potencia debe estar entre 0 y 999")
        

        return super().validate(attrs)
    
    def create(self, validated_data):
        if(Modelo.objects.filter(nombre_modelo = validated_data['nombre_modelo']).exists()):
            raise serializers.ValidationError({'nombre': 'Ya existe un modelo con ese nombre'})
          
        return Modelo.objects.create(**validated_data)
    
    
    def update(self, instance, validated_data):
        if(Modelo.objects.filter(nombre_modelo = validated_data['nombre_modelo']).exists() and instance.nombre_modelo != validated_data['nombre_modelo']):
            raise serializers.ValidationError({'nombre': 'Ya existe un modelo con ese nombre'})
        
        return super().update(instance, validated_data)
    
    
class VehiculoSerializer(serializers.ModelSerializer):
    vin = serializers.CharField()
    modelo = serializers.PrimaryKeyRelatedField(source='modelo_vehiculo', queryset=Modelo.objects.all())
    nombreModelo = serializers.CharField(source='nombre_modelo', read_only=True)
    color = serializers.PrimaryKeyRelatedField(source='color_vehiculo', queryset=Color.objects.all())
    nombreColor = serializers.CharField(source='nombre_color', read_only=True)
    hexadecimalColor = serializers.CharField(source='hexadecimal_color', read_only=True)
    sucursal = serializers.PrimaryKeyRelatedField(source='sucursal_vehiculo', queryset=Sucursal.objects.all())
    nombreSucursal = serializers.CharField(source='sucursal', read_only=True)
    disponibleVenta = serializers.BooleanField(source='disponible_para_venta', read_only=True)
    precio = serializers.IntegerField(read_only=True)


    class Meta:
        model = Vehiculo
        fields = 'vin', 'modelo', 'nombreModelo', 'color', 'nombreColor', 'hexadecimalColor', 'sucursal', 'nombreSucursal', 'disponibleVenta', 'precio'

    def create(self, validated_data):
        if Vehiculo.objects.filter(vin=validated_data['vin']).exists():
            raise serializers.ValidationError({'vin': 'Ya existe un vehiculo con este vin'})
        
        vehiculo = Vehiculo.objects.create(**validated_data)
        return vehiculo
    
    def update(self, instance, validated_data):
        Vehiculo.objects.filter(vin=instance.vin).update(**validated_data)
        return instance
        

class ColorSerializer(serializers.ModelSerializer):
    idColor = serializers.IntegerField(source='id_color')
    colorNombre = serializers.CharField(source='nombre_color')
    hexadecimalColor = serializers.CharField(source='hexadecimal_color')
    
    class Meta:
        model = Color
        fields = "__all__"


class VentaVehiculoSerializer(serializers.ModelSerializer):
    vehiculo = serializers.PrimaryKeyRelatedField(queryset=Vehiculo.objects.all())
    extra = serializers.PrimaryKeyRelatedField(queryset=Extra.objects.all())
    porcentajeDescuento = serializers.DecimalField(source='porcentaje_descuento', max_digits=4, decimal_places=2)
    venta_id = serializers.IntegerField(read_only=True)
    modelo = serializers.CharField(source='nombre_modelo', read_only=True)

    class Meta:
        model = Venta_Vehiculo
        fields = 'vehiculo', 'extra', 'porcentajeDescuento', 'venta_id', 'modelo'


class ExtraSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_extra', read_only=True)
    nombreExtra = serializers.CharField(source='nombre_extra')
    descripcionExtra = serializers.CharField(source='descripcion_extra')

    class Meta:
        model = Extra
        fields = 'id', 'nombreExtra', 'descripcionExtra'
    

class VentaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_venta', read_only=True)
    cedulaCliente = serializers.PrimaryKeyRelatedField(source='cliente', queryset=Cliente.objects.all())
    nombreCliente = serializers.CharField(source='nombre_cliente', read_only=True)
    cedulaVendedor = serializers.PrimaryKeyRelatedField(source='vendedor', queryset=Empleado.objects.all())
    nombreVendedor = serializers.CharField(source='nombre_vendedor', read_only=True)
    fechaVenta = serializers.DateField(source='fecha_venta')
    valorVenta = serializers.IntegerField(source='precio_total', read_only=True)
    ventaVehiculo = VentaVehiculoSerializer(many=True, source='venta_vehiculo_set')

    class Meta:
        model = Venta
        fields = 'id', 'cedulaCliente', 'nombreCliente', 'cedulaVendedor', 'nombreVendedor', 'fechaVenta', 'valorVenta', 'ventaVehiculo'

    @transaction.atomic
    def create(self, validated_data):
        venta_vehiculo_data = validated_data.pop('venta_vehiculo_set')
        venta = Venta.objects.create(**validated_data)

        if venta.fecha_venta > now().date():
            raise serializers.ValidationError({'fechaVenta': 'La fecha de venta no puede ser mayor a la fecha actual'})

        for venta_vehiculo in venta_vehiculo_data:
            if not venta_vehiculo['vehiculo'].disponible_para_venta:
                raise serializers.ValidationError({'vehiculo': 'El vehiculo {} no esta disponible para la venta'.format(venta_vehiculo['vehiculo'])})
            
            Venta_Vehiculo.objects.create(venta=venta, **venta_vehiculo)
            Vehiculo.objects.filter(vin=venta_vehiculo['vehiculo'].vin).update(disponible_para_venta=False)
        
        return venta

    @transaction.atomic
    def update(self, instance, validated_data):
        venta_vehiculo_data = validated_data.pop('venta_vehiculo_set')
        
        for venta_vehiculo_anterior in instance.venta_vehiculo_set.all():
            Vehiculo.objects.filter(vin=venta_vehiculo_anterior.vehiculo.vin).update(disponible_para_venta=True)

            venta_vehiculo_anterior.delete()
        
        Venta.objects.filter(id_venta=instance.id_venta).update(**validated_data)

        for venta_vehiculo in venta_vehiculo_data:
            if not Vehiculo.objects.get(vin=venta_vehiculo['vehiculo'].vin).disponible_para_venta:
                raise serializers.ValidationError({'vehiculo': 'El vehiculo {} no esta disponible para la venta'.format(venta_vehiculo['vehiculo'])})
            
            Venta_Vehiculo.objects.create(venta=instance, **venta_vehiculo)
            Vehiculo.objects.filter(vin=venta_vehiculo['vehiculo'].vin).update(disponible_para_venta=False)
        
        return instance

class CotizacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_cotizacion', read_only=True)
    vendedor = serializers.PrimaryKeyRelatedField(queryset=Empleado.objects.all())
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    fechaCreacion = serializers.DateField()
    porcentajeDescuento = serializers.DecimalField(max_digits=5, decimal_places=4)  
    fechaVencimiento = serializers.DateField(source='fecha_vencimiento')
    modelos = models.ManyToManyField(Modelo, through='Cotizacion_Modelo', related_name='modelos')

    class Meta:
        model = Cotizacion
        fields = 'id', 'vendedor', 'cliente', 'fechaCreacion', 'porcentajeDescuento', 'fechaVencimiento', 'modelos'
    

class CotizacionModeloSerializer(serializers.ModelSerializer):
    idCotizacionModelo = serializers.PrimaryKeyRelatedField(source='id_cotizacion_modelo', read_only=True)
    cotizacion = serializers.PrimaryKeyRelatedField(queryset=Cotizacion.objects.all())
    modelo = serializers.PrimaryKeyRelatedField(queryset=Modelo.objects.all())
    color = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all())
    extra = serializers.PrimaryKeyRelatedField(queryset=Extra.objects.all())
    cantidad = serializers.IntegerField()

    class Meta:
        model = Cotizacion_Modelo
        fields = 'idCotizacionModelo', 'cotizacion', 'modelo', 'color', 'extra', 'cantidad'