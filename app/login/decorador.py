from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect
from django.http import HttpResponse


def requiere_login(function):

    def comprobar(request, *callback_args, **callback_kwargs):
        try:
            if request.session['usuario']:
                return function(request, *callback_args, **callback_kwargs)
                
        except Exception as e:
            print(e)
            return redirect('login:index')

    return comprobar


def requiere_admin(function):
    def comprobar(request, *callback_args, **callback_kwargs):
        try:
            if request.session['usuario']:
                if request.session['usuario']['userPerfil'] == 1:
                    return function(request, *callback_args, **callback_kwargs)
                else:
                    return redirect('login:error')
        except Exception as e:
            print(e)
            return redirect('login:index')
    
    return comprobar