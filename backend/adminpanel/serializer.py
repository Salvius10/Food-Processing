from rest_framework import serializers
from .models import FinalApproval

class FinalApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalApproval
        fields = '__all__'
