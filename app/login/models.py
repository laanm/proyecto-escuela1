
from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password



class Perfiles(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Perfil'
        verbose_name_plural = 'Perfiles'

    def __str__(self):
        return self.nombre

class PermisosUsuarios(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=100)
    #0 sin permiso, 1 con permiso,
    #casos especiales, 0 sin permiso, 1 nivel1, 2nivel2, 3 nivel3, 4 admin
    pnoticias=models.IntegerField(default=0)
    preservasalas=models.IntegerField(default=0)
    pimpresiones=models.IntegerField(default=0)
    pcra=models.IntegerField(default=0)
    pmiasistencia=models.IntegerField(default=0)
    pasistencia=models.IntegerField(default=0)
    pcalificaciones=models.IntegerField(default=0)
    pmatricula=models.IntegerField(default=0)
    pcalendario=models.IntegerField(default=0)
    pjunaeb=models.IntegerField(default=0)
    padmin=models.IntegerField(default=0)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    perfil = models.ForeignKey(Perfiles, on_delete=models.CASCADE, null=True)
    apellidos=models.CharField(max_length=100, blank=True,default="")
    nombres=models.CharField(max_length=100,blank=True,default="")
    user = models.CharField(max_length=20)
    email = models.EmailField(blank=False)
    password = models.TextField(blank=False)
    active = models.BooleanField(default=True)
    imagen= models.ImageField(blank=True, null=True, upload_to="profesores/")
    
    permisos=models.ForeignKey(PermisosUsuarios,null=True,on_delete=models.SET_NULL)
    
    huella=models.TextField(blank=True,null=True)
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.user
    
class HorarioLaboral(models.Model):
    id=models.AutoField(primary_key=True)
    idusuario=models.ForeignKey(Usuario,on_delete=models.CASCADE)
    year=models.IntegerField(blank=True,null=True)

    lunes=models.BooleanField(default=False) 
    entradalunes=models.TimeField(null=True,blank=True)
    salidalunes=models.TimeField(null=True,blank=True)

    martes=models.BooleanField(default=False) 
    entradamartes=models.TimeField(null=True,blank=True)
    salidamartes=models.TimeField(null=True,blank=True)

    miercoles=models.BooleanField(default=False) 
    entradamiercoles=models.TimeField(null=True,blank=True)
    salidamiercoles=models.TimeField(null=True,blank=True)

    jueves=models.BooleanField(default=False) 
    entradajueves=models.TimeField(null=True,blank=True)
    salidajueves=models.TimeField(null=True,blank=True)

    viernes=models.BooleanField(default=False) 
    entradaviernes=models.TimeField(null=True,blank=True)
    salidaviernes=models.TimeField(null=True,blank=True)

    sabado=models.BooleanField(default=False) 
    entradasabado=models.TimeField(null=True,blank=True)
    salidasabado=models.TimeField(null=True,blank=True)

    domingo=models.BooleanField(default=False) 
    entradadomingo=models.TimeField(null=True,blank=True)
    salidadomingo=models.TimeField(null=True,blank=True)
