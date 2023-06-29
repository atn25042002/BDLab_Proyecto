from rest_framework import viewsets
from .models import Task
from .serializer import SerieTarea
# Create your views here.
class Visor(viewsets.ModelViewSet):
    serializer_class= SerieTarea
    queryset= Task.objects.all()