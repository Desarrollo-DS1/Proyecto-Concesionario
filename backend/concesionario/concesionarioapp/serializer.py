from rest_framework import serializers
from django.db import transaction
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula')
    clave = serializers.CharField(source='usuario.password', write_only=True, required=False, allow_blank=True)
    correo = serializers.EmailField(source='usuario.email')
    primerNombre = serializers.CharField(source='usuario.primer_nombre')
    segundoNombre = serializers.CharField(source='usuario.segundo_nombre', required=False, allow_blank=True)
    primerApellido = serializers.CharField(source='usuario.primer_apellido')
    segundoApellido = serializers.CharField(source='usuario.segundo_apellido', required=False, allow_blank=True)
    telefono = serializers.CharField(source='usuario.telefono', required=False)
    celular = serializers.CharField(source='usuario.celular', required=False)
    direccion = serializers.CharField(source='usuario.direccion', required=False)
    ciudad = serializers.CharField(source='usuario.ciudad', required=False)
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento', required=False, allow_null=True)
    genero = serializers.CharField(source='usuario.genero', required=False)
                        
    class Meta:
        model = Cliente
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        password = usuario_data.pop('password')

        if Usuario.objects.filter(cedula=usuario_data['cedula']).exists():
            raise serializers.ValidationError({'cedula': 'Ya existe un usuario con esta cedula'})
        
        if Usuario.objects.filter(email=usuario_data['email']).exists():
            raise serializers.ValidationError({'email': 'Ya existe un usuario con este correo'})
        
        if not password:
            raise serializers.ValidationError({'clave': 'Este campo es requerido'})
        
        usuario = Usuario.objects.create(**usuario_data)
        usuario.set_password(password)
        usuario.save()
        
        cliente = Cliente.objects.create(usuario=usuario)
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
    telefono = serializers.CharField(source='usuario.telefono', required=False)
    celular = serializers.CharField(source='usuario.celular', required=False)
    direccion = serializers.CharField(source='usuario.direccion', required=False)
    ciudad = serializers.CharField(source='usuario.ciudad', required=False)
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento', required=False, allow_null=True)
    genero = serializers.CharField(source='usuario.genero', required=False)
    fechaIngreso = serializers.DateField(source='fecha_ingreso', required=False, allow_null=True)
    fechaRetiro = CustomDateField(source='fecha_retiro', required=False, allow_null=True)
    salario = serializers.IntegerField(source='salario_base', required=False)
    tipoSangre = serializers.CharField(source='tipo_sangre', required=False)
    eps = serializers.CharField(required=False)
    arl = serializers.CharField(required=False)
    cargo = serializers.CharField(required=False)

    class Meta:
        model = Empleado
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero', 'fechaIngreso', 'fechaRetiro', 'salario', 'tipoSangre', 'eps', 'arl', 'cargo'
    
    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        password = usuario_data.pop('password')

        if Usuario.objects.filter(cedula=usuario_data['cedula']).exists():
            raise serializers.ValidationError({'cedula': 'Ya existe un usuario con esta cedula'})
        
        if Usuario.objects.filter(email=usuario_data['email']).exists():
            raise serializers.ValidationError({'email': 'Ya existe un usuario con este correo'})
        
        if not password:
            raise serializers.ValidationError({'clave': 'Este campo es requerido'})

        usuario = Usuario.objects.create(**usuario_data)
        usuario.set_password(password)
        usuario.is_staff = True
        usuario.save()

        empleado = Empleado.objects.create(usuario=usuario, **validated_data)
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


class ModeloSerializer(serializers.ModelSerializer):
    combustible = serializers.SerializerMethodField()
    carroceria = serializers.SerializerMethodField()
    class Meta:
        model = Modelo
        fields = '__all__'
    
    def get_combustible(self, obj):
        #return (obj.combustible,obj.get_combustible_display())
        return obj.get_combustible_display()
    
    def get_carroceria(self, obj):
        #return (obj.carroceria, obj.get_carroceria_display())
        return obj.get_carroceria_display()


class VehiculoSerializer(serializers.ModelSerializer):
    vin = serializers.CharField()
    modeloVehiculo = serializers.PrimaryKeyRelatedField(source='modelo_vehiculo', queryset=Modelo.objects.all())
    colorVehiculo = serializers.PrimaryKeyRelatedField(source='color_vehiculo', queryset=Color.objects.all())
    sucursalVehiculo = serializers.PrimaryKeyRelatedField(source='sucursal_vehiculo', queryset=Sucursal.objects.all())
    disponibleVenta = serializers.BooleanField(source='disponible_para_venta')
    
    class Meta:
        model = Vehiculo
        fields = 'vin', 'modeloVehiculo', 'colorVehiculo', 'sucursalVehiculo', 'disponibleVenta'

    def create(self, validated_data):
        if Vehiculo.objects.filter(vin=validated_data['vin']).exists():
            raise serializers.ValidationError({'vin': 'Ya existe un vehiculo con este vin'})
        
        vehiculo = Vehiculo.objects.create(**validated_data)
        return vehiculo


class VentaVehiculoSerializer(serializers.ModelSerializer):
    vehiculo = serializers.PrimaryKeyRelatedField(queryset=Vehiculo.objects.all())
    extra = serializers.PrimaryKeyRelatedField(queryset=Extra.objects.all())
    porcentajeDescuento = serializers.DecimalField(source='porcentaje_descuento', max_digits=4, decimal_places=2)

    class Meta:
        model = Venta_Vehiculo
        fields = 'vehiculo', 'extra', 'porcentajeDescuento'

    

class VentaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    vendedor = serializers.PrimaryKeyRelatedField(queryset=Empleado.objects.all())
    fechaVenta = serializers.DateField(source='fecha_venta')
    ventaVehiculo = VentaVehiculoSerializer(many=True, source='venta_vehiculo_set')

    class Meta:
        model = Venta
        fields = 'cliente', 'vendedor', 'fechaVenta', 'ventaVehiculo'

    @transaction.atomic
    def create(self, validated_data):
        venta_vehiculo_data = validated_data.pop('venta_vehiculo_set')
        venta = Venta.objects.create(**validated_data)

        for venta_vehiculo in venta_vehiculo_data:
            try:
                if not venta_vehiculo['vehiculo'].disponible_para_venta:
                    raise serializers.ValidationError({'vehiculo': 'El vehiculo no esta disponible para la venta'})
                
                if not venta.vendedor.sucursal == venta_vehiculo['vehiculo'].sucursal_vehiculo:
                    raise serializers.ValidationError({'vendedor': 'El vehiculo {} se encuentra en la sucursal {}, pero el vendedor {} hace parte de la sucursal {}'.format(venta_vehiculo['vehiculo'].vin, venta_vehiculo['vehiculo'].sucursal_vehiculo, venta.vendedor.usuario.cedula, venta.vendedor.sucursal)})
                
                Venta_Vehiculo.objects.create(venta=venta, **venta_vehiculo)
                Vehiculo.objects.filter(vin=venta_vehiculo['vehiculo'].vin).update(disponible_para_venta=False)
            
            except Exception as e:
                raise serializers.ValidationError({'venta_vechiculo': 'Error creando instancia de venta_vehiculo: {}'.format(e)})
        
        return venta

    @transaction.atomic
    def update(self, instance, validated_data):
        venta_vehiculo_data = validated_data.pop('venta_vehiculo_set')
        
        for venta_vehiculo_anterior in instance.venta_vehiculo_set.all():
            Vehiculo.objects.filter(vin=venta_vehiculo_anterior.vehiculo.vin).update(disponible_para_venta=True)

            venta_vehiculo_anterior.delete()
        
        Venta.objects.filter(id_venta=instance.id_venta).update(**validated_data)

        for venta_vehiculo in venta_vehiculo_data:
            try:
                if not Vehiculo.objects.get(vin=venta_vehiculo['vehiculo'].vin).disponible_para_venta:
                    raise serializers.ValidationError({'vehiculo': 'El vehiculo no esta disponible para la venta'})
                
                if not instance.vendedor.sucursal == venta_vehiculo['vehiculo'].sucursal_vehiculo:
                    raise serializers.ValidationError({'vendedor': 'El vehiculo {} se encuentra en la sucursal {}, pero el vendedor {} hace parte de la sucursal {}'.format(venta_vehiculo['vehiculo'].vin, venta_vehiculo['vehiculo'].sucursal_vehiculo, instance.vendedor.usuario.cedula, instance.vendedor.sucursal)})
                
                Venta_Vehiculo.objects.create(venta=instance, **venta_vehiculo)
                Vehiculo.objects.filter(vin=venta_vehiculo['vehiculo'].vin).update(disponible_para_venta=False)
            
            except Exception as e:
                raise serializers.ValidationError({'venta_vechiculo': 'Error creando instancia de venta_vehiculo: {}'.format(e)})
        
        return instance
        

        