from django.shortcuts import render, redirect
from django.http import JsonResponse, FileResponse, HttpResponse
# Create your views here.


#AQUI TIENE QUE CREAR LAS FUNCIONES PARA LLAMARLAS EN LAS RUTAS.PY

def index(request):

    return render(request,'index.html')

def pagdocumentos(request):
    return render(request,"documentos.html")