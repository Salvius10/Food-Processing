from rest_framework import serializers
from .models import ProductionReport

class ProductionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionReport
        fields = '__all__'
