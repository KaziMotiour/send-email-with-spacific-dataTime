from django.db import models
from django.contrib.auth import get_user_model 
User = get_user_model()
# Create your models here.
class Task(models.Model):
    creator = models.ForeignKey(User, related_name='task', on_delete=models.CASCADE)
    subject = models.CharField(max_length=300)
    body = models.TextField()
    recipient = models.TextField()
    setTimer = models.DateTimeField(null=True, blank=True)
    is_sent = models.BooleanField(default=False)
    createDate = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.subject)