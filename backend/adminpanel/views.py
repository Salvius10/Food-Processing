from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FinalApproval
from .serializers import FinalApprovalSerializer

class FinalApprovalView(APIView):
    def get(self, request):
        approvals = FinalApproval.objects.all()
        serializer = FinalApprovalSerializer(approvals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FinalApprovalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
