from rest_framework.permissions import BasePermission

class IsVendor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'vendor'

class IsPurchaseTeam(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'purchase'

class IsTechnicalTeam(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'technical'

class IsProductionTeam(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'production'

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
