from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TechnicalReview
from .serializers import TechnicalReviewSerializer

class TechnicalReviewListCreate(APIView):
    def get(self, request):
        reviews = TechnicalReview.objects.all()
        serializer = TechnicalReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TechnicalReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
