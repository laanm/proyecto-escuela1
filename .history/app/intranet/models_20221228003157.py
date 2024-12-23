
from unittest.util import _MAX_LENGTH
from django.db import models
from login.models import *

class Asignaturas(models.Model):

    id = models.AutoField(primary_key=True)
    nombre= models.CharField(max_length=100)
    orden=models.IntegerField(blank=True,null=True)
    def __str__(self):
        return (self.nombre)

class AsignaturasAsignadas(models.Model):

    id= models.AutoField(primary_key=True)
    idprofe= models.ForeignKey(Usuario, on_delete=models.CASCADE)
    idasignatura= models.ForeignKey(Asignaturas, on_delete=models.CASCADE)

class Imagen(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='upload/', null=True, blank=True)

    def str(self):
        return self.nombre


class Cursos(models.Model):

    id= models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    cantidadestudiantes=models.IntegerField(blank=True,null=True)
    orden=models.IntegerField(blank=True,null=True)
    tipodecurso=models.IntegerField(blank=True,null=True,default=0)
    

    def __str__(self):
        return (self.nombre)

class DestinatariosCursos(models.Model):
    id=models.AutoField(primary_key=True)
    correo=models.TextField(blank=True,null=True)
    curso=models.ForeignKey(Cursos, on_delete=models.CASCADE)
    def __str__(self):
        return (self.correo)

class PeticionesImpresion(models.Model):

    numeroConsulta= models.AutoField(primary_key=True)
    datosProfesor= models.ForeignKey(Usuario,related_name="Profesor",on_delete=models.CASCADE) #nombre,correo
    cursoDestinado= models.ForeignKey(Cursos,on_delete=models.CASCADE)
    asignatura= models.ForeignKey(Asignaturas,on_delete=models.CASCADE)
    archivo= models.ImageField(null=True, blank=True)
    fechaPeticion= models.DateTimeField(blank=True, null=True)
    fechaEstimadaImpresion= models.DateTimeField(blank=True, null=True)
    fechaImpresionEntregada= models.DateTimeField(blank=True, null=True)
    cantidadImpresion= models.IntegerField()
    estado=models.IntegerField() # aprobado, rechazado, pendiente, impreso, entregado
    cordinador=models.ForeignKey(Usuario,related_name="Cordinador",on_delete=models.CASCADE, null=True)
    tamanohoja=models.IntegerField(blank=True, null=True) # 0 carta, 1 oficio
    doblecara=models.BooleanField(default=False)
    razon=models.TextField(blank=True, null=True)







class NoticiasFront(models.Model):
    id= models.AutoField(primary_key=True)
    titulo=models.CharField(max_length=300)
    portada=models.ImageField(null=True,blank=True)
    encabezado=models.CharField(max_length=300)
    contenido=models.TextField(blank=True,null=True)
    fecha=models.DateTimeField(blank=True,null=True)
    creador=models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    orden=models.IntegerField(null=True,blank=True)
    interno=models.IntegerField(null=True,blank=True)
    activo=models.BooleanField(default=True)

    class Meta:
        verbose_name_plural="Noticias Front"

    def __str__(self):
        return f"{self.id} - {self.titulo}"




class TemaHablado(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=300)
    activo=models.BooleanField(default=True)
    
class OpinionesProfesores(models.Model):
    id= models.AutoField(primary_key=True)
    tema=models.ForeignKey(TemaHablado, on_delete=models.CASCADE,null=True)
    profesor=models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    contenido=models.TextField(blank=True,null=True)


class Salas(models.Model):
    id= models.AutoField(primary_key=True)
    nombre= models.CharField(max_length=100)
    orden=models.IntegerField(blank=True,null=True)
    publica=models.IntegerField(blank=True,null=True)
    def __str__(self):
        return (self.nombre)


    

class Horarios(models.Model):
    id= models.AutoField(primary_key=True)
    horainicio= models.CharField(max_length=100)
    horafinal= models.CharField(max_length=100)
    orden=models.IntegerField(blank=True,null=True)

    def __str__(self):
        return (self.horainicio)

class SalasPedidas(models.Model):
    id = models.AutoField(primary_key=True)
    idProfesor= models.ForeignKey(Usuario,null=True, on_delete=models.CASCADE)
    idSala= models.ForeignKey(Salas,null=True, on_delete=models.CASCADE)
    idhorario= models.ForeignKey(Horarios,null=True, on_delete=models.CASCADE)
    idAsignatura= models.ForeignKey(Asignaturas, null=True, on_delete=models.CASCADE)
    idCurso= models.ForeignKey(Cursos, null=True, on_delete=models.CASCADE)
    fechaPeticion= models.DateField(blank=True,null=True)
    numeroAprendizaje= models.IntegerField(blank=True,null=True)
    objetivoAprendizaje= models.CharField(max_length=300)
    
    observacion=models.TextField(blank=True,null=True)
    observacionpendiente=models.IntegerField(null=True,blank=True)
    #uwu=models.CharField(default="",blank=True,null=True)

    def __str__(self):
        return (self.objetivoAprendizaje)

class ConstanciasSalas(models.Model):
    id=models.AutoField(primary_key=True)
    profesor=models.ForeignKey(Usuario, on_delete=models.CASCADE)
    npeticion=models.ForeignKey(SalasPedidas, on_delete=models.CASCADE)
    mensaje=models.TextField()
    estado=models.IntegerField(blank=True)

class ArchivosSalasPedidas(models.Model):
    id=models.AutoField(primary_key=True)
    idSalaPedida=models.ForeignKey(SalasPedidas,null=True,on_delete=models.CASCADE)
    archivo=models.TextField()

class MatriculaAlumno(models.Model):

    #parte del alumno
    cursodematricula=models.ForeignKey(Cursos, on_delete=models.SET_NULL, null=True) #foreing con las opciones
    yearmatricula=models.IntegerField(blank=True,null=True)

    diasasistidos=models.IntegerField(blank=True,null=True)

    id= models.AutoField(primary_key=True)
    
    huella=models.TextField(blank=True,null=True)

    imagenalumno= models.ImageField(blank=True,null=True)
    firmaapoderados=models.TextField(blank=True,null=True)
    runalumno=models.CharField(max_length=200,blank=True,null=True)
    apellidopaterno=models.CharField(max_length=200,blank=True,null=True)
    apellidomaterno=models.CharField(max_length=200,blank=True,null=True)
    ipe=models.CharField(max_length=200,blank=True,null=True)
    nombres=models.CharField(max_length=200,blank=True,null=True)
    nacionalidad=models.CharField(max_length=200,blank=True,null=True)
    fechanacimiento=models.CharField(max_length=200,blank=True, null=True)
    etnia=models.CharField(max_length=200,blank=True,null=True) #foreing con etnias
    domicilio=models.CharField(max_length=200,blank=True,null=True)
    religion=models.CharField(max_length=200,blank=True,null=True)
    comuna=models.CharField(max_length=200,blank=True,null=True)
    sexo=models.CharField( max_length=200,blank=True,null=True) #foreing con los sexos XD
    telefono= models.CharField(max_length=200,blank=True,null=True)
    edad=models.IntegerField(blank=True,null=True)
    vivecon=models.CharField(max_length=200,blank=True,null=True) #foreing con las opciones
    
    quienmatricula=models.CharField(max_length=200,blank=True,null=True) #quizas un foreing con las opciones
    estudiantenuevo=models.CharField(max_length=200,blank=True,null=True) #true es nuevo y false es viejo
    sistemadematricula=models.CharField(max_length=200,blank=True,null=True) #foreing con las opciones
    correoinstitucional=models.CharField(max_length=200,blank=True,null=True)

    #parte de familiar padre

    padreapellidos=models.CharField(max_length=200,blank=True,null=True)
    padrerun=models.CharField(max_length=200,blank=True,null=True)
    padrenombres=models.CharField(max_length=200,blank=True,null=True)
    padreipa=models.CharField(max_length=200,blank=True,null=True)
    padrenacionalidad=models.CharField(max_length=200,blank=True,null=True)
    padrenpasaporte=models.CharField(max_length=200,blank=True,null=True)
    padredomicilio=models.CharField(max_length=200,blank=True,null=True)
    padreestudios=models.CharField(max_length=200,blank=True,null=True)
    padrecomuna=models.CharField(max_length=200,blank=True,null=True)
    padreocupacion=models.CharField(max_length=200,blank=True,null=True)
    padreapoderado=models.CharField(max_length=200,blank=True,null=True)
    padretelefono1=models.CharField(max_length=200,blank=True,null=True)
    padretelefono2=models.CharField(max_length=200,blank=True,null=True)
    padreemail=models.CharField(max_length=200,blank=True,null=True)

    #parte de familiar madre

    madreapellidos=models.CharField(max_length=200,blank=True,null=True)
    madrerun=models.CharField(max_length=200,blank=True,null=True)
    madrenombres=models.CharField(max_length=200,blank=True,null=True)
    madreipa=models.CharField(max_length=200,blank=True,null=True)
    madrenacionalidad=models.CharField(max_length=200,blank=True,null=True)
    madrenpasaporte=models.CharField(max_length=200,blank=True,null=True)
    madredomicilio=models.CharField(max_length=200,blank=True,null=True)
    madreestudios=models.CharField(max_length=200,blank=True,null=True)
    madrecomuna=models.CharField(max_length=200,blank=True,null=True)
    madreocupacion=models.CharField(max_length=200,blank=True,null=True)
    madreapoderado=models.CharField(max_length=200,blank=True,null=True)
    madretelefono1=models.CharField(max_length=200,blank=True,null=True)
    madretelefono2=models.CharField(max_length=200,blank=True,null=True)
    madreemail=models.CharField(max_length=200,blank=True,null=True)


    #antecedentes academicos

    establecimientoprocedencia=models.CharField(max_length=200,blank=True,null=True)
    ultimoyearcursado=models.CharField(max_length=200,blank=True,null=True)
    cursosqueharepetido=models.CharField(max_length=200,blank=True,null=True)
    perteneceaproyectodeintegracionescolar=models.CharField(max_length=200,blank=True,null=True)
    optaporreligion=models.CharField(max_length=200,blank=True,null=True)
    optaporuncredo=models.CharField(max_length=200,blank=True,null=True)

    #antecedentes sociales

    tienejunaeb=models.CharField(max_length=200,blank=True,null=True)
    becaindigena=models.CharField(max_length=200,blank=True,null=True)
    otrabeca=models.CharField(max_length=200,blank=True,null=True)

    perteneceprogramasocial=models.CharField(max_length=200,blank=True,null=True)
    prioritario=models.CharField(max_length=200,blank=True,null=True)
    preferente=models.CharField(max_length=200,blank=True,null=True)
    registrosocialdehogares=models.CharField(max_length=200,blank=True,null=True)

    #antecedentes de salud

    sistemadesalud=models.CharField(max_length=200,blank=True,null=True) #quizas un foreing con las opciones
    consultorioocesfam=models.CharField(max_length=200,blank=True,null=True)
    hijoconimpedimentofisico=models.TextField(blank=True,null=True)
    enfermedadcronica=models.TextField(blank=True,null=True)
    alergico=models.TextField(blank=True,null=True)
    tomamedicamento=models.TextField(blank=True,null=True)
    encasodeemergenciacomunicarsecon=models.CharField(max_length=300, blank=True,null=True)

    #documentacion

    conoceyaceptareglamentointernodelestablecimiento=models.BooleanField(blank=True,null=True)
    conoceyaceptareglamentodeevaluaciondelestablecimiento=models.BooleanField(blank=True,null=True)
    aceptoelusoderegistrodehuellaconfinesderegistrodehorario=models.BooleanField(blank=True,null=True)
    encuestaparalaasistenciadereligion=models.BooleanField(blank=True,null=True)
    aceptolosprotocoloscontraelcovid19=models.BooleanField(blank=True,null=True)

    #deberes y compromisos

    asistiratodaslasreunionescitacionesollamadas=models.BooleanField(blank=True,null=True)
    cumplirhorariodeentradaysalida=models.BooleanField(blank=True,null=True)
    justificarinasistenciascondocumentospertinentes=models.BooleanField(blank=True,null=True)
    revisaryresponderinformacionmediantemediosdecomunicacion=models.BooleanField(blank=True,null=True)
    particaendiferentesactividadesprogramadasporelestablecimiento=models.BooleanField(blank=True,null=True)

class DocumentosAdjuntosMatricula(models.Model):
    id=models.AutoField(primary_key=True)
    idmatricula=models.ForeignKey(MatriculaAlumno, on_delete=models.CASCADE)
    titulo=models.CharField(max_length=200)
    archivo=models.FileField(blank=True,null=True)

class MatriculaSeccionPersonalizada(models.Model):
    id=models.AutoField(primary_key=True)
    nombreseccion=models.CharField(max_length=200)
    orden=models.IntegerField()

class MatriculasOpcionPersonalizada(models.Model):
    id=models.AutoField(primary_key=True)
    idseccion=models.ForeignKey(MatriculaSeccionPersonalizada, on_delete=models.CASCADE)
    nombreopcion=models.CharField(max_length=200)
    tipodeopcion=models.IntegerField(null=True,blank=True)

class MatriculasAlternativasOpcion(models.Model):
    id=models.AutoField(primary_key=True)
    idopcion=models.ForeignKey(MatriculasOpcionPersonalizada, on_delete=models.CASCADE)
    nombre=models.TextField(null=True,blank=True)
    valor=models.TextField(null=True,blank=True)

class MatriculasDatosOpcion(models.Model):
    id=models.AutoField(primary_key=True)
    idopcion=models.ForeignKey(MatriculasOpcionPersonalizada,blank=True,null=True, on_delete=models.CASCADE)
    idmatricula=models.ForeignKey(MatriculaAlumno,on_delete=models.CASCADE)
    valor=models.TextField(null=True,blank=True)
    

class AsitenciaAlumno(models.Model):
    id=models.AutoField(primary_key=True)
    horaasitencias=models.DateTimeField(blank=True,null=True)
    horasalida=models.DateField(blank=True,null=True)
    atrasoresuelto=models.BooleanField(default=False)
    alumno=models.ForeignKey(MatriculaAlumno, on_delete=models.CASCADE)

class ProblemaAsistencia(models.Model):
    id=models.AutoField(primary_key=True)
    horaproblema=models.DateTimeField(blank=True,null=True)
    alumno=models.ForeignKey(MatriculaAlumno, on_delete=models.CASCADE)
    activo=models.BooleanField(default=True)


# MODELOS CRA----------------------------------------------------------

class CategoriaProductoCra(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=300)
    activo=models.IntegerField(blank=True,null=True)
    
class ProductoCra(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.TextField(blank=True,null=True)
    cantidad=models.IntegerField(blank=True,null=True)
    limitecantidad=models.IntegerField(blank=True,null=True)
    imagen=models.ImageField(blank=True,null=True)
    descripcion=models.TextField(blank=True,null=True)
    infinito=models.IntegerField(blank=True,null=True)
    Activo=models.IntegerField(blank=True,null=True)
    idcategoria=models.ForeignKey(CategoriaProductoCra,null=True, on_delete=models.SET_NULL)
    posicion=models.TextField(blank=True,null=True)
    codigobarra=models.TextField(blank=True,null=True)
    vecespedido=models.IntegerField(blank=True,null=True)

class PeticionesProductoCra(models.Model):
    id=models.AutoField(primary_key=True)
    estado=models.IntegerField()
    cantidad=models.IntegerField()
    idproducto=models.ForeignKey(ProductoCra,null=True, on_delete=models.CASCADE)

    idalumno=models.ForeignKey(MatriculaAlumno,on_delete=models.CASCADE,null=True, blank=True)
    idprofesor=models.ForeignKey(Usuario,on_delete=models.CASCADE,null=True, blank=True)

    fechapeticion=models.DateTimeField(blank=True,null=True)
    fechadevolucion=models.DateTimeField(blank=True,null=True)

    #CRA LIBROS

class CategoriaLibrosCra(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=300)
    activo=models.IntegerField(blank=True,null=True)
class LibrosCra(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.TextField(blank=True,null=True)
    editorial=models.TextField(blank=True,null=True)
    cantidad=models.IntegerField(blank=True,null=True)
    limitecantidad=models.IntegerField(blank=True,null=True)
    imagen=models.ImageField(blank=True,null=True)
    descripcion=models.TextField(blank=True,null=True)
    infinito=models.IntegerField(blank=True,null=True)
    Activo=models.IntegerField(blank=True,null=True)
    idcategoria=models.ForeignKey(CategoriaLibrosCra,null=True, on_delete=models.SET_NULL)
    autor=models.TextField(blank=True,null=True)
    posicion=models.TextField(blank=True,null=True)
    codigobarra=models.TextField(blank=True,null=True)
    vecespedido=models.IntegerField(blank=True,null=True)

class PeticionesLibrosCra(models.Model):
    id=models.AutoField(primary_key=True)
    estado=models.IntegerField()
    cantidad=models.IntegerField()
    ncopia=models.IntegerField(null=True, blank=True)
    idproducto=models.ForeignKey(LibrosCra,null=True, on_delete=models.CASCADE)
    
    idalumno=models.ForeignKey(MatriculaAlumno,on_delete=models.CASCADE,null=True, blank=True)
    idprofesor=models.ForeignKey(Usuario,on_delete=models.CASCADE,null=True, blank=True)

    fechapeticion=models.DateTimeField(blank=True,null=True)
    fechadevolucion=models.DateTimeField(blank=True,null=True)


# MODELOS MANTENCION----------------------------------------------------
class CategoriaMantencion(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=300)
class Mantencion(models.Model):
    id=models.AutoField(primary_key=True)
    estado=models.IntegerField()
    categoria=models.ForeignKey(CategoriaMantencion, on_delete=models.CASCADE)
    prioridad=models.IntegerField()
    tipoobra=models.IntegerField()
    imagen=models.ImageField(blank=True,null=True)
    texto=models.TextField()
    fechaemision=models.DateTimeField(blank=True,null=True)
    fechaultimamodificacion=models.DateTimeField(blank=True,null=True)


class RecursosMantencion(models.Model):
    id=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=300)
    cantidad=models.IntegerField()
    costoaprox=models.IntegerField()
    mantencion=models.ForeignKey(Mantencion, on_delete=models.CASCADE)



#Modelos NOTAS

class NotasAlumno(models.Model):
    id=models.AutoField(primary_key=True)
    alumno=models.ForeignKey(MatriculaAlumno, on_delete=models.CASCADE)
    asignatura=models.ForeignKey(Asignaturas, on_delete=models.CASCADE)

    promedioanual=models.FloatField(default=0, blank=True, null=True)
    
    porcentaje1=models.IntegerField(blank=True,null=True)
    indicador1=models.CharField(max_length=50, default="A")
    promedio1=models.CharField(max_length=50, blank=True,null=True)

    porcentaje2=models.IntegerField(blank=True,null=True)
    indicador2=models.CharField(max_length=50, default="A")
    promedio2=models.CharField(max_length=50, blank=True,null=True)

    porcentaje3=models.IntegerField(blank=True,null=True)
    indicador3=models.CharField(max_length=50, default="A")
    promedio3=models.CharField(max_length=50, blank=True,null=True)

    porcentaje4=models.IntegerField(blank=True,null=True)
    indicador4=models.CharField(max_length=50, default="A")
    promedio4=models.CharField(max_length=50, blank=True,null=True)

    n1=models.CharField(max_length=50 , blank=True,null=True)
    n2=models.CharField(max_length=50 , blank=True,null=True)
    n3=models.CharField(max_length=50 , blank=True,null=True)
    n4=models.CharField(max_length=50 , blank=True,null=True)
    n5=models.CharField(max_length=50 , blank=True,null=True)
    n6=models.CharField(max_length=50 , blank=True,null=True)
    n7=models.CharField(max_length=50 , blank=True,null=True)
    n8=models.CharField(max_length=50 , blank=True,null=True)
    n9=models.CharField(max_length=50 , blank=True,null=True)
    n10=models.CharField(max_length=50 , blank=True,null=True)
    n11=models.CharField(max_length=50 , blank=True,null=True)
    n12=models.CharField(max_length=50 , blank=True,null=True)
    n13=models.CharField(max_length=50 , blank=True,null=True)
    n14=models.CharField(max_length=50 , blank=True,null=True)
    n15=models.CharField(max_length=50 , blank=True,null=True)

    n16=models.CharField(max_length=50 , blank=True,null=True)
    n17=models.CharField(max_length=50 , blank=True,null=True)
    n18=models.CharField(max_length=50 , blank=True,null=True)
    n19=models.CharField(max_length=50 , blank=True,null=True)
    n20=models.CharField(max_length=50 , blank=True,null=True)
    n21=models.CharField(max_length=50 , blank=True,null=True)
    n22=models.CharField(max_length=50 , blank=True,null=True)
    n23=models.CharField(max_length=50 , blank=True,null=True)
    n24=models.CharField(max_length=50 , blank=True,null=True)
    n25=models.CharField(max_length=50 , blank=True,null=True)
    n26=models.CharField(max_length=50 , blank=True,null=True)
    n27=models.CharField(max_length=50 , blank=True,null=True)
    n28=models.CharField(max_length=50 , blank=True,null=True)
    n29=models.CharField(max_length=50 , blank=True,null=True)
    n30=models.CharField(max_length=50 , blank=True,null=True)


class Calendario(models.Model):
    id=models.AutoField(primary_key=True)
    ano=models.IntegerField(blank=True,null=True)
    mes=models.IntegerField(blank=True,null=True)
    dia=models.IntegerField(blank=True,null=True)
    nombredia=models.IntegerField(blank=True,null=True)
    tipodia=models.IntegerField(blank=True,null=True)

class ObjetivoAprendizaje(models.Model):
    id=models.AutoField(primary_key=True)
    profesor=models.ForeignKey(Usuario,on_delete=models.CASCADE)
    asignatura=models.ForeignKey(Asignaturas,blank=True,null=True,on_delete=models.SET_NULL)
    curso=models.ForeignKey(Cursos,blank=True,null=True,on_delete=models.SET_NULL)
    tema=models.CharField(max_length=200,blank=True,null=True)
    unidad=models.IntegerField(blank=True,null=True)
    semanas=models.CharField(max_length=200,blank=True,null=True)
    horassemanales=models.IntegerField(blank=True,null=True)
    semestre=models.IntegerField(blank=True,null=True)
    trimestre=models.IntegerField(blank=True,null=True)
    mes=models.IntegerField(blank=True,null=True)
    year=models.IntegerField(blank=True,null=True)

    enfasis=models.TextField(blank=True,null=True)
    objetivodeaprendizaje=models.TextField(blank=True,null=True)
    indicadoresdelogro=models.TextField(blank=True,null=True)

class ActividadesAprendizaje(models.Model):
    id=models.AutoField(primary_key=True)
    idobjetivo=models.ForeignKey(ObjetivoAprendizaje, on_delete=models.CASCADE)
    nombreactividad=models.TextField(blank=True,null=True)
    evidenciaaprendizaje=models.TextField(blank=True,null=True)
    criteriodeevaluacion=models.TextField(blank=True,null=True)
    tipodeevaluacion=models.TextField(blank=True,null=True)
    

class Eventos(models.Model):
    id=models.AutoField(primary_key=True)
    titulo=models.TextField(blank=True,null=True)
    descripcion=models.TextField(blank=True,null=True)
    requisitos=models.TextField(blank=True,null=True)
    hora=models.TextField(blank=True,null=True)

class EventoDias(models.Model):
    id=models.AutoField(primary_key=True)
    idevento=models.ForeignKey(Eventos, on_delete=models.CASCADE)
    idcalendario=models.ForeignKey(Calendario, on_delete=models.CASCADE)


class TonerImpresion(models.Model):
    id=models.AutoField(primary_key=True)
    nombreimpresora=models.CharField(max_length=200)
    salaalojada=models.ForeignKey(Salas,null=True, on_delete=models.SET_NULL)
    tintaactual=models.IntegerField(blank=True,null=True)
    hojasactual=models.IntegerField(blank=True,null=True)

class HistorialToner(models.Model):
    id=models.AutoField(primary_key=True)
    impresora=models.ForeignKey(TonerImpresion,null=True, on_delete=models.CASCADE)
    tipo=models.IntegerField(blank=True,null=True)
    cantidadtinta=models.IntegerField(blank=True,null=True)
    hojasactual=models.IntegerField(blank=True,null=True)



class ConfiguracionAdministrativa(models.Model):
    id=models.AutoField(primary_key=True)
    divisiondeyear=models.IntegerField(blank=True,null=True)




