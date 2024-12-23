from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from login.models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from login.decorador import *
from django.db.models import Q
import json
from django.core.serializers import serialize





def loginForm(request):
    # si existe sesion iniciada nos envia al sitio de inicio
    try:
        if request.session['usuario']:

            """if request.session['usuario']['userPerfil']==2:
                return redirect("RenderVistaCordinador")
            elif request.session['usuario']['userPerfil']==3:
                return redirect("RenderVistaImpresor")
            elif request.session['usuario']['userPerfil']==4:
                return redirect("RenderPedirSalas")"""

            return redirect('pagNoticias')
    except Exception as e:
        print(e)
        pass

    err = request.GET.get('err')
    send_error = 0
    if err:
        send_error = err
    print("error: ",send_error)
    return render(request,'login/login.html',{'error':send_error})

def error(request):
    return render(request,'login/error.html')

def newUser(request):
    
    userName = request.POST.get('user')
    userPass = request.POST.get('pass')
    userEmail = request.POST.get('email')
    userPerfil = request.POST.get('perfil')
    
    #comprobar si existe
    if Usuario.objects.filter(Q(user=userName) | Q(email=userEmail)).exists() == False and Usuario.objects.filter(email=userEmail).exists() == False:

        registro = Usuario()
        registro.user = userName
        registro.password = make_password(userPass)
        registro.email = userEmail
        registro.perfil = Perfiles.objects.get(id=userPerfil)
        registro.save()

        return redirect("RenderCrearUsuario")

    else: 
        return redirect("RenderCrearUsuario")

@requiere_login
def editPassword(request):
    id = request.POST.get('id')
    try:
        userPass = request.POST.get('pass')
        registro = Usuario.objects.get(id=id)
        registro.password = make_password(userPass)
        registro.save()

        return JsonResponse({'status':200})
    except:
        return JsonResponse({'status':401, 'mensaje': 'Error al actualizar contraseña'})

@requiere_admin
def deleteUser(request):
    id = request.POST.get('id')
    try:
        registro = Usuario.objects.get(id=id)
        registro.delete()
        return JsonResponse({'status':200})
    except:
        return JsonResponse({'status':401})

def autenticar(request):

    userEmail = request.POST.get('email')
    userPass = request.POST.get('pass')

    if Usuario.objects.filter(email=userEmail).exists():
        registro = Usuario.objects.get(email=userEmail)

        if check_password(userPass,registro.password):
            newSession ={
                'id' : registro.id,
                'userName' : registro.user,
                'userEmail' : registro.email,
                'userPerfil' : registro.perfil.id
            }

            request.session['usuario'] = newSession
            
            #return JsonResponse({'status':200})
            return redirect('/Noticias')
        
        else:
            #return JsonResponse({'status':401, 'mensaje':'Contraseña incorrecta'})
            return redirect('/login?err=1')
    else:
        return redirect('/login?err=2')
        #return JsonResponse({'status':401, 'mensaje':'El correo ingresado no se encuentra registrado'})

@requiere_login
def logout(request):
    try:
        del request.session['usuario']
        return redirect('index')
    except KeyError:
        return redirect('login:error')


@requiere_admin
def test(request):
    user = request.session['usuario']
    data = f"{user.get('userName')} {user.get('userEmail')} {user.get('userPerfil')}"
    return HttpResponse(data)
