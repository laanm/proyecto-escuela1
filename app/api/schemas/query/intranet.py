import datetime
from datetime import datetime, timedelta
from datetime import date
from datetime import time


import time
from django.core.mail import send_mail
from django.conf import settings

import django
import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from api.models import *
from login.models import *
from intranet.models import *

from graphene_file_upload.scalars import Upload
from graphene.types.generic import GenericScalar # Solution

#info es las variables request como sesion.id
#info es las variables request como sesion.id
#info es las variables request como sesion.id
#info es las variables request como sesion.id#info es las variables request como sesion.id
#info es las variables request como sesion.id#info es las variables request como sesion.id#info es las variables request como sesion.id#info es las variables request como sesion.id
#info es las variables request como sesion.id

class AsignaturasAsignadasType(DjangoObjectType):

    class Meta:
        model= AsignaturasAsignadas
        fields="__all__"

class CursosType(DjangoObjectType):

    class Meta:
        model=Cursos
        fields="__all__"
        
class ObjetivoAprendizajeType(DjangoObjectType):

    class Meta:
        model=ObjetivoAprendizaje
        fields="__all__"


class PeticionesImpresionType(DjangoObjectType):

    class Meta:
        model=PeticionesImpresion
        fields="__all__"

class SalasType(DjangoObjectType):

    class Meta:
        model=Salas
        fields="__all__"

class HorariosType(DjangoObjectType):

    class Meta:
        model=Horarios
        fields="__all__"

class SalasPedidasType(DjangoObjectType):

    class Meta:
        model=SalasPedidas
        fields="__all__"

class AsignaturasType(DjangoObjectType):
    class Meta:
        model = Asignaturas
        fields= "__all__"

class NoticiasType(DjangoObjectType):
    
    class Meta:
        model= Noticias
        fields= "__all__"

class UsuariosType(DjangoObjectType):

    class Meta:
        model= Usuario
        fields="__all__"

class PerfilesType(DjangoObjectType):

    class Meta:
        model=Perfiles
        fields="__all__"


class ImagenType(DjangoObjectType):

    class Meta:
        model=Imagen
        fields="__all__"

class NoticiasFrontType(DjangoObjectType):

    class Meta:
        model=NoticiasFront
        fields="__all__"

class TemaHabladoType(DjangoObjectType):

    class Meta:
        model=TemaHablado
        fields="__all__"

class OpinionesProfesoresType(DjangoObjectType):

    class Meta:
        model=OpinionesProfesores
        fields="__all__"


class AsitenciaAlumnoType(DjangoObjectType):

    class Meta:
        model=AsitenciaAlumno
        fields="__all__"

class ProblemaAsistenciaType(DjangoObjectType):

    class Meta:
        model=ProblemaAsistencia
        fields="__all__"

class CategoriaMantencionType(DjangoObjectType):
    class Meta:
        model=CategoriaMantencion
        fields="__all__"

class MantencionType(DjangoObjectType):
    class Meta:
        model=Mantencion
        fields="__all__"

class RecursosMantencionType(DjangoObjectType):
    class Meta:
        model=RecursosMantencion
        fields="__all__"

class CategoriaProductoCraType(DjangoObjectType):
    class Meta:
        model=CategoriaProductoCra
        fields="__all__"

class ProductoCraType(DjangoObjectType):
    class Meta:
        model=ProductoCra
        fields="__all__"

class PeticionesProductoCraType(DjangoObjectType):
    class Meta:
        model=PeticionesProductoCra
        fields="__all__"

class CategoriaLibrosCraType(DjangoObjectType):
    class Meta:
        model=CategoriaLibrosCra
        fields="__all__"

class LibrosCraType(DjangoObjectType):
    class Meta:
        model=LibrosCra
        fields="__all__"

class PeticionesLibrosCraType(DjangoObjectType):
    class Meta:
        model=PeticionesLibrosCra
        fields="__all__"

class MatriculaAlumnoType(DjangoObjectType):
    class Meta:
        model=MatriculaAlumno
        fields="__all__"

class MatriculaSeccionPersonalizadaType(DjangoObjectType):
    class Meta:
        model=MatriculaSeccionPersonalizada
        fields="__all__"

class MatriculasOpcionPersonalizadaType(DjangoObjectType):
    class Meta:
        model=MatriculasOpcionPersonalizada
        fields="__all__"

class MatriculasAlternativasOpcionType(DjangoObjectType):
    class Meta:
        model=MatriculasAlternativasOpcion
        fields="__all__"

class MatriculasDatosOpcionType(DjangoObjectType):
    class Meta:
        model=MatriculasDatosOpcion
        fields="__all__"


class NotasAlumnoType(DjangoObjectType):
    class Meta:
        model=NotasAlumno
        fields="__all__"

class Query(graphene.ObjectType):
    all_asignaturas = graphene.List(AsignaturasType)
    asignaturas= graphene.Field(AsignaturasType, id=graphene.Int())

    def resolve_all_asignaturas(self, info):
        return Asignaturas.objects.all().order_by("nombre")

    def resolve_asignaturas(self, info, id):
        return Asignaturas.objects.get(pk=id)

    all_asignaturasasignadas = graphene.List(AsignaturasAsignadasType)
    asignaturasasignadas = graphene.List(AsignaturasAsignadasType, id= graphene.Int())

    def resolve_all_asignaturasasignadas(self, info):
        return AsignaturasAsignadas.objects.all()
    
    def resolve_asignaturasasignadas(self, info, id):
        return AsignaturasAsignadas.objects.filter(idprofe=id)
    
    all_cursos = graphene.List(CursosType)
    cursos= graphene.Field(CursosType,id= graphene.Int())

    def resolve_all_cursos(self, info):
        return Cursos.objects.all().order_by("nombre")
    
    def resolve_cursos(self, info, id):
        return Cursos.objects.get(pk=id)
    
    all_peticionesimpresion= graphene.List(PeticionesImpresionType)
    peticionesimpresion= graphene.List(PeticionesImpresionType, id=graphene.Int(), tipo=graphene.Int())
    peticionesimpresiontipo=graphene.List(PeticionesImpresionType, tipo=graphene.Int())
    peticionesimpresiontipoid=graphene.List(PeticionesImpresionType, id=graphene.Int(),tipo=graphene.Int())

    def resolve_all_peticionesimpresion(self, info):
        return PeticionesImpresion.objects.all()
    
    def resolve_peticionesimpresion(self, info, id,tipo): #1: vistanormal, 0:historial
        if tipo==1:
            return PeticionesImpresion.objects.filter(Q(datosProfesor=id) & (Q(estado=1) | Q(estado=2)| Q(estado=3) | Q(estado=5) ) ).order_by("-fechaPeticion")
        else:
            return PeticionesImpresion.objects.filter(datosProfesor=id).order_by("-estado","-fechaEstimadaImpresion")
        

    def resolve_peticionesimpresiontipo(self,info,tipo):
        if tipo==1:#vista impresor
            return PeticionesImpresion.objects.filter(Q(estado=3) | Q(estado=5) ).order_by("estado","fechaPeticion")
        elif tipo==2:#historial impresor
            return PeticionesImpresion.objects.exclude(Q(estado=0) |Q(estado=1) |   Q(estado=2) |   Q(estado=3) |Q(estado=4)).order_by("-fechaEstimadaImpresion")[:20]
        elif tipo==3:#vista coordinador
            return PeticionesImpresion.objects.exclude(Q(estado=3) |Q(estado=4) |Q(estado=5) | Q(estado=6) | Q(estado=0)).order_by("estado")
        elif tipo==4:#historial coordinador
            return PeticionesImpresion.objects.exclude(Q(estado=1) |   Q(estado=2)).order_by("-fechaPeticion")[:20]
    
    def resolve_peticionesimpresiontipoid(self,info,id,tipo):
        if tipo==1:#vista impresor
            return PeticionesImpresion.objects.filter(Q(datosProfesor=id) | Q(estado=3) | Q(estado=5) ).order_by("estado","fechaPeticion")
        elif tipo==2:#historial impresor
            return PeticionesImpresion.objects.filter(Q(datosProfesor=id)).exclude(Q(estado=0) | Q(estado=1) |   Q(estado=2) |   Q(estado=3) |Q(estado=4)).order_by("estado","-fechaEstimadaImpresion")[:20]
        elif tipo==3:#vista coordinador
            return PeticionesImpresion.objects.filter(Q(datosProfesor=id)).exclude(Q(estado=3) |Q(estado=4) |Q(estado=5) | Q(estado=6) | Q(estado=0)).order_by("estado")
        elif tipo==4:#historial coordinador
            return PeticionesImpresion.objects.filter(datosProfesor=id).exclude(estado=0).order_by("-fechaEstimadaImpresion")[:20]
    

    all_salas= graphene.List(SalasType)
    salas= graphene.Field(SalasType, id=graphene.Int())

    def resolve_all_salas(self, info):
        return Salas.objects.all().order_by("nombre")
    
    def resolve_salas(self, info, id):
        return Salas.objects.get(pk=id)

    all_horarios= graphene.List(HorariosType)
    horarios= graphene.Field(HorariosType, id=graphene.Int())

    def resolve_all_horarios(self, info):
        return Horarios.objects.all().order_by("orden")
    
    def resolve_horarios(self, info, id):
        return Horarios.objects.get(pk=id)

    all_salaspedidas= graphene.List(SalasPedidasType)
    fechas_salaspedidas= graphene.List(SalasPedidasType, fecha=graphene.String())
    salaspedidas= graphene.Field(SalasPedidasType, id=graphene.Int())

    def resolve_all_salaspedidas(self, info):
        return SalasPedidas.objects.all()
    
    def resolve_fechas_salaspedidas(self,info,fecha):

        return SalasPedidas.objects.filter(fechaPeticion=fecha)
        
    def resolve_salaspedidas(self, info, id):
        return SalasPedidas.objects.get(pk=id)



    




    all_usuarios= graphene.List(UsuariosType)
    usuarios= graphene.Field(UsuariosType, id= graphene.Int())

    def resolve_all_usuarios(self, info):
        return Usuario.objects.all().order_by("user")

    def resolve_usuarios(self, info, id):
        return Usuario.objects.get(pk=id)




    all_perfiles= graphene.List(PerfilesType)
    perfiles= graphene.Field(PerfilesType, id= graphene.Int())

    def resolve_all_perfiles(self, info):
        return Perfiles.objects.all()

    def resolve_perfiles(self, info, id):
        return Perfiles.objects.get(pk=id)

    all_imagenes= graphene.List(ImagenType)
    imagenes= graphene.Field(ImagenType, id=graphene.Int())

    def resolve_all_imagenes(self, info):
        return Imagen.objects.all()
    
    def resolve_imagenes(self,info,id):
        return Imagen.objects.get(pk=id)

    all_noticiasfront=graphene.List(NoticiasFrontType)
    noticias_internas=graphene.List(NoticiasFrontType)
    noticiasfront=graphene.Field(NoticiasFrontType, id=graphene.Int())

    def resolve_all_noticiasfront(self,info):
        return NoticiasFront.objects.all().order_by("-fecha")

    def resolve_noticias_internas(self,info):
        return NoticiasFront.objects.filter(interno=2).order_by("-fecha")

    def resolve_noticiasfront(self,info,id):
        return NoticiasFront.objects.get(pk=id)

    all_temashablado=graphene.List(TemaHabladoType)
    temashablado=graphene.Field(TemaHabladoType, id=graphene.Int())

    def resolve_all_temashablado(self,info):
        return TemaHablado.objects.all()

    def resolve_temashablado(self,info,id):
        return TemaHablado.objects.get(pk=id)

    all_opinionesprofesor=graphene.List(OpinionesProfesoresType)
    opinionesprofesor=graphene.List(OpinionesProfesoresType, id=graphene.Int())
    
    def resolve_all_opinionesprofesor(self,info):
        return OpinionesProfesores.objects.all()

    def resolve_opinionesprofesor(self,info,id):
        return OpinionesProfesores.objects.get(pk=id)


    all_asistenciaalumno=graphene.List(AsitenciaAlumnoType)
    rango_asistenciaalumno=graphene.List(AsitenciaAlumnoType)
    cursoasistenciaalumno=graphene.List(AsitenciaAlumnoType, idcurso=graphene.Int())
    asistenciaalumno=graphene.List(AsitenciaAlumnoType, id=graphene.String())


    def resolve_all_asistenciaalumno(self,info): #AQUI NOS QUEDAMOS PAAAAA
        hoy =datetime.now()
        return AsitenciaAlumno.objects.filter(horaasitencias__year=hoy.year).order_by('alumno')

    def resolve_rango_asistenciaalumno(self,info):
        hoy =datetime.now()
        antes= hoy - timedelta(days=30)
        return AsitenciaAlumno.objects.filter(horaasitencias__range=[antes,hoy]).order_by('alumno')

    def resolve_cursoasistenciaalumno(self,info,idcurso):
        hoy =datetime.now()
        return AsitenciaAlumno.objects.filter(alumno__curso=idcurso,horaasitencias__year=hoy.year).order_by('alumno')

    def resolve_asistenciaalumno(self,info,id):
        return AsitenciaAlumno.objects.filter(alumno=id)

    


    all_mantencion=graphene.List(MantencionType)

    def resolve_all_mantencion(self,info):
        return Mantencion.objects.all()

    all_categoriasmantencion=graphene.List(CategoriaMantencionType)

    def resolve_all_categoriasmantencion(self,info):
        return CategoriaMantencion.objects.all()

    all_recursosmantencion=graphene.List(RecursosMantencionType)
    recursosmantencion=graphene.List(RecursosMantencionType, id=graphene.Int())
    
    def resolve_all_recursosmantencion(self,info):
        return RecursosMantencion.objects.all()
    
    def resolve_recursosmantencion(self,info,id):
        return RecursosMantencion.objects.filter(mantencion=id)


    all_categoriasproductoscra=graphene.List(CategoriaProductoCraType)

    def resolve_all_categoriasproductoscra(self,info):
        return CategoriaProductoCra.objects.all()

    all_productoscra=graphene.List(ProductoCraType)
    categoria_productocra=graphene.List(ProductoCraType, idcat=graphene.Int())

    def resolve_all_productoscra(self,info):
        return ProductoCra.objects.all().order_by("nombre")
    
    def resolve_categoria_productocra(self,info,idcat):
        return ProductoCra.objects.filter(idcategoria=CategoriaProductoCra.objects.get(pk=idcat))

    all_peticionesproductocra=graphene.List(PeticionesProductoCraType)
    categoriapeticionesproductocra=graphene.List(PeticionesProductoCraType, idcat=graphene.Int())
    peticionesproductocra=graphene.List(PeticionesProductoCraType,idprofe=graphene.Int())

    def resolve_all_peticionesproductocra(self,info):
        return PeticionesProductoCra.objects.all().exclude(estado=3).order_by("estado")

    def resolve_categoriapeticionesproductocra(self,info,idcat):
        return PeticionesProductoCra.objects.filter(idcategoria=CategoriaProductoCra.objects.get(pk=idcat))

    def resolve_peticionesproductocra(self,info,idprofe):
        return PeticionesProductoCra.objects.filter(idprofesor=Usuario.objects.get(pk=idprofe)).order_by("estado")




    all_categoriaslibroscra=graphene.List(CategoriaLibrosCraType)

    def resolve_all_categoriaslibroscra(self,info):
        return CategoriaLibrosCra.objects.all()

    all_libroscra=graphene.List(LibrosCraType)
    categoria_libroscra=graphene.List(LibrosCraType, idcat=graphene.Int())

    def resolve_all_libroscra(self,info):
        return LibrosCra.objects.all().order_by("nombre")
    
    def resolve_categoria_libroscra(self,info,idcat):
        return LibrosCra.objects.filter(idcategoria=CategoriaLibrosCra.objects.get(pk=idcat))

    all_peticioneslibroscra=graphene.List(PeticionesLibrosCraType)
    categoriapeticioneslibroscra=graphene.List(PeticionesLibrosCraType, idcat=graphene.Int())
    peticioneslibroscra=graphene.List(PeticionesLibrosCraType,idprofe=graphene.Int())

    def resolve_all_peticioneslibroscra(self,info):
        return PeticionesLibrosCra.objects.all().exclude(estado=3).order_by("estado")

    def resolve_categoriapeticioneslibroscra(self,info,idcat):
        return PeticionesLibrosCra.objects.filter(idcategoria=CategoriaLibrosCra.objects.get(pk=idcat))


    all_matriculas=graphene.List(MatriculaAlumnoType)

    def resolve_all_matriculas(self,info):
        return MatriculaAlumno.objects.all().exclude(entramite=1)

    all_seccionesmatriculas=graphene.List(MatriculaSeccionPersonalizadaType)

    def resolve_all_seccionesmatriculas(self,info):
        return MatriculaSeccionPersonalizada.objects.all().order_by("id")


################################


class CrearSalas(graphene.Mutation):

    class Arguments:
        nombre= graphene.String(required=True)
    
    ok= graphene.Boolean()
    error= graphene.String()

    def mutate(self, info, nombre):

        try:
            registro=Salas()
            registro.nombre=nombre
            registro.save()
            return CrearSalas(ok=True)
        except Exception as e:
            return CrearSalas(ok=False,error=e)

class CrearSalasPedidas(graphene.Mutation):

    class Arguments:
        idprofesor=graphene.Int(required=True)
        idsala= graphene.Int(required=True)
        idhorario= graphene.Int(required=True)
        idasignatura= graphene.Int(required=True)
        idcurso= graphene.Int(required=True)
        fecha= graphene.String(required=True)
        numero= graphene.Int(required=True)
        objetivo= graphene.String()

    ok= graphene.Boolean()
    error= graphene.String()

    def mutate(self, info, idprofesor,idsala,idhorario,idasignatura,idcurso,fecha,numero,objetivo):

        try:
            registro=SalasPedidas()
            registro.idProfesor=Usuario.objects.get(pk=idprofesor)
            registro.idSala=Salas.objects.get(pk=idsala)
            registro.idhorario=Horarios.objects.get(pk=idhorario)
            
            registro.idAsignatura=Asignaturas.objects.get(pk=idasignatura)
                
            registro.idCurso=Cursos.objects.get(pk=idcurso)
            registro.fechaPeticion=fecha
            registro.numeroAprendizaje=numero
            registro.objetivoAprendizaje=objetivo

                
            if SalasPedidas.objects.filter(Q(fechaPeticion=fecha) & Q(idSala=Salas.objects.get(pk=idsala)) & Q(idhorario=Horarios.objects.get(pk=idhorario))).exists():
                return CrearSalasPedidas(ok=False,error="Ya existe")
            else:
                registro.save()

            return CrearSalasPedidas(ok=True)

        except Exception as e:
            return CrearSalasPedidas(ok=False,error=e)

class EliminarSalasPedidas(graphene.Mutation):

    class Arguments:
        idpeticion=graphene.Int(required=True)

    ok= graphene.Boolean()
    error= graphene.String()

    def mutate(self, info, idpeticion):

        try:
            registro=SalasPedidas.objects.get(pk=idpeticion)
            registro.delete()
            

            return EliminarSalasPedidas(ok=True)

        except Exception as e:
            return EliminarSalasPedidas(ok=False,error=e)

class NoticiasDelete(graphene.Mutation):

    class Arguments:
        id = graphene.Int(required=True)
    
    success = graphene.Boolean()
    error = graphene.String()
    def mutate(self, info, id):

        try:
            registro= Noticias.objects.get(pk=id)
            registro.delete()
            return NoticiasDelete(success=True)
        except Exception as e:
            print(e)
            return NoticiasDelete(success=False, error=e)

class NoticiasEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int(required= True)
        titulo= graphene.String()
        contenido= graphene.String()
        autor= graphene.Int()

    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self, info, id, titulo, contenido, autor):

        try:
            registro = Noticias.objects.get(pk=id)
            if titulo:
                registro.titulo= titulo
            if contenido:
                registro.contenido= contenido
            if autor:
                registro.autor= Usuario.objects.get(pk=autor)

            registro.save()
            return NoticiasEdit(success=True)

        except Exception as e:
            print(e)
            return NoticiasEdit(success=False, error=e)
            

class UsuariosCreate(graphene.Mutation):

    class Arguments:
        perfil= graphene.Int(required=True)
        user= graphene.String(required=True)
        email= graphene.String(required=True)
        password= graphene.String(required=True)
        huella= graphene.String()
    
    ok= graphene.Boolean()
    error= graphene.String()
    def mutate(self, info, perfil, user, email, password,huella):

        try:
            registro= Usuario()
            registro.perfil=Perfiles.objects.get(pk=perfil)
            registro.user=user
            if Usuario.objects.filter(email=email).exists() == False:
                registro.email=email
                registro.password= make_password(password)
                registro.huella= huella
                registro.save()
                return UsuariosCreate(ok=True)
            
            return UsuariosCreate(ok=False, error="Email ya existe")
            
        except Exception as e:
             print(e)
             return UsuariosCreate(ok=False, error=e)

class UsuariosEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int()
        perfil= graphene.Int()
        user= graphene.String()
        email= graphene.String()
        password= graphene.String()
    
    ok= graphene.Boolean()
    error= graphene.String()
    def mutate(self, info, id,perfil,email, user, password):
        #info es las variables request como sesion.id
        try:
            registro= Usuario.objects.get(pk=id)
            if perfil:
                registro.perfil=Perfiles.objects.get(pk=perfil)
            if user:
                registro.user=user
            if password:
                registro.password= make_password(password)
            if email:
                registro.email=email

            registro.save()

            return UsuariosEdit(ok=True)
            
        except Exception as e:
             print(e)
             return UsuariosEdit(ok=False, error=e)
class UsuariosDelete(graphene.Mutation):

    class Arguments:
        id= graphene.Int(required=True)
    
    ok= graphene.Boolean()
    error= graphene.String()

    def mutate(self, info, id):

        try:
            registro= Usuario.objects.get(pk=id)

            registro.delete()
            
            return UsuariosDelete(ok=True)
            
        except Exception as e:
             print(e)
             return UsuariosDelete(ok=False, error=e)



class SalasEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int()
        nombre = graphene.String()
        publica=graphene.Int()
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id,nombre,publica):
        try:
            registro=Salas.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            if publica>=0:
                registro.publica=publica
            registro.save()
            return SalasEdit(ok=True)
            

        except Exception as e:
            print(e)
            return SalasEdit(ok=False, error=e)

class SalasCreate(graphene.Mutation):

    class Arguments:
        nombre = graphene.String(required=True)
        publica = graphene.Int()
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,nombre,publica):
        try:
            registro=Salas()
            registro.nombre=nombre
            registro.publica=publica
            registro.save()
            return SalasCreate(ok=True)

        except Exception as e:
            print(e)
            return SalasCreate(ok=False, error=e)

class SalasDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id):
        try:
            registro=Salas.objects.get(pk=id)
            registro.delete()
            return SalasDelete(ok=True)

        except Exception as e:
            print(e)
            return SalasDelete(ok=False, error=e)

class HorariosEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int()
        horainicio = graphene.String()
        horafinal = graphene.String()
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id,horainicio,horafinal):
        try:
            registro=Horarios.objects.get(pk=id)
            if horainicio:
                registro.horainicio=horainicio
            if horafinal:
                registro.horafinal=horafinal
            registro.save()
            return HorariosEdit(ok=True)
            

        except Exception as e:
            print(e)
            return HorariosEdit(ok=False, error=e)

class HorariosCreate(graphene.Mutation):

    class Arguments:
        horainicio = graphene.String(required=True)
        horafinal= graphene.String(required=True)
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,horainicio,horafinal):
        try:
            registro=Horarios()
            registro.horainicio=horainicio
            registro.horafinal=horafinal

            paorden=Horarios.objects.all()
            maximo=0
            for x in paorden:
                if x.orden>maximo:
                    maximo=x.orden
            registro.orden=maximo+1
            registro.save()
            return HorariosCreate(ok=True)

        except Exception as e:
            print(e)
            return HorariosCreate(ok=False, error=e)

class HorariosDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id):
        try:
            registro=Horarios.objects.get(pk=id)
            registro.delete()
            return HorariosDelete(ok=True)

        except Exception as e:
            print(e)
            return HorariosDelete(ok=False, error=e)

class AsignaturasEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int()
        nombre = graphene.String()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id,nombre):
        try:
            registro=Asignaturas.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            registro.save()
            return AsignaturasEdit(ok=True)
            

        except Exception as e:
            print(e)
            return AsignaturasEdit(ok=False, error=e)

class AsignaturasCreate(graphene.Mutation):

    class Arguments:
        nombre = graphene.String(required=True)
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=Asignaturas()
            registro.nombre=nombre
            registro.save()
            return AsignaturasCreate(ok=True)

        except Exception as e:
            print(e)
            return AsignaturasCreate(ok=False, error=e)

class AsignaturasDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id):
        try:
            registro=Asignaturas.objects.get(pk=id)
            registro.delete()
            return AsignaturasDelete(ok=True)

        except Exception as e:
            print(e)
            return AsignaturasDelete(ok=False, error=e)

class CursosEdit(graphene.Mutation):

    class Arguments:
        id= graphene.Int()
        nombre = graphene.String()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id,nombre):
        try:
            registro=Cursos.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            registro.save()
            return CursosEdit(ok=True)
            

        except Exception as e:
            print(e)
            return CursosEdit(ok=False, error=e)

class CursosCreate(graphene.Mutation):

    class Arguments:
        nombre = graphene.String(required=True)
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=Cursos()
            registro.nombre=nombre
            registro.save()
            return CursosCreate(ok=True)

        except Exception as e:
            print(e)
            return CursosCreate(ok=False, error=e)

class CursosDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        
    success= graphene.Boolean()
    error= graphene.String()
    def mutate(self,info,id):
        try:
            registro=Cursos.objects.get(pk=id)
            registro.delete()
            return CursosDelete(ok=True)

        except Exception as e:
            print(e)
            return CursosDelete(ok=False, error=e)

class AsignarAsignaturaCreate(graphene.Mutation):

    class Arguments:
        idprofe=graphene.Int()
        idasignatura=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idprofe,idasignatura):

        try:
            registro=AsignaturasAsignadas()
            registro.idprofe=Usuario.objects.get(pk=idprofe)
            registro.idasignatura=Asignaturas.objects.get(pk=idasignatura)

            registro.save()
            return AsignarAsignaturaCreate(success=True)

        except Exception as e:
            print(e)
            return AsignarAsignaturaCreate(success=False,error=e)

class AsignarAsignaturaDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):

        try:
            registro=AsignaturasAsignadas.objects.get(pk=id)
            registro.delete()
            
            return AsignarAsignaturaDelete(success=True)
            
        except Exception as e:
            print(e)
            return AsignarAsignaturaDelete(success=False,error=e)


class ImagenCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        imagen = Upload(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, imagen,nombre):
        try:
            #info.context.FILES.get(imagen) 
            #imgencini = info.context.FILES.get(imagen)

            print("miguel",flush=True)
            print(imagen, flush=True)

            if imagen == {}:
                return ImagenCreate(success=False, error = "No se ha subido ninguna imagen")

            registro = Imagen()
            registro.nombre = nombre
            registro.imagen = imagen
            registro.save()

            return ImagenCreate(success=True)

        except Exception as e:
            print(e)
            return ImagenCreate(success=False, error = e)

class ImagenDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Imagen.objects.get(pk=id)
            registro.delete()
            return ImagenDelete(success=True)

        except Exception as e:
            print(e)
            return ImagenDelete(success=False, error = e)

class ImpresionCreate(graphene.Mutation):
    class Arguments:
        idprofe = graphene.Int(required=True)
        cursodestinado = graphene.Int(required=True)
        asignatura= graphene.Int(required=True)
        archivo= Upload()
        fechapeticion=graphene.String(required=True)
        
        cantidadimpresion=graphene.Int(required=True)
        estado= graphene.Int(required=True)
        cordinador=graphene.Int()
        tamanohoja=graphene.Int(required=True)
        doblecara=graphene.Boolean(required=True)
        razon=graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, idprofe,cursodestinado,asignatura,archivo,fechapeticion,cantidadimpresion,estado,cordinador,tamanohoja,doblecara,razon):
        try:
            registro=PeticionesImpresion()
            registro.datosProfesor=Usuario.objects.get(pk=idprofe)
            registro.cursoDestinado=Cursos.objects.get(pk=cursodestinado)
            registro.asignatura=Asignaturas.objects.get(pk=asignatura)
            if archivo:
                registro.archivo=archivo
            registro.fechaPeticion=fechapeticion

            
            registro.cantidadImpresion=cantidadimpresion
            registro.estado=estado
            if cordinador!=0:
                registro.cordinador=Usuario.objects.get(pk=cordinador)
           
            registro.tamanohoja=tamanohoja
            registro.doblecara=doblecara
            registro.razon=razon

            titulo="Solicitud Impresion"
            mensaje=f"El profesor {registro.datosProfesor} ha solicitado impresiones para {registro.cursoDestinado}"
        
            if str(registro.cursoDestinado).find("Medio"):
                lista=["cplec.basica@lecentral.cl","cplec.media@lecentral.cl"]
                #lista=["daviddantesalinas@gmail.com","aeramus99@gmail.com"]
            else:
                #lista=["daviddantesalinas@gmail.com"]
                lista["cplec.basica@lecentral.cl "]

            emisor=settings.EMAIL_HOST_USER

            if datetime.now().hour >=17:
                registro.estado=1
            else:
                registro.estado=2
                send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",lista)

            registro.save()
            return ImpresionCreate(success=True)

        except Exception as e:
            print(e)
            return ImpresionCreate(success=False, error = e)

class ImpresionEdit(graphene.Mutation):
    class Arguments:
        numeroConsulta = graphene.Int(required=True)
        fechaaceptada=graphene.String()
        fechaentregada=graphene.String()
        estado= graphene.Int()
        cordinador=graphene.Int()
        razon=graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, numeroConsulta,fechaaceptada,fechaentregada,estado,cordinador,razon):
        try:
            registro=PeticionesImpresion.objects.get(pk=numeroConsulta)

            if fechaaceptada:
                registro.fechaEstimadaImpresion=fechaaceptada

            if fechaentregada:
                registro.fechaImpresionEntregada=fechaentregada

            if estado:
                titulo="Solicitud Impresion"
                mensaje=""
                lista=[registro.datosProfesor.email]
                emisor=settings.EMAIL_HOST_USER
                if estado==3:
                    mensaje=f"Han Aprobado tu solicitud de impresion para {registro.cursoDestinado}"
                    send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",lista)
                elif estado==4:
                    mensaje=f"Han Rechazado tu solicitud de impresion para {registro.cursoDestinado} razon: {razon}"
                    send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",lista)
                    registro.archivo.delete()
                elif estado==5:
                    mensaje=f"Han Impreso tu solicitud de impresion para {registro.cursoDestinado}"
                    send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",lista)
                    registro.archivo.delete()

                

                registro.estado=estado

            if cordinador:
                registro.cordinador=Usuario.objects.get(pk=cordinador)

            if razon:
                registro.razon=razon
                
            registro.save()
            return ImpresionEdit(success=True)

        except Exception as e:
            print(e)
            return ImpresionEdit(success=False, error = e)
class ImpresionDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro=PeticionesImpresion.objects.get(pk=id)
            registro.estado=0
            registro.archivo.delete()
            return ImpresionDelete(success=True)

        except Exception as e:
            print(e)
            return ImpresionDelete(success=False, error = e)

class NoticiasFrontCreate(graphene.Mutation):
    class Arguments:
        titulo=graphene.String(required=True)
        portada=Upload()
        encabezado=graphene.String(required=True)
        contenido=graphene.String(required=True)
        fecha=graphene.String(required=True)
        creador=graphene.Int(required=True)
        interno=graphene.Int()
    
    success= graphene.Boolean()
    error= graphene.String()
    
    def mutate(self,info,titulo,interno,portada,encabezado,contenido,fecha,creador):

        try:
            registro=NoticiasFront()
            registro.titulo=titulo
            registro.portada=portada
            registro.encabezado=encabezado
            registro.contenido=contenido
            registro.fecha=fecha
            registro.interno=interno
            registro.creador=Usuario.objects.get(pk=creador)

            registro.save()
            return NoticiasFrontCreate(success=True)
        except Exception as e:
            print(e)
            return NoticiasFrontCreate(success=False,error=e)

class NoticiasFrontEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        encabezado=graphene.String()
        contenido=graphene.String()
        fecha=graphene.String()
        activo=graphene.Int()
        interno=graphene.Int()


    success=graphene.Boolean()
    error=graphene.String()

    def mutate(self,info,id,interno,encabezado,contenido,fecha,activo):

        try:
            registro=NoticiasFront.objects.get(pk=id)
            if contenido:
                registro.contenido=contenido
            if encabezado:
                registro.encabezado=encabezado
            if contenido:
                registro.contenido=contenido
            if fecha:
                registro.fecha=fecha
            if interno!=0:
                registro.interno=interno
                
            if activo==0:
                registro.activo=False
            else:
                registro.activo=True
            
            
            registro.save()
            return NoticiasFrontEdit(success=True)
        except  Exception as e:
            return NoticiasFrontEdit(success=False,error=e)
class NoticiasFrontDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()

    def mutate(self,info,id):

        try:
            registro=NoticiasFront.objects.get(pk=id)
            registro.delete()
            return NoticiasFrontDelete(success=True)
        except  Exception as e:
            return NoticiasFrontDelete(success=False,error=e)

class TemaHabladoCreate(graphene.Mutation):

    class Arguments:
        nombre=graphene.String(required=True)
        activo=graphene.Boolean(required=False)
        
    
    success= graphene.Boolean()
    error= graphene.String()
    
    def mutate(self,info,nombre,activo):

        try:
            registro=TemaHablado()
            registro.nombre=nombre
            if activo:
                registro.activo=activo


            registro.save()
            return TemaHabladoCreate(success=True)
        except Exception as e:
            print(e)
            return TemaHabladoCreate(success=False,error=e)

class TemaHabladoEdit(graphene.Mutation):

    class Arguments:
        id=graphene.Int(required=True)
        nombre=graphene.String()
        activo=graphene.String(required=False)
        
    
    success= graphene.Boolean()
    error= graphene.String()
    
    def mutate(self,info,id,nombre,activo):

        try:
            registro=TemaHablado.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            if activo=="true":
                registro.activo=True
            elif activo=="false":
                registro.activo=False

            registro.save()
            return TemaHabladoCreate(success=True)
        except Exception as e:
            print(e)
            return TemaHabladoCreate(success=False,error=e)

class TemaHabladoDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int(required=True)

        
    
    success= graphene.Boolean()
    error= graphene.String()
    
    def mutate(self,info,id):

        try:
            registro=TemaHablado.objects.get(pk=id)
            registro.delete()
            return TemaHabladoDelete(success=True)
        except Exception as e:
            print(e)
            return TemaHabladoDelete(success=False,error=e)

class OpinionCreate(graphene.Mutation):

    class Arguments:
        tema=graphene.Int(required=True)
        profesor=graphene.Int(required=True)
        contenido=graphene.String(required=True)
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,tema,profesor,contenido):
        try:
            registro=OpinionesProfesores()
            registro.tema=TemaHablado.objects.get(pk=tema)
            registro.profesor=Usuario.objects.get(pk=profesor)
            registro.contenido=contenido
            registro.save()
            return OpinionCreate(success=True)
        except Exception as e:
            return OpinionCreate(success=False,error=e)

class OpinionEdit(graphene.Mutation):

    class Arguments:
        id=graphene.Int(required=True)
        profesor=graphene.Int()
        tema=graphene.Int()
        contenido=graphene.String()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,tema,id,profesor,contenido):
        try:
            registro=OpinionesProfesores.objects.get(pk=id)
            if tema:
                registro.tema=TemaHablado.objects.get(pk=tema)
            if profesor:
                registro.profesor=Usuario.objects.get(pk=profesor)
            if contenido:
                registro.contenido=contenido
            
            registro.save()
            return OpinionEdit(success=True)
        except Exception as e:
            return OpinionEdit(success=False,error=e)

class OpinionDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int(required=True)

        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=OpinionesProfesores.objects.get(pk=id)
            registro.delete()
           
            return OpinionDelete(success=True)
        except Exception as e:
            return OpinionDelete(success=False,error=e)

class HuellaAlumnoCreate(graphene.Mutation):
    class Arguments:
        rut=graphene.String()
        nombre=graphene.String()
        correo=graphene.String()
        curso=graphene.String()
        junaeb=graphene.String()
        huella=graphene.String()
        
    
    success=graphene.Boolean()
    error=graphene.String()

    def mutate(self,info,rut,nombre,correo,curso,junaeb,huella):
        try:
            registro=HuellaAlumno()
            registro.rut=rut
            registro.nombre=nombre
            if correo:
                registro.correo=correo
            if curso:
                registro.curso=Cursos.objects.get(pk=int(curso))
            if junaeb=="True":
                registro.junaeb=True
            elif junaeb=="False":
                registro.junaeb=False
            registro.huella=huella
            registro.save()
            return HuellaAlumnoCreate(success=True)
        except Exception as e:
            return HuellaAlumnoCreate(success=False,error=e)

class HuellaAlumnoEdit(graphene.Mutation):
    class Arguments:
        id=graphene.String()
        rut=graphene.String()
        nombre=graphene.String()
        correo=graphene.String()
        curso=graphene.String()
        junaeb=graphene.String()
        huella=graphene.String()
    
    success=graphene.Boolean()
    error=graphene.String()

    def mutate(self,info,id,rut,nombre,correo,curso,junaeb,huella):
        try:
            registro=HuellaAlumno.objects.get(pk=id)
            if rut:
                registro.rut=rut
            if nombre:
                registro.nombre=nombre
            if correo:
                registro.correo=correo
            if curso:
                registro.curso=Cursos.objects.get(pk=int(curso))
            if junaeb=="True":
                registro.junaeb=True
            elif junaeb=="False":
                registro.junaeb=False
            if huella:
                registro.huella=huella
            registro.save()
            return HuellaAlumnoEdit(success=True)
        except Exception as e:
            return HuellaAlumnoEdit(success=False,error=e)

class AsistenciaAlumnoCreate(graphene.Mutation):
    class Arguments:
        alumno=graphene.Int()
    
    success=graphene.Boolean()
    mess=graphene.String()
    error=graphene.String()

    def mutate(self,info,alumno):
        try:
            
            hoy=datetime.today()
            
            datos=AsitenciaAlumno.objects.filter(horaasitencias__year=hoy.year,horaasitencias__month=hoy.month,horaasitencias__day=hoy.day,alumno=HuellaAlumno.objects.get(pk=alumno))
            if datos:
                return AsistenciaAlumnoCreate(success=True,mess="Ignorando duplicado")
            registro=AsitenciaAlumno()
            registro.alumno=HuellaAlumno.objects.get(pk=alumno)
            registro.horaasitencias=hoy
            if((registro.horaasitencias.hour>=8 and registro.horaasitencias.minute>=1) or registro.horaasitencias.hour>=9):
                registro.atrasoresuelto==True #esto es que esta asistencia esta atrasada
            registro.save()
            return AsistenciaAlumnoCreate(success=True)
        except Exception as e:
            return AsistenciaAlumnoCreate(success=False,error=e)

class AsistenciaAlumnoManual(graphene.Mutation):
    
    class Arguments:
        alumno=graphene.Int()
        fecha=graphene.String()
        atraso=graphene.String()
    success=graphene.Boolean()
    mess=graphene.String()
    error=graphene.String()

    def mutate(self,info,alumno,fecha,atraso):
        try:
            
            time= datetime.strptime(fecha, "%Y-%m-%d %H:%M:%S")
            
            datos=AsitenciaAlumno.objects.filter(horaasitencias__date=time,alumno=HuellaAlumno.objects.get(pk=alumno)).exists()
            if datos:
                return AsistenciaAlumnoManual(success=True,mess=datos)

            registro=AsitenciaAlumno()
            registro.alumno=HuellaAlumno.objects.get(pk=alumno)
            
            registro.horaasitencias=time
            if atraso=="True":
                registro.atrasoresuelto=True
                #Aqui deberia ir un envio de correo 
            registro.save()
            return AsistenciaAlumnoManual(success=True)
        except Exception as e:
            return AsistenciaAlumnoManual(success=False,error=e)
class AsistenciaAlumnoEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        fecha=graphene.String()
        atraso=graphene.String()
    
    success=graphene.Boolean()
    error=graphene.String()

    def mutate(self,info,id,fecha,atraso):
        try:
            
            registro=AsitenciaAlumno.objects.get(pk=id)
            if fecha=="aprobado":
                registro.horaasitencias=registro.horaasitencias.replace(hour=7)
                registro.atrasoresuelto=False
            elif fecha:
                registro.horaasitencias=registro.horaasitencias.replace(hour=int(fecha.split(":")[0]),minute=int(fecha.split(":")[1]))
                registro.atrasoresuelto=False
            if(atraso=="True"):
                registro.atrasoresuelto=True #esto es que esta asistencia esta atrasada
            registro.save()
            return AsistenciaAlumnoEdit(success=True)
        except Exception as e:
            return AsistenciaAlumnoEdit(success=False,error=e)



class ProblemaAsistenciaCreate(graphene.Mutation):
    class Arguments:
        alumno=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,alumno):
        try:
            registro=ProblemaAsistencia()
            registro.horaproblema=datetime.now()
            registro.alumno=Huella.objects.get(pk=alumno)
            registro.save()
            return ProblemaAsistenciaCreate(success=True)
        except Exception as e:
            return ProblemaAsistenciaCreate(success=False,error=e)


class CategoriaMantencionCreate(graphene.Mutation):

    class Arguments:
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=CategoriaMantencion()
            registro.nombre=nombre
            registro.save()
            return CategoriaMantencionCreate(success=True)
        except Exception as e:
            return CategoriaMantencionCreate(success=False,error=e)

class CategoriaMantencionDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=CategoriaMantencion.objects.get(pk=id)
            registro.delete()
            return CategoriaMantencionDelete(success=True)
        except Exception as e:
            return CategoriaMantencionDelete(success=False,error=e)

class MantencionCreate(graphene.Mutation):

    class Arguments:
        categoria=graphene.Int()
        prioridad=graphene.Int()
        tipoobra=graphene.Int()
        imagen=Upload()
        texto=graphene.String()
        
        
    success=graphene.Boolean()
    msg=graphene.String()
    error=graphene.String()
    def mutate(self,info,categoria,prioridad,tipoobra,imagen,texto):
        try:
            registro=Mantencion()
            registro.estado=1
            registro.categoria=CategoriaMantencion.objects.get(pk=categoria)
            registro.prioridad=prioridad
            registro.tipoobra=tipoobra
            if imagen:
                registro.imagen=imagen
            
            registro.texto=texto
            registro.fechaemision=datetime.now()
            registro.save()
            return MantencionCreate(success=True, msg=registro.id)
        except Exception as e:
            return MantencionCreate(success=False,error=e)

class MantencionEdit(graphene.Mutation):

    class Arguments:
        id=graphene.Int()
        estado=graphene.Int()
        
    success=graphene.Boolean()

    error=graphene.String()
    def mutate(self,info,id,estado):
        try:
            registro=Mantencion.objects.get(pk=id)
            registro.estado=estado
            registro.save()
            return MantencionEdit(success=True)
        except Exception as e:
            return MantencionEdit(success=False,error=e)

class MantencionDelete(graphene.Mutation):

    class Arguments:
        id=graphene.Int()

        
        
    success=graphene.Boolean()

    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=Mantencion.objects.get(pk=id)

            registro.delete()
            return MantencionDelete(success=True)
        except Exception as e:
            return MantencionDelete(success=False,error=e)

class RecursosCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        cantidad=graphene.Int()
        costoaprox=graphene.Int()
        mantencion=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,cantidad,costoaprox,mantencion):
        try:
            registro=RecursosMantencion()
            registro.nombre=nombre
            registro.cantidad=cantidad
            registro.costoaprox=costoaprox
            registro.mantencion=Mantencion.objects.get(pk=mantencion)
            registro.save()
            return RecursosCreate(success=True)
        except Exception as e:
            return RecursosCreate(success=False,error=e)

class CategoriaProductoCraCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=CategoriaProductoCra()
            registro.nombre=nombre
            registro.save()
            return CategoriaProductoCraCreate(success=True)
        except Exception as e:
            return CategoriaProductoCraCreate(success=False,error=e)

class CategoriaProductoCraDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=CategoriaProductoCra.objects.get(pk=id)
            registro.delete()
            return CategoriaProductoCraDelete(success=True)
        except Exception as e:
            return CategoriaProductoCraDelete(success=False,error=e)
class CategoriaProductoCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,id):
        try:
            registro=CategoriaProductoCra.objects.get(pk=id)
            registro.nombre=nombre
            registro.save()
        except Exception as e:
            return CategoriaProductoCraEdit(success=False,error=e)

class ProductoCraCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        cantidad=graphene.Int()
        limitecantidad=graphene.Int()
        imagen=Upload()
        descripcion=graphene.String()
        idcategoria=graphene.Int()
        posicion=graphene.String()
        codigobarra=graphene.String()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,imagen,nombre,cantidad,limitecantidad,descripcion,idcategoria,posicion,codigobarra):
        try:
            registro=ProductoCra()
            registro.nombre=nombre
            registro.cantidad=cantidad
            registro.limitecantidad=limitecantidad
            if imagen:
                registro.imagen=imagen

            registro.descripcion=descripcion
            registro.infinito=0
            registro.Activo=1
            registro.idcategoria=CategoriaProductoCra.objects.get(pk=idcategoria)
            registro.posicion=posicion
            registro.codigobarra=codigobarra
            registro.vecespedido=0
            registro.save()
            return ProductoCraCreate(success=True)

        except Exception as e:
            return ProductoCraCreate(success=False,error=e)

class ProductoCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        nombre=graphene.String()
        cantidad=graphene.Int()
        limitecantidad=graphene.Int()
        img=Upload()
        descripcion=graphene.String()
        idcategoria=graphene.Int()
        posicion=graphene.String()
        codigobarra=graphene.String()
        vecespedido=graphene.Int()
        
    def mutate(self,info,id,nombre,cantidad,limitecantidad,img,descripcion,idcategoria,posicion,codigobarra,vecespedido):
        try:
            registro=ProductoCra.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            if cantidad:
                registro.cantidad=cantidad
            if limitecantidad:
                registro.limitecantidad=limitecantidad
            
            if img:
                registro.img=img
            if descripcion:
                registro.descripcion=descripcion
            
            registro.infinito=0
            registro.activo=1
            if idcategoria:
                registro.idcategoria=CategoriaProductoCra.objects.get(pk=idcategoria)
            if posicion:
                registro.posicion=posicion
            if codigobarra:
                registro.codigobarra=codigobarra
            if vecespedido:
                registro.vecespedido+=1
            
            registro.save()
            return ProductoCraCreate(success=True)
        except Exception as e:
            return ProductoCraCreate(success=False,error=e)

class ProductoCraMicroEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        visible=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
        
    def mutate(self,info,id,visible):
        try:
            registro=ProductoCra.objects.get(pk=id)
            registro.Activo=visible
            registro.save()
            return ProductoCraMicroEdit(success=True)
        except Exception as e:
            return ProductoCraMicroEdit(success=False,error=e)


class ProductoCraDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=ProductoCra.objects.get(pk=id)
            registro.delete()
            return ProductoCraDelete(success=True)
        except Exception as e:
            return ProductoCraDelete(success=False,error=e)

class PeticionesProductoCraCreate(graphene.Mutation):
    class Arguments:
        estado=graphene.Int()
        cantidad=graphene.Int()
        idproducto=graphene.Int()
        
        idprofesor=graphene.Int()
    success=graphene.Boolean()
    msg=graphene.String()
    error=graphene.String()
    def mutate(self,info,estado,cantidad,idproducto,idprofesor):
        try:
            
            registro=PeticionesProductoCra()
            registro.estado=estado
            registro.cantidad=cantidad
            registro.idproducto=ProductoCra.objects.get(pk=idproducto)
            
            registro.idprofesor=HuellaAlumno.objects.get(pk=idprofesor)
            registro.fechapeticion=datetime.now()
            cantidad=registro.idproducto.cantidad
            peticiones=PeticionesProductoCra.objects.filter(idproducto=idproducto).exclude(estado=3)
            for x in peticiones:
                cantidad-=x.cantidad
            if(cantidad<=0):
                return PeticionesProductoCraCreate(success=True, msg="No Disponible")  

            registro.save()
            return PeticionesProductoCraCreate(success=True)            
        except Exception as e:
            return PeticionesProductoCraCreate(success=False,error=e)

class PeticionesProductoCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        estado=graphene.Int()
        

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id,estado):
        try:
            registro=PeticionesProductoCra.objects.get(pk=id)
            registro.estado=estado
            registro.fechadevolucion=datetime.now()
            registro.save()
            return PeticionesProductoCraEdit(success=True)            
        except Exception as e:
            return PeticionesProductoCraEdit(success=False,error=e)

class PeticionesProductoCraEditSoft(graphene.Mutation):
    class Arguments:
        idhuella=graphene.Int()
        idlibro=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idhuella,idlibro):
        try:
            registro=PeticionesProductoCra.objects.filter(idproducto=idlibro,idprofesor=idhuella).exclude(estado=3).order_by("-estado")[0]
            registro.estado=3
            registro.fechadevolucion=datetime.now()
            registro.save()
            return PeticionesProductoCraEditSoft(success=True)            
        except Exception as e:
            return PeticionesProductoCraEditSoft(success=False,error=e)

##############################################LIBROS#################################################
class CategoriaLibrosCraCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=CategoriaLibrosCra()
            registro.nombre=nombre
            registro.save()
            return CategoriaLibrosCraCreate(success=True)
        except Exception as e:
            return CategoriaLibrosCraCreate(success=False,error=e)

class CategoriaLibrosCraDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=CategoriaLibrosCra.objects.get(pk=id)
            registro.delete()
            return CategoriaLibrosCraDelete(success=True)
        except Exception as e:
            return CategoriaLibrosCraDelete(success=False,error=e)
class CategoriaLibrosCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,id):
        try:
            registro=CategoriaLibrosCra.objects.get(pk=id)
            registro.nombre=nombre
            registro.save()
        except Exception as e:
            return CategoriaLibrosCraEdit(success=False,error=e)

class LibrosCraCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        cantidad=graphene.Int()
        autor=graphene.String()
        limitecantidad=graphene.Int()
        imagen=Upload()
        descripcion=graphene.String()
        idcategoria=graphene.Int()
        posicion=graphene.String()
        codigobarra=graphene.String()

    success=graphene.Boolean()
    msg= graphene.String()
    error=graphene.String()
    def mutate(self,info,imagen,nombre,cantidad,limitecantidad,descripcion,idcategoria,posicion,codigobarra,autor):
        try:

            if LibrosCra.objects.filter(codigobarra=codigobarra).exists():
                return LibrosCraCreate(success=True, msg="Codigo De Barra Existente") 
                
            registro=LibrosCra()
            registro.nombre=nombre
            registro.cantidad=cantidad
            registro.autor=autor
            registro.limitecantidad=limitecantidad
            if imagen:
                registro.imagen=imagen

            registro.descripcion=descripcion
            registro.infinito=0
            registro.Activo=1
            registro.idcategoria=CategoriaLibrosCra.objects.get(pk=idcategoria)
            registro.posicion=posicion
            
            registro.codigobarra=codigobarra
            registro.vecespedido=0
            registro.save()
            return LibrosCraCreate(success=True)

        except Exception as e:
            return LibrosCraCreate(success=False,error=e)

class LibrosCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        nombre=graphene.String()
        cantidad=graphene.Int()
        limitecantidad=graphene.Int()
        autor=graphene.String()
        img=Upload()
        descripcion=graphene.String()
        idcategoria=graphene.Int()
        posicion=graphene.String()
        codigobarra=graphene.String()
        vecespedido=graphene.Int()
        
    def mutate(self,info,id,nombre,cantidad,limitecantidad,img,descripcion,idcategoria,posicion,codigobarra,vecespedido,autor):
        try:
            registro=LibrosCra.objects.get(pk=id)
            if nombre:
                registro.nombre=nombre
            if autor:
                registro.autor=autor
            if cantidad:
                registro.cantidad=cantidad
            if limitecantidad:
                registro.limitecantidad=limitecantidad
            
            if img:
                registro.img=img
            if descripcion:
                registro.descripcion=descripcion
            
            registro.infinito=0
            registro.activo=1
            if idcategoria:
                registro.idcategoria=CategoriaLibrosCra.objects.get(pk=idcategoria)
            if posicion:
                registro.posicion=posicion
            if codigobarra:
                registro.codigobarra=codigobarra
            if vecespedido:
                registro.vecespedido+=1
            
            registro.save()
            return LibrosCraEdit(success=True)
        except Exception as e:
            return LibrosCraEdit(success=False,error=e)

class LibrosCraMicroEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        visible=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
        
    def mutate(self,info,id,visible):
        try:
            registro=LibrosCra.objects.get(pk=id)
            registro.Activo=visible
            registro.save()
            return LibrosCraMicroEdit(success=True)
        except Exception as e:
            return LibrosCraMicroEdit(success=False,error=e)


class LibrosCraDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=LibrosCra.objects.get(pk=id)
            registro.delete()
            return LibrosCraDelete(success=True)
        except Exception as e:
            return LibrosCraDelete(success=False,error=e)

class PeticionesLibrosCraCreate(graphene.Mutation):
    class Arguments:
        estado=graphene.Int()
        cantidad=graphene.Int()
        idproducto=graphene.Int()
        idprofesor=graphene.Int()
    success=graphene.Boolean()
    msg=graphene.String()
    error=graphene.String()
    def mutate(self,info,estado,cantidad,idproducto,idprofesor):
        try:
            
            registro=PeticionesLibrosCra()
            registro.estado=estado
            registro.cantidad=cantidad
            registro.idproducto=LibrosCra.objects.get(pk=idproducto)
            
            registro.idhuella=HuellaAlumno.objects.get(pk=idprofesor)
            registro.fechapeticion=datetime.now()
            cantidad=registro.idproducto.cantidad
            peticiones=PeticionesLibrosCra.objects.filter(idproducto=idproducto).exclude(estado=3)
            for x in peticiones:
                cantidad-=x.cantidad
            if(cantidad<=0):
                return PeticionesLibrosCraCreate(success=True, msg="No Disponible")  

            registro.save()
            return PeticionesLibrosCraCreate(success=True, msg="Pedido")            
        except Exception as e:
            return PeticionesLibrosCraCreate(success=False,error=e)

class PeticionesLibrosCraEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        estado=graphene.Int()
        

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id,estado):
        try:
            registro=PeticionesLibrosCra.objects.get(pk=id)
            registro.estado=estado
            registro.fechadevolucion=datetime.now()
            registro.save()
            return PeticionesLibrosCraEdit(success=True)            
        except Exception as e:
            return PeticionesLibrosCraEdit(success=False,error=e)

class PeticionesLibrosCraEditSoft(graphene.Mutation):
    class Arguments:
        idhuella=graphene.Int()
        idlibro=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idhuella,idlibro):
        try:
            registro=PeticionesLibrosCra.objects.filter(idproducto=idlibro,idhuella=idhuella).exclude(estado=3).order_by("-estado")[0]
            registro.estado=3
            registro.fechadevolucion=datetime.now()
            registro.save()
            return PeticionesLibrosCraEditSoft(success=True)            
        except Exception as e:
            return PeticionesLibrosCraEditSoft(success=False,error=e)


class AsignarHuellaProfesor(graphene.Mutation):
    class Arguments:
        idhuella=graphene.Int()
        idusuario=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idhuella,idusuario):
        try:
            
            registro=HuellaAlumno.objects.get(pk=idhuella)
            if idusuario==0:
                registro.idprofesor=None
                registro.save()
                return AsignarHuellaProfesor(success=True)
            registro.idprofesor=Usuario.objects.get(pk=idusuario)
            registro.save()
            return AsignarHuellaProfesor(success=True)
        except Exception as e:
            return AsignarHuellaProfesor(success=False,error=e)

class MatriculaSeccionPersonalizadaCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,nombre):
        try:
            registro=MatriculaSeccionPersonalizada()
            registro.nombreseccion=nombre
            registro.orden=1
            registro.save()
            return MatriculaSeccionPersonalizadaCreate(success=True,id=registro.id)
        except Exception as e:
            return MatriculaSeccionPersonalizadaCreate(success=False,error=e)

class MatriculaSeccionPersonalizadaEdit(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id,nombre):
        try:
            registro=MatriculaSeccionPersonalizada.objects.get(pk=id)
            registro.nombreseccion=nombre
            registro.orden=1
            registro.save()
            return MatriculaSeccionPersonalizadaEdit(success=True)
        except Exception as e:
            return MatriculaSeccionPersonalizadaEdit(success=False,error=e)

class MatriculaSeccionPersonalizadaDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=MatriculaSeccionPersonalizada.objects.get(pk=id)
            registro.delete()
            return MatriculaSeccionPersonalizadaDelete(success=True)
        except Exception as e:
            return MatriculaSeccionPersonalizadaDelete(success=False,error=e)

class MatriculasOpcionPersonalizadaCreate(graphene.Mutation):
    class Arguments:
        idseccion=graphene.Int()
        nombreopcion=graphene.String()
        tipodeopcion=graphene.Int()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,idseccion,nombreopcion,tipodeopcion):
        try:
            registro=MatriculasOpcionPersonalizada()
            registro.idseccion=MatriculaSeccionPersonalizada.objects.get(pk=idseccion)
            registro.nombreopcion=nombreopcion
            registro.tipodeopcion=tipodeopcion
            registro.save()
            return MatriculasOpcionPersonalizadaCreate(success=True,id=registro.id)
        except Exception as e:
            return MatriculasOpcionPersonalizadaCreate(success=False,error=e)

class MatriculasOpcionPersonalizadaEdit(graphene.Mutation):
    class Arguments:
        idopcion=graphene.Int()
        nombreopcion=graphene.String()
        tipodeopcion=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idopcion,nombreopcion,tipodeopcion):
        try:
            registro=MatriculasOpcionPersonalizada.objects.get(pk=idopcion)
            if nombreopcion:
                registro.nombreopcion=nombreopcion
            if tipodeopcion!=0:
                registro.tipodeopcion=tipodeopcion
            registro.save()
            return MatriculasOpcionPersonalizadaEdit(success=True)
        except Exception as e:
            return MatriculasOpcionPersonalizadaEdit(success=False,error=e)

class MatriculasOpcionPersonalizadaDelete(graphene.Mutation):
    class Arguments:
        idopcion=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idopcion):
        try:
            registro=MatriculasOpcionPersonalizada.objects.get(pk=idopcion)
            registro.delete()
            return MatriculasOpcionPersonalizadaDelete(success=True)
        except Exception as e:
            return MatriculasOpcionPersonalizadaDelete(success=False,error=e)

class MatriculasAlternativasOpcionCreate(graphene.Mutation):
    class Arguments:
        idopcion=graphene.Int()
        nombre=graphene.String()
        valor=graphene.String()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,idopcion,nombre,valor):
        try:
            registro=MatriculasAlternativasOpcion()
            registro.idopcion=MatriculasOpcionPersonalizada.objects.get(pk=idopcion)
            registro.nombre=nombre
            registro.valor=valor
            registro.save()
            return MatriculasAlternativasOpcionCreate(success=True,id=registro.id)
        except Exception as e:
            return MatriculasAlternativasOpcionCreate(success=False,error=e)

class MatriculasAlternativasOpcionEdit(graphene.Mutation):
    class Arguments:
        idopcion=graphene.Int()
        nombre=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idopcion,nombre):
        try:
            registro=MatriculasAlternativasOpcion.objects.get(pk=idopcion)
            registro.nombre=nombre
            registro.save()
            return MatriculasAlternativasOpcionEdit(success=True,id=registro.id)
        except Exception as e:
            return MatriculasAlternativasOpcionEdit(success=False,error=e)

class NotasCreate(graphene.Mutation):
    class Arguments:
        alumno=graphene.Int()
        asignatura=graphene.Int()
        
        n1=graphene.String()
        n2=graphene.String()
        n3=graphene.String()
        n4=graphene.String()
        n5=graphene.String()
        n6=graphene.String()
        n7=graphene.String()
        n8=graphene.String()
        n9=graphene.String()
        n10=graphene.String()
        n11=graphene.String()
        n12=graphene.String()
        n13=graphene.String()
        n14=graphene.String()
        n15=graphene.String()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,alumno,asignatura,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15):
        try:
            registro=""
            if NotasAlumno.objects.filter(Q(alumno=alumno) & Q(asignatura=asignatura)).exists():
                registro=NotasAlumno.objects.get(Q(alumno=alumno) & Q(asignatura=asignatura))
                
            else:
                registro=NotasAlumno()
                registro.alumno=HuellaAlumno.objects.get(pk=alumno)
                registro.asignatura=Asignaturas.objects.get(pk=asignatura)

            

            if n1:
                registro.n1=n1
            if n2:
                registro.n2=n2
            if n3:
                registro.n3=n3
            if n4:
                registro.n4=n4
            if n5:
                registro.n5=n5
            if n6:
                registro.n6=n6
            if n7:
                registro.n7=n7
            if n8:
                registro.n8=n8
            if n9:
                registro.n9=n9
            if n10:
                registro.n10=n10
            if n11:
                registro.n11=n11
            if n12:
                registro.n12=n12
            if n13:
                registro.n13=n13
            if n14:
                registro.n14=n14
            if n15:
                registro.n15=n15
            
            registro.save()
            return NotasCreate(success=True,id=registro.id)
        except Exception as e:
            return NotasCreate(success=False,error=e)

class NotasIndicador(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        indicador=graphene.String()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,id,indicador):
        try:
            registro=NotasAlumno.objects.get(pk=id)
            registro.indicador=indicador
            
            registro.save()
            return NotasIndicador(success=True)
        except Exception as e:
            return NotasIndicador(success=False,error=e)


######################MATRICULA#############################################
class MatriculasCreate(graphene.Mutation):
    class Arguments:
        cursodematricula=graphene.Int()
        runalumno=graphene.String()
        alumnoapellidopaterno=graphene.String()
        alumnoapellidomaterno=graphene.String()
        alumnoipe=graphene.String()
        alumnonombres=graphene.String()
        alumnonacionalidad=graphene.String()
        alumnofechanacimiento=graphene.String()
        alumnoetnia=graphene.String()
        alumnodomicilio=graphene.String()
        alumnoreligion=graphene.String()
        alumnocomuna=graphene.String()
        alumnosexo=graphene.String()
        alumnotelefono=graphene.String()
        alumnoedad=graphene.String()
        alumnovivecon=graphene.String()
        alumnocursodematricula=graphene.String()
        alumnoquienmatricula=graphene.String()
        alumnoestudiantenuevo=graphene.String()
        alumnosistemadematricula=graphene.String()
        alumnocorreoinstitucional=graphene.String()

        padreapellidos=graphene.String()
        padrerun=graphene.String()
        padrenombres=graphene.String()
        padreipa=graphene.String()
        padrenacionalidad=graphene.String()
        padrepasaporte=graphene.String()
        padredomicilio=graphene.String()
        padreestudios=graphene.String()
        padrecomuna=graphene.String()
        padreocupacion=graphene.String()
        padreapoderado=graphene.String()
        padretelefono1=graphene.String()
        padretelefono2=graphene.String()
        padreemail=graphene.String()

        madreapellidos=graphene.String()
        madrerun=graphene.String()
        madrenombres=graphene.String()
        madreipa=graphene.String()
        madrenacionalidad=graphene.String()
        madrepasaporte=graphene.String()
        madredomicilio=graphene.String()
        madreestudios=graphene.String()
        madrecomuna=graphene.String()
        madreocupacion=graphene.String()
        madreapoderado=graphene.String()
        madretelefono1=graphene.String()
        madretelefono2=graphene.String()
        madreemail=graphene.String()

        establecimientoprocedencia=graphene.String()
        ultimoyearcursado=graphene.String()
        cursosqueharepetido=graphene.String()
        perteneceinegracionescolar=graphene.String()
        optareligion=graphene.String()
        optaporuncredo=graphene.String()

        tienejuna=graphene.String()
        becaindigena=graphene.String()
        otrabeca=graphene.String()
        perteneceprogramasocial=graphene.String()
        prioritario=graphene.String()
        preferente=graphene.String()
        registrosocial=graphene.String()

        sistemasalud=graphene.String()
        consultorioocesfam=graphene.String()
        impedimentofisico=graphene.String()
        enfermedadcronica=graphene.String()
        alergico=graphene.String()
        tomamedicamentos=graphene.String()
        encasodeemergenciacomunicarsecon=graphene.String()

        conocereglamentointerno=graphene.Boolean()
        conocereglamentoevaluacion=graphene.Boolean()
        aceptaregistrohuella=graphene.Boolean()
        asistenciareligion=graphene.Boolean()
        aceptoprotocoloscovid=graphene.Boolean()

        asistiratodaslasreuniones=graphene.Boolean()
        cumplirhoradeentradaysalida=graphene.Boolean()
        justificarinasistencias=graphene.Boolean()
        revisaryresponderinfo=graphene.Boolean()
        participarenactividades=graphene.Boolean()

        firmas=graphene.String()

    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,cursodematricula,runalumno,alumnoapellidopaterno,alumnoapellidomaterno,alumnoipe
    ,alumnonombres,alumnonacionalidad,alumnofechanacimiento,alumnoetnia,alumnodomicilio,alumnoreligion,alumnocomuna,
    alumnosexo,alumnotelefono,alumnoedad,alumnovivecon,alumnoquienmatricula,alumnoestudiantenuevo,alumnosistemadematricula,
    alumnocorreoinstitucional,padreapellidos,padrerun,padrenombres,padreipa,padrenacionalidad,padrepasaporte,padredomicilio,padreestudios,
    padrecomuna,padreocupacion,padreapoderado,padretelefono1,padretelefono2,padreemail,madreapellidos,madrerun,
    madrenombres,madreipa,madrenacionalidad,madrepasaporte,madredomicilio,madreestudios,madrecomuna,madreocupacion,
    madreapoderado,madretelefono1,madretelefono2,madreemail,establecimientoprocedencia,ultimoyearcursado,cursosqueharepetido,perteneceinegracionescolar,
    optareligion,optaporuncredo,tienejuna,becaindigena,otrabeca,perteneceprogramasocial,prioritario,preferente,registrosocial,sistemasalud,
    consultorioocesfam,impedimentofisico,enfermedadcronica,alergico,tomamedicamentos,encasodeemergenciacomunicarsecon,conocereglamentointerno,conocereglamentoevaluacion,
    aceptaregistrohuella,asistenciareligion,aceptoprotocoloscovid,asistiratodaslasreuniones,cumplirhoradeentradaysalida,justificarinasistencias,
    revisaryresponderinfo,participarenactividades,firmas):
        try:
            registro=MatriculaAlumno()
            registro.nmatricula=1
            registro.cursodematricula=Cursos.objects.get(pk=cursodematricula)
            registro.runalumno=runalumno
            registro.apellidopaterno=alumnoapellidopaterno
            registro.apellidomaterno=alumnoapellidomaterno
            registro.ipe=alumnoipe
            registro.nombres=alumnonombres
            registro.nacionalidad=alumnonacionalidad
            registro.fechanacimiento=alumnofechanacimiento
            registro.etnia=alumnoetnia
            registro.domicilio=alumnodomicilio
            registro.religion=alumnoreligion
            registro.comuna=alumnocomuna
            registro.sexo=alumnosexo
            registro.telefono=alumnotelefono
            registro.edad=alumnoedad
            registro.vivecon=alumnovivecon
            
            registro.quienmatricula=alumnoquienmatricula
            
            registro.estudiantenuevo=alumnoestudiantenuevo
            
            registro.sistemadematricula=alumnosistemadematricula
            registro.correoinstitucional=alumnocorreoinstitucional

            registro.padreapellidos=padreapellidos
            registro.padrerun=padrerun
            registro.padrenombres=padrenombres
            registro.padreipa=padreipa
            registro.padrenacionalidad=padrenacionalidad
            registro.padrenpasaporte=padrepasaporte
            registro.padredomicilio=padredomicilio
            registro.padreestudios=padreestudios
            registro.padrecomuna=padrecomuna
            registro.padreocupacion=padreocupacion
            registro.padreapoderado=padreapoderado
            registro.padretelefono1=padretelefono1
            registro.padretelefono2=padretelefono2
            registro.padreemail=padreemail
            registro.madreapellidos=madreapellidos
            registro.madrerun=madrerun
            registro.madrenombres=madrenombres
            registro.madreipa=madreipa
            registro.madrenacionalidad=madrenacionalidad
            registro.madrenpasaporte=madrepasaporte
            registro.madredomicilio=madredomicilio
            registro.madreestudios=madreestudios
            registro.madrecomuna=madrecomuna
            registro.madreocupacion=madreocupacion
            registro.madreapoderado=madreapoderado
            registro.madretelefono1=madretelefono1
            registro.madretelefono2=madretelefono2
            registro.madreemail=madreemail

            registro.establecimientoprocedencia=establecimientoprocedencia
            registro.ultimoyearcursado=ultimoyearcursado
            registro.cursosqueharepetido=cursosqueharepetido
            registro.perteneceaproyectodeintegracionescolar=perteneceinegracionescolar
            registro.optaporreligion=optareligion
            registro.optaporuncredo=optaporuncredo
            registro.tienejunaeb=tienejuna
            registro.becaindigena=becaindigena
            registro.otrabeca=otrabeca
            registro.perteneceprogramasocial=perteneceprogramasocial
            registro.prioritario=prioritario
            registro.preferente=preferente
            registro.registrosocialdehogares=registrosocial
            registro.sistemadesalud=sistemasalud
            registro.consultorioocesfam=consultorioocesfam
            registro.hijoconimpedimentofisico=impedimentofisico
            registro.enfermedadcronica=enfermedadcronica
            registro.alergico=alergico
            registro.tomamedicamento=tomamedicamentos
            registro.encasodeemergenciacomunicarsecon=encasodeemergenciacomunicarsecon

            registro.conoceyaceptareglamentointernodelestablecimiento=conocereglamentointerno
            registro.conoceyaceptareglamentodeevaluaciondelestablecimiento=conocereglamentoevaluacion
            registro.aceptoelusoderegistrodehuellaconfinesderegistrodehorario=aceptaregistrohuella
            registro.encuestaparalaasistenciadereligion=asistenciareligion
            registro.aceptolosprotocoloscontraelcovid19=aceptoprotocoloscovid

            registro.asistiratodaslasreunionescitacionesollamadas=asistiratodaslasreuniones
            registro.cumplirhorariodeentradaysalida=cumplirhoradeentradaysalida
            registro.justificarinasistenciascondocumentospertinentes=justificarinasistencias
            registro.revisaryresponderinformacionmediantemediosdecomunicacion=revisaryresponderinfo
            registro.particaendiferentesactividadesprogramadasporelestablecimiento=participarenactividades

            registro.firmaapoderados=firmas
            registro.save()
            return MatriculasCreate(success=True,id=registro.id)

        except Exception as e:
            return MatriculasCreate(success=False,error=e)

class MatriculasDelete(graphene.Mutation):
    class Arguments:
        idmatricula=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idmatricula):
        try:
            registro=MatriculaAlumno.objects.get(pk=idmatricula)
            registro.delete()
            return MatriculasDelete(success=True)
        except Exception as e:
            return MatriculasDelete(success=False,error=e)

class ComprobacionAlumno(graphene.Mutation):
    class Arguments:
        rut=graphene.String()
        ipe=graphene.String()
    success=graphene.Boolean()
    msg=graphene.String()
    error=graphene.String()
    def mutate(self,info,rut,ipe):
        try:
            if rut:
                if MatriculaAlumno.objects.filter(runalumno=rut).exists():
                    return ComprobacionAlumno(success=True,msg="Alumno Existente")
            
            if ipe:
                if MatriculaAlumno.objects.filter(ipe=ipe).exists():
                    return ComprobacionAlumno(success=True,msg="Alumno Existente")

            return ComprobacionAlumno(success=True,msg="Alumno no existe")
        except Exception as e:
            return ComprobacionAlumno(success=False,error=e)

class MatriculasAlternativasOpcionCreate(graphene.Mutation):
    class Arguments:
        idopcion=graphene.Int()
        nombre=graphene.String()
        valor=graphene.String()
    success=graphene.Boolean()
    id=graphene.String()
    error=graphene.String()
    def mutate(self,info,idopcion,nombre,valor):
        try:
            registro=MatriculasAlternativasOpcion()
            registro.idopcion=MatriculasOpcionPersonalizada.objects.get(pk=idopcion)
            registro.nombre=nombre
            registro.valor=valor
            registro.save()
            return MatriculasAlternativasOpcionCreate(success=True,id=registro.id)
        except Exception as e:
            return MatriculasAlternativasOpcionCreate(success=False,error=e)
class MatriculasDatosOpcionCreate(graphene.Mutation):
    class Arguments:
        idmatricula=graphene.Int()
        idopcion=graphene.Int()
        valor=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idmatricula,idopcion,valor):
        try:
            registro=MatriculasDatosOpcion()
            registro.idmatricula=MatriculaAlumno.objects.get(pk=idmatricula)
            registro.idopcion=MatriculasOpcionPersonalizada.objects.get(pk=idopcion)
            registro.valor=valor
            registro.save()
            return MatriculasDatosOpcionCreate(success=True)

        except Exception as e:
            return MatriculasDatosOpcionCreate(success=False,error=e)

#trabajini universidini
class LoginYomi(graphene.Mutation):
    class Arguments:
        user=graphene.String()
        password=graphene.String()
    success=graphene.Boolean()
    msg=graphene.String()
    error=graphene.String()
    def mutate(self,info,user,password):
        try:
            registro=usuariosyomi.objects.get(user=user)
            if registro:
                if registro.password==password:
                    return LoginYomi(success=True,msg="Login Correcto")
            return LoginYomi(success=True,msg="Login Fallido")
        except Exception as e:
            return LoginYomi(success=False,error=e)

class LoginYomiCreate(graphene.Mutation):
    class Arguments:
        user=graphene.String()
        password=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,user,password):
        try:

            if usuariosyomi.objects.filter(user=user).exists():
                return LoginYomiCreate(success=True)

            registro=usuariosyomi()
            registro.user=user
            registro.password=password
            registro.save()
            return LoginYomiCreate(success=True)
        except Exception as e:
            return LoginYomiCreate(success=False,error=e)

class YomiEnfermedadCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        descripcion=graphene.String()
        gravedad=graphene.Int()
    success=graphene.Boolean()
    id=graphene.Int()
    error=graphene.String()
    def mutate(self,info,nombre,descripcion,gravedad):
        try:
            registro=enfermedades()
            registro.nombre=nombre
            registro.descripcion=descripcion
            registro.gravedad=gravedad
            registro.save()
            return YomiEnfermedadCreate(success=True,id=registro.id)
        except Exception as e:
            return YomiEnfermedadCreate(success=False,error=e)

class YomiEnfermedadDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=enfermedades.objects.get(pk=id)
            registro.delete()
            return YomiEnfermedadDelete(success=True)
        except Exception as e:
            return YomiEnfermedadDelete(success=False,error=e)

class YomiMedicamentoCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        imagen=Upload()
        
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,imagen):
        try:
            registro=medicamentos()
            registro.nombre=nombre
            
            registro.imagen=imagen
            
            registro.save()
            return YomiMedicamentoCreate(success=True)
        except Exception as e:
            return YomiMedicamentoCreate(success=False,error=e)

class YomiMedicamentoDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=medicamentos.objects.get(pk=id)
            registro.delete()
            return YomiMedicamentoDelete(success=True)
        except Exception as e:
            return YomiMedicamentoDelete(success=False,error=e)

class YomiSintomaCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        gravedad=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,gravedad):
        try:
            registro=sintomas()
            registro.nombre=nombre
            registro.gravedad=gravedad
            registro.save()
            return YomiSintomaCreate(success=True)
        except Exception as e:
            return YomiSintomaCreate(success=False,error=e)

class YomiSintomaDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=sintomas.objects.get(pk=id)
            registro.delete()
            return YomiSintomaDelete(success=True)
        except Exception as e:
            return YomiSintomaDelete(success=False,error=e)

class YomiEnfermedadSintoma(graphene.Mutation):
    class Arguments:
        idenfermedad=graphene.Int()
        idsintoma=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idenfermedad,idsintoma):
        try:
            registro=sintomasdeenfermedades()
            registro.enfermedad=enfermedades.objects.get(pk=idenfermedad)
            registro.sintoma=sintomas.objects.get(pk=idsintoma)
            registro.save()
            return YomiEnfermedadSintoma(success=True)
        except Exception as e:
            return YomiEnfermedadSintoma(success=False,error=e)

class YomiEnfermedadSintomaDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=sintomasdeenfermedades.objects.get(pk=id)
            registro.delete()
            return YomiEnfermedadSintomaDelete(success=True)
        except Exception as e:
            return YomiEnfermedadSintomaDelete(success=False,error=e)

class YomiEnfermedadMedicamento(graphene.Mutation):
    class Arguments:
        idenfermedad=graphene.Int()
        idmedicamento=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idenfermedad,idmedicamento):
        try:
            registro=medicamentoenfermedades()
            registro.enfermedad=enfermedades.objects.get(pk=idenfermedad)
            registro.medicamento=medicamentos.objects.get(pk=idmedicamento)
            registro.save()
            return YomiEnfermedadMedicamento(success=True)
        except Exception as e:
            return YomiEnfermedadMedicamento(success=False,error=e)

class YomiEnfermedadMedicamentoDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()
        
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=medicamentoenfermedades.objects.get(pk=id)
            registro.delete()
            return YomiEnfermedadMedicamentoDelete(success=True)
        except Exception as e:
            return YomiEnfermedadMedicamentoDelete(success=False,error=e)

class YomiTiendaCreate(graphene.Mutation):
    class Arguments:
        nombre=graphene.String()
        lugar=graphene.String()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,nombre,lugar):
        try:
            registro=tiendasmedicamentos()
            registro.nombre=nombre
            registro.lugar=lugar
            registro.save()
            return YomiTiendaCreate(success=True)
        except Exception as e:
            return YomiTiendaCreate(success=False,error=e)

class YomiTiendaDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=tiendasmedicamentos.objects.get(pk=id)
            registro.delete()
            return YomiTiendaDelete(success=True)
        except Exception as e:
            return YomiTiendaDelete(success=False,error=e)

class YomiMedicamentoTiendaCreate(graphene.Mutation):
    class Arguments:
        idtienda=graphene.Int()
        idmedicamento=graphene.Int()
        precio=graphene.Int()
    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,idtienda,idmedicamento,precio):
        try:
            registro=medicamentoentienda()
            registro.idmedicamento=medicamentos.objects.get(pk=idmedicamento)
            registro.idtienda=tiendasmedicamentos.objects.get(pk=idtienda)
            registro.precio=precio
            registro.save()
            return YomiMedicamentoTiendaCreate(success=True)
        except Exception as e:
            return YomiMedicamentoTiendaCreate(success=False,error=e)

class YomiMedicamentoTiendaDelete(graphene.Mutation):
    class Arguments:
        id=graphene.Int()

    success=graphene.Boolean()
    error=graphene.String()
    def mutate(self,info,id):
        try:
            registro=medicamentoentienda.objects.get(pk=id)

            registro.delete()
            return YomiMedicamentoTiendaDelete(success=True)
        except Exception as e:
            return YomiMedicamentoTiendaDelete(success=False,error=e)

class Mutation(graphene.ObjectType):

    salaspedidascrear=CrearSalasPedidas.Field()
    salaspedidaseliminar=EliminarSalasPedidas.Field()

    usuariocreate= UsuariosCreate.Field()
    usuariodelete= UsuariosDelete.Field()
    usuarioedit= UsuariosEdit.Field()

    noticiasdelete = NoticiasDelete.Field()
    noticiasedit= NoticiasEdit.Field()

    salascreate=SalasCreate.Field()
    salasedit=SalasEdit.Field()
    salasdelete=SalasDelete.Field()

    horariocreate=HorariosCreate.Field()
    horarioedit=HorariosEdit.Field()
    horariodelete=HorariosDelete.Field()

    asignaturacreate=AsignaturasCreate.Field()
    asignaturaedit=AsignaturasEdit.Field()
    asignaturadelete=AsignaturasDelete.Field()

    cursoscreate=CursosCreate.Field()
    cursosedit=CursosEdit.Field()
    cursosdelete=CursosDelete.Field()

    asignarasignaturascreate=AsignarAsignaturaCreate.Field()
    asignarasignaturasdelete=AsignarAsignaturaDelete.Field()

    imagencreate=ImagenCreate.Field()
    imagendelete=ImagenDelete.Field()

    impresioncreate=ImpresionCreate.Field()
    impresionedit=ImpresionEdit.Field()
    impresiondelete=ImpresionDelete.Field()

    noticiasfrontcreate=NoticiasFrontCreate.Field()
    noticiasfrontedit=NoticiasFrontEdit.Field()
    noticiasfrontdelete=NoticiasFrontDelete.Field()
    
    temafrontcreado=TemaHabladoCreate.Field()
    temafrontedit=TemaHabladoEdit.Field()
    temafrontdelete=TemaHabladoDelete.Field()

    opinionprofesorcreate=OpinionCreate.Field()
    opinionprofesoredit=OpinionEdit.Field()
    opinionprofesordelete=OpinionDelete.Field()

    huellaalumnocreate=HuellaAlumnoCreate.Field()
    huellaalumnoedit=HuellaAlumnoEdit.Field()

    asignarhuellaprofesor=AsignarHuellaProfesor.Field()

    asitenciaalumnocreate=AsistenciaAlumnoCreate.Field()
    asistenciaalumnomanual=AsistenciaAlumnoManual.Field()
    asistenciaalumnoedit=AsistenciaAlumnoEdit.Field()
    
    problemaasistenciacreate=ProblemaAsistenciaCreate.Field()

    categoriamantencioncreate=CategoriaMantencionCreate.Field()
    categoriamantenciondelete=CategoriaMantencionDelete.Field()

    mantencioncreate=MantencionCreate.Field()
    mantencionedit=MantencionEdit.Field()
    mantenciondelete=MantencionDelete.Field()

    recursoscreate=RecursosCreate.Field()


    categoriaproductocra=CategoriaProductoCraCreate.Field()
    categoriaproductocradelete=CategoriaProductoCraDelete.Field()

    productocracreate=ProductoCraCreate.Field()
    productocramicroedit=ProductoCraMicroEdit.Field()
    productocradelete=ProductoCraDelete.Field()


    peticionproductocreate=PeticionesProductoCraCreate.Field()
    peticionproductoedit=PeticionesProductoCraEdit.Field()
    peticionproductoeditsoft=PeticionesProductoCraEditSoft.Field()

    categorialibroscra=CategoriaLibrosCraCreate.Field()
    categorialibroscradelete=CategoriaLibrosCraDelete.Field()

    libroscracreate=LibrosCraCreate.Field()
    libroscramicroedit=LibrosCraMicroEdit.Field()
    libroscradelete=LibrosCraDelete.Field()


    peticionlibroscreate=PeticionesLibrosCraCreate.Field()
    peticionlibrosedit=PeticionesLibrosCraEdit.Field()
    peticionlibroseditsoft=PeticionesLibrosCraEditSoft.Field()

    matriculacreate=MatriculasCreate.Field()
    matriculadelete=MatriculasDelete.Field()
    
    matriculacomprobacion=ComprobacionAlumno.Field()

    matriculaseccioncreate=MatriculaSeccionPersonalizadaCreate.Field()
    matriculaseccionedit=MatriculaSeccionPersonalizadaEdit.Field()
    matriculasecciondelete=MatriculaSeccionPersonalizadaDelete.Field()

    matriculaopcionpersocreate=MatriculasOpcionPersonalizadaCreate.Field()
    matriculaopcionpersoedit=MatriculasOpcionPersonalizadaEdit.Field()
    matriculaopcionpersodelete=MatriculasOpcionPersonalizadaDelete.Field()

    matriculaopcionvalorcreate=MatriculasDatosOpcionCreate.Field()

    matriculaalternativaopcioncreate=MatriculasAlternativasOpcionCreate.Field()


    loginyomi=LoginYomi.Field()
    loginyomicreate=LoginYomiCreate.Field()

    crearenfermedad=YomiEnfermedadCreate.Field()
    eliminarenfermedad=YomiEnfermedadDelete.Field()

    crearmedicamento=YomiMedicamentoCreate.Field()
    eliminarmedicamento=YomiMedicamentoDelete.Field()

    crearsintoma=YomiSintomaCreate.Field()
    eliminarsintoma=YomiSintomaDelete.Field()

    crearenfermedadsintoma=YomiEnfermedadSintoma.Field()
    eliminarenfermedadsintoma=YomiEnfermedadSintomaDelete.Field()

    crearenfermedadmedicamento=YomiEnfermedadMedicamento.Field()
    eliminarenfermedadmedicaneto=YomiEnfermedadMedicamentoDelete.Field()

    yomitiendacreate=YomiTiendaCreate.Field()
    yomitiendadelete=YomiTiendaDelete.Field()

    vincularpreciomedicamento=YomiMedicamentoTiendaCreate.Field()
    eliminarvinculacion=YomiMedicamentoTiendaDelete.Field()
    
    notascreate=NotasCreate.Field()
    notaindicador=NotasIndicador.Field()
    
    
####################################################


