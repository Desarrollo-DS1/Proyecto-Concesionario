from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula')
    clave = serializers.CharField(source='usuario.password')
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
        usuario_data = validated_data.pop('usuario', None)

        if usuario_data is not None:
            usuario = Usuario.objects.create(**usuario_data)
            usuario.set_password(usuario_data['password'])
            usuario.save()
            cliente = Cliente.objects.create(usuario=usuario)
            return cliente
        else:
            raise serializers.ValidationError('No se ha enviado la información del usuario desde el cliente')
    

    def update(self, instance, validated_data):
        usuario_data = validated_data.pop('usuario', None)

        if usuario_data is not None:
            Usuario.objects.filter(cedula=instance.usuario_id).update(**usuario_data)
            if 'password' in usuario_data:
                instance.usuario.set_password(usuario_data['password'])
                instance.usuario.save()
            return instance
        else:
            raise serializers.ValidationError('No se ha enviado la información del usuario desde el cliente')


class EmpleadoSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula')
    clave = serializers.CharField(source='usuario.password')
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
    fechaRetiro = serializers.DateField(source='fecha_retiro', required=False, allow_null=True)
    salario = serializers.IntegerField(source='salario_base', required=False)
    tipoSangre = serializers.CharField(source='tipo_sangre', required=False)
    eps = serializers.CharField(required=False)
    arl = serializers.CharField(required=False)
    cargo = serializers.CharField(required=False)

    class Meta:
        model = Empleado
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero', 'fechaIngreso', 'fechaRetiro', 'salario', 'tipoSangre', 'eps', 'arl', 'cargo'



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