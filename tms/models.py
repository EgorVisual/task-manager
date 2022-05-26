from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    fullname = models.CharField(max_length=50)
    group = models.CharField(max_length=50)
    role = models.CharField(max_length=50)



class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    status_task = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


