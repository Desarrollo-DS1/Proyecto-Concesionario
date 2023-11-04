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
    segundoNombre = serializers.CharField(source='usuario.segundo_nombre', required=False)
    primerApellido = serializers.CharField(source='usuario.primer_apellido')
    segundoApellido = serializers.CharField(source='usuario.segundo_apellido', required=False)
    telefono = serializers.CharField(source='usuario.telefono', required=False)
    celular = serializers.CharField(source='usuario.celular', required=False)
    direccion = serializers.CharField(source='usuario.direccion', required=False)
    ciudad = serializers.CharField(source='usuario.ciudad', required=False)
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento', required=False)
    genero = serializers.CharField(source='usuario.genero', required=False)
                        
    class Meta:
        model = Cliente
        fields = 'cedula', 'clave', 'correo', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero'

    def create(self, validated_data):
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        usuario_data = validated_data.pop('usuario')
        print(usuario_data)
        usuario_data['genero'] = 'M'
        print(usuario_data)
        usuario = Usuario.objects.create(**usuario_data)
        usuario.set_password(usuario_data['password'])
        usuario.save()
        cliente = Cliente.objects.create(usuario=usuario)
        return cliente    
    



class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'


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