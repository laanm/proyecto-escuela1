
from django.db import models
from login.models import *
# Create your models here.

class Noticias(models.Model):
    id= models.AutoField(primary_key=True)
    titulo= models.CharField(max_length=200)
    portada= models.ImageField(upload_to='upload/')
    contenido= models.TextField()
    autor= models.ForeignKey(Usuario ,on_delete=models.CASCADE)
    fecha= models.DateTimeField(blank=True, null=True)

