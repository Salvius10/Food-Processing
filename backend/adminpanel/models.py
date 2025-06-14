from django.db import models
from production.models import ProductionReport

class FinalApproval(models.Model):
    production_report = models.OneToOneField(ProductionReport, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    remarks = models.TextField(blank=True, null=True)
    reviewed_at = models.DateTimeField(auto_now_add=True)
