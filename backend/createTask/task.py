from celery import shared_task
from time import sleep
from django.core.mail import send_mail  
from sendEmail.celery import app
from datetime import datetime
from .models import Task
from django.utils import timezone
from django.core.mail import send_mail
from django.db.models import Q


@shared_task
def send_instant_mail(id):
    obj = Task.objects.get(id=id)
    recipients = obj.recipient.split(',')
    listofrecipients = [i.strip() for i in recipients]
    send_mail(
        obj.subject,
        obj.body,
        'kmotiour30@gmail.com',
        listofrecipients
    )
    obj.is_sent=True
    obj.save()
    return None


@app.task(name='send_email_with_timer')
def send_email_with_timer():
    try:
        obj = Task.objects.filter(Q(setTimer__lt=timezone.now()) & Q(setTimer__isnull=False)& Q(is_sent=False))
        if len(obj)>=1:
            for info in obj:
                recipients = info.recipient.split(',')
                listofrecipients = [i.strip() for i in recipients]
            
                send_mail(
                info.subject,
                info.body,
                'kmotiour30@gmail.com',
                listofrecipients
                )
            obj.update(is_sent=True)
            return True
        return None
    except Exception as e:
        print(e)