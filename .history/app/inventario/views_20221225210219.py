from django.shortcuts import render
from django.db import models

# api

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from intranet.models import *
from . models import *



# Create your views here.

def resumen(request):
    return render(request, 'inventario/resumen.html')

def inventario(request):
    return render(request, 'inventario/inventario.html')

class centro_costo(APIView):

    def get(self, request):

        try:

            centro_de_costo = CentroCosto.objects.all().values()

            return Response(centro_de_costo, status=status.HTTP_200_OK)

        except:

            return Response(status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):

        try:

            if request.POST.get('id'):

                centro_de_costo = CentroCosto.objects.get(id=request.POST.get('id'))

                centro_de_costo.nombre = request.POST.get('nombre')

                if request.POST.get('campo_activo'):

                    if request.POST.get('campo_activo') == 'true':

                        centro_de_costo.campo_activo = True

                    else:

                        centro_de_costo.campo_activo = False

                centro_de_costo.save()

                return Response(status=status.HTTP_200_OK)

            else:

                centro_de_costo = CentroCosto.objects.create(nombre=request.POST.get('nombre'))

                centro_de_costo.save()

                return Response(status=status.HTTP_200_OK)

        except:

            return Response(status=status.HTTP_400_BAD_REQUEST)

class nivel_educativo(APIView):
    def get(self, request):
        try:
            datos = NivelEducativo.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = NivelEducativo.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = NivelEducativo.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class familia(APIView):
    def get(self, request):
        try:
            datos = Familia.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Familia.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Familia.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class grupo(APIView):
    def get(self, request):
        try:
            datos = Grupo.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Grupo.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Grupo.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class grupo_activo(APIView):
    def get(self, request):
        try:
            datos = Grupocampo_activo.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Grupocampo_activo.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Grupocampo_activo.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class categorizacion(APIView):
    def get(self, request):
        try:
            datos = Categorizacion.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Categorizacion.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Categorizacion.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class area_asignacion(APIView):
    def get(self, request):
        try:
            datos = AreaAsignacion.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = AreaAsignacion.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = AreaAsignacion.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class procedencia(APIView):
    def get(self, request):
        try:
            datos = Procendencia.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Procendencia.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Procendencia.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class origen_fondo(APIView):
    def get(self, request):
        try:
            datos = OrigenFondo.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = OrigenFondo.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = OrigenFondo.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class estado_conservacion(APIView):
    def get(self, request):
        try:
            datos = EstadoConservacion.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = EstadoConservacion.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = EstadoConservacion.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class inventariable(APIView):
    def get(self, request):
        try:
            datos = Inventariable.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            if request.POST.get('id'):
                registro = Inventariable.objects.get(id=request.POST.get('id'))
                registro.nombre = request.POST.get('nombre')
                if request.POST.get('campo_activo'):
                    if request.POST.get('campo_activo') == 'true':
                        registro.campo_activo = True
                    else:
                        registro.campo_activo = False
                registro.save()
                return Response(status=status.HTTP_200_OK)
            else:
                registro = Inventariable.objects.create(nombre=request.POST.get('nombre'))
                registro.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


