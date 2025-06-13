from rest_framework import serializers
from .models import CustomUser, VendorFile
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'role', 'is_approved']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['is_active'] = True  
        validated_data['is_approved'] = False

        return super().create(validated_data)

class VendorFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorFile
        fields = '__all__'