from django.urls import path, include
from .views import requestedUser, sendInstantTask, TaskCreateWithTimer, TaskRUD, gets, GetTaskList

urlpatterns = [
    path('user/', requestedUser.as_view(), name='userInfo'),
    path('maillist/', GetTaskList.as_view(), name='mailList'),
    path('instantmail/', sendInstantTask, name='instantMail'),
    path('taskwithtimer/', TaskCreateWithTimer.as_view(), name='taskWithTimer'),
    path('taskRUD/<int:pk>/', TaskRUD.as_view(), name='taskRUD'),
    path('gets/', gets, name='gets')

]