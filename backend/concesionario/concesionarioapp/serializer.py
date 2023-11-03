from rest_framework import serializers
from .models import Modelo

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