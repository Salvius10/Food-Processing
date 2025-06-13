from django.contrib import admin
from .models import CustomUser, VendorFile

admin.site.register(CustomUser)
admin.site.register(VendorFile)
