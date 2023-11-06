from rest_framework import serializers
from .models import Modelo
from django.utils.timezone import now

class ModeloSerializer(serializers.ModelSerializer):

    class Meta:
        model = Modelo
        fields = '__all__'
    
    año = serializers.IntegerField(source='anho_modelo')
    numeroPasajeros = serializers.IntegerField(source='numero_pasajeros')
    precioBase = serializers.DecimalField(source='precio_base', max_digits=12, decimal_places=2)

    def validate(self, attrs):
        if(attrs['numero_pasajeros'] < 1):
            raise serializers.ValidationError("El número de pasajeros no puede ser menor a 1")
        
        if(attrs['precio_base'] < 0):
            raise serializers.ValidationError("El precio base no puede ser negativo")	
        
        anho_maximo = now().year + 1
        if(attrs['anho_modelo'] < 1900 or attrs['anho_modelo'] > anho_maximo):
            raise serializers.ValidationError("El año del modelo debe estar entre 1900 y el actual")
        
        if(attrs['cilindraje'] < 0 or attrs['cilindraje'] > 10000):
            raise serializers.ValidationError("El cilindraje debe estar entre 0 y 10000")
        
        if(attrs['potencia'] < 0 or attrs['potencia'] > 999):
            raise serializers.ValidationError("La potencia debe estar entre 0 y 999")

        return super().validate(attrs)
    
    def create(self, validated_data):
        
        if(Modelo.objects.filter(nombre = validated_data['nombre']).exists()):
            raise serializers.ValidationError("Ya existe un modelo con ese nombre")
        
        
        return Modelo.objects.create(**validated_data)

