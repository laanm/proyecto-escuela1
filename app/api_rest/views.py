from django.shortcuts import render
from django.db import models
from django.db.models import Q
import datetime
from datetime import datetime, timedelta, date

# api
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from intranet.models import *
from login.models import *


# Create your views here.
class listado_alumnos(APIView):
    def get(self, request):
        try:
            alumnos = MatriculaAlumno.objects.all().exclude(entramite=1).values().order_by("apellidopaterno")
            return Response(alumnos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class listado_alumnos_junaeb(APIView):
    def get(self, request):
        try:
            alumnos = MatriculaAlumno.objects.filter(tienejunaeb="Si").values()
            return Response(alumnos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class listado_asistencia(APIView):
    def get(self, request):
        try:
            asistencia = Asistencia.objects.all().values()
            return Response(asistencia, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class asistencia_lista(APIView):
    def get(self, request):
        try:
            hoy=datetime.now()
            laborales=0
            
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            calendario=Calendario.objects.filter(ano=hoy.year).order_by("id")
            if not calendario:
                return Response("Configurar Calendario", status=status.HTTP_200_OK)
            if not configuracion:
                return Response("Configurar Tipo de año", status=status.HTTP_200_OK)
            if not configuracion.iniciodeasistencia:
                return Response("Configurar Inicio de asistencia", status=status.HTTP_200_OK)

            for x in calendario:
                if hoy.day==x.dia and hoy.month==x.mes:
                    if x.tipodia==1:
                        laborales+=1
                    break
                if x.id>=configuracion.iniciodeasistencia.id and x.tipodia==1:
                    
                    laborales+=1
                
            cursos=Cursos.objects.all()
            cursos2=[]
            final=[]
            cantidad=0
            acumulado=0
            temp=0
            temp2=0
            #registro=MatriculaAlumno.objects.filter(yearmatricula=request.POST.get("year"))
            registro=MatriculaAlumno.objects.filter(yearmatricula=hoy.year)
            for x in cursos:
                cursos2.append({
                    "idcurso":x.id,
                    "nombrecurso":x.nombre,
                    "acumulado":0,
                    "cantidad":0,
                    "porcentaje":0,
                })

            for x in registro:
                for i in cursos:
                    if x.cursodematricula.id==i.id:
                        #inicio del borrado
                        for j in final:
                            if j["idcurso"]==i.id:
                                temp=j["acumulado"]
                                temp2=j["cantidad"]
                                break

                        datos = {
                            "idcurso":i.id,
                            "nombrecurso":i.nombre,
                            "acumulado":x.diasasistidos1+x.diasasistidos2+x.diasasistidos3+x.diasasistidos4+temp,
                            "cantidad":1+temp2
                        }

                        print("datos",datos, flush=True)

                        final.append(datos)
                        temp=0
                        temp2=0
                        #final del borrado

                        """
                        for y in cursos2:

                            if y["idcurso"]==i.id:
                                y["cantidad"]+=1
                                y["acumulado"]+=x.diasasistidos1+x.diasasistidos2+x.diasasistidos3+x.diasasistidos4
                                y["porcentaje"]=(y["acumulado"]/y["cantidad"])/(laborales)*100
                        """

                        
                        
            
            return Response((laborales,final), status=status.HTTP_200_OK)            
            #este es el bueno return Response(cursos2, status=status.HTTP_200_OK)
        except Exception as e:
            print("error",e, flush=True)
            return Response(status=status.HTTP_400_BAD_REQUEST)



class listado_notas(APIView):
    def get(self, request):
        try:
            notas = NotasAlumno.objects.all().values()
            return Response(notas, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class listado_cursos(APIView):
    def get(self, request):
        try:
            cursos = Cursos.objects.all().values()
            return Response(cursos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class listado_libros_cra(APIView):
    def get(self, request):
        try:
            datos=LibrosCra.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class listado_productos_cra(APIView):
    def get(self, request):
        try:
            datos=ProductoCra.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class crear_asistencia(APIView):
    def post(self, request):
        try:
            configuracion=ConfiguracionAdministrativa.objects.get(pk=1)
            inicio=datetime.today().replace(year=configuracion.iniciodeasistencia.ano,month=configuracion.iniciodeasistencia.mes,day=configuracion.iniciodeasistencia.dia)
            primer=datetime.today().replace(year=configuracion.finals1.ano,month=configuracion.finals1.mes,day=configuracion.finals1.dia)
            segun=datetime.today().replace(year=configuracion.finals2.ano,month=configuracion.finals2.mes,day=configuracion.finals2.dia)
            tercer=datetime.today().replace(year=configuracion.finals3.ano,month=configuracion.finals3.mes,day=configuracion.finals3.dia)

            hoy=datetime.today()
            alumno=request.POST.get("idalumno")
            datos=AsitenciaAlumno.objects.filter(horaasitencias__year=hoy.year,horaasitencias__month=hoy.month,horaasitencias__day=hoy.day,alumno=MatriculaAlumno.objects.get(pk=alumno))
            if datos:
                return Response("duplicado", status=status.HTTP_200_OK)
            registro=AsitenciaAlumno()
            registro.alumno=MatriculaAlumno.objects.get(pk=alumno)
            
            if hoy>=inicio:
                if hoy<=primer:
                    registro.alumno.diasasistidos1+=1
                    registro.alumno.save()
                elif hoy<=segun:
                    registro.alumno.diasasistidos2+=1
                    registro.alumno.save()
                elif hoy<=tercer:
                    registro.alumno.diasasistidos3+=1
                    registro.alumno.save()
            elif hoy.day==inicio.day and hoy.month==inicio.month and hoy.year==inicio.year:
                datos.alumno.diasasistidos1+=1
                datos.alumno.save()

            registro.horaasitencias=hoy
            registro.save()
            return Response("asistenciacreada", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class crear_huella(APIView):
    def post(self, request):
        try:
            
            alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))
            alumno.huella=request.POST.get("huella")
            
            alumno.save()
            
            return Response("huellaregistrada", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class crear_solicitud_libro(APIView):
    def post(self, request):
        try:
            
            registro=PeticionesLibrosCra()
            registro.estado=2
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
                return Response("No disponible", status=status.HTTP_200_OK)

            registro.save()
            
            return Response("Pedido", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class devolver_libro(APIView):
    def post(self, request):
        try:
            
            registro=PeticionesLibrosCra.objects.get(Q(idproducto=request.POST.get("idproducto")) & Q(idalumno=request.POST.get("idalumno")) & Q(estado=2))
            registro.estado=3

            registro.save()
            
            return Response("Devuelto", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class crear_solicitud_producto(APIView):
    def post(self, request):
        try:
            
            registro=PeticionesProductoCra()
            registro.estado=2
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
                return Response("No disponible", status=status.HTTP_200_OK)

            registro.save()
            
            return Response("Pedido", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class devolver_producto(APIView):
    def post(self, request):
        try:
            
            registro=PeticionesProductoCra.objects.get(Q(idproducto=request.POST.get("idproducto")) & Q(idalumno=request.POST.get("idalumno"))& Q(estado=2))
            registro.estado=3

            registro.save()
            
            return Response("Devuelto", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class crear_registro_junaeb(APIView):
    def post(self, request):
        try:
            
            registro=HistorialJunaeb()
            registro.alumno=MatriculaAlumno.objects.get(pk=request.POST.get("idalumno"))

            if registro.alumno.niveljunaeb==1 and request.POST.get("nivel")=="2":
                return Response("duplicado", status=status.HTTP_200_OK)
            
            if registro.alumno.niveljunaeb==2 and request.POST.get("nivel")=="1":
                return Response("duplicado", status=status.HTTP_200_OK)

            registro.ncomida=request.POST.get("nivel")
            registro.fecha=datetime.now()

            if HistorialJunaeb.objects.filter(alumno=registro.alumno,
            fecha__year=registro.fecha.year,
            fecha__month=registro.fecha.month,
            fecha__day=registro.fecha.day,
            ncomida=registro.ncomida
            ).exists():

                return Response("duplicado", status=status.HTTP_200_OK)

            registro.save()
            
            return Response("ok", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def actualizar(request):
    #import os
    #ejectuar el comando de actualizacion git
    os.system("git pull origin main")
    return HttpResponse("Actualizado")
