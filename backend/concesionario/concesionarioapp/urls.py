from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import views

router = routers.DefaultRouter()
router.register(r'modelo', views.ModelView, 'modelo')

urlpatterns = [
    path('docs/', include_docs_urls(title='Concesionario API')),
    path('api/v1/', include(router.urls)),

]