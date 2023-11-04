from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    cedula = serializers.CharField(source='usuario.cedula', read_only=True)
    primerNombre = serializers.CharField(source='usuario.primer_nombre', read_only=True)
    primerApellido = serializers.CharField(source='usuario.primer_apellido', read_only=True)
    correo = serializers.EmailField(source='usuario.email', read_only=True)
    telefono = serializers.CharField(source='usuario.telefono', read_only=True)
    celular = serializers.CharField(source='usuario.celular', read_only=True)
    direccion = serializers.CharField(source='usuario.direccion', read_only=True)
    ciudad = serializers.CharField(source='usuario.ciudad', read_only=True)
    fechaNacimiento = serializers.DateField(source='usuario.fecha_nacimiento', read_only=True)
    genero = serializers.CharField(source='usuario.genero', read_only=True)
                        
    class Meta:
        model = Cliente
        fields = 'cedula', 'primerNombre', 'primerApellido', 'correo', 'telefono', 'celular', 'direccion', 'ciudad', 'fechaNacimiento', 'genero'


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