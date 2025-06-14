from django.urls import path
from .views import ProductionReportListCreate

urlpatterns = [
    path('', ProductionReportListCreate.as_view(), name='production-report'),
]
