from django.db import models
from api.models import CustomUser, VendorFile

class PurchaseRecord(models.Model):
    purchase_team = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'purchase'})
    vendor_file = models.ForeignKey(VendorFile, on_delete=models.CASCADE)
    selected_rows = models.TextField(help_text="Store selected CSV rows as JSON or plain text.")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.purchase_team.username} - File #{self.vendor_file.id}"
