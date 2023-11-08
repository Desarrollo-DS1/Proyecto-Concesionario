from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import views

router = routers.DefaultRouter()
router.register(r'Usuario', views.UsuarioView, 'Usuario')
router.register(r'Cliente', views.ClienteView, 'Cliente')
router.register(r'Empleado', views.EmpleadoView, 'Empleado')
router.register(r'Sucursal', views.SucursalView, 'Sucursal')
router.register(r'Modelo', views.ModelView, 'Modelo')
router.register(r'Vehiculo', views.VehiculoView, 'Vehiculo')
router.register(r'Venta' , views.VentaView, 'Venta')
router.register(r'Venta_Vehiculo', views.VentaVehiculoView, 'Venta_Vehiculo')


urlpatterns = [
    path('docs/', include_docs_urls(title='Concesionario API')),
    path('api/v1/', include(router.urls)),

]