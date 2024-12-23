from django.db import models
from intranet.models import *
# Create your models here.

class CentroCosto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    def natural_key(self):
        return self.nombre

class NivelEducativo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    def natural_key(self):
        return self.nombre

class Familia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    def natural_key(self):
        return self.nombre

class Grupo(models.Model):
    id = models.AutoField(primary_key=True)
    familia = models.ForeignKey(Familia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    def natural_key(self):
        return self.nombre

class Grupocampo_activo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    def natural_key(self):
        return self.nombre

class Categorizacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre

#"Administrativa, Organizacional, Pedagógica, Otra"
class AreaAsignacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre

#list_display=("Desconocida, Proyecto Aulas Conectadas, Fondo FAEP, Fondos Mantención, Otra"))
class Procendencia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre

#list_display=("Operativo y funcional, Realizar reparación, Realizar mantención, Malas condiciones, Dar de baja, "))
class OrigenFondo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre

#list_display=("Nuevo, Usado, Donación, Otra"))
class EstadoConservacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre


#list_display=("Inventariable, No Inventariable, Grupo homogeneo"))
class Inventariable(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    campo_activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def natural_key(self):
        return self.nombre

class campo_activo(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField(auto_now_add=True)
    centro_costo = models.ForeignKey(CentroCosto, on_delete=models.CASCADE, related_name='centro_costo')
    nivel_educativo = models.ForeignKey(NivelEducativo, on_delete=models.CASCADE, related_name='nivel_educativo')
    cantidad = models.IntegerField(default=0, blank=True, null=True)
    descripcion = models.TextField(default="", blank=True)
    grupo = models.ForeignKey(Grupocampo_activo, on_delete=models.CASCADE, related_name='grupo')
    categorizacion = models.ForeignKey(Categorizacion, on_delete=models.CASCADE, related_name='categorizacion')
    numero_serie = models.CharField(max_length=100)
    codigo_barra = models.CharField(max_length=100)
    area_asignacion = models.ForeignKey(AreaAsignacion, on_delete=models.CASCADE, related_name='area_asignacion')
    sala = models.ForeignKey(Salas, on_delete=models.CASCADE, related_name='sala')
    valor_total = models.IntegerField(default=0, blank=True, null=True)
    numero_factura = models.IntegerField(default=0, blank=True, null=True)
    procedencia = models.ForeignKey(Procendencia, on_delete=models.CASCADE, related_name='procedencia')
    origen_fondo = models.ForeignKey(OrigenFondo, on_delete=models.CASCADE, related_name='origen_fondo')
    estado_conservacion = models.ForeignKey(EstadoConservacion, on_delete=models.CASCADE, related_name='estado_conservacion')
    descripcion_baja = models.TextField(default="", blank=True)
    observaciones = models.TextField(default="", blank=True)
    inventariable = models.ForeignKey(Inventariable, on_delete=models.CASCADE, related_name='inventariable')



