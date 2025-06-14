from django.urls import path
from .views import FinalApprovalView

urlpatterns = [
    path('', FinalApprovalView.as_view(), name='final-approval'),
]
