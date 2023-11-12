from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('concesionarioapp/', include('concesionarioapp.urls')),
    path('admin/', admin.site.urls),
]
