from rest_framework.permissions import BasePermission


class EsEmpleado(BasePermission):
    def has_permission(self, request, view):        
        usuario = request.user
        return usuario.is_staff


class EsGerente(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser
    

class EsVendedorOGerente(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Vendedor').exists() or usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser


class EsJefeDeTallerOGerente(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        return usuario.groups.filter(name='Jefe de Taller').exists() or usuario.groups.filter(name='Gerente').exists() or usuario.is_superuser


