from django.urls import path
from .views import TechnicalReviewListCreate

urlpatterns = [
    path('', TechnicalReviewListCreate.as_view(), name='technical-review'),
]
