
from datetime import datetime, timedelta
import time
from xml.etree.ElementTree import tostring
from django.urls import reverse
from django.forms import DateInput
from .models import *
from login.models import *
from login.decorador import *
from django.db.models import Q
from django.contrib import messages
from django.utils import timezone
from login.decorador import *


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


#-----------------------HORARIOS--------------------------------

@requiere_login
def RenderHorarios(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)

    return render(request,"pedirsalas/adminhorarios.html",permisos)




#--------------------------SALAS--------------------------------

@requiere_login
def RenderSalas(request):
    if request.session["usuario"]["permisos"]==None:
        return render(request,"noticias.html")
    permiso=PermisosUsuarios.objects.get(pk=request.session["usuario"]["permisos"])
    
    permisos=dicpermisos(permiso)
    
    if permiso.padmin ==0:
        return render(request,"blanco.html",permisos)
    return render(request,"pedirsalas/adminsalas.html",permisos)





