from django.urls import path
from .views import PurchaseRequestListCreate

urlpatterns = [
    path('', PurchaseRequestListCreate.as_view(), name='purchase-request'),
]
