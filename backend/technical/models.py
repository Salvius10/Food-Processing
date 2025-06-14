from django.db import models
from purchase.models import PurchaseRequest

class TechnicalReview(models.Model):
    purchase_request = models.OneToOneField(PurchaseRequest, on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=100)
    remarks = models.TextField()
    file = models.FileField(upload_to='technical_docs/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected")
    ], default="pending")
    reviewed_at = models.DateTimeField(auto_now_add=True)
