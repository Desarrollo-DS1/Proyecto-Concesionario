from datetime import datetime
from rest_framework import serializers


def validar_anho(anho):
    if not anho:
        raise serializers.ValidationError({'anho': 'El parámetro anho es requerido.'})
    try:
        anho = int(anho)
    except ValueError:  
        raise serializers.ValidationError({'anho': 'El parámetro anho debe ser un número entero.'})
    if anho < 2000 or anho > datetime.now().year:
        raise serializers.ValidationError({'anho': 'El parámetro anho debe ser un número entero entre 2000 y el año actual.'})
    

def validar_mes(mes):
    if not mes:
        raise serializers.ValidationError({'mes': 'El parámetro mes es requerido.'})
    try:
        mes = int(mes)
    except ValueError:  
        raise serializers.ValidationError({'mes': 'El parámetro mes debe ser un número entero.'})
    if mes < 1 or mes > 12:
        raise serializers.ValidationError({'mes': 'El parámetro mes debe ser un número entero entre 1 y 12.'})