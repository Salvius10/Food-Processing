from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProductionReport
from .serializers import ProductionReportSerializer

class ProductionReportListCreate(APIView):
    def get(self, request):
        reports = ProductionReport.objects.all()
        serializer = ProductionReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductionReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
