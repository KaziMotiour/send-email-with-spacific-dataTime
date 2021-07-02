from django.contrib.auth.models import Permission
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import  AllowAny, IsAuthenticated
from .serializers import UserSerializer, GetTaskSerializer, CreateTaskSerializer, CreateTaskSerializerinstant
from .permission import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Task
from .task import send_instant_mail
from django.utils import timezone
from datetime import datetime
from django.db.models import Q
# Create your views here.

class requestedUser(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]
    def get_queryset(self):
        id = self.request.user.id
        user = User.objects.filter(id=id)
        return user

class GetTaskList(ListAPIView):
    serializer_class = GetTaskSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    def get_queryset(self):
        creator = self.request.user
        user = Task.objects.filter(creator=creator)
        return user



@api_view(['POST','GET'])
def sendInstantTask(request):
    print(request.data)
    serilizer_data = CreateTaskSerializerinstant(data=request.data)
    if serilizer_data.is_valid():
        serilizer_data.save()
        id = serilizer_data.data.get('id')
        
        send_instant_mail.delay(id)
        return Response({"success": "True"})
    return Response({'status':'fail'})

class TaskCreateWithTimer(CreateAPIView):
    serializer_class = CreateTaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()

class TaskRUD(RetrieveUpdateDestroyAPIView):
    serializer_class = CreateTaskSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Task.objects.all()

@api_view(['GET'])
def gets(request):
    for i in Task.objects.filter(Q(setTimer__lt=timezone.now()) & Q(setTimer__isnull=False)):
        print(i.setTimer, timezone.now())

    return Response({'hello':'hello'})