from django.db import models
from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']


class GetTaskSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    class Meta:
        model = Task
        fields = ['id', 'creator', 'subject', 'body', 'recipient', 'setTimer', 'is_sent']

class CreateTaskSerializer(serializers.ModelSerializer):
    id =serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = ['id', 'creator', 'subject', 'body', 'recipient', 'setTimer']
    
    # 
    
        
class CreateTaskSerializerinstant(serializers.ModelSerializer):
    id =serializers.ReadOnlyField()
    class Meta:
        model = Task
        fields = ['id', 'creator', 'subject', 'body', 'recipient',]
