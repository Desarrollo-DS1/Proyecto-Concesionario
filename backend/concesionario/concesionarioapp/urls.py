from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import startup
from . import views

router = routers.DefaultRouter()
router.register(r'Usuario', views.UsuarioView, 'Usuario')
router.register(r'Cliente', views.ClienteView, 'Cliente')
router.register(r'Empleado', views.EmpleadoView, 'Empleado')
router.register(r'Color', views.ColorView, 'Color')
router.register(r'Sucursal', views.SucursalView, 'Sucursal')
router.register(r'Modelo', views.ModelView, 'Modelo')
router.register(r'Vehiculo', views.VehiculoView, 'Vehiculo')
router.register(r'Venta' , views.VentaView, 'Venta')
router.register(r'Venta_Vehiculo', views.VentaVehiculoView, 'Venta_Vehiculo')
router.register(r'Cotizacion', views.CotizacionView, 'Cotizacion')
router.register(r'Cotizacion_Modelo', views.CotizacionModeloView, 'Cotizacion_Modelo')
router.register(r'Extra', views.ExtraView, 'Extra')
router.register(r'Uso_Repuesto', views.UsoRepuestoView, 'Uso_Repuesto')
router.register(r'Inventario_Repuesto', views.InventarioRepuestoView, 'Inventario_Repuesto')
router.register(r'Repuesto', views.RepuestoView, 'Repuesto')


urlpatterns = [
    path('docs/', include_docs_urls(title='Concesionario API')),
    path('api/v1/', include(router.urls)),
    path('api/v1/recaptcha/', views.recaptcha, name='recaptcha'),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
]