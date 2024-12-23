
from django.shortcuts import render, redirect
from django.http import JsonResponse, FileResponse, HttpResponse
from django.core import serializers


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
from login.decorador import *

@requiere_login
def index(request):

    return render(request, "index.html")

@requiere_login
def pagPedirSalas(request):

    return render(request,"pedirsalas.html")

@requiere_admin
def pagAdministracion(request):

    return render(request,"administracion.html")




#Mostrar Salas Start
@requiere_login
def pagSalas(request):
    source= SalasPedidas.objects.all()
    salaspedidas=serialize("json",source)

    sprofesores= Usuario.objects.all()
    profesores=serialize("json",sprofesores)
    
    salas= Salas.objects.all()
    horarios= Horarios.objects.all()
    
    return render(request, "salas.html",{"Horarios": horarios, "Salas":salas, "SalasPedidas": salaspedidas, "Profesores": profesores} )
#Mostrar Salas End

@requiere_admin
def eliminarSalas(request, id): #eliminar salas
    salas= Salas.objects.get(pk=id)
    salas.delete()
    salas= Salas.objects.all()
    return redirect("AdminSalas")
#Crear Salas End

#Crear Horarios Start
@requiere_admin
def pagAdminHorarios(request):
    horarios = Horarios.objects.all()
    
    return render(request, "adminhorarios.html/",{"Horarios":horarios})

@requiere_admin
def eliminarHorarios(request,id):
    horarios= Horarios.objects.get(pk=id)
    horarios.delete()
    horarios=Horarios.objects.all()
    return redirect("crearHorario")
#Crear Horarios End

#Crear profesor Start
@requiere_admin
def pagAdminProfesor(request):
    profesor = Usuario.objects.all()
    
    return render(request, "adminprofesor.html/",{"Profesor":profesor})


@requiere_admin
def eliminarProfesor(request,id):
    profesor= Usuario.objects.get(pk=id)
    profesor.delete()
    profesor=Usuario.objects.all()
    return redirect("AdminProfesor")
#Crear profesor End


'''
form= FormularioCrearHorario
    if request.method == "POST":
        form= FormularioCrearHorario(request.POST)
        
        if form.is_valid():
            
            form.save()
        return redirect("crearHorario")
    else:
        form= FormularioCrearHorario
'''


# MODULO IMPRESION

@requiere_login
def pagAdminImpresion(request):

    if request.session['usuario']['userPerfil']==2:
        return redirect("VistaCordinador")
    elif request.session['usuario']['userPerfil']==3:
        return redirect("VistaImpresor")
    elif request.session['usuario']['userPerfil']==4:
        return redirect("VistaProfesor")
        
    return render(request,"impresion/adminimpresion.html")

@requiere_login
def pagImpresorImpresion(request):
    peticiones= PeticionesImpresion.objects.filter(estado=3).filter(estado=4).filter(estado=5)

    return render(request,"impresion/impresorimpresion.html",{"Peticion":peticiones})

@requiere_login
def pagCordinadorImpresion(request):
    peticiones= PeticionesImpresion.objects.all()

    return render(request,"impresion/cordinadorimpresion.html",{"Peticion":peticiones})

@requiere_login
def aprobarCordinadorImpresion(request, id):
    peticiones =PeticionesImpresion.objects.get(pk=id)
    peticiones.estado=Estados.objects.get(id=3)
    peticiones.save()
    return redirect("VistaCordinador")

@requiere_login
def rechazarCordinadorImpresion(request, id):
    peticiones =PeticionesImpresion.objects.get(pk=id)
    peticiones.estado=Estados.objects.get(id=4)
    peticiones.save()
    return redirect("VistaCordinador")

@requiere_login
def pagProfesorImpresion(request):
    impresiones=PeticionesImpresion.objects.all()

    return render(request,"impresion/profesorimpresion.html",{"Impresiones":impresiones})



def pagCrearImpresion(request):
    """ id2=request.sesion["usuario"].id
    profesores= Profesores.objects.all(id=id2) """

    profesores= Usuario.objects.all()
    curso= Cursos.objects.all()
    asignaturas= Asignaturas.objects.all()

    return render(request, "impresion/crearimpresion.html/",{"Profesor":profesores,"Curso":curso,"Asignatura":asignaturas})

def formulario_crear_impresion(request):

    for img in request.FILES.getlist("archivo"):
        archivo = img
        fs = FileSystemStorage(location="intranet/static/upload")
        filename= fs.save(archivo.name, archivo)
        uploaded_file_url= fs.url(filename)

        registro= PeticionesImpresion()
        registro.datosProfesor=Usuario.objects.get(id=request.POST.get("profesor"))
        registro.cursoDestinado=Cursos.objects.get(id=request.POST.get("curso"))
        registro.asignatura=Asignaturas.objects.get(id=request.POST.get("asignatura"))
        registro.archivo=filename
        registro.fechaPeticion="2022-02-02" #datetime.datetime.now()
        registro.fechaEstimadaImpresion="2022-02-02"
        registro.cantidadImpresion=int(request.POST.get("hojas"))
        registro.estado=Estados.objects.get(id=1)
        registro.save()

    return redirect("VistaProfesor")