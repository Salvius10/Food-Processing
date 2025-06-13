from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import CustomUser, VendorFile
from .serializers import UserSerializer, VendorFileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from cryptography.fernet import Fernet
from django.core.files.base import ContentFile
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class VendorUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if request.user.role != 'vendor':
            return Response({'error': 'Only vendors can upload.'}, status=403)
        file = request.FILES.get('file')
        vfile = VendorFile.objects.create(user=request.user, file=file)
        return Response(VendorFileSerializer(vfile).data)

class AdminApprovalView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            user.is_approved = True
            user.save()
            return Response({'message': 'User approved'})
        except:
            return Response({'error': 'User not found'}, status=404)

class VendorRequestToPurchase(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, file_id):
        vfile = VendorFile.objects.get(id=file_id, user=request.user)
        vfile.request_sent = True
        vfile.save()
        return Response({'message': 'Request sent to purchase team'})

class PurchaseAcceptRequest(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, file_id):
        vfile = VendorFile.objects.get(id=file_id)
        if request.user.role != 'purchase':
            return Response({'error': 'Only purchase team can accept'}, status=403)
        vfile.request_accepted = True
        vfile.save()
        return Response({'message': 'Request accepted'})

class TechnicalEncryptView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, file_id):
        vfile = VendorFile.objects.get(id=file_id)
        if request.user.role != 'technical':
            return Response({'error': 'Only technical team can encrypt'}, status=403)
        key = Fernet.generate_key()
        fernet = Fernet(key)
        file_data = vfile.file.read()
        encrypted_data = fernet.encrypt(file_data)
        vfile.encrypted_file.save(f'encrypted_{vfile.file.name}', ContentFile(encrypted_data))
        vfile.encryption_key = key.decode()
        vfile.approved_by_technical = True
        vfile.save()
        return Response({'message': 'File encrypted and sent to admin'})

class ProductionDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, file_id):
        vfile = VendorFile.objects.get(id=file_id)
        if request.user.role != 'production':
            return Response({'error': 'Only production can download'}, status=403)
        fernet = Fernet(vfile.encryption_key.encode())
        encrypted_data = vfile.encrypted_file.read()
        decrypted_data = fernet.decrypt(encrypted_data)
        return Response({'file_content': decrypted_data.decode()})
    


class CustomTokenView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        user = CustomUser.objects.filter(username=username).first()

        if not user:
            return Response({'error': 'User not found'}, status=404)

        if not user.is_approved:
            return Response({'error': 'Not approved by admin yet'}, status=403)

        return super().post(request, *args, **kwargs)
