from rest_framework import permissions


class EsEmpleado(permissions.BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.is_staff


class EsGerente(permissions.BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser
    

class EsVendedorOGerente(permissions.BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Vendedor').exists() or usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser


class EsJefeDeTallerOGerente(permissions.BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Jefe de Taller').exists() or usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser


