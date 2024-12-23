
from django.shortcuts import render, redirect
from django.http import JsonResponse, FileResponse, HttpResponse
from django.core import serializers

from django.contrib.auth.hashers import make_password
from .models import *
from login.models import *
from django.db.models import Q
from django.core.serializers import serialize
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
import datetime
from datetime import datetime, timedelta
import json 
from login.decorador import *
from django.views.decorators.csrf import csrf_exempt

def dicpermisos(x):
    
    permisos={
        "nombreperfil":x.nombre,
        "pnoticias":x.pnoticias,
        "preservasalas":x.preservasalas,
        "pimpresiones":x.pimpresiones,
        "pcra":x.pcra,
        "pmiasistencia":x.pmiasistencia,
        "pasistencias":x.pasistencia,
        "pcalificaciones":x.pcalificaciones,
        "pmatricula":x.pmatricula,
        "pcalendario":x.pcalendario,
        "pjunaeb":x.pjunaeb,
        "padmin":x.padmin
    }
    return permisos

@requiere_login
def index(request):
    if request.session['usuario']['userPerfil']==2:
        return redirect("RenderVistaCordinador")
    elif request.session['usuario']['userPerfil']==3:
        return redirect("RenderVistaImpresor")

    return render(request, "index.html")

@requiere_login #este esta bien
def pagPermisos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")

    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin==0:
        return render(request,"blanco.html",permisos)

    return render(request,"administracion/permisos.html",permisos)
    

@requiere_login #este esta bien
def pagNoticias(request):

    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")

    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)

    return render(request,"noticias.html",permisos)
    

@requiere_login #este esta bien
def pagPedirSalas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.preservasalas==0:
        return render(request,"blanco.html",permisos)

    return render(request,"pedirsalas/salas.html",permisos)

@requiere_login #este esta bien
def pagHuella(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pasistencia==0:
        return render(request,"blanco.html",permisos)

    return render(request,"huella/huella.html",permisos)

@requiere_login #este esta bien
def pagNotas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcalificaciones==0:
        return render(request,"blanco.html",permisos)

    return render(request,"notas/curso.html",permisos)

@requiere_login #este esta bien
def pagCra(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra ==0:
        return render(request,"blanco.html",permisos)

    return render(request,"biblioteca/menucra.html",permisos)

@requiere_login #este esta bien
def pagEquipos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/equipos.html",permisos)

@requiere_login #este esta bien
def pagMisEquipos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/misequipos.html",permisos)
    
@requiere_login #este esta bien
def pagAdminEquipos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra <=1:
        return render(request,"blanco.html",permisos)

    return render(request,"biblioteca/adminequipos.html",permisos)

@requiere_login #este esta bien
def pagAdminPedidos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra <=1:
        return render(request,"blanco.html",permisos)

    return render(request,"biblioteca/adminpedidos.html",permisos)

@requiere_login #este esta bien
def pagLibros(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/libros/libros.html",permisos)

@requiere_login #este esta bien
def pagOrganigrama(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcalendario ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"miorganigrama/miorganigrama.html",permisos)

@requiere_login #este esta bien
def pagOA(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"mioa/mioa.html",permisos)

@requiere_login #este esta bien
def pagAdminLibros(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra <=1:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/libros/adminlibros.html",permisos)

@requiere_login #este esta bien
def pagAdminLibrosPedidos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra <=1:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/libros/adminlibrospedidos.html",permisos)

@requiere_login #este esta bien
def pagMisLibrosPedidos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pcra <=1:
        return render(request,"blanco.html",permisos)
    return render(request,"biblioteca/libros/mislibros.html",permisos)

@requiere_login #este esta bien
def pagMantencion(request):
    
    if request.session['usuario']['userPerfil']==5:
        return render(request,"mantencion/mantencion.html")
    elif request.session['usuario']['userPerfil']==6:
        return render(request,"mantencion/mantenciondem.html")

    return render(request,"mantencion/mantencion.html")

@requiere_login #este esta bien
def pagAdministracion(request):
    
    print(request.session["usuario"]["permisos"],flush=True)
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion.html",permisos)

@requiere_login #este esta bien
def pagConfiguracionSistema(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion/configuracionsistema.html",permisos)

@requiere_login #este esta bien
def pagNoticiasFront(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion/noticiasfront.html",permisos)

@requiere_login
def pagJunaeb(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pjunaeb ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"junaeb/junaeb.html",permisos)

@requiere_login
def pagCrearMatriculas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pmatricula ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"matriculas/crearmatriculas.html",permisos)

@requiere_login
def pagVerListaEspera(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pmatricula ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"matriculas/verlistaespera.html",permisos)

@requiere_login
def pagMiAsistencia(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    

    return render(request,"miasistencia/miasistencia.html",permisos)


def pagListaEspera(request):

    return render(request,"matriculas/listaespera.html")


@requiere_login
def pagVerMatriculas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pmatricula ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"matriculas/vermatriculas.html",permisos)

def PagMatriculasPublicas(request):
    return render(request,"matriculas/crearmatriculaspublicas.html")


def junaebalumnos(request):
    if request.method=="GET":
        try:
            datos=MatriculaAlumno.objects.filter(tienejunaeb="Si")
            data=[]

            for x in datos:
                data.append({
                    "id":x.id,
                    "nombres":x.nombres,
                    "apellidos":x.apellidopaterno+" "+x.apellidomaterno,
                    "rut":x.runalumno+x.ipe,
                    "curso":x.cursodematricula.nombre,
                    "nivel":x.niveljunaeb
                })
            
            
            return JsonResponse(data,safe=False)

        except Exception as e:
            pass

def historialjunaeb(request):
    if request.method=="GET":
        try:
            datos=HistorialJunaeb.objects.all().order_by("-fecha")
            data=[]

            for x in datos:
                data.append({
                    "id":x.id,
                    "idalumno":x.alumno.id,
                    "nivel":x.ncomida,
                    "fecha":x.fecha

                })
            
            
            return JsonResponse(data,safe=False)

        except Exception as e:
            pass


def junaebasignar(request):
    if request.method=="POST":
        try:
            if request.POST.get("rut-ipe")=="-":
                return JsonResponse("No",safe=False)
            
            datos=MatriculaAlumno.objects.filter(runalumno=request.POST.get("rut-ipe")).first()
            if datos:
                datos.tienejunaeb="Si"
                datos.niveljunaeb=request.POST.get("nivel")
                datos.save()
                return JsonResponse("ok",safe=False)

            datos2=MatriculaAlumno.objects.filter(ipe=request.POST.get("rut-ipe")).first()
            if datos2:
                datos2.tienejunaeb="Si"
                datos2.niveljunaeb=request.POST.get("nivel")
                datos2.save()
                return JsonResponse("ok",safe=False)
            
            return JsonResponse("No",safe=False)

        except Exception as e:
            pass

def junaebeditar(request):
    if request.method=="POST":
        try:

            datos=MatriculaAlumno.objects.get(pk=request.POST.get("id"))
            datos.niveljunaeb=request.POST.get("nivel")
            datos.save()
            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass


def junaebdesasignar(request):
    if request.method=="POST":
        try:

            registro=MatriculaAlumno.objects.get(pk=request.POST.get("id"))
            registro.tienejunaeb="-"
            registro.save()
            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def junaebasignarmasivo(request):
    if request.method=="POST":
        try:
            lista=json.loads(request.POST.get("datos"))
            
            if int(request.POST.get("opcion"))==1:
                datos3=MatriculaAlumno.objects.filter(tienejunaeb="Si")
                
                datos3.update(tienejunaeb="-")
                print(datos3,flush=True)
            
            for x in lista:
                
                datos=MatriculaAlumno.objects.filter(runalumno=x["rut"]).first()
                if datos:
                    datos.tienejunaeb="Si"
                    datos.niveljunaeb=x["nivel"]
                    datos.save()
                    continue

                datos2=MatriculaAlumno.objects.filter(ipe=x["rut"]).first()
                if datos2:
                    datos2.tienejunaeb="Si"
                    datos2.niveljunaeb=x["nivel"]
                    datos2.save()
                    continue
            
            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def crearpedirsala(request):
    if request.method=="POST":
        try:
            datos=SalasPedidas()
            datos.idProfesor=Usuario.objects.get(pk=request.POST.get("iduser"))
            
            datos.idSala=Salas.objects.get(pk=request.POST.get("idsala"))
            
            datos.idhorario=Horarios.objects.get(pk=request.POST.get("idhorario"))
            if int(request.POST.get("idasignatura"))!=0:
                datos.idAsignatura=Asignaturas.objects.get(pk=request.POST.get("idasignatura"))
            if int(request.POST.get("idcurso"))!=0:
                datos.idCurso=Cursos.objects.get(pk=request.POST.get("idcurso"))
            
            
            datos.fechaPeticion=request.POST.get("fecha")
            if request.POST.get("asunto"):
                datos.objetivoAprendizaje=request.POST.get("asunto")
            else:
                datos.objetivoAprendizaje=""
            if int(request.POST.get("idoa"))!=0:
                datos.oa=ObjetivoAprendizaje.objects.get(pk=request.POST.get("idoa"))
            else:
                datos.oa=None
            print(request.POST.get("fecha"),flush=True)
            print(request.POST.get("idsala"),flush=True)
            print(request.POST.get("idhorario"),flush=True)
            if SalasPedidas.objects.filter(Q(fechaPeticion=request.POST.get("fecha")) & Q(idSala=Salas.objects.get(pk=request.POST.get("idsala"))) & Q(idhorario=Horarios.objects.get(pk=request.POST.get("idhorario")))).exists():
                return JsonResponse("ya existe",safe=False)
            else:
                datos.save()
            
            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass
def crearoa(request):
    if request.method=="POST":
        try:
            datos=ObjetivoAprendizaje()
            datos.asignatura=Asignaturas.objects.get(pk=request.POST.get("idasignatura"))
            datos.curso=Cursos.objects.get(pk=request.POST.get("idcurso"))
            datos.numero=request.POST.get("numero")
            datos.titulo=request.POST.get("titulo")
            datos.descripcion=request.POST.get("descripcion")
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass


def crearnoticia(request):
    if request.method=="POST":
        try:
            datos=NoticiasFront()
            datos.titulo=request.POST.get("titulo")
            datos.encabezado=request.POST.get("encabezado")
            datos.contenido=request.POST.get("contenido")
            datos.portada=request.FILES.get("file")
            datos.fecha=request.POST.get("fecha")
            datos.interno=request.POST.get("interno")
            datos.creador=Usuario.objects.get(pk=request.POST.get("creador"))

            
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def editarnoticia(request):
    if request.method=="POST":
        try:
            datos=NoticiasFront.objects.get(pk=request.POST.get("id"))
            datos.titulo=request.POST.get("titulo")
            datos.encabezado=request.POST.get("encabezado")
            datos.contenido=request.POST.get("contenido")
            if request.FILES.get("file"):
                datos.portada=request.FILES.get("file")

            
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def editarsala(request):
    if request.method=="POST":
        try:
            datos=Salas.objects.get(pk=request.POST.get("id"))

            if int(request.POST.get("iduser"))==0:
                datos.responsable=None
                datos.save()
                return JsonResponse("ok",safe=False)

            datos.responsable=Usuario.objects.get(pk=request.POST.get("iduser"))
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def cambiarordenhorarios(request):
    if request.method=="POST":
        try:
            datos=json.loads(request.POST.get("horarios"))
            
            for x in datos:
                coso=Horarios.objects.get(pk=x["id"])
                coso.orden=x["orden"]
                coso.save()
                
                

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def cargadini(request):
    if request.method=="GET":
        base=NoticiasFront.objects.all()
        data=[]
        for x in base:
            data.append({
                "id":x.id,
                "titulo":x.titulo,
                "portada":x.portada.url
            })

        return JsonResponse(data,safe=False)
    if request.method=="POST":
        try:
            registro=NoticiasFront()
            registro.titulo=request.POST.get("titulo")
            registro.portada=request.FILES.get("file")
            registro.encabezado="test"
            #registro.portada=request.POST.get("filename")
            registro.save()
            return JsonResponse({"id":registro.id},safe=False)
        except Exception as e:
            return JsonResponse({"error":e},safe=False)
    if request.method=="DELETE":
        try:
            
            print("xd",request.body)
            #registro=NoticiasFront.objects.get(pk=request.DELETE.get("id"))
            #registro.delete()
            return JsonResponse({"ok":"ok"},safe=False)
        except Exception as e:
            print("errorsini",e)
            return JsonResponse({"ok": e },safe=False)

def editarlibro(request):
    if request.method=="POST":
        try:
            
            datos=ProductoCra.objects.get(pk=request.POST.get("id"))
            datos.nombre=request.POST.get("nombre")
            datos.autor=request.POST.get("autor")
            datos.cantidad=request.POST.get("cantidad")
            datos.descripcion=request.POST.get("descripcion")
            datos.posicion=request.POST.get("posicion")
            datos.codigobarra=request.POST.get("codigobarra")
            datos.idcategoria=CategoriaProductoCra.objects.get(pk=request.POST.get("idcategoria"))
            if request.FILES.get("imagen"):
                datos.imagen=request.FILES.get("imagen")
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass

def editarequipo(request):
    if request.method=="POST":
        try:
            
            datos=LibrosCra.objects.get(pk=request.POST.get("id"))
            datos.nombre=request.POST.get("nombre")
            
            datos.cantidad=request.POST.get("cantidad")
            datos.descripcion=request.POST.get("descripcion")
            datos.posicion=request.POST.get("posicion")
            datos.codigobarra=request.POST.get("codigobarra")
            datos.idcategoria=CategoriaLibrosCra.objects.get(pk=request.POST.get("idcategoria"))
            if request.FILES.get("imagen"):
                datos.imagen=request.FILES.get("imagen")
            datos.save()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass
    

def cargadinix(request):
    
    if request.method=="POST":
        try:
            registro=NoticiasFront.objects.get(pk=request.POST.get("id"))
            #result=json.loads(request.POST.get("evento"))
            #result[0]["id"] 
            if request.POST.get("evento")=="a":
                registro.titulo="test"
                registro.save()
            else:
                registro.delete()
            
            
            return JsonResponse({},safe=False)
        except Exception as e:
            return JsonResponse({"error":e},safe=False)


def loadcalendario(request):
    if request.method=="GET":
        try:
            hoy= datetime.now()
            datos=Calendario.objects.filter(ano=hoy.year).order_by("mes","dia")
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "year":x.ano,
                    "mes":x.mes,
                    "dia":x.dia,
                    "nombredia":x.nombredia,
                    "tipodia":x.tipodia
                })

            return JsonResponse(data,safe=False)

        except Exception as e:
            pass
    if request.method=="POST":
        try:
            
            datos=Calendario.objects.filter(ano=request.POST.get("year")).order_by("id")
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "mes":x.mes,
                    "dia":x.dia,
                    "nombredia":x.nombredia,
                    "tipodia":x.tipodia
                })

            return JsonResponse(data,safe=False)

        except Exception as e:
            pass
    
def cambiardiacalendario(request):
   
    if request.method=="POST":
        try:
            
            datos=Calendario.objects.get(id=request.POST.get("id"))
            datos.tipodia=request.POST.get("tipodia")
            datos.save()

            return JsonResponse({"ok":"oki"},safe=False)

        except Exception as e:
            pass

def crearevento(request):
    if request.method=="GET":
        try:
            eventos=EventoDias.objects.all()
            data=[]
            for x in eventos:
                data.append({
                    "id":x.id,
                    "idevento":x.idevento.id,
                    "iddia":x.idcalendario.id,
                    "dia":x.idcalendario.dia,
                    "titulo":x.idevento.titulo,
                    "descripcion":x.idevento.descripcion,
                    "hora":x.idevento.hora
                    
                    
                })
            

            return JsonResponse(data,safe=False)

        except Exception as e:
            pass

    if request.method=="POST":
        try:
            dias= request.POST.getlist('dias[]')
            evento=Eventos()
            evento.titulo=request.POST.get("titulo")
            evento.descripcion=request.POST.get("descripcion")
            evento.requisitos=request.POST.get("requisitos")
            evento.hora=request.POST.get("hora")
            evento.save()
            registro=EventoDias()
            for x in dias:
                
                registro.idcalendario=Calendario.objects.get(pk=x)
                registro.idevento=Eventos.objects.get(pk=evento.id)
                registro.save()
                registro=EventoDias()
            

            return JsonResponse({"ok":dias},safe=False)

        except Exception as e:
            return JsonResponse(e,safe=False)
    
def eliminarevento(request):
   
    if request.method=="POST":
        try:
            
            datos=Eventos.objects.get(id=request.POST.get("id"))
            datos.delete()

            return JsonResponse("ok",safe=False)

        except Exception as e:
            pass
def eliminaryear(request):
   
    if request.method=="POST":
        try:
            
            datos=Calendario.objects.filter(ano=request.POST.get("year"))
            datos.delete()

            return JsonResponse({"ok":"oki"},safe=False)

        except Exception as e:
            pass



def crearyear(request):
    if request.method=="POST":
        try:
            year=int(request.POST.get("year"))
            registro=Calendario()
            test=[]
            bisiesto=not year % 4 and (year % 100 or not year % 400)
            primerdia=datetime(year,1,1,15,00)
            
            dia=0
            mes=1
            diasemana=int(primerdia.strftime("%w"))
            while mes<13:
                if mes==1:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                        
                elif mes==2:
                    if bisiesto==False:
                        if dia<=27:
                            dia+=1
                            registro.dia=dia
                            registro.mes=mes
                        else:
                            dia=1
                            mes+=1
                            registro.dia=dia
                            registro.mes=mes
                    else:
                        if dia<=28:
                            dia+=1
                            registro.dia=dia
                            registro.mes=mes
                        else:
                            dia=1
                            mes+=1
                            registro.dia=dia
                            registro.mes=mes
                    
                elif mes==3:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==4:
                    if dia<=29:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==5:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==6:
                    if dia<=29:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==7:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==8:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==9:
                    if dia<=29:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==10:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==11:
                    if dia<=29:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                elif mes==12:
                    if dia<=30:
                        dia+=1
                        registro.dia=dia
                        registro.mes=mes
                    else:
                        dia=1
                        mes+=1
                        registro.dia=dia
                        registro.mes=mes
                
                
                if mes!=13:
                    
                    if diasemana==7:
                        diasemana=0
                        

                    registro.nombredia=diasemana

                    if diasemana==0:
                        registro.tipodia=0
                    else:
                        registro.tipodia=1
                    
                    
                    registro.ano=year
                    registro.save()
                    registro=Calendario()
                    diasemana+=1
                    
                
                
            return JsonResponse({"ok":test},safe=False)
        except Exception as e:
            pass

def calculardiasactual(request):
    if request.method=="GET":
        try:
            datos=Cursos.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombre

                })
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass

def cursos(request):
    if request.method=="GET":
        try:
            datos=Cursos.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombre

                })
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass

def asignaturasprofesor(request):

    if request.method=="POST":
        try:
            datos=AsignaturasAsignadas.objects.filter(idprofe=request.POST.get("idprofe"))
            data=[]
            for x in datos:
                data.append({
                    "idasignatura":x.idasignatura.id,
                    "nombreasignatura":x.idasignatura.nombre

                })

                return JsonResponse(data,safe=False)
        except Exception as e:
            pass

def notasalumnos(request):
    if request.method=="POST":
        try:
            datos=NotasAlumno.objects.filter(Q(asignatura=Asignaturas.objects.get(pk=request.POST.get("idasignatura"))) & Q(alumno__cursodematricula=Cursos.objects.get(pk=request.POST.get("idcurso"))))
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "idalumno":x.alumno.id,
                    "rut":x.alumno.runalumno,
                    "ipe":x.alumno.ipe,
                    "nombrealumno":x.alumno.nombres,
                    "apellidopaterno":x.alumno.apellidopaterno,
                    "apellidomaterno":x.alumno.apellidomaterno,
                    "curso":x.alumno.cursodematricula.id,

                    "porcentaje1":x.porcentaje1,
                    "porcentaje2":x.porcentaje2,
                    "porcentaje3":x.porcentaje3,
                    "porcentaje4":x.porcentaje4,

                    "letra1":x.indicador1,
                    "letra2":x.indicador2,
                    "letra3":x.indicador3,
                    "letra4":x.indicador4,

                    "n1":x.n1,
                    "n2":x.n2,
                    "n3":x.n3,
                    "n4":x.n4,
                    "n5":x.n5,
                    "n6":x.n6,
                    "n7":x.n7,
                    "n8":x.n8,
                    "n9":x.n9,
                    "n10":x.n10,
                    "n11":x.n11,
                    "n12":x.n12,
                    "n13":x.n13,
                    "n14":x.n14,
                    "n15":x.n15,

                    "n16":x.n16,
                    "n17":x.n17,
                    "n18":x.n18,
                    "n19":x.n19,
                    "n20":x.n20,
                    "n21":x.n21,
                    "n22":x.n22,
                    "n23":x.n23,
                    "n24":x.n24,
                    "n25":x.n25,
                    "n26":x.n26,
                    "n27":x.n27,
                    "n28":x.n28,
                    "n29":x.n29,
                    "n30":x.n30,
                    
                })

            return JsonResponse(data,safe=False)
        except Exception as e:
            pass
def crearnotasalumnos(request):
    if request.method=="POST":
        try:
            #datos=NotasAlumno()
            asignatura=Asignaturas.objects.get(pk=request.POST.get("idasignatura"))
            
            
            

            #arrai=request.POST.getlist('test[]')
            arrai= json.loads(request.POST.get("test"))
            datinis=[]
            for x in arrai:
                if x!=None:
                    if x["idnota"]!=0:
                        datos=NotasAlumno.objects.get(pk=x["idnota"])
                        if not x["p1"]==-1:
                           datos.porcentaje1=int(x["p1"]) 
                        if not x["p2"]==-1:
                            datos.porcentaje2=int(x["p2"])
                        if not x["p3"]==-1:
                            datos.porcentaje3=int(x["p3"])
                        if not x["p4"]==-1:
                            datos.porcentaje4=int(x["p4"])

                        
                        print("llego aqui?2 xd",flush=True)
                        if x["n1"]==-1:
                            pass
                        elif x["n1"]=="" or x["n1"]=="0":
                            datos.n1=""
                        elif x["n1"].isnumeric():
                            datos.n1=x["n1"]
                        
                         


                        if x["n2"]==-1:
                            pass
                        elif x["n2"]=="" or x["n2"]=="0":
                            datos.n2=""
                        elif x["n2"].isnumeric():
                            datos.n2=x["n2"]
                        

                        if x["n3"]==-1:
                            pass
                        elif x["n3"]=="" or x["n3"]=="0":
                            datos.n3=""
                        elif x["n3"].isnumeric():
                            datos.n3=x["n3"]
                        

                        if x["n4"]==-1:
                            pass
                        elif x["n4"]=="" or x["n4"]=="0":
                            datos.n4=""
                        elif x["n4"].isnumeric():
                            datos.n4=x["n4"]
                        
                            
                        if x["n5"]==-1:
                            pass
                        elif x["n5"]=="" or x["n5"]=="0":
                            datos.n5=""
                        elif x["n5"].isnumeric():
                            datos.n5=x["n5"]
                        
                        
                        if x["n6"]==-1:
                            pass
                        elif x["n6"]=="" or x["n6"]=="0":
                            datos.n6=""
                        elif x["n6"].isnumeric():
                            datos.n6=x["n6"]
                        
                            
                        if x["n7"]==-1:
                            pass
                        elif x["n7"]=="" or x["n7"]=="0":
                            datos.n7=""
                        elif x["n7"].isnumeric():
                            datos.n7=x["n7"]
                        
                            
                        if x["n8"]==-1:
                            pass
                        elif x["n8"]=="" or x["n8"]=="0":
                            datos.n8=""
                        elif x["n8"].isnumeric():
                            datos.n8=x["n8"]
                        
                            
                        if x["n9"]==-1:
                            pass
                        elif x["n9"]=="" or x["n9"]=="0":
                            datos.n9=""
                        elif x["n9"].isnumeric():
                            datos.n9=x["n9"]
                        
                            
                        if x["n10"]==-1:
                            pass
                        elif x["n10"]=="" or x["n10"]=="0":
                            datos.n10=""
                        elif x["n10"].isnumeric():
                            datos.n10=x["n10"]
                        

                     
                        if x["n11"]==-1:
                            pass
                        elif x["n11"]=="" or x["n11"]=="0":
                            datos.n11=""
                        elif x["n11"].isnumeric():
                            datos.n11=x["n11"]
                        

                        if x["n12"]==-1:
                            pass    
                        elif x["n12"]=="" or x["n12"]=="0":
                            datos.n12=""
                        elif x["n12"].isnumeric():
                            datos.n12=x["n12"]
                        

                        if x["n13"]==-1:
                            pass   
                        elif x["n13"]=="" or x["n13"]=="0":
                            datos.n13="" 
                        elif x["n13"].isnumeric():
                            datos.n13=x["n13"]
                        
                            
                        if x["n14"]==-1:
                            pass
                        elif x["n14"]=="" or x["n14"]=="0":
                            datos.n14=""
                        elif x["n14"].isnumeric():
                            datos.n14=x["n14"]
                        
                        
                        if x["n15"]==-1:
                            pass
                        elif x["n15"]=="" or x["n15"]=="0":
                            datos.n15=""
                        elif x["n15"].isnumeric():
                            datos.n15=x["n15"]
                        
                            
                        if x["n16"]==-1:
                            pass
                        elif x["n16"]=="" or x["n16"]=="0":
                            datos.n16=""
                        elif x["n16"].isnumeric():
                            datos.n16=x["n16"]
                        
                            
                        if x["n17"]==-1:
                            pass
                        elif x["n17"]=="" or x["n17"]=="0":
                            datos.n17=""
                        elif x["n17"].isnumeric():
                            datos.n17=x["n17"]
                        
                            
                        if x["n18"]==-1:
                            pass
                        elif x["n18"]=="" or x["n18"]=="0":
                            datos.n18=""
                        elif x["n18"].isnumeric():
                            datos.n18=x["n18"]
                        
                            
                        if x["n19"]==-1:
                            pass
                        elif x["n19"]=="" or x["n19"]=="0":
                            datos.n19=""
                        elif x["n19"].isnumeric():
                            datos.n19=x["n19"]
                        
                        
                        if x["n20"]==-1:
                            pass
                        elif x["n20"]=="" or x["n20"]=="0":
                            datos.n20=""
                        elif x["n20"].isnumeric():
                            datos.n20=x["n20"]
                        

                        if x["n21"]==-1:
                            pass
                        elif x["n21"]=="" or x["n21"]=="0":
                            datos.n21=""
                        elif x["n21"].isnumeric():
                            datos.n21=x["n21"]
                        
                            
                        if x["n22"]==-1:
                            pass
                        elif x["n22"]=="" or x["n22"]=="0":
                            datos.n22=""
                        elif x["n22"].isnumeric():
                            datos.n22=x["n22"]
                        
                            
                        if x["n23"]==-1:
                            pass
                        elif x["n23"]=="" or x["n23"]=="0":
                            datos.n23=""
                        elif x["n23"].isnumeric():
                            datos.n23=x["n23"]
                        
                        
                        if x["n24"]==-1:
                            pass
                        elif x["n24"]=="" or x["n24"]=="0":
                            datos.n24=""
                        elif x["n24"].isnumeric():
                            datos.n24=x["n24"]
                        
                            
                        if x["n25"]==-1:
                            pass
                        elif x["n25"]=="" or x["n25"]=="0":
                            datos.n25=""
                        elif x["n25"].isnumeric():
                            datos.n25=x["n25"]
                        
                        
                        if x["n26"]==-1:
                            pass
                        elif x["n26"]=="" or x["n26"]=="0":
                            datos.n26=""
                        elif x["n26"].isnumeric():
                            datos.n26=x["n26"]
                        
                        
                        if x["n27"]==-1:
                            pass
                        elif x["n27"]=="" or x["n27"]=="0":
                            datos.n27=""
                        elif x["n27"].isnumeric():
                            datos.n27=x["n27"]
                        
                            
                        if x["n28"]==-1:
                            pass
                        elif x["n28"]=="" or x["n28"]=="0":
                            datos.n28=""
                        elif x["n28"].isnumeric():
                            datos.n28=x["n28"]
                        
                            
                        if x["n29"]==-1:
                            pass
                        elif x["n29"]=="" or x["n29"]=="0":
                            datos.n29=""
                        elif x["n29"].isnumeric():
                            datos.n29=x["n29"]
                        
                        
                        if x["n30"]==-1:
                            pass
                        elif x["n30"]=="" or x["n30"]=="0":
                            datos.n30=""
                        elif x["n30"].isnumeric():
                            datos.n30=x["n30"]
                        
                            
                        datos.save()
                    else:
                        
                        datos=NotasAlumno()
                        datos.alumno=MatriculaAlumno.objects.get(pk=x["idalumno"])
                        datos.asignatura=asignatura
                        print("llego aqui? xd",flush=True)
                        if not x["p1"]==-1:
                           datos.porcentaje1=int(x["p1"]) 
                        if not x["p2"]==-1:
                            datos.porcentaje2=int(x["p2"])
                        if not x["p3"]==-1:
                            datos.porcentaje3=int(x["p3"])
                        if not x["p4"]==-1:
                            datos.porcentaje4=int(x["p4"])
                        
                        


                        if x["n1"]==-1:
                            datos.n1=""
                        else:
                            datos.n1=x["n1"]
                        
                        if x["n2"]==-1:
                            datos.n2=""
                        else:
                            datos.n2=x["n2"]

                        if x["n3"]==-1:
                            datos.n3=""
                        else:
                            datos.n3=x["n3"]

                        if x["n4"]==-1:
                            datos.n4=""
                        else:
                            datos.n4=x["n4"]

                        if x["n5"]==-1:
                            datos.n5=""
                        else:
                            datos.n5=x["n5"]

                        if x["n6"]==-1:
                            datos.n6=""
                        else:
                            datos.n6=x["n6"]
                        
                        if x["n7"]==-1:
                            datos.n7=""
                        else:
                            datos.n7=x["n7"]

                        if x["n8"]==-1:
                            datos.n8=""
                        else:
                            datos.n8=x["n8"]
                        
                        if x["n9"]==-1:
                            datos.n9=""
                        else:
                            datos.n9=x["n9"]
                        
                        if x["n10"]==-1:
                            datos.n10=""
                        else:
                            datos.n10=x["n10"]
                        
                        if x["n11"]==-1:
                            datos.n11=""
                        else:
                            datos.n11=x["n11"]
                        
                        if x["n12"]==-1:
                            datos.n12=""
                        else:
                            datos.n12=x["n12"]
                        
                        if x["n13"]==-1:
                            datos.n13=""
                        else:
                            datos.n13=x["n13"]
                        
                        if x["n14"]==-1:
                            datos.n14=""
                        else:
                            datos.n14=x["n14"]
                        
                        if x["n15"]==-1:
                            datos.n15=""
                        else:
                            datos.n15=x["n15"]
                        
                        if x["n16"]==-1:
                            datos.n16=""
                        else:
                            datos.n16=x["n16"]
                        
                        if x["n17"]==-1:
                            datos.n17=""
                        else:
                            datos.n17=x["n17"]
                        
                        if x["n18"]==-1:
                            datos.n18=""
                        else:
                            datos.n18=x["n18"]
                        
                        if x["n19"]==-1:
                            datos.n19=""
                        else:
                            datos.n19=x["n19"]
                        
                        if x["n20"]==-1:
                            datos.n20=""
                        else:
                            datos.n20=x["n20"]
                        
                        if x["n21"]==-1:
                            datos.n21=""
                        else:
                            datos.n21=x["n21"]
                        
                        if x["n22"]==-1:
                            datos.n22=""
                        else:
                            datos.n22=x["n22"]
                        
                        if x["n23"]==-1:
                            datos.n23=""
                        else:
                            datos.n23=x["n23"]
                        
                        if x["n24"]==-1:
                            datos.n24=""
                        else:
                            datos.n24=x["n24"]
                        
                        if x["n25"]==-1:
                            datos.n25=""
                        else:
                            datos.n25=x["n25"]
                        
                        if x["n26"]==-1:
                            datos.n26=""
                        else:
                            datos.n26=x["n26"]
                        
                        if x["n27"]==-1:
                            datos.n27=""
                        else:
                            datos.n27=x["n27"]

                        if x["n28"]==-1:
                            datos.n28=""
                        else:
                            datos.n28=x["n28"]
                        
                        if x["n29"]==-1:
                            datos.n29=""
                        else:
                            datos.n29=x["n29"]
                        
                        if x["n30"]==-1:
                            datos.n30=""
                        else:
                            datos.n30=x["n30"]
                        

                        

                        
                        datos.save()

                
                
            #print("test2",datinis,flush=True)
            #print("request",arrai,flush=True)
            return JsonResponse("ok",safe=False)
        except Exception as e:
            pass



def cambiarcursoalumno(request):
    if request.method=="POST":
        try:
            alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))
            alumno.cursodematricula=Cursos.objects.get(pk=request.POST.get("idcurso"))
            alumno.save()
            return JsonResponse("ok",safe=False)
        except Exception as e:
            pass

def alumnosporcurso(request):
    if request.method=="POST":
        try:
            datos=MatriculaAlumno.objects.filter(cursodematricula=Cursos.objects.get(pk=request.POST.get("idcurso")))
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "rut":x.runalumno,
                    "ipe":x.ipe,
                    "nombrealumno":x.nombres,
                    "apellidopaterno":x.apellidopaterno,
                    "apellidomaterno":x.apellidomaterno,
                    "curso":x.cursodematricula.id,
                    "dias1":x.diasasistidos1,
                    "dias2":x.diasasistidos2,
                    "dias3":x.diasasistidos3,
                    
                })

            return JsonResponse(data,safe=False)
        except Exception as e:
            pass
    if request.method=="GET":
        try:
            datos=MatriculaAlumno.objects.all().exclude(entramite=1).order_by("apellidopaterno")
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.apellidopaterno+x.apellidomaterno+x.nombres,
                    "rut":x.runalumno,
                    "ipe":x.ipe,
                    "curso":x.cursodematricula.nombre,
                    "cursoid":x.cursodematricula.id
                    

                })
            return JsonResponse(data,safe=False)
        except:
            pass

def asistenciaporcurso(request):
    if request.method=="POST":
        try:
            hoy=datetime.now()
            alumnos=json.loads(request.POST.get("alumnos"))
            
            calendario=Calendario.objects.get(ano=hoy.year,mes=request.POST.get("mes"),dia=request.POST.get("dia"))
            print("wtf",flush=True)
            print(calendario.id,flush=True)
            if calendario.tipodia==0:
                return JsonResponse("feriado",safe=False)
            datos=AsitenciaAlumno.objects.filter(alumno__id__in=alumnos,
                                                 horaasitencias__day=calendario.dia,
                                                 horaasitencias__month=calendario.mes,
                                                 horaasitencias__year=hoy.year).distinct("alumno")
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "idalumno":x.alumno.id,
                    "fecha":x.horaasitencias
                })
            return JsonResponse(data,safe=False)
        except:
            pass
def ponerpresente(request):
    if request.method=="POST":
        try:
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            inicio=datetime.today().replace(year=configuracion.iniciodeasistencia.ano,month=configuracion.iniciodeasistencia.mes,day=configuracion.iniciodeasistencia.dia)
            primer=datetime.today().replace(year=configuracion.finals1.ano,month=configuracion.finals1.mes,day=configuracion.finals1.dia)
            segun=datetime.today().replace(year=configuracion.finals2.ano,month=configuracion.finals2.mes,day=configuracion.finals2.dia)
            tercer=datetime.today().replace(year=configuracion.finals3.ano,month=configuracion.finals3.mes,day=configuracion.finals3.dia)

            

            hora=datetime.strptime(f"{request.POST.get('dia')}/{request.POST.get('mes')}/{request.POST.get('year')} {request.POST.get('horas')}:{request.POST.get('minutos')}:00",'%d/%m/%Y %H:%M:%S')
            
            datos=AsitenciaAlumno()
            datos.alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))

            if AsitenciaAlumno.objects.filter(horaasitencias__month=request.POST.get('mes'),horaasitencias__day=request.POST.get('dia'),alumno=datos.alumno).exists():
                print("duplicado",flush=True)
                return JsonResponse("duplicado",safe=False)
            
            
            datos.horaasitencias=hora
            if hora>=inicio:
                
                if hora<=primer:
                    datos.alumno.diasasistidos1+=1
                    datos.alumno.save()
                elif hora<=segun:
                    datos.alumno.diasasistidos2+=1
                    datos.alumno.save()
                elif hora<=tercer:
                    datos.alumno.diasasistidos3+=1
                    datos.alumno.save()
            elif hora.day==inicio.day and hora.month==inicio.month and hora.year==inicio.year:
                datos.alumno.diasasistidos1+=1
                datos.alumno.save()


            datos.save()

            return JsonResponse({"dias1":datos.alumno.diasasistidos1,"dias2":datos.alumno.diasasistidos2,"dias3":datos.alumno.diasasistidos3},safe=False)
        except:
            pass

def ponerpresentemasivo(request):
    if request.method=="POST":
        try:
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            inicio=datetime.today().replace(year=configuracion.iniciodeasistencia.ano,month=configuracion.iniciodeasistencia.mes,day=configuracion.iniciodeasistencia.dia)
            primer=datetime.today().replace(year=configuracion.finals1.ano,month=configuracion.finals1.mes,day=configuracion.finals1.dia)
            segun=datetime.today().replace(year=configuracion.finals2.ano,month=configuracion.finals2.mes,day=configuracion.finals2.dia)
            tercer=datetime.today().replace(year=configuracion.finals3.ano,month=configuracion.finals3.mes,day=configuracion.finals3.dia)

            
            lista=json.loads(request.POST.get("listini"))
            
            for x in lista:
                registro=AsitenciaAlumno()
                registro.alumno=MatriculaAlumno.objects.get(pk=x["id"])

                existexd=AsitenciaAlumno.objects.filter(horaasitencias__month=x["mes"],horaasitencias__day=x["dia"],alumno=registro.alumno).exists()
                
                if existexd:
                    print("duplicado",flush=True)
                    continue
                    
                
                
                hora=datetime.strptime(f"{x['dia']}/{x['mes']}/{2023} {request.POST.get('horas')}:{request.POST.get('minutos')}:00",'%d/%m/%Y %H:%M:%S')
                
                registro.horaasitencias=hora
                if hora>=inicio:
                    if hora<=primer:
                        registro.alumno.diasasistidos1+=1
                        registro.alumno.save()
                    elif hora<=segun:
                        registro.alumno.diasasistidos2+=1
                        registro.alumno.save()
                    elif hora<=tercer:
                        registro.alumno.diasasistidos3+=1
                        registro.alumno.save()
                elif hora.day==inicio.day and hora.month==inicio.month and hora.year==inicio.year:
                    registro.alumno.diasasistidos1+=1
                    registro.alumno.save()
                registro.save()

            return JsonResponse("ok",safe=False)
        except:
            pass
def eliminarasistencia(request):
    if request.method=="POST":
        try:
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            inicio=datetime.today().replace(year=configuracion.iniciodeasistencia.ano,month=configuracion.iniciodeasistencia.mes,day=configuracion.iniciodeasistencia.dia)
            primer=datetime.today().replace(year=configuracion.finals1.ano,month=configuracion.finals1.mes,day=configuracion.finals1.dia)
            segun=datetime.today().replace(year=configuracion.finals2.ano,month=configuracion.finals2.mes,day=configuracion.finals2.dia)
            tercer=datetime.today().replace(year=configuracion.finals3.ano,month=configuracion.finals3.mes,day=configuracion.finals3.dia)
            datos=AsitenciaAlumno.objects.get(pk=request.POST.get("id"))

            if datos.horaasitencias>inicio:
                if datos.horaasitencias<=primer:
                    datos.alumno.diasasistidos1-=1
                    datos.alumno.save()
                elif datos.horaasitencias<=segun:
                    datos.alumno.diasasistidos2-=1
                    datos.alumno.save()
                elif datos.horaasitencias<=tercer:
                    datos.alumno.diasasistidos3-=1
                    datos.alumno.save()
            elif datos.horaasitencias.day==inicio.day and datos.horaasitencias.month==inicio.month and datos.horaasitencias.year==inicio.year:
                datos.alumno.diasasistidos1-=1
                datos.alumno.save()
            
            datos.delete()

            return JsonResponse({"dias1":datos.alumno.diasasistidos1,"dias2":datos.alumno.diasasistidos2,"dias3":datos.alumno.diasasistidos3},safe=False)
        except:
            pass

def asistenciaalumnos(request):
    if request.method=="GET":
        try:
            datos=AsitenciaAlumno.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "horaasistencias":x.horaasitencias,
                    "horasalida":x.horasalida,
                    "atrasoresuelto":x.atrasoresuelto,
                    "alumno":x.alumno.id,
                    

                })
            return JsonResponse(data,safe=False)
        except:
            pass
    if request.method=="POST":
        try:
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            if int(request.POST.get("id"))>=1:
                datos=AsitenciaAlumno.objects.get(pk=request.POST.get("id"))
                datos.horaasitencias=datos.horaasitencias.replace(hour=int(request.POST.get("fecha").split(":")[0]),minute=int(request.POST.get("fecha").split(":")[1]))
                if int(request.POST.get("atraso"))==0:
                    alumno=datos.alumno
                    if datos.horaasitencias.month >= configuracion.iniciodeasistencia.mes  and datos.horaasitencias.day >= configuracion.iniciodeasistencia.dia :
                
                        if datos.horaasitencias.month<= configuracion.finals1.mes and datos.horaasitencias.day <= configuracion.finals1.dia:

                            alumno.diasasistidos1+=1

                        if datos.horaasitencias.month<= configuracion.finals2.mes and datos.horaasitencias.day <= configuracion.finals2.dia:

                            alumno.diasasistidos2+=1
                
                        if datos.horaasitencias.month<= configuracion.finals3.mes and datos.horaasitencias.day <= configuracion.finals3.dia:

                            alumno.diasasistidos3+=1
                
                        if datos.horaasitencias.month<= configuracion.finals4.mes and datos.horaasitencias.day <= configuracion.finals4.dia:

                            alumno.diasasistidos4+=1

                    alumno.save()

                datos.save()
                return JsonResponse("ok",safe=False)

            time= datetime.strptime(request.POST.get("fecha"), "%Y-%m-%d %H:%M:%S")
            print("aquillego",flush=True)
            datos=AsitenciaAlumno.objects.filter(horaasitencias__date=time,alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))).exists()
            
            if datos:
                return JsonResponse("Duplicado",safe=False)
            
            datos=AsitenciaAlumno()
            datos.horaasitencias=time
            
            datos.alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))
            
            alumno=datos.alumno
            print(time.month,flush=True)
            print(configuracion.iniciodeasistencia.mes,flush=True)
            print(time.day,flush=True)
            print(configuracion.iniciodeasistencia.dia,flush=True)
            
            if time.month >= configuracion.iniciodeasistencia.mes and time.day >= configuracion.iniciodeasistencia.dia :
                print("Esta efectivamente dentro del inicio",flush=True)
        
                if time.month<= configuracion.finals1.mes and time.day <= configuracion.finals1.dia:
                        print("Esta efectivamente en la primera parte",flush=True)
                        alumno.diasasistidos1+=1
                    
                elif time.month<= configuracion.finals2.mes and time.day <= configuracion.finals2.dia:
                        print("Esta efectivamente en la primera 2",flush=True)
                        alumno.diasasistidos2+=1

                elif time.month<= configuracion.finals3.mes and time.day <= configuracion.finals3.dia:
                        print("Esta efectivamente en la primera 3",flush=True)
                        alumno.diasasistidos3+=1

                elif time.month<= configuracion.finals4.mes and time.day <= configuracion.finals4.dia:
                        print("Esta efectivamente en la primera 4",flush=True)
                        alumno.diasasistidos4+=1

                
            
            alumno.save()
            
            datos.save()
            
                
            return JsonResponse("ok",safe=False)
        except Exception as e:
            pass    

def asistenciaalumnosmes(request):
    if request.method=="POST":
        try:
            datos=AsitenciaAlumno.objects.filter(horaasitencias__month=request.POST.get("mes"))
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "horaasistencias":x.horaasitencias,
                    "horasalida":x.horasalida,
                    "atrasoresuelto":x.atrasoresuelto,
                    "alumno":x.alumno.id,
                    

                })

                
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass    

def oaasignaturasprofesor(request):

    if request.method=="GET":
        try:
            datos=ObjetivoAprendizaje.objects.all().order_by("numero")
            
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "curso":x.curso.id,
                    "asignatura":x.asignatura.id,
                    "numero":x.numero,
                    "titulo":x.titulo,
                    "descripcion":x.descripcion
                    

                })

                
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass




#------DATOS GENERALES---------------------------
def listado_asignaturas(request):

    if request.method=="GET":
        try:
            datos=Asignaturas.objects.all()
            
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombre
                })

                
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass
def DatosAsignaturasAsignadas(request):
    if request.method=="POST":
        try:
            datos=AsignaturasAsignadas.objects.filter(idprofe=Usuario.objects.get(pk=request.POST.get("idprofe")))
            data=[]
            for x in datos:
                data.append({
                    "idasig":x.asignatura.id,
                    "nombre":x.idasignatura.nombre
                })
            return JsonResponse(data,safe=False)
        except:
            pass
    if request.method=="GET":
        try:
            datos=Asignaturas.objects.all()
            for x in datos:
                data.append({
                    "idasig":x.asignatura.id,
                    "nombre":x.idasignatura.nombre
                })
            return JsonResponse(data,safe=False)
        except Exception as e:
            pass


def HelpDesk(request):
    if request.method=="GET":
        try:
            datos=ConstanciasSalas.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "profesor":x.profesor.nombre,
                    "mensaje":x.mensaje,
                    "estado":x.estado

                })
            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            datos=ConstanciasSalas()
            datos.profesor=Usuario.objects.get(pk=request.POST.get("idprofe"))
            datos.npeticion=SalasPedidas.objects.get(pk=request.POST.get("idpeticion"))
            datos.mensaje=request.POST.get("mensaje")
            datos.estado=1
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass




def TonerDatos(request):
    if request.method=="GET":
        try:
            datos=TonerImpresion.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombreimpresora,
                    "salaalojada":x.salaalojada.nombre,
                    "tinta":x.tintaactual,
                    "hojas":x.hojasactual
                })
            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            if request.POST.get("crear") == 1:
                registro=TonerImpresion()
                registro.nombreimpresora=request.POST.get("Nombre")
                registro.salaalojada=Salas.objects.get(pk=request.POST.get("idSala"))
                registro.tintaactual=request.POST.get("tinta")
                registro.hojasactual=request.POST.get("hojas")
                registro.save()
            elif request.POST.get("crear") == 0:
                registro=TonerImpresion.objects.get("idimpresora")
                if request.POST.get("Nombre"):
                    registro.nombreimpresora=request.POST.get("Nombre")
                if request.POST.get("idSala"):
                    registro.salaalojada=request.POST.get("idSala")
                if request.POST.get("tinta"):
                    registro.tintaactual=request.POST.get("tinta")
                if request.POST.get("hojas"):
                    registro.hojasactual=request.POST.get("hojas")
                registro.save()

            return JsonResponse("ok",safe=False)
        except:
            pass

def HistorialTonerDatos(request):
    if request.method=="GET":
        try:
            datos=TonerImpresion.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombreimpresora,
                    "salaalojada":x.salaalojada.nombre,
                    "tinta":x.tintaactual,
                    "hojas":x.hojasactual
                })
            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            datos=TonerImpresion.objects.get(pk=request.POST.get("idimpre"))
            datos.tintaactual-=request.POST.get("tinta")
            datos.hojasactual-=request.POST.get("hojas")
            datos.save()
            registro=HistorialToner()
            registro.impresora=TonerImpresion.objects.get(pk=request.POST.get("idimpre"))
            registro.tipo=request.POST.get("tipo")
            registro.cantidadtinta=request.POST.get("tinta")
            registro.hojasactual=request.POST.get("hojas")
            registro.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def ConfiguracionSistema(request):
    if request.method=="GET":
        try:
            datos=ConfiguracionAdministrativa.objects.get(pk=1)
            configuracionporyear=datos.divisiondeyear


            inicio="-"
            ninicio="-"

            final1="-"
            nfinal1="-"
            cantidad1=0
            if datos.cantidad1:
                cantidad1=datos.cantidad1
            final2="-"
            nfinal2="-"
            cantidad2=0
            if datos.cantidad2:
                cantidad2=datos.cantidad2

            final3="-"
            nfinal3="-"
            cantidad3=0
            if datos.cantidad3:
                cantidad3=datos.cantidad3

            final4="-"
            nfinal4="-"
            cantidad4=0
            if datos.cantidad4:
                cantidad4=datos.cantidad4

            if datos.iniciodeasistencia:
                inicio=datos.iniciodeasistencia.id
                ninicio=f"{datos.iniciodeasistencia.dia}-{datos.iniciodeasistencia.mes}"
            if datos.finals1:
                final1=datos.finals1.id
                nfinal1=f"{datos.finals1.dia}-{datos.finals1.mes}"
            if datos.finals2:
                final2=datos.finals2.id
                nfinal2=f"{datos.finals2.dia}-{datos.finals2.mes}"
            if datos.finals3:
                final3=datos.finals3.id
                nfinal3=f"{datos.finals3.dia}-{datos.finals3.mes}"
            if datos.finals4:
                final4=datos.finals4.id
                nfinal4=f"{datos.finals4.dia}-{datos.finals4.mes}"
            
            
            return JsonResponse({"c1":cantidad1,"c2":cantidad2,"c3":cantidad3,"c4":cantidad4,"divisionyear":configuracionporyear,"inicio":inicio,"final1":final1,"final2":final2,"final3":final3,"final4":final4, "ninicio":ninicio,"nfinal1":nfinal1,"nfinal2":nfinal2,"nfinal3":nfinal3,"nfinal4":nfinal4},safe=False)
        except:
            pass
    if request.method=="POST":
        try:
            
            datos=ConfiguracionAdministrativa.objects.get(pk=1)
            calendario=Calendario.objects.filter(ano=2023)
            if int(request.POST.get("division"))!=0:
                datos.divisiondeyear=request.POST.get("division")
            if int(request.POST.get("inicio"))!=0:
                datos.iniciodeasistencia=Calendario.objects.get(pk=request.POST.get("inicio"))
            if int(request.POST.get("f1"))!=0:
                datos.finals1=Calendario.objects.get(pk=request.POST.get("f1"))
            if int(request.POST.get("f2"))!=0:
                datos.finals2=Calendario.objects.get(pk=request.POST.get("f2"))
            if int(request.POST.get("f3"))!=0:
                datos.finals3=Calendario.objects.get(pk=request.POST.get("f3"))
            if int(request.POST.get("f4"))!=0:
                datos.finals4=Calendario.objects.get(pk=request.POST.get("f4"))

            if datos.iniciodeasistencia:
                    datos.cantidad1=0
                    datos.cantidad2=0
                    datos.cantidad3=0
                    datos.cantidad4=0
                    for x in calendario:
                        if datos.finals1:
                            if x.id>=datos.iniciodeasistencia.id and x.id<=datos.finals1.id and x.tipodia==1:
                                datos.cantidad1+=1
                        if datos.finals2:
                            if x.id>datos.finals1.id and x.id<=datos.finals2.id and x.tipodia==1:
                                datos.cantidad2+=1
                        if datos.finals3:
                            if x.id>datos.finals2.id and x.id<=datos.finals3.id and x.tipodia==1:
                                datos.cantidad3+=1
                        if datos.finals4:
                            if x.id>=datos.finals3.id and x.id<=datos.finals4.id and x.tipodia==1:
                                datos.cantidad4+=1

            
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def aplicarferiadosnuevos(request):
    if request.method=="GET":
        try:
            
            datos=ConfiguracionAdministrativa.objects.get(pk=1)
            calendario=Calendario.objects.filter(ano=2023)
            if datos.iniciodeasistencia:
                    datos.cantidad1=0
                    datos.cantidad2=0
                    datos.cantidad3=0
                    datos.cantidad4=0
                    for x in calendario:
                        if datos.finals1:
                            if x.id>=datos.iniciodeasistencia.id and x.id<=datos.finals1.id and x.tipodia==1:
                                datos.cantidad1+=1
                        if datos.finals2:
                            if x.id>datos.finals1.id and x.id<=datos.finals2.id and x.tipodia==1:
                                datos.cantidad2+=1
                        if datos.finals3:
                            if x.id>datos.finals2.id and x.id<=datos.finals3.id and x.tipodia==1:
                                datos.cantidad3+=1
                        if datos.finals4:
                            if x.id>=datos.finals3.id and x.id<=datos.finals4.id and x.tipodia==1:
                                datos.cantidad4+=1

            
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def CreacionMatricula(request):
    if request.method=="POST":
        try:
            
            registro=MatriculaAlumno()
            print("test",flush=True)
            registro.entramite=request.POST.get("Entramite") # si esta en tramite la matricula o no
            print("test2",flush=True)
            registro.yearmatricula=request.POST.get("Year")
            print("test3",flush=True)
            if request.POST.get("Entramite")==0:
                registro.cursodematricula=Cursos.objects.get(pk=request.POST.get("idCurso"))
            print("test4",flush=True)
            print(request.POST.get("Ipa"),flush=True)
            
            if request.POST.get("Ipa")!="":
                if MatriculaAlumno.objects.filter(Q(yearmatricula=request.POST.get("Year")) & Q(ipe=request.POST.get("Ipa"))).exists():
                    print("ya existe",flush=True)
                    return JsonResponse(0,safe=False)
                
            print("test5",flush=True)
            if request.POST.get("Run")!="":
                if MatriculaAlumno.objects.filter(Q(yearmatricula=request.POST.get("Year")) & Q(runalumno=request.POST.get("Run"))).exists():
                    print("ya existe",flush=True)
                    return JsonResponse(0,safe=False)
                
            if request.POST.get("Run")=="" and request.POST.get("Ipa")=="":
                print("no contiene ni rut ni ipa",flush=True)
                return JsonResponse(0,safe=False)
            
            
            registro.runalumno=request.POST.get("Run")
            print("test6",flush=True)
            
            registro.ipe=request.POST.get("Ipa")
            print("test7",flush=True)
            
        
            registro.apellidopaterno=request.POST.get("apellidopaterno")
            
            registro.apellidomaterno=request.POST.get("apellidomaterno")
            registro.nombres=request.POST.get("nombres")
            registro.nacionalidad=request.POST.get("nacionalidad")
            registro.fechanacimiento=request.POST.get("fechanacimiento")
            
            
            
            registro.etnia=request.POST.get("etnia")
            registro.domicilio=request.POST.get("domicilio")
            registro.religion=request.POST.get("religion")
            registro.comuna=request.POST.get("comuna")
            registro.sexo=request.POST.get("sexo")
            registro.telefono=request.POST.get("telefono")
            print("test8",flush=True)
            if type(request.POST.get("edad"))== int:
                registro.edad=request.POST.get("edad")
            else:
                registro.edad=0
            registro.vivecon=request.POST.get("vivecon")
            
            
            registro.quienmatricula=request.POST.get("quienmatricula")
            registro.estudiantenuevo=request.POST.get("estudiante")
            registro.sistemadematricula=request.POST.get("Tipodematricula") #si es rematricula, lista de espera o sae
            registro.correoinstitucional=request.POST.get("correoinstitucional")
            
            registro.padreapellidos=request.POST.get("apellidospadre")
            registro.padrerun=request.POST.get("runpadre")
            registro.padrenombres=request.POST.get("nombrespadre")
            registro.padreipa=request.POST.get("ipapadre")
            registro.padrenacionalidad=request.POST.get("nacionalidadpadre")
            registro.padrenpasaporte=request.POST.get("pasaportepadre")
            registro.padredomicilio=request.POST.get("domiciliopadre")
            registro.padreestudios=request.POST.get("estudiospadre")
            registro.padrecomuna=request.POST.get("comunapadre")
            registro.padreocupacion=request.POST.get("ocupacionpadre")
            registro.padreapoderado=request.POST.get("apoderadopadre")
            registro.padretelefono1=request.POST.get("telefono1padre")
            registro.padretelefono2=request.POST.get("telefono2padre")
            registro.padreemail=request.POST.get("emailpadre")
            
            registro.madreapellidos=request.POST.get("apellidosmadre")
            registro.madrerun=request.POST.get("runmadre")
            registro.madrenombres=request.POST.get("nombresmadre")
            registro.madreipa=request.POST.get("ipamadre")
            registro.madrenacionalidad=request.POST.get("nacionalidadmadre")
            registro.madrenpasaporte=request.POST.get("pasaportemadre")
            registro.madredomicilio=request.POST.get("domiciliopadre")
            registro.madreestudios=request.POST.get("estudiosmadre")
            registro.madrecomuna=request.POST.get("comunamadre")
            registro.madreocupacion=request.POST.get("ocupacionmadre")
            registro.madreapoderado=request.POST.get("apoderadomadre")
            registro.madretelefono1=request.POST.get("telefono1madre")
            registro.madretelefono2=request.POST.get("telefono2madre")
            registro.madreemail=request.POST.get("emailmadre")
            
            registro.establecimientoprocedencia=request.POST.get("establecimientoprocedencia")
            registro.ultimoyearcursado=request.POST.get("ultimoyearcursado")
            registro.cursosqueharepetido=request.POST.get("ultimocursocursado")
            registro.perteneceaproyectodeintegracionescolar=request.POST.get("pertenecepie")
            registro.optaporreligion=request.POST.get("optaporreligion")
            registro.optaporuncredo=request.POST.get("optaporcredo")
            
            registro.tienejunaeb=""
            registro.becaindigena=request.POST.get("becaindigena")
            registro.otrabeca=request.POST.get("otrabeca")
            
            registro.perteneceprogramasocial=request.POST.get("perteneceprogramasocial")
            registro.prioritario=request.POST.get("prioritario")
            registro.preferente=request.POST.get("preferente")
            registro.registrosocialdehogares=request.POST.get("registrosocialdehogares")
            
            registro.sistemadesalud=request.POST.get("sistemadesalud")
            registro.consultorioocesfam=request.POST.get("ceonsultoriocesfam")
            registro.hijoconimpedimentofisico=request.POST.get("diagnosticomedico")
            registro.enfermedadcronica=request.POST.get("enfermedadcronica")
            registro.alergico=request.POST.get("alergico")
            registro.tomamedicamento=request.POST.get("Medicamento")
            registro.encasodeemergenciacomunicarsecon=request.POST.get("CasoEmergencia")
            
            if request.POST.get("AceptoReglamentoInterno")=="true":
                registro.conoceyaceptareglamentointernodelestablecimiento=True
            else:
                registro.conoceyaceptareglamentointernodelestablecimiento=False

            if request.POST.get("AceptoReglamentoEvaluacion")=="true":
                registro.conoceyaceptareglamentodeevaluaciondelestablecimiento=True
            else:
                registro.conoceyaceptareglamentodeevaluaciondelestablecimiento=False

            if request.POST.get("AceptoHuella")=="true":
                registro.aceptoelusoderegistrodehuellaconfinesderegistrodehorario=True
            else:
                registro.aceptoelusoderegistrodehuellaconfinesderegistrodehorario=False

            if request.POST.get("AceptoReligion")=="true":
                registro.encuestaparalaasistenciadereligion=True
            else:
                registro.encuestaparalaasistenciadereligion=False

            if request.POST.get("AceptoProtocolo19")=="true":
                registro.aceptolosprotocoloscontraelcovid19=True
            else:
                registro.aceptolosprotocoloscontraelcovid19=False

            if request.POST.get("AsistirReuniones")=="true":
                registro.asistiratodaslasreunionescitacionesollamadas=True
            else:
                registro.asistiratodaslasreunionescitacionesollamadas=False

            if request.POST.get("CumplirHorarios")=="true":
                registro.cumplirhorariodeentradaysalida=True
            else:
                registro.cumplirhorariodeentradaysalida=False
            
            if request.POST.get("JustificarInasistencias")=="true":
                registro.justificarinasistenciascondocumentospertinentes=True
            else:
                registro.justificarinasistenciascondocumentospertinentes=False

            if request.POST.get("RevisarInfo")=="true":
                registro.revisaryresponderinformacionmediantemediosdecomunicacion=True
            else:
                registro.revisaryresponderinformacionmediantemediosdecomunicacion=False
            
            if request.POST.get("ParticiparActivamente")=="true":
                registro.particaendiferentesactividadesprogramadasporelestablecimiento=True
            else:
                registro.particaendiferentesactividadesprogramadasporelestablecimiento=False

            
            registro.perteneceaproyectodeintegracionescolar="No"
            registro.perteneceprogramasocial="No"
            registro.prioritario="No"
            registro.preferente="No"
            registro.registrosocialdehogares="No"
            registro.becaindigena="No"
            registro.otrabeca="No"

            registro.save()
                
            return JsonResponse(registro.id,safe=False)
        except Exception as e:
            pass

def EditarMatricula(request):
    if request.method=="POST":
        try:

            registro=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))

            registro.runalumno=request.POST.get("Run")
            registro.ipe=request.POST.get("Ipa")
        
            registro.apellidopaterno=request.POST.get("apellidopaterno")
            
            registro.apellidomaterno=request.POST.get("apellidomaterno")
            registro.nombres=request.POST.get("nombres")
            registro.nacionalidad=request.POST.get("nacionalidad")
           
            
            if request.POST.get("fechanacimiento"):
                registro.fechanacimiento=request.POST.get("fechanacimiento")
            
            
            
            registro.etnia=request.POST.get("etnia")
            registro.domicilio=request.POST.get("domicilio")
            registro.religion=request.POST.get("religion")
            registro.comuna=request.POST.get("comuna")
            registro.sexo=request.POST.get("sexo")
            registro.telefono=request.POST.get("telefono")
            if request.POST.get("edad"):
                registro.edad=request.POST.get("edad")

            registro.vivecon=request.POST.get("vivecon")
            
            
            registro.quienmatricula=request.POST.get("quienmatricula")
            #registro.estudiantenuevo=request.POST.get("estudiante")
            registro.sistemadematricula=request.POST.get("Tipodematricula") #si es rematricula, lista de espera o sae
            registro.correoinstitucional=request.POST.get("correoinstitucional")
            
            registro.padreapellidos=request.POST.get("apellidospadre")
            registro.padrerun=request.POST.get("runpadre")
            registro.padrenombres=request.POST.get("nombrespadre")
            registro.padreipa=request.POST.get("ipapadre")
            registro.padrenacionalidad=request.POST.get("nacionalidadpadre")
            registro.padrenpasaporte=request.POST.get("pasaportepadre")
            registro.padredomicilio=request.POST.get("domiciliopadre")
            registro.padreestudios=request.POST.get("estudiospadre")
            registro.padrecomuna=request.POST.get("comunapadre")
            registro.padreocupacion=request.POST.get("ocupacionpadre")
            registro.padreapoderado=request.POST.get("apoderadopadre")
            registro.padretelefono1=request.POST.get("telefono1padre")
            registro.padretelefono2=request.POST.get("telefono2padre")
            registro.padreemail=request.POST.get("emailpadre")
            
            registro.madreapellidos=request.POST.get("apellidosmadre")
            registro.madrerun=request.POST.get("runmadre")
            registro.madrenombres=request.POST.get("nombresmadre")
            registro.madreipa=request.POST.get("ipamadre")
            registro.madrenacionalidad=request.POST.get("nacionalidadmadre")
            registro.madrenpasaporte=request.POST.get("pasaportemadre")
            registro.madredomicilio=request.POST.get("domiciliopadre")
            registro.madreestudios=request.POST.get("estudiosmadre")
            registro.madrecomuna=request.POST.get("comunamadre")
            registro.madreocupacion=request.POST.get("ocupacionmadre")
            registro.madreapoderado=request.POST.get("apoderadomadre")
            registro.madretelefono1=request.POST.get("telefono1madre")
            registro.madretelefono2=request.POST.get("telefono2madre")
            registro.madreemail=request.POST.get("emailmadre")
            
            registro.establecimientoprocedencia=request.POST.get("establecimientoprocedencia")
            registro.ultimoyearcursado=request.POST.get("ultimoyearcursado")
            registro.cursosqueharepetido=request.POST.get("ultimocursocursado")
            registro.perteneceaproyectodeintegracionescolar=request.POST.get("pertenecepie")
            registro.optaporreligion=request.POST.get("optaporreligion")
            registro.optaporuncredo=request.POST.get("optaporcredo")
            
            registro.becaindigena=request.POST.get("becaindigena")
            registro.otrabeca=request.POST.get("otrabeca")
            
            registro.perteneceprogramasocial=request.POST.get("perteneceprogramasocial")
            registro.prioritario=request.POST.get("prioritario")
            registro.preferente=request.POST.get("preferente")
            registro.registrosocialdehogares=request.POST.get("registrosocialdehogares")
           
            registro.sistemadesalud=request.POST.get("sistemadesalud")
            registro.consultorioocesfam=request.POST.get("ceonsultoriocesfam")
            registro.hijoconimpedimentofisico=request.POST.get("diagnosticomedico")
            registro.enfermedadcronica=request.POST.get("enfermedadcronica")
            registro.alergico=request.POST.get("alergico")
            registro.tomamedicamento=request.POST.get("Medicamento")
            registro.encasodeemergenciacomunicarsecon=request.POST.get("CasoEmergencia")
            
            registro.save()
            
            return JsonResponse("ok",safe=False)
        except Exception as e:
            pass

def ImportacionMasivaMatriculas(request):
    if request.method=="POST":
        try:
            lista=json.loads(request.POST.get("datinis"))
            
            for x in lista:
                registro=MatriculaAlumno()
                
                registro.yearmatricula=x["year"]
                registro.cursodematricula=Cursos.objects.get(pk=int(x['curso']))
                
                if x["ipa"]!="-":
                    if MatriculaAlumno.objects.filter(Q(yearmatricula=x["year"]) & Q(ipe=x["ipa"])).exists():
                        print("ya existe uwu",flush=True)
                        continue

                if x["run"]!="-":
                    if MatriculaAlumno.objects.filter(Q(yearmatricula=x["year"]) & Q(runalumno=x["run"])).exists():
                        print("ya existe uwu",flush=True)
                        continue
                    
                if x["run"]=="-" and x["ipa"]=="-":
                    print("no contiene ni rut ni ipa",flush=True)
                    continue
                
                print("no existe owo",flush=True)
                registro.runalumno=x['run']
                
                
                registro.ipe=x['ipa']

                
            
                registro.apellidopaterno=x["apellidopaterno"]
                
                registro.apellidomaterno=x["apellidomaterno"]
                registro.nombres=x["nombres"]
                registro.nacionalidad=x["nacionalidad"]
                registro.fechanacimiento=x["fechanacimiento"]
                
                
                
                registro.etnia=x["etnia"]
                registro.domicilio=x["domicilio"]
                registro.religion=x["religion"]
                registro.comuna=x["comuna"]
                registro.sexo=x["sexo"]
                registro.telefono=x["telefono"]
                if type(x["edad"])== int:
                    registro.edad=x["edad"]
                else:
                    registro.edad=0
                registro.vivecon=x["vivecon"]
                

                registro.quienmatricula=x["quienmatricula"]
                registro.estudiantenuevo=x["estudiante"]
                registro.sistemadematricula=x["smatricula"]
                registro.correoinstitucional=x["correoinstitucional"]
                
                registro.padreapellidos=x["apellidospadre"]
                registro.padrerun=x["runpadre"]
                registro.padrenombres=x["nombrespadre"]
                registro.padreipa=x["ipapadre"]
                registro.padrenacionalidad=x["nacionalidadpadre"]
                registro.padrenpasaporte=x["pasaportepadre"]
                registro.padredomicilio=x["domiciliopadre"]
                registro.padreestudios=x["estudiospadre"]
                registro.padrecomuna=x["comunapadre"]
                registro.padreocupacion=x["ocupacionpadre"]
                registro.padreapoderado=x["apoderadopadre"]
                registro.padretelefono1=x["telefono1padre"]
                registro.padretelefono2=x["telefono2padre"]
                registro.padreemail=x["emailpadre"]

                registro.madreapellidos=x["apellidosmadre"]
                registro.madrerun=x["runmadre"]
                registro.madrenombres=x["nombresmadre"]
                registro.madreipa=x["ipamadre"]
                registro.madrenacionalidad=x["nacionalidadmadre"]
                registro.madrenpasaporte=x["pasaportemadre"]
                registro.madredomicilio=x["domiciliopadre"]
                registro.madreestudios=x["estudiosmadre"]
                registro.madrecomuna=x["comunamadre"]
                registro.madreocupacion=x["ocupacionmadre"]
                registro.madreapoderado=x["apoderadomadre"]
                registro.madretelefono1=x["telefono1madre"]
                registro.madretelefono2=x["telefono2madre"]
                registro.madreemail=x["emailmadre"]

                registro.establecimientoprocedencia=x["establecimientoprocedencia"]
                registro.ultimoyearcursado=x["ultimoyearcursado"]
                registro.cursosqueharepetido=x["ultimocursocursado"]
                registro.perteneceaproyectodeintegracionescolar=x["pertenecepie"]
                registro.optaporreligion=x["optaporreligion"]
                registro.optaporuncredo=x["optaporcredo"]
                
                registro.tienejunaeb=""
                registro.becaindigena=x["becaindigena"]
                registro.otrabeca=x["otrabeca"]
                
                registro.perteneceprogramasocial=x["perteneceprogramasocial"]
                registro.prioritario=x["prioritario"]
                registro.preferente=x["preferente"]
                registro.registrosocialdehogares=x["registrosocialdehogares"]
                
                registro.sistemadesalud=x["sistemadesalud"]
                registro.consultorioocesfam=x["ceonsultoriocesfam"]
                registro.hijoconimpedimentofisico=x["diagnosticomedico"]
                registro.enfermedadcronica=x["enfermedadcronica"]
                registro.alergico=x["alergico"]
                registro.tomamedicamento=x["tomamedicamento"]
                registro.encasodeemergenciacomunicarsecon=x["encasodeemergencia"]
                
                
                
                registro.save()
                
            
            
            

            return JsonResponse("ok",safe=False)
        except Exception as e:
            pass

def ListadoLibrosCra(request):
    if request.method=="GET":
        try:
            datos=LibrosCra.objects.all()
            data=[]
            for x in datos:
                
                    data.append({
                        "id":x.id,
                        "nombre":x.nombre,
                        "cantidad":x.cantidad,
                        "codigobarra":x.codigobarra,
                        
                    })
                

            return JsonResponse(data,safe=False)
        except:
            pass
    
def PeticionesLibrosCRA(request):
    if request.method=="GET":
        try:
            datos=PeticionesLibrosCra.objects.all()
            data=[]
            for x in datos:
                if x.idprofesor==None:
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idlibro":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombrelibro":x.idproducto.nombre,
                        "nombrealumno":x.idalumno.nombres,
                        "nombreprofesor":"-"
                        
                    })
                if x.idalumno==None:
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idlibro":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombrelibro":x.idproducto.nombre,
                        "nombrealumno":"-",
                        "nombreprofesor":x.idprofesor.user
                        
                    })

            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            

            datos=PeticionesLibrosCra.objects.get(pk=request.POST.get("idpeticion"))
            datos.estado=request.POST.get("estado")
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def MisPeticionesLibrosCRA(request):
    if request.method=="POST":
        try:
            datos=PeticionesLibrosCra.objects.filter(idprofesor=request.POST.get("idprofesor")).order_by("estado")
            data=[]
            for x in datos:
                
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idlibro":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombrelibro":x.idproducto.nombre,
                        
                    })
            return JsonResponse(data,safe=False)
        except:
            pass
def MisPeticionesProductosCRA(request):
    if request.method=="POST":
        try:
            datos=PeticionesProductoCra.objects.filter(idprofesor=request.POST.get("idprofesor")).order_by("estado")
            data=[]
            for x in datos:
                
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idequipo":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombreequipo":x.idproducto.nombre,
                        
                    })
            return JsonResponse(data,safe=False)
        except:
            pass

def PeticionesEquipoCRA(request):
    if request.method=="GET":
        try:
            datos=PeticionesProductoCra.objects.all()
            data=[]
            for x in datos:
                if x.idprofesor==None:
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idlibro":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombrelibro":x.idproducto.nombre,
                        "nombrealumno":x.idalumno.nombres,
                        "nombreprofesor":"-"
                        
                    })
                if x.idalumno==None:
                    data.append({
                        "id":x.id,
                        "estado":x.estado,
                        "cantidad":x.cantidad,
                        "categoria":x.idproducto.idcategoria.nombre,
                        "idlibro":x.idproducto.id,
                        "fechapeticion":x.fechapeticion,
                        "codigobarra":x.idproducto.codigobarra,
                        "imagen":x.idproducto.imagen.url,
                        "nombrelibro":x.idproducto.nombre,
                        "nombrealumno":"-",
                        "nombreprofesor":x.idprofesor.user
                        
                    })

            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            

            datos=PeticionesProductoCra.objects.get(pk=request.POST.get("idpeticion"))
            datos.estado=request.POST.get("estado")
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass


def CrearPeticionesLibrosCRA(request):
    if request.method=="POST":
        try:
            
            registro=PeticionesLibrosCra()
            registro.estado=1
            registro.cantidad=1
            
            registro.idproducto=LibrosCra.objects.get(pk=request.POST.get("idproducto"))
            if request.POST.get("idprofesor"):
                registro.idprofesor=Usuario.objects.get(pk=request.POST.get("idprofesor"))
            if request.POST.get("idalumno"):
                registro.idalumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))
            
            registro.fechapeticion=datetime.now()
            cantidad=registro.idproducto.cantidad
            
            peticiones=PeticionesLibrosCra.objects.filter(idproducto=registro.idproducto).exclude(estado=3)
            for x in peticiones:
                cantidad-=x.cantidad
            if(cantidad<=0):
                return JsonResponse("No disponible",safe=False)

            registro.save()
            
            return JsonResponse("Pedido",safe=False)
        except:
            pass

def CrearPeticionesEquiposCRA(request):
    if request.method=="POST":
        try:
            
            registro=PeticionesProductoCra()
            registro.estado=1
            registro.cantidad=1
            
            registro.idproducto=ProductoCra.objects.get(pk=request.POST.get("idproducto"))
            if request.POST.get("idprofesor"):
                registro.idprofesor=Usuario.objects.get(pk=request.POST.get("idprofesor"))
            if request.POST.get("idalumno"):
                registro.idalumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))
            
            registro.fechapeticion=datetime.now()
            cantidad=registro.idproducto.cantidad
            
            peticiones=PeticionesProductoCra.objects.filter(idproducto=registro.idproducto).exclude(estado=3)
            for x in peticiones:
                cantidad-=x.cantidad
            if(cantidad<=0):
                return JsonResponse("No disponible",safe=False)

            registro.save()
            
            return JsonResponse("Pedido",safe=False)
        except:
            pass
    

def Listado_Usuarios(request):
    if request.method=="GET":
        try:
            datos=Usuario.objects.all()
            data=[]
            for x in datos:

                if x.permisos==None:
                    data.append({
                        "id":x.id,
                        "nombres":x.nombres,
                        "apellidos":x.apellidos,
                        "email":x.email,
                        "nombrepermiso":None,
                        "idpermiso":None,
                    })
                else:
                    data.append({
                        "id":x.id,
                        "nombres":x.nombres,
                        "apellidos":x.apellidos,
                        "email":x.email,
                        "nombrepermiso":x.permisos.nombre,
                        "idpermiso":x.permisos.id,
                    })
                
            return JsonResponse(data,safe=False)
        except:
            pass
    
    if request.method=="POST":
        try:
            

            datos=PeticionesProductoCra.objects.get(pk=request.POST.get("idpeticion"))
            datos.estado=request.POST.get("estado")
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def ObtenerHorarioLaboral(request):
    if request.method=="GET":
        
            datos=HorarioLaboral.objects.all()
            print(datos,flush=True)
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "iduser":x.idusuario.id,
                    "lunes":x.lunes,
                    "entradalunes":x.entradalunes,
                    "salidalunes":x.salidalunes,

                    "martes":x.martes,
                    "entradamartes":x.entradamartes,
                    "salidamartes":x.salidamartes,

                    "miercoles":x.miercoles,
                    "entradamiercoles":x.entradamiercoles,
                    "salidamiercoles":x.salidamiercoles,

                    "jueves":x.jueves,
                    "entradajueves":x.entradajueves,
                    "salidajueves":x.salidajueves,

                    "viernes":x.viernes,
                    "entradaviernes":x.entradaviernes,
                    "salidaviernes":x.salidaviernes,

                    "sabado":x.sabado,
                    "entradasabado":x.entradasabado,
                    "salidasabado":x.salidasabado,

            })

            
            return JsonResponse(data,safe=False)
        
def EditarUsuario(request):
    if request.method=="POST":
        try:
            datos=Usuario.objects.get(pk=request.POST.get("id"))
            if request.POST.get("Nombres"):
                datos.nombres=request.POST.get("Nombres")
            if request.POST.get("Apellidos"):
                datos.apellidos=request.POST.get("Apellidos")
            if request.POST.get("Password"):
                datos.password= make_password(request.POST.get("Password"))
            if request.POST.get("Email"):
                datos.email=request.POST.get("Email")
            if int(request.POST.get("idpermiso")==0):
                datos.permisos=None
            else:
                datos.permisos=PermisosUsuarios.objects.get(pk=request.POST.get("idpermiso"))
            datos.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def AsignarPerfilPermisos(request):
    if request.method=="POST":
        try:
            
            registro=Usuario.objects.get(pk=request.POST.get("iduser"))
            
            if int(request.POST.get("idpermisos"))==0:
                registro.permisos=None
            else:
                registro.permisos=PermisosUsuarios.objects.get(pk=request.POST.get("idpermisos"))
            registro.save()
            return JsonResponse("ok",safe=False)
        except:
            pass

def ObtenerPerfilPermisos(request):
    if request.method=="GET":
        try:
            
            registro=PermisosUsuarios.objects.all()
            datos=[]
            for x in registro:
                datos.append({
                    "id":x.id,
                    "nombre":x.nombre,
                    "noticias":x.pnoticias,
                    "reservasalas":x.preservasalas,
                    "impresiones":x.pimpresiones,
                    "cra":x.pcra,
                    "asistencias":x.pasistencia,
                    "calificaiones":x.pcalificaciones,
                    "matricula":x.pmatricula,
                    "calendario":x.pcalendario,
                    "junaeb":x.pjunaeb,
                    "admin":x.padmin,

                })
            
            
            return JsonResponse(datos,safe=False)
        except:
            pass
def CrearPerfilPermisos(request):
    if request.method=="POST":
        try:
            
            registro=PermisosUsuarios()
            registro.nombre=request.POST.get("nombre")
            registro.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def EditarPerfilPermisos(request):
    if request.method=="POST":
        try:
            
            registro=PermisosUsuarios.objects.get(pk=request.POST.get("id"))

            if request.POST.get("nombre"):
                registro.nombre=request.POST.get("nombre")
            
            if request.POST.get("noticias")=="true":
                registro.pnoticias=1
            else:
                registro.pnoticias=0

            if request.POST.get("reservasalas")=="true":
                registro.preservasalas=1
            else:
                registro.preservasalas=0

            if request.POST.get("impresiones"):
                registro.pimpresiones=int(request.POST.get("impresiones"))
            

            if request.POST.get("cra"):
                registro.pcra=int(request.POST.get("cra"))


            if request.POST.get("asistencia")=="true":
                registro.pasistencia=1
            else:
                registro.pasistencia=0

            if request.POST.get("calificaciones")=="true":
                registro.pcalificaciones=1
            else:
                registro.pcalificaciones=0

            if request.POST.get("matricula")=="true":
                registro.pmatricula=1
            else:
                registro.pmatricula=0

            if request.POST.get("calendario"):
                registro.pcalendario=int(request.POST.get("calendario"))


            if request.POST.get("junaeb")=="true":
                registro.pjunaeb=1
            else:
                registro.pjunaeb=0
            
            if request.POST.get("admin")=="true":
                registro.padmin=1
            else:
                registro.padmin=0
            



            registro.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def EliminarPerfilPermisos(request):
    if request.method=="POST":
        try:
            
            registro=PermisosUsuarios.objects.get(pk=request.POST.get("id"))
            
            registro.delete()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def CrearUsuario(request):
    if request.method=="POST":
        try:
            if Usuario.objects.filter(email=request.POST.get("Email")).exists():
                return JsonResponse("duplicado",safe=False)
            registro=Usuario()
            registro.nombres=request.POST.get("Nombres")
            registro.apellidos=request.POST.get("Apellidos")
            registro.email=request.POST.get("Email")
            registro.password= make_password(request.POST.get("Password"))
            if int(request.POST.get("idpermiso"))==0:
                registro.permisos=None
            else:
                registro.permisos=PermisosUsuarios.objects.get(pk=request.POST.get("idpermiso"))
            registro.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def CrearUsuarioMasivo(request):
    if request.method=="POST":
        try:

            datos=json.loads(request.POST.get("datinis"))
            for x in datos:
                
                if Usuario.objects.filter(email=x[2]).exists():
                    continue
                registro=Usuario()
                registro.nombres=x[0]
                registro.apellidos=x[1]
                registro.email=x[2]
                registro.password= make_password(x[1])
                registro.permisos=None

                registro.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def ListaDeEspera(request):
    if request.method=="GET":
       

            datos=RegistroPublico.objects.all().order_by("fechaemision")
            config=ConfiguracionAdministrativa.objects.get(pk=1)
            datinis=[]

            for x in datos:
                
                if x.matricula==None:
                    datinis.append({
                    "id":x.id,
                    "year":x.year,
                    "estado":x.estado,
                    "fechaemision":x.fechaemision,
                    "fechaaceptacion":x.fechaaceptacion,
                    "idmatricula":None,
                    "nombrecurso":x.curso

                    })
                else:
                    print(x.matricula.cursodematricula,flush=True)
                    datinis.append({
                        "id":x.id,
                        "year":x.year,
                        "estado":x.estado,
                        "fechaemision":x.fechaemision,
                        "fechaaceptacion":x.fechaaceptacion,
                        "idmatricula":x.matricula.id,
                        "nombrecurso":x.curso,
                        "nombrealumno":f"{str(x.matricula.apellidopaterno or '')} {str(x.matricula.apellidomaterno or '')} {str(x.matricula.nombres or '')}",

                        "madrenombre":f"{str(x.matricula.madreapellidos or '')} {str(x.matricula.madrenombres or '')}",
                        "madretelefono":f"{str(x.matricula.madretelefono1 or '')} {str(x.matricula.madretelefono2 or '')}",
                        "madrecorreo":x.matricula.madreemail,

                        "padrenombre":f"{str(x.matricula.padreapellidos or '')} {str(x.matricula.padrenombres or '')}",
                        "padretelefono":f"{str(x.matricula.padretelefono1 or '')} {str(x.matricula.padretelefono2 or '')}",
                        "padrecorreo":x.matricula.padreemail,


                    })
                

              
            
            return JsonResponse({"config":config.iniciodelistadeespera,"activo":config.listaesperaactivo,"datinis":datinis},safe=False)
       
    if request.method=="POST":
        try:

            datos=RegistroPublico()
            datos.year=request.POST.get("Year")
            datos.estado=1
            datos.curso=request.POST.get("curso")
            datos.fechaemision=datetime.now()
            datos.matricula=MatriculaAlumno.objects.get(pk=request.POST.get("idmatricula"))
            datos.save()
            
                

              
            
            return JsonResponse("ok",safe=False)
        except:
            pass


def EditarListaDeEspera(request):
    
    if request.method=="POST":
        try:
            
            datos=RegistroPublico.objects.get(pk=request.POST.get("id"))
            
            datos.estado=int(request.POST.get("estado"))
            datos.fechaaceptacion=datetime.now()
            datos.save()

            matricula=None

            if datos.matricula:
                if datos.estado==0:
                    matricula=MatriculaAlumno.objects.get(pk=datos.matricula.id)
                    matricula.delete()
                elif datos.estado==2:
                    matricula=MatriculaAlumno.objects.get(pk=datos.matricula.id)
                    matricula.entramite=0
                    matricula.cursodematricula=Cursos.objects.get(pk=request.POST.get("curso"))
                    matricula.save()

            return JsonResponse("ok",safe=False)
        except:
            pass

def ObtenerDatosAlumnos(request):
    
    if request.method=="POST":
        try:
            
            datos=MatriculaAlumno.objects.get(pk=request.POST.get("id"))
            alumno=[]
            if datos.entramite==0 or datos.entramite==None or datos.entramite=="":
                alumno=[{
                    "apellidopaterno":datos.apellidopaterno,
                    "runalumno":datos.runalumno,
                    "apellidomaterno":datos.apellidomaterno,
                    "ipe":datos.ipe,
                    "nombres":datos.nombres,
                    "nacionalidad":datos.nacionalidad,
                    "fechanacimiento":datos.fechanacimiento,
                    "etnia":datos.etnia,
                    "domicilio":datos.domicilio,
                    "religion":datos.religion,
                    "comuna":datos.comuna,
                    "sexo":datos.sexo,
                    "telefono":datos.telefono,
                    "edad":datos.edad,
                    "vivecon":datos.vivecon,
                    "curso":datos.cursodematricula.nombre,
                    "quienmatricula":datos.quienmatricula,
                    "estudiantenuevo":datos.estudiantenuevo,
                    "sistemadematricula":datos.sistemadematricula,
                    "correoinstitucional":datos.correoinstitucional,

                    "padreapellidos":datos.padreapellidos,
                    "padrerun":datos.padrerun,
                    "padrenombres":datos.padrenombres,
                    "padreipa":datos.padreipa,
                    "padrenacionalidad":datos.padrenacionalidad,
                    "padrenpasaporte":datos.padrenpasaporte,
                    "padredomicilio":datos.padredomicilio,
                    "padreestudios":datos.padreestudios,
                    "padrecomuna":datos.padrecomuna,
                    "padreocupacion":datos.padreocupacion,
                    "padretelefono1":datos.padretelefono1,
                    "padreapoderado":datos.padreapoderado,
                    "padretelefono2":datos.padretelefono2,
                    "padreemail":datos.padreemail,


                    "madreapellidos":datos.madreapellidos,
                    "madrerun":datos.madrerun,
                    "madrenombres":datos.madrenombres,
                    "madreipa":datos.madreipa,
                    "madrenacionalidad":datos.madrenacionalidad,
                    "madrenpasaporte":datos.madrenpasaporte,
                    "madredomicilio":datos.madredomicilio,
                    "madreestudios":datos.madreestudios,
                    "madrecomuna":datos.madrecomuna,
                    "madreocupacion":datos.madreocupacion,
                    "madretelefono1":datos.madretelefono1,
                    "madreapoderado":datos.madreapoderado,
                    "madretelefono2":datos.madretelefono2,
                    "madreemail":datos.madreemail,

                    "establecimientoprocedencia":datos.establecimientoprocedencia,
                    "ultimoyearcursado":datos.ultimoyearcursado,
                    "cursosqueharepetido":datos.cursosqueharepetido,
                    "perteneceaproyectodeintegracionescolar":datos.perteneceaproyectodeintegracionescolar,
                    "optaporreligion":datos.optaporreligion,
                    "optaporuncredo":datos.optaporuncredo,


                    "sistemadesalud":datos.sistemadesalud,
                    "consultorioocesfam":datos.consultorioocesfam,
                    "hijoconimpedimentofisico":datos.hijoconimpedimentofisico,
                    "enfermedadcronica":datos.enfermedadcronica,
                    "alergico":datos.alergico,
                    "tomamedicamento":datos.tomamedicamento,
                    "encasodeemergenciacomunicarsecon":datos.encasodeemergenciacomunicarsecon,

                    "conoceyaceptareglamentointernodelestablecimiento":datos.conoceyaceptareglamentointernodelestablecimiento,
                    "conoceyaceptareglamentodeevaluaciondelestablecimiento":datos.conoceyaceptareglamentodeevaluaciondelestablecimiento,
                    "aceptoelusoderegistrodehuellaconfinesderegistrodehorario":datos.aceptoelusoderegistrodehuellaconfinesderegistrodehorario,
                    "encuestaparalaasistenciadereligion":datos.encuestaparalaasistenciadereligion,
                    "aceptolosprotocoloscontraelcovid19":datos.aceptolosprotocoloscontraelcovid19,

                    "asistiratodaslasreunionescitacionesollamadas":datos.asistiratodaslasreunionescitacionesollamadas,
                    "cumplirhorariodeentradaysalida":datos.cumplirhorariodeentradaysalida,
                    "justificarinasistenciascondocumentospertinentes":datos.justificarinasistenciascondocumentospertinentes,
                    "revisaryresponderinformacionmediantemediosdecomunicacion":datos.revisaryresponderinformacionmediantemediosdecomunicacion,
                    "particaendiferentesactividadesprogramadasporelestablecimiento":datos.particaendiferentesactividadesprogramadasporelestablecimiento,


                }]
            else:
                alumno=[{
                    "apellidopaterno":datos.apellidopaterno,
                    "runalumno":datos.runalumno,
                    "apellidomaterno":datos.apellidomaterno,
                    "ipe":datos.ipe,
                    "nombres":datos.nombres,
                    "nacionalidad":datos.nacionalidad,
                    "fechanacimiento":datos.fechanacimiento,
                    "etnia":datos.etnia,
                    "domicilio":datos.domicilio,
                    "religion":datos.religion,
                    "comuna":datos.comuna,
                    "sexo":datos.sexo,
                    "telefono":datos.telefono,
                    "edad":datos.edad,
                    "vivecon":datos.vivecon,
                    "curso":"-",
                    "quienmatricula":datos.quienmatricula,
                    "estudiantenuevo":datos.estudiantenuevo,
                    "sistemadematricula":datos.sistemadematricula,
                    "correoinstitucional":datos.correoinstitucional,

                    "padreapellidos":datos.padreapellidos,
                    "padrerun":datos.padrerun,
                    "padrenombres":datos.padrenombres,
                    "padreipa":datos.padreipa,
                    "padrenacionalidad":datos.padrenacionalidad,
                    "padrenpasaporte":datos.padrenpasaporte,
                    "padredomicilio":datos.padredomicilio,
                    "padreestudios":datos.padreestudios,
                    "padrecomuna":datos.padrecomuna,
                    "padreocupacion":datos.padreocupacion,
                    "padretelefono1":datos.padretelefono1,
                    "padreapoderado":datos.padreapoderado,
                    "padretelefono2":datos.padretelefono2,
                    "padreemail":datos.padreemail,


                    "madreapellidos":datos.madreapellidos,
                    "madrerun":datos.madrerun,
                    "madrenombres":datos.madrenombres,
                    "madreipa":datos.madreipa,
                    "madrenacionalidad":datos.madrenacionalidad,
                    "madrenpasaporte":datos.madrenpasaporte,
                    "madredomicilio":datos.madredomicilio,
                    "madreestudios":datos.madreestudios,
                    "madrecomuna":datos.madrecomuna,
                    "madreocupacion":datos.madreocupacion,
                    "madretelefono1":datos.madretelefono1,
                    "madreapoderado":datos.madreapoderado,
                    "madretelefono2":datos.madretelefono2,
                    "madreemail":datos.madreemail,

                    "establecimientoprocedencia":datos.establecimientoprocedencia,
                    "ultimoyearcursado":datos.ultimoyearcursado,
                    "cursosqueharepetido":datos.cursosqueharepetido,
                    "perteneceaproyectodeintegracionescolar":datos.perteneceaproyectodeintegracionescolar,
                    "optaporreligion":datos.optaporreligion,
                    "optaporuncredo":datos.optaporuncredo,


                    "sistemadesalud":datos.sistemadesalud,
                    "consultorioocesfam":datos.consultorioocesfam,
                    "hijoconimpedimentofisico":datos.hijoconimpedimentofisico,
                    "enfermedadcronica":datos.enfermedadcronica,
                    "alergico":datos.alergico,
                    "tomamedicamento":datos.tomamedicamento,
                    "encasodeemergenciacomunicarsecon":datos.encasodeemergenciacomunicarsecon,

                    "conoceyaceptareglamentointernodelestablecimiento":datos.conoceyaceptareglamentointernodelestablecimiento,
                    "conoceyaceptareglamentodeevaluaciondelestablecimiento":datos.conoceyaceptareglamentodeevaluaciondelestablecimiento,
                    "aceptoelusoderegistrodehuellaconfinesderegistrodehorario":datos.aceptoelusoderegistrodehuellaconfinesderegistrodehorario,
                    "encuestaparalaasistenciadereligion":datos.encuestaparalaasistenciadereligion,
                    "aceptolosprotocoloscontraelcovid19":datos.aceptolosprotocoloscontraelcovid19,

                    "asistiratodaslasreunionescitacionesollamadas":datos.asistiratodaslasreunionescitacionesollamadas,
                    "cumplirhorariodeentradaysalida":datos.cumplirhorariodeentradaysalida,
                    "justificarinasistenciascondocumentospertinentes":datos.justificarinasistenciascondocumentospertinentes,
                    "revisaryresponderinformacionmediantemediosdecomunicacion":datos.revisaryresponderinformacionmediantemediosdecomunicacion,
                    "particaendiferentesactividadesprogramadasporelestablecimiento":datos.particaendiferentesactividadesprogramadasporelestablecimiento,


                }]
            
            return JsonResponse(alumno,safe=False)
        except:
            pass

def ActivarListaEspera(request):
    
    if request.method=="POST":
        try:
            config=ConfiguracionAdministrativa.objects.get(pk=1)
            
            if request.POST.get("inicio"):
                config.iniciodelistadeespera=request.POST.get("inicio")

            if request.POST.get("activo"):
                config.listaesperaactivo=request.POST.get("activo")

            config.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def ImportacionLibrosMasivo(request):
    if request.method=="POST":
        try:
            datos=json.loads(request.POST.get("datinis"))
            for x in datos:
                registro=LibrosCra()
                if LibrosCra.objects.filter(Q(nombre=x[0]) & Q(autor=x[1]) & Q(editorial=x[2])).exists():
                    continue
                registro.nombre=x[0]
                registro.autor=x[1]
                registro.editorial=x[2]
                registro.yearedicion=x[3]
                registro.isbn=x[4]
                if x[5]==None:
                    registro.cursodestinado=""
                else:
                    registro.cursodestinado=x[5]
                if CategoriaLibrosCra.objects.filter(nombre=x[6]).first():
                    registro.idcategoria=CategoriaLibrosCra.objects.get(nombre=x[6])
                else:
                    registro.idcategoria=None
                registro.cantidad=x[7]
                registro.descripcion=x[8]
                registro.posicion=x[9]
                if x[10]==None:
                    registro.codigobarra=""
                else:
                    registro.codigobarra=x[10]
                registro.Activo=0
                registro.save()

            return JsonResponse("ok",safe=False)
        except:
            pass


def CrearLibroFinal(request):
    if request.method=="POST":
        try:

            datos=LibrosCra()
            

            datos.idcategoria=CategoriaLibrosCra.objects.get(pk=request.POST.get("idcategoria"))

            datos.nombre=request.POST.get("titulo")
            datos.autor=request.POST.get("autor")
            datos.cantidad=request.POST.get("cantidad")
            datos.descripcion=request.POST.get("descripcion")
            datos.posicion=request.POST.get("posicion")
            datos.codigobarra=request.POST.get("codigobarra")
            print("wa",flush=True)
            datos.isbn=request.POST.get("isbn")
            datos.cursodestinado=request.POST.get("cursodestinado")
            datos.yearedicion=request.POST.get("yearedicion")
            datos.editorial=request.POST.get("editorial")
            datos.Activo=0
            print("wa2",flush=True)
            datos.imagen=request.FILES.get("imagen")
            print("wa3",flush=True)
            datos.save()

            

            return JsonResponse("ok",safe=False)
        except:
            pass
def EditarLibroFinal(request):
    if request.method=="POST":
        try:
            print("wa",flush=True)
            datos=LibrosCra.objects.get(pk=request.POST.get("id"))
            print("wa",flush=True)
            if request.POST.get("tipo")=="1":
                datos.idcategoria=CategoriaLibrosCra.objects.get(pk=request.POST.get("idcategoria"))
                datos.save()
            elif request.POST.get("tipo")=="2":
                datos.nombre=request.POST.get("titulo")
                datos.autor=request.POST.get("autor")
                datos.cantidad=request.POST.get("cantidad")
                datos.descripcion=request.POST.get("descripcion")
                datos.posicion=request.POST.get("posicion")
                datos.codigobarra=request.POST.get("codigobarra")

                datos.isbn=request.POST.get("isbn")
                datos.cursodestinado=request.POST.get("cursodestinado")
                datos.yearedicion=request.POST.get("yearedicion")
                datos.editorial=request.POST.get("editorial")
                datos.save()
                print("wa2",flush=True)
            elif request.POST.get("tipo")=="3":
                datos.imagen=request.FILES.get("imagen")
                datos.save()
            

            return JsonResponse("ok",safe=False)
        except:
            pass


def CrearEquipoFinal(request):
    if request.method=="POST":
        try:

            datos=ProductoCra()
            

            datos.idcategoria=CategoriaLibrosCra.objects.get(pk=request.POST.get("idcategoria"))

            datos.nombre=request.POST.get("titulo")
            datos.cantidad=request.POST.get("cantidad")
            datos.descripcion=request.POST.get("descripcion")
            datos.posicion=request.POST.get("posicion")
            datos.codigobarra="E-"+request.POST.get("codigobarra")
            datos.Activo=0
            datos.imagen=request.FILES.get("imagen")
            datos.save()

            

            return JsonResponse("ok",safe=False)
        except:
            pass
def EditarEquipoFinal(request):
    if request.method=="POST":
        try:

            datos=ProductoCra.objects.get(pk=request.POST.get("id"))

            if request.POST.get("tipo")=="1":
                datos.idcategoria=CategoriaProductoCra.objects.get(pk=request.POST.get("idcategoria"))
                datos.save()
            elif request.POST.get("tipo")=="2":
                datos.nombre=request.POST.get("titulo")
                datos.cantidad=request.POST.get("cantidad")
                datos.descripcion=request.POST.get("descripcion")
                datos.posicion=request.POST.get("posicion")
                datos.codigobarra="E-"+request.POST.get("codigobarra")
                datos.save()
                print("wa2",flush=True)
            elif request.POST.get("tipo")=="3":
                datos.imagen=request.FILES.get("imagen")
                datos.save()
            

            return JsonResponse("ok",safe=False)
        except:
            pass


def cambiarportadanoticia(request):
    if request.method=="POST":
        try:

            datos=NoticiasFront.objects.get(pk=request.POST.get("id"))
            datos.imagen=request.FILES.get("imagen")
            datos.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass
def cambiaractivonoticia(request):
    if request.method=="POST":
        try:

            datos=NoticiasFront.objects.get(pk=request.POST.get("id"))
            datos.activo= not datos.activo
            print(request.POST.get("activo"),flush=True)
            datos.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def editaroa(request):
    if request.method=="POST":
        try:

            datos=ObjetivoAprendizaje.objects.get(pk=request.POST.get("id"))
            datos.titulo=request.POST.get("titulo")
            datos.numero=int(request.POST.get("unidad"))
            datos.descripcion=request.POST.get("descripcion")
            datos.save()
            
            return JsonResponse("ok",safe=False)
        except:
            pass
def eliminaroa(request):
    if request.method=="POST":
        try:

            datos=ObjetivoAprendizaje.objects.get(pk=request.POST.get("id"))
            datos.delete()
            
            return JsonResponse("ok",safe=False)
        except:
            pass

def asistenciaalumnoindividual(request):
    if request.method=="POST":
        try:

            datos=AsitenciaAlumno.objects.filter(alumno__pk__contains=request.POST.get("id"))
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "horaasistencias":x.horaasitencias,
                    "horasalida":x.horasalida,
                    "atrasoresuelto":x.atrasoresuelto,
                    "alumno":x.alumno.id,
                    

                })
            
            return JsonResponse(data,safe=False)
        except:
            pass

def ListaAsistenciaDocente(request):
    if request.method=="POST":

            print(request.session['usuario']['id'],flush=True)
            datos=AsistenciaDocente.objects.filter(iddocente=Usuario.objects.get(pk=request.session['usuario']['id']),horaentrada__month=request.POST.get("mes"))
            horario=HorarioLaboral.objects.filter(idusuario=Usuario.objects.get(pk=request.session['usuario']['id'])).values().first()
            #informacionlaboral=HorarioLaboral.objects.get(idusuario=Usuario.objects.get(pk=request.session["usuario"]["id"]))
            data=[]
            for x in datos:
                data.append({
                    "iddocente":x.iddocente.id,
                    "fechaentrada":x.horaentrada,
                    "fechasalida":x.horasalida
                })            
            print(horario,flush=True)
            return JsonResponse({"data":data,"horario":horario},safe=False)
        

def CambiarHorarioLaboral(request):
    if request.method=="POST":

            horario=HorarioLaboral.objects.filter(idusuario=Usuario.objects.get(pk=request.POST.get("idusuario"))).first()
            if horario==None:
                registro=HorarioLaboral()
                registro.idusuario=Usuario.objects.get(pk=request.POST.get("idusuario"))
                registro.year=2023
                registro.lunes=request.POST.get("lunes") == 'true'
                registro.entradalunes= request.POST.get("Elunes") or "00:00"
                registro.salidalunes=request.POST.get("Slunes") or "00:00"

                registro.martes=request.POST.get("martes") == 'true'
                registro.entradamartes=request.POST.get("Emartes") or "00:00"
                registro.salidamartes=request.POST.get("Smartes") or "00:00"

                registro.miercoles=request.POST.get("miercoles") == 'true'
                registro.entradamiercoles=request.POST.get("Emiercoles") or "00:00"
                registro.salidamiercoles=request.POST.get("Smiercoles") or "00:00"

                registro.jueves=request.POST.get("jueves") == 'true'
                registro.entradajueves=request.POST.get("Ejueves") or "00:00"
                registro.salidajueves=request.POST.get("Sjueves") or "00:00"

                registro.viernes=request.POST.get("viernes") == 'true'
                registro.entradaviernes=request.POST.get("Eviernes") or "00:00"
                registro.salidaviernes=request.POST.get("Sviernes") or "00:00"

                registro.sabado=request.POST.get("sabado") == 'true'
                registro.entradasabado=request.POST.get("Esabado") or "00:00"
                registro.salidasabado=request.POST.get("Ssabado") or "00:00"
                registro.save()
            else:
                
                horario.year=2023
                horario.lunes=request.POST.get("lunes") == 'true'
                horario.entradalunes= request.POST.get("Elunes") or "00:00"
                horario.salidalunes=request.POST.get("Slunes") or "00:00"

                horario.martes=request.POST.get("martes") == 'true'
                horario.entradamartes=request.POST.get("Emartes") or "00:00"
                horario.salidamartes=request.POST.get("Smartes") or "00:00"

                horario.miercoles=request.POST.get("miercoles") == 'true'
                horario.entradamiercoles=request.POST.get("Emiercoles") or "00:00"
                horario.salidamiercoles=request.POST.get("Smiercoles") or "00:00"

                horario.jueves=request.POST.get("jueves") == 'true'
                horario.entradajueves=request.POST.get("Ejueves") or "00:00"
                horario.salidajueves=request.POST.get("Sjueves") or "00:00"

                horario.viernes=request.POST.get("viernes") == 'true'
                horario.entradaviernes=request.POST.get("Eviernes") or "00:00"
                horario.salidaviernes=request.POST.get("Sviernes") or "00:00"

                horario.sabado=request.POST.get("sabado") == 'true'
                horario.entradasabado=request.POST.get("Esabado") or "00:00"
                horario.salidasabado=request.POST.get("Ssabado") or "00:00"
                horario.save()
           
            
            return JsonResponse("ok",safe=False)







def profecaja(request):

    return render(request,"ventas/caja.html")


def obtenerproductos(request):
    if request.method=="GET":
        try:
            datos=CajaProducto.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "nombre":x.nombre,
                    "imagen":x.imagen.url,
                    "precio":x.precio,
                    "categoria":x.categoria
                })  
            return JsonResponse(data,safe=False)
        except:
            pass


def obtenerventas(request):
    if request.method=="GET":
        try:
            datos=CajaVenta.objects.all()
            data=[]
            for x in datos:
                data.append({
                    "id":x.id,
                    "tipo_compra":x.tipo_compra,
                    "hora_venta":x.hora_venta,
                    "year":x.hora_venta.year,
                    "mes":x.hora_venta.month,
                    "total":x.total,
                })  
            return JsonResponse(data,safe=False)
        except:
            pass

@csrf_exempt
def crearproducto(request):
    if request.method=="POST":
            try:
                datos=CajaProducto()
                datos.nombre=request.POST.get("nombre")
                datos.precio=request.POST.get("precio")
                print("aqui",flush=True)
                datos.imagen=request.FILES.get("imagen")
                datos.descripcion=request.POST.get("descripcion")
                datos.categoria=request.POST.get("categoria")
                datos.save()
                return JsonResponse("ok",safe=False)
            except:
                pass

@csrf_exempt
def editarproducto(request):
    if request.method=="POST":
            try:
                datos=CajaProducto.objects.get(pk=request.POST.get("id"))
                datos.nombre=request.POST.get("nombre")
                datos.precio=request.POST.get("precio")
                datos.categoria=request.POST.get("categoria")
                datos.save()
                return JsonResponse("ok",safe=False)
            except:
                pass
@csrf_exempt
def eliminarproducto(request):
    if request.method=="POST":
            try:

                datos=CajaProducto.objects.get(pk=request.POST.get("id"))
                datos.delete()
                return JsonResponse("ok",safe=False)
            except:
                pass

@csrf_exempt
def crearventa(request):
    if request.method=="POST":
        try:
            datos=CajaVenta()
            datos.tipo_compra=request.POST.get("tipo_compra")
            datos.total=request.POST.get("total")
            datos.hora_venta=datetime.now()
            datos.save()
            return JsonResponse("ok",safe=False)

        except:
            pass

    