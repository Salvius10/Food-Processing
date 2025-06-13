from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLES = [
        ('vendor', 'Vendor'),
        ('purchase', 'Purchase Team'),
        ('technical', 'Technical Team'),
        ('production', 'Production Team'),
        ('admin', 'Admin')
    ]
    role = models.CharField(max_length=20, choices=ROLES)
    is_active = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)

class VendorFile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    file = models.FileField(upload_to='vendor_datasets/')
    request_sent = models.BooleanField(default=False)
    request_accepted = models.BooleanField(default=False)
    approved_by_purchase = models.BooleanField(default=False)
    approved_by_technical = models.BooleanField(default=False)
    encrypted_file = models.FileField(upload_to='encrypted/', null=True, blank=True)
    encryption_key = models.CharField(max_length=512, null=True, blank=True)