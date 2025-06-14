from rest_framework import serializers
from .models import TechnicalReview

class TechnicalReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalReview
        fields = '__all__'
