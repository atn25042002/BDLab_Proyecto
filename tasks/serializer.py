from rest_framework import serializers
from .models import Task

class SerieTarea(serializers.ModelSerializer):
    class Meta:
        model= Task
        #campos= ('id','titulo','descripcion','hecho')
        fields= '__all__'