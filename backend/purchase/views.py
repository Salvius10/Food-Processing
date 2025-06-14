from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PurchaseRequest
from .serializers import PurchaseRequestSerializer

class PurchaseRequestListCreate(APIView):
    def get(self, request):
        requests = PurchaseRequest.objects.all()
        serializer = PurchaseRequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PurchaseRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
