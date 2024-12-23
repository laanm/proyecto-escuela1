from .models import *
from login.models import *
from login.decorador import *
from django.db.models import Q

def dicpermisos(x):
    
    permisos={
        "pnoticias":x.pnoticias,
        "preservasalas":x.preservasalas,
        "pimpresiones":x.pimpresiones,
        "pcra":x.pcra,
        "pasistencias":x.pasistencia,
        "pcalificaciones":x.pcalificaciones,
        "pmatricula":x.pmatricula,
        "pcalendario":x.pcalendario,
        "pjunaeb":x.pjunaeb,
        "padmin":x.padmin
    }
    return permisos

def RenderCrearUsuario(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)

    return render(request,"administracion/crearusuario.html",permisos)

#def PostCrearUsuario esta en login:UsuarioNuevo

#----------------------------ASIGNATURAS-------------------------------------------

@requiere_login
def RenderAsignaturas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion/asignaturas.html",permisos)

@requiere_admin
def RenderCrearAsignatura(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion/crearasignaturas.html",permisos)

@requiere_admin
def CrearAsignatura(request):
    
    registro= Asignaturas()
    
    registro.nombre=request.POST.get("nombre")
    registro.save()
    return redirect("RenderAsignaturas")

@requiere_admin
def EliminarAsignatura(request, id):
    asignatura=Asignaturas.objects.get(pk=id)
    asignatura.delete()
    asignatura=Asignaturas.objects.all()
    return redirect("RenderAsignaturas")

#---------------------------ASIGNAR PROFESOR---------------------------------------

@requiere_login
def RenderSeleccionarProfesor(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)

    return render(request,"administracion/seleccionarprofesor.html",permisos)

@requiere_admin
def RenderAsignaturasProfesor(request):
    idprofe=request.GET.get("profesor")
    asignaturas=AsignaturasAsignadas.objects.only("idasignatura").filter(idprofe=idprofe)
    ids=[]
    for x in asignaturas:
        ids.append(x.idasignatura.id)
    
    allasignaturas=Asignaturas.objects.exclude(id__in=ids)
    profesor=Usuario.objects.get(pk=idprofe)
    
    return render(request,"administracion/asignaturasprofesor.html",{"Asignaturas":asignaturas,"TodasAsignaturas":allasignaturas,"Profesor":profesor})

@requiere_admin
def PostAsignaturasProfesor(request):

        if AsignaturasAsignadas.objects.filter(Q(idprofe=request.POST.get("profesor")) & Q(idasignatura=request.POST.get("asignatura"))).exists():
            return redirect("login:errordatos")

        else:

            registro= AsignaturasAsignadas()
            registro.idprofe=Usuario.objects.get(pk=request.POST.get("profesor"))
            registro.idasignatura=Asignaturas.objects.get(pk=request.POST.get("asignatura"))
            registro.save()
            
            return redirect(f"/AsignaturasProfe/?profesor={request.POST.get('profesor')}")
            #return redirect("url EliminarAsignatura", reques.POST.get("profesor")) posiblemente malo xdxdxd

@requiere_admin
def EliminarAsignaturasProfesor(request,id):
    asignatura=AsignaturasAsignadas.objects.get(pk=id)
    profesor=Usuario.objects.get(pk=asignatura.idprofe.id)
    asignatura.delete()
    asignatura=AsignaturasAsignadas.objects.all()

    asignaturas=AsignaturasAsignadas.objects.filter(idprofe=profesor.id)
    allasignaturas=Asignaturas.objects.all()

    return redirect(f"/AsignaturasProfe/?profesor={profesor.id}")



#-------------------------------------Curso----------------------------------------

@requiere_login
def RenderCursos(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)

    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"administracion/cursos.html",permisos)

