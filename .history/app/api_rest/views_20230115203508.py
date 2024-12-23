from django.shortcuts import render
from django.db import models
from django.db.models import Q
import datetime
from datetime import datetime, timedelta

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
            alumnos = MatriculaAlumno.objects.all().values()
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
            final=[]
            temp=0
            temp2=0
            #registro=MatriculaAlumno.objects.filter(yearmatricula=request.POST.get("year"))
            registro=MatriculaAlumno.objects.filter(yearmatricula=hoy.year)

            for x in registro:
                for i in cursos:
                    if x.cursodematricula.id==i.id:

                        #if exist in final

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
            
                        
            return Response((laborales,final), status=status.HTTP_200_OK)
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
            hoy=datetime.today()
            alumno=request.POST.get("idalumno")
            datos=AsitenciaAlumno.objects.filter(horaasitencias__year=hoy.year,horaasitencias__month=hoy.month,horaasitencias__day=hoy.day,alumno=MatriculaAlumno.objects.get(pk=alumno))
            if datos:
                return Response("duplicado", status=status.HTTP_200_OK)
            registro=AsitenciaAlumno()
            registro.alumno=MatriculaAlumno.objects.get(pk=alumno)
            registro.horaasitencias=hoy
            if((registro.horaasitencias.hour>=8 and registro.horaasitencias.minute>=1) or registro.horaasitencias.hour>=9):
                registro.atrasoresuelto==True #esto es que esta asistencia esta atrasada
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
 