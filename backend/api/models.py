from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class VendorFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'vendor'})
    file = models.FileField(upload_to='vendor_files/')
    encrypted_file = models.FileField(upload_to='encrypted/', null=True, blank=True)
    encryption_key = models.CharField(max_length=255, null=True, blank=True)
    request_sent = models.BooleanField(default=False)
    request_accepted = models.BooleanField(default=False)
    approved_by_technical = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.file.name}"


class PurchaseRequest(models.Model):
    purchase_team = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'purchase'})
    vendor_file = models.ForeignKey(VendorFile, on_delete=models.CASCADE)
    selected_rows = models.TextField(help_text="Store selected CSV rows as JSON or plain text.")
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.purchase_team.username} request for file {self.vendor_file.id}"


class TechnicalReview(models.Model):
    purchase_request = models.ForeignKey(PurchaseRequest, on_delete=models.CASCADE)
    reviewed_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'technical'})
    encrypted_file = models.FileField(upload_to='technical_encrypted/')
    encryption_key = models.CharField(max_length=255)
    reviewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.reviewed_by.username} for request {self.purchase_request.id}"


class ProductionDecryption(models.Model):
    technical_review = models.ForeignKey(TechnicalReview, on_delete=models.CASCADE)
    production_team = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'production'})
    downloaded_at = models.DateTimeField(auto_now_add=True)
    is_decrypted = models.BooleanField(default=False)

    def __str__(self):
        return f"Decryption by {self.production_team.username} at {self.downloaded_at}"
