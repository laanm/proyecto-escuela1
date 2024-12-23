from datetime import datetime
from posixpath import splitext
import django
from django.db.models import Q
from .models import *
from login.models import *
from login.decorador import *
from django.core.files.storage import FileSystemStorage
import time
from django.core.mail import send_mail
from django.conf import settings

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

@requiere_login
def RenderAdminImpresion(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones ==0:
        return render(request,"blanco.html",permisos)

    if permiso.pimpresiones ==1:
        return redirect("RenderVistaProfesor")
    elif permiso.pimpresiones ==2:
        return redirect("RenderVistaCordinador")
    elif permiso.pimpresiones ==3:
        return redirect("RenderVistaImpresor")
    elif permiso.pimpresiones ==4:
        return render(request,"impresion/adminimpresion.html",permisos)
    


#------------------IMPRESOR-----------------
@requiere_login
def RenderVistaImpresor(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=3 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)

    return render(request,"impresion/impresorimpresion.html",permisos)

@requiere_login
def RenderHistorialImpresor(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=3 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)
    

    return render(request,"impresion/historialimpresor.html",permisos)
#-------------------------------------------

#--------------CORDINADOR----------------
@requiere_login
def RenderVistaCordinador(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=2 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)
    
    return render(request,"impresion/cordinadorimpresion.html",permisos)
@requiere_login
def RenderHistorialCordinador(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=2 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)
    
    return render(request,"impresion/historialcordinador.html",permisos)
#-----------------------------------------


#--------------PROFESOR------------------
@requiere_login
def RenderVistaProfesor(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=1 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)
    return render(request,"impresion/profesorimpresion.html",permisos)
@requiere_login
def RenderHistorialProfesor(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.pimpresiones !=1 and permiso.pimpresiones !=4:
        return render(request,"blanco.html",permisos)

    return render(request,"impresion/historialprofesor.html",permisos)
#------------------------------------------


@requiere_login
def RenderCrearImpresion(request):

    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    profesor=Usuario.objects.get(pk=request.session['usuario']['id'])

    curso= Cursos.objects.all()
    asignaturas= AsignaturasAsignadas.objects.filter(idprofe=request.session['usuario']['id'])

    return render(request, "impresion/crearimpresion.html/",{"Profesor":profesor,"Curso":curso,"Asignatura":asignaturas})

@requiere_login
def CrearImpresion(request):

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
        registro.fechaPeticion=datetime.now()
        
        registro.cantidadImpresion=int(request.POST.get("hojas"))
       
        
        titulo="Solicitud Impresion"
        mensaje=f"El profesor {registro.datosProfesor} ha solicitado impresiones para {registro.cursoDestinado}"
        
        if str(registro.cursoDestinado).find("Medio"):
            lista=["cplec.basica@lecentral.cl","cplec.media@lecentral.cl"]
        else:
            lista["cplec.basica@lecentral.cl "]

        emisor=settings.EMAIL_HOST_USER

        if datetime.now().hour >=17:
            registro.estado=Estados.objects.get(id=1)
        else:
            registro.estado=Estados.objects.get(id=2)
            send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",lista)
            
        registro.save()
        
        
    return HttpResponse("uploaded")

@requiere_login
def EliminarImpresion(request, id):
    registro=PeticionesImpresion.objects.get(pk=id)
    registro.delete()
    return redirect("RenderVistaProfesor")

@requiere_login
def Aprobar(request, id):
    registro=PeticionesImpresion.objects.get(pk=id)
    registro.estado=Estados.objects.get(pk=3)
    print(datetime.now())
    registro.fechaEstimadaImpresion=datetime.now()
    registro.cordinador=Usuario.objects.get(pk=request.session['usuario']['id'])
    registro.save()

    titulo="Tu solicitud fue aprobada"
    mensaje=f"Tu impresion para {registro.asignatura} en {registro.cursoDestinado} fue aprobada por {registro.cordinador}"
    emisor=settings.EMAIL_HOST_USER
    receptor=[registro.datosProfesor.email]
    send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",receptor)
    titulo="Nueva solicitud aprobada"
    mensaje=f"Nueva impresion para {registro.datosProfesor} en {registro.cursoDestinado}"
    receptor=["maria.cortes@lecentral.cl"]
    send_mail(titulo,mensaje,f"Sistema Impresion LEC <{emisor}>",receptor)
    return redirect("RenderVistaCordinador")

@requiere_login
def Rechazar(request, id):
    registro=PeticionesImpresion.objects.get(pk=id)
    registro.estado=Estados.objects.get(pk=4)
    registro.fechaEstimadaImpresion=datetime.now()
    registro.cordinador=Usuario.objects.get(pk=request.session['usuario']['id'])
    registro.save()
    titulo="Tu solicitud fue rechazada"
    mensaje=f"Tu impresion para {registro.asignatura} en {registro.cursoDestinado} ha sido rechazada por {registro.cordinador}"
    emisor=settings.EMAIL_HOST_USER
    receptor=[registro.datosProfesor.email]
    send_mail(titulo,mensaje,f"Sistema Impresión LEC <{emisor}>",receptor)
    
    return redirect("RenderVistaCordinador")

@requiere_login
def Impreso(request, id):
    registro=PeticionesImpresion.objects.get(pk=id)
    registro.estado=Estados.objects.get(pk=5)
    registro.save()
    titulo="Tu solicitud fue impreso"
    mensaje=f"Tu impresion para {registro.asignatura} en {registro.cursoDestinado}"
    emisor=settings.EMAIL_HOST_USER
    receptor=[registro.datosProfesor.email]
    send_mail(titulo,mensaje,f"Sistema Impresión <{emisor}>",receptor)
    
    return redirect("RenderVistaImpresor")

@requiere_login
def Entregado(request, id):
    registro=PeticionesImpresion.objects.get(pk=id)
    registro.estado=Estados.objects.get(pk=6)
    registro.save()

    return redirect("RenderVistaImpresor")