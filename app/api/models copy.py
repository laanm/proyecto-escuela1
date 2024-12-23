""" from django.db import models
from login.models import * """
# Create your models here.

class Empresa(models.Model):
    id = models.AutoField(primary_key=True)
    razon_social = models.CharField(max_length=150)
    rut = models.CharField(max_length=12)

    def __str__(self):
        return self.razon_social
    
    class Meta:
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'
    
class Usuario_empresa(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Usuario_empresa'
        verbose_name_plural = 'Usuario_empresas'

    def __str__(self):
        return self.usuario + " " + self.empresa
        
class Empresa_sucursal(models.Model):
    id = models.AutoField(primary_key=True)
    empresa= models.ForeignKey(Empresa, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=150)
    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=12)
    email = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = "Empresa_Sucursal"
        verbose_name_plural = "Empresa_Sucursales"
class Representante_legal(models.Model):
    id = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=150)
    apellidos = models.CharField(max_length=150)
    rut = models.CharField(max_length=12)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombres + " " + self.apellidos
    
    class Meta:
        verbose_name_plural = "Representantes legales"
class Empresa_giro(models.Model):
    id = models.AutoField(primary_key=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    giro = models.CharField(max_length=150)

    def __str__(self):
        return self.giro
    
    class Meta:
        verbose_name_plural = "Empresa_giros"

class Cargo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    sucursal = models.ForeignKey(Empresa_sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name_plural = "Cargos"

class Unidad(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=150,null=True, blank=True)
    estado = models.BooleanField(default=True)
    sucursal = models.ForeignKey(Empresa_sucursal, on_delete=models.CASCADE, null=True, blank=True, default=None)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name_plural = "Unidades"
class Trabajador(models.Model):
    id = models.AutoField(primary_key=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)
    Unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
    jefe = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    nombres = models.CharField(max_length=50)
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    rut = models.CharField(max_length=11)
    direccion = models.CharField(max_length=50)
    telefono_fijo = models.CharField(max_length=50, null=True, blank=True)
    telefono_movil = models.CharField(max_length=50)
    medio_transporte = models.CharField(max_length=50, null=True, blank=True)
    email_personal = models.CharField(max_length=100)
    email_corporativo = models.CharField(max_length=100, null=True, blank=True)
    fecha_nacimiento = models.DateField()
    profesion = models.CharField(max_length=50)
    nivel_educacional = models.CharField(max_length=50)
    antecedentes = models.TextField(blank=True, null=True)
    foto = models.TextField(null=True, blank=True)
    sexo = models.CharField(max_length=50, null=True, blank=True)
    estado_civil = models.CharField(max_length=50, null=True, blank=True)
    nacionalidad = models.CharField(max_length=50, null=True, blank=True)
    contacto_emergencia = models.TextField(null=True, blank=True)
    

    def __str__(self):
        return self.nombres + " " + self.apellido_paterno + " " + self.apellido_materno
    
    class Meta:
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'

class Datos_liquidacion(models.Model):
    id = models.AutoField(primary_key=True)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    tipo_contrato = models.CharField(max_length=50)
    sueldo_base = models.IntegerField()
    gratificacion = models.FloatField()
    estado = models.CharField(max_length=50)

    def __str__(self):
        return self.trabajador.nombres + " " + self.trabajador.apellidos

    class Meta:
        verbose_name = 'Datos Liquidacion'
        verbose_name_plural = 'Datos Liquidaciones'

class Liquidacion_haber(models.Model):
    id = models.AutoField(primary_key=True)
    datos_liquidacion = models.ForeignKey(Datos_liquidacion, on_delete=models.CASCADE)
    concepto = models.CharField(max_length=50)
    monto = models.IntegerField(null=False)
    # fijo = true, monto para siempre, false, monto desde rango de fecha
    fijo = models.BooleanField(default=True)
    fecha_desde = models.DateField(null=True, blank=True)
    fecha_hasta = models.DateField(null=True, blank=True)
    # tipo_haber = imponible o no imponible
    tipo_haber = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.concepto
    
    class Meta:
        verbose_name = 'Liquidacion Haber'
        verbose_name_plural = 'Liquidacion Haberes'

class Liquidacion_descuento(models.Model):
    id = models.AutoField(primary_key=True)
    datos_liquidacion = models.ForeignKey(Datos_liquidacion, on_delete=models.CASCADE)
    concepto = models.CharField(max_length=50)
    monto = models.IntegerField(null=False)
    # fijo = true, monto para siempre, false, monto desde rango de fecha
    fijo = models.BooleanField(default=True)
    fecha_desde = models.DateField(null=True, blank=True)
    fecha_hasta = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.concepto
    
    class Meta:
        verbose_name = 'Liquidacion Descuento'
        verbose_name_plural = 'Liquidacion Descuentos'

class Asistencia(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField()
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)

    def __str__(self):
        return self.trabajador.nombres + " " + self.trabajador.apellidos

    class Meta:
        verbose_name = 'Asistencia'
        verbose_name_plural = 'Asistencias'

class Documento_clausula(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    clausula = models.TextField()

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Documento Clausula'
        verbose_name_plural = 'Documento Clausulas'

class Documento_modelo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    datos = models.JSONField()

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Documento Modelo'
        verbose_name_plural = 'Documento Modelos'

class Documento_trabajador(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    pdf = models.TextField()
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    fecha = models.DateField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    firma_trabajador = models.TextField(null=True, blank=True)
    firma_usuario = models.TextField(null=True, blank=True)
    estado = models.CharField(max_length=50, null=True, blank=True, default='Pendiente')

    def __str__(self):
        return self.nombre + " " + self.tipo + " " + self.trabajador.nombres + " " + self.trabajador.apellidos

    class Meta:
        verbose_name = 'Documento Trabajador'
        verbose_name_plural = 'Documentos Trabajadores'

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateField()
    hora = models.TimeField()
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=80)
    descripcion = models.TextField()
    estado = models.CharField(max_length=50)
    prioridad = models.CharField(max_length=50)

    def __str__(self):
        return self.trabajador.nombres + " " + self.trabajador.apellidos

    class Meta:
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'