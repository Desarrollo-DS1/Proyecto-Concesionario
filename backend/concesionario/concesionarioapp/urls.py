from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import views

router = routers.DefaultRouter()
router.register(r'Usuario', views.UsuarioView, 'Usuario')
router.register(r'Cliente', views.ClienteView, 'Cliente')
router.register(r'Vendedor', views.VendedorView, 'Vendedor')
router.register(r'Modelo', views.ModelView, 'Modelo')


urlpatterns = [
    path('docs/', include_docs_urls(title='Concesionario API')),
    path('api/v1/', include(router.urls)),

]