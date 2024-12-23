from django.contrib import admin
from .models import *

# Register your models here.

class TablaUsuarios(admin.ModelAdmin):
    list_display= ('id','user','password','email','perfil')

class TablaPerfiles(admin.ModelAdmin):
    list_display= ('id','nombre')

admin.site.register(Usuario,TablaUsuarios)
admin.site.register(Perfiles,TablaPerfiles)
admin.site.register(PermisosUsuarios)
