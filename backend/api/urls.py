from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('user/', UserDetailView.as_view()),  # 🔸 GET current user info
    path('vendor/upload/', VendorUploadView.as_view()),
    path('vendor/files/', VendorFileListView.as_view()),

    path('vendor/request/<int:file_id>/', VendorRequestToPurchase.as_view()),
    path('purchase/accept/<int:file_id>/', PurchaseAcceptRequest.as_view()),
    path('purchase/view/<int:file_id>/', PurchaseViewDataset.as_view()),

    path('technical/encrypt/<int:file_id>/', TechnicalEncryptView.as_view()),
    path('production/download/<int:file_id>/', ProductionDownloadView.as_view()),

    path('admin/approve/<int:user_id>/', AdminApprovalView.as_view()),
]
