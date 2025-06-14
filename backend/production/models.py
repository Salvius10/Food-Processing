from django.db import models
from technical.models import TechnicalReview

class ProductionReport(models.Model):
    technical_review = models.OneToOneField(TechnicalReview, on_delete=models.CASCADE)
    engineer_name = models.CharField(max_length=100)
    report_file = models.FileField(upload_to='production_reports/')
    status = models.CharField(max_length=20, choices=[
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("rejected", "Rejected")
    ], default="pending")
    notes = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
