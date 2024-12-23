from django.shortcuts import render
from django.db import models

# api

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from intranet.models import *
from . models import *
from django.db.models import Sum, Count, Avg, Max, Min




# Create your views here.

def resumen(request):
    metabase 
    if metabase.objects.filter(id=1).exists():
        metabase = metabase.objects.get(id=1)
    else:
        metabase = metabase.objects.create(id=1)
    return render(request, 'inventario/resumen.html',metabase)

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
            datos['familias'] = Familia.objects.all().values()

            return Response(datos, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class bien(APIView):
    def get(self, request):
        try:
            datos = campo_activo.objects.all()

            data = []

            for dato in datos:
                data.append([
                    dato.id,
                    dato.fecha,
                    dato.fecha_compra,
                    dato.centro_costo.nombre,
                    dato.nivel_educativo.nombre,
                    dato.cantidad,
                    dato.descripcion,
                    dato.grupo.nombre,
                    dato.categorizacion.nombre,
                    dato.numero_serie,
                    dato.codigo_barra,
                    dato.area_asignacion.nombre,
                    dato.sala.nombre,
                    dato.valor_total,
                    dato.numero_factura,
                    dato.rut_proveedor,
                    dato.procedencia.nombre,
                    dato.origen_fondo.nombre,
                    dato.estado_conservacion.nombre,
                    dato.descripcion_baja,
                    dato.observaciones,
                    dato.inventariable.nombre,
                    ])

            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            fecha_compra = request.POST.get('fecha_compra')
            centro_costo = CentroCosto.objects.get(id=request.POST.get('centro_costo'))
            nivel_educativo = NivelEducativo.objects.get(id=request.POST.get('nivel_educativo'))
            cantidad = request.POST.get('cantidad')
            descripcion = request.POST.get('descripcion')
            grupo = Grupocampo_activo.objects.get(id=request.POST.get('grupo'))
            categorizacion = Categorizacion.objects.get(id=request.POST.get('categorizacion'))
            numero_serie = request.POST.get('numero_serie')
            codigo_barra = request.POST.get('codigo_barra')
            area_asignacion = AreaAsignacion.objects.get(id=request.POST.get('area_asignacion'))
            sala = Salas.objects.get(id=request.POST.get('sala'))
            valor_total = request.POST.get('valor_total')
            numero_factura = request.POST.get('numero_factura')
            rut_proveedor = request.POST.get('rut_proveedor')
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
        except Exception as e:
            print(e, flush=True)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class resumen_data(APIView):
    def get(self, request):
        try:
            datos = campo_activo.objects.all()

            #compras del año
            year = 2022
            #compras del mes
            compras = {
                'enero' : 0,
                'febrero' : 0,
                'marzo' : 0,
                'abril' : 0,
                'mayo' : 0,
                'junio' : 0,
                'julio' : 0,
                'agosto' : 0,
                'septiembre' : 0,
                'octubre' : 0,
                'noviembre' : 0,
                'diciembre' : 0,
            }

            #valor total de las compras
            compras_enero = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=1).aggregate(Sum('valor_total'))

            if compras_enero['valor_total__sum'] is not None:
                compras['enero'] = compras_enero['valor_total__sum']

            compras_febrero = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=2).aggregate(Sum('valor_total'))

            if compras_febrero['valor_total__sum'] is not None:
                compras['febrero'] = compras_febrero['valor_total__sum']

            compras_marzo = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=3).aggregate(Sum('valor_total'))

            if compras_marzo['valor_total__sum'] is not None:
                compras['marzo'] = compras_marzo['valor_total__sum']

            compras_abril= campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=4).aggregate(Sum('valor_total'))

            if compras_abril['valor_total__sum'] is not None:
                compras['abril'] = compras_abril['valor_total__sum']

            compras_mayo = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=5).aggregate(Sum('valor_total'))

            if compras_mayo['valor_total__sum'] is not None:
                compras['mayo'] = compras_mayo['valor_total__sum']

            compras_junio = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=6).aggregate(Sum('valor_total'))

            if compras_junio['valor_total__sum'] is not None:
                compras['junio'] = compras_junio['valor_total__sum']

            compras_julio = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=7).aggregate(Sum('valor_total'))

            if compras_julio['valor_total__sum'] is not None:
                compras['julio'] = compras_julio['valor_total__sum']

            compras_agosto = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=8).aggregate(Sum('valor_total'))

            if compras_agosto['valor_total__sum'] is not None:
                compras['agosto'] = compras_agosto['valor_total__sum']

            compras_septiembre = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=9).aggregate(Sum('valor_total'))

            if compras_septiembre['valor_total__sum'] is not None:
                compras['septiembre'] = compras_septiembre['valor_total__sum']

            compras_octubre = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=10).aggregate(Sum('valor_total'))

            if compras_octubre['valor_total__sum'] is not None:
                compras['octubre'] = compras_octubre['valor_total__sum']

            compras_noviembre = campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=11).aggregate(Sum('valor_total'))

            if compras_noviembre['valor_total__sum'] is not None:
                compras['noviembre'] = compras_noviembre['valor_total__sum']

            compras_diciembre= campo_activo.objects.filter(fecha_compra__year=year, fecha_compra__month=12).aggregate(Sum('valor_total'))

            if compras_diciembre['valor_total__sum'] is not None:
                compras['diciembre'] = compras_diciembre['valor_total__sum']


            #clasificacion de los activos
            #obtener la suma filtrando por centro de costo
            #centro de costo 1

            centros_de_costo = CentroCosto.objects.all()
            info_centro_costo = []

            for centro in centros_de_costo:

                suma = campo_activo.objects.filter(centro_costo=centro.id).aggregate(Sum('valor_total'))

                info_centro_costo.append({
                    'id' : centro.id,
                    'nombre' : centro.nombre,
                    'valor_total' : suma['valor_total__sum'] or 0
                })


            data = {
                'compras' : compras,
                "centro_costo" : info_centro_costo,
            }


            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e, flush=True)
            return Response(status=status.HTTP_400_BAD_REQUEST)