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

            if request.POST.get('nombre'):

                registro = CentroCosto.objects.create(nombre=request.POST.get('nombre'))
                #get values from registro
                registro = CentroCosto.objects.filter(id=registro.id).values()

                return Response(registro,status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("ERRORCINI",e, flush=True)
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
                registro = NivelEducativo.objects.filter(id=registro.id).values()

                return Response(registro, status=status.HTTP_200_OK)
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

                registro = Familia.objects.filter(id=registro.id).values()
                return Response(registro, status=status.HTTP_200_OK)
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

                registro = Grupocampo_activo.objects.filter(id=registro.id).values()
                return Response(registro, status=status.HTTP_200_OK)
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
                registro = Categorizacion.objects.filter(id=registro.id).values()
                return Response( registro, status=status.HTTP_200_OK)
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
                registro = AreaAsignacion.objects.filter(id=registro.id).values()
                return Response(registro,status=status.HTTP_200_OK)
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
                registro = Procendencia.objects.filter(id=registro.id).values()
                return Response(registro,status=status.HTTP_200_OK)
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
                registro = OrigenFondo.objects.filter(id=registro.id).values()
                return Response(registro,status=status.HTTP_200_OK)
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
                registro = EstadoConservacion.objects.filter(id=registro.id).values()
                return Response(registro,status=status.HTTP_200_OK)
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
                registro = Inventariable.objects.filter(id=registro.id).values()
                return Response(registro,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class all_data(APIView):
    def get(self, request):
        try:
            datos = {}
            datos['centro_costo'] = CentroCosto.objects.all().values()
            datos['nivel_educativo'] = NivelEducativo.objects.all().values()
            datos['grupo'] = Grupocampo_activo.objects.all().values()
            datos['categorizacion'] = Categorizacion.objects.all().values()
            datos['area_asignacion'] = AreaAsignacion.objects.all().values()
            datos['salas'] = Salas.objects.all().values()
            datos['procedencia'] = Procendencia.objects.all().values()
            datos['origen_fondo'] = OrigenFondo.objects.all().values()
            datos['estado_conservacion'] = EstadoConservacion.objects.all().values()
            datos['inventariable'] = Inventariable.objects.all().values()

            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class campo_activo(APIView):
    def get(self, request):
        try:
            datos = campo_activo.objects.all().values()
            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            fecha_compra = datetime.strptime(request.POST.get('fecha_compra'), '%d/%m/%Y')
            centro_costo = CentroCosto.objects.get(id=request.POST.get('centro_costo'))
            nivel_educativo = NivelEducativo.objects.get(id=request.POST.get('nivel_educativo'))
            cantidad = request.POST.get('cantidad')
            descripcion = request.POST.get('descripcion')
            grupo = GrupoCampo_activo.objects.get(id=request.POST.get('grupo'))
            categorizacion = Categorizacion.objects.get(id=request.POST.get('categorizacion'))
            numero_serie = request.POST.get('numero_serie')
            codigo_barra = request.POST.get('codigo_barra')
            area_asignacion = AreaAsignacion.objects.get(id=request.POST.get('area_asignacion'))
            sala = Salas.objects.get(id=request.POST.get('sala'))
            valor_total = request.POST.get('valor_total')
            numero_factura = request.POST.get('numero_factura')
            procedencia = Procendencia.objects.get(id=request.POST.get('procedencia'))
            origen_fondo = OrigenFondo.objects.get(id=request.POST.get('origen_fondo'))
            estado_conservacion = EstadoConservacion.objects.get(id=request.POST.get('estado_conservacion'))
            descripcion_baja = request.POST.get('descripcion_baja')
            observaciones = request.POST.get('observaciones')
            inventariable = Inventariable.objects.get(id=request.POST.get('inventariable'))

            registro = campo_activo.objects.create(
                fecha_compra=fecha_compra,
                centro_costo=centro_costo,
                nivel_educativo=nivel_educativo,
                cantidad=cantidad,
                descripcion=descripcion,
                grupo=grupo,
                categorizacion=categorizacion,
                numero_serie=numero_serie,
                codigo_barra=codigo_barra,
                area_asignacion=area_asignacion,
                sala=sala,
                valor_total=valor_total,
                numero_factura=numero_factura,
                procedencia=procedencia,
                origen_fondo=origen_fondo,
                estado_conservacion=estado_conservacion,
                descripcion_baja=descripcion_baja,
                observaciones=observaciones,
                inventariable=inventariable
            )

            return Response({"id_creado" : registro.id},status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

