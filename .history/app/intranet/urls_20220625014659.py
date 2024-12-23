from django.contrib import admin
from django.urls import path, include
from . import views
from .administracion import *
from .impresion import *
from .salas import *


from api.schema import schema
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from login.decorador import *



urlpatterns = [

    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path('admin/', admin.site.urls),


    path("Administracion/",views.pagAdministracion,name="administracion"),

    


#---------------------------------------PEDIR SALAS----------------------------------------------------------------

    path("",RenderPedirSalas,name="RenderPedirSalas"),
    path("PedirSala/<int:id>x<int:id2>x<str:fechastr>",RenderCrearPedirSalas,name="RenderCrearPedirSalas"),
    path("CrearPedirSalas/<int:id>x<int:id2>x<str:fechastr>",CrearPedirSalas,name="CrearPedirSalas"),
    path("PedirSalasFecha/<int:dia>x<str:fecha>",RenderPedirSalasFecha,name="RenderPedirSalasFecha"),
    path("EliminarPeticionSalas/<int:id>",EliminarPeticionSala,name="EliminarPeticionSala"),

    path("AdminHorarios/",RenderHorarios,name="RenderHorarios"),
    path("AdminCrearHorarios/",RenderCrearHorarios,name="RenderCrearHorarios"),
    path("CrearHorarios",CrearHorarios,name="CrearHorarios"),
    path("EliminarHorario/<int:id>",EliminarHorarios,name="EliminarHorarios"),

    path("AdminSalas/",RenderSalas,name="RenderSalas"),
    path("AdminCrearSalas/",RenderCrearSalas,name="RenderCrearSalas"),
    path("CrearSalas/",CrearSalas,name="CrearSalas"),
    path("EliminarSalas/<int:id>",EliminarSalas,name="EliminarSalas"),

#----------------------------------------IMPRESION------------------------------------------------------------------
    path("AdminImpresion/",RenderAdminImpresion,name="RenderAdminImpresion"),

    path("VistaImpresor/",RenderVistaImpresor,name="RenderVistaImpresor"),
    path("HistorialImpresor/",RenderHistorialImpresor,name="RenderHistorialImpresor"),

    path("VistaCordinador/",RenderVistaCordinador,name="RenderVistaCordinador"),
    path("HistorialCordinador/",RenderHistorialCordinador,name="RenderHistorialCordinador"),

    path("VistaProfesor/",RenderVistaProfesor,name="RenderVistaProfesor"),
    path("HistorialProfesor/",RenderHistorialProfesor,name="RenderHistorialProfesor"),

    path("CrearImpresion/",RenderCrearImpresion,name="RenderCrearImpresion"),
    path("EliminarImpresion/<int:id>",EliminarImpresion,name="EliminarImpresion"),

    path("FormularImpresion/",CrearImpresion,name="CrearImpresion"),
    path("Aprobar/<int:id>",Aprobar,name="Aprobar"),
    path("Rechazar/<int:id>",Rechazar,name="Rechazar"),
    path("Impreso/<int:id>",Impreso,name="Impreso"),
    path("Entregado/<int:id>",Entregado,name="Entregado"), 
    
#-------------------------------------------ASIGNATURAS------------------------------------------------------------

    path("Asignaturas/",RenderAsignaturas,name="RenderAsignaturas"),
    path("FormularioAsignatura/",RenderCrearAsignatura,name="RenderCrearAsignatura"),
    path("CrearAsignatura/",CrearAsignatura,name="CrearAsignatura"),
    path("EliminarAsignatura/<int:id>",EliminarAsignatura,name="EliminarAsignatura"),


#---------------------------------------ASIGNAR PROFESOR-----------------------------------------------------------
    path("SeleccionarProfesor/",RenderSeleccionarProfesor, name="RenderSeleccionarProfesor"),
    path("AsignaturasProfe/",RenderAsignaturasProfesor,name="RenderAsignaturasProfesor"),
    path("CrearAsignaturaProfesor/",PostAsignaturasProfesor,name="PostAsignaturasProfesor"),
    path("EliminarAsignaturaProfesor/<int:id>",EliminarAsignaturasProfesor,name="EliminarAsignaturasProfesor"),

#----------------------------------------CURSOS--------------------------------------------------------------------
    path("Cursos/",RenderCursos,name="RenderCursos"),
    path("FormularioCursos/",RenderCrearCursos,name="RenderCrearCursos"),
    path("CrearCursos/",CrearCursos,name="CrearCursos"),
    path("EliminarCursos/<int:id>",EliminarCursos,name="EliminarCursos"),

    
    path("CrearUsuario/",RenderCrearUsuario,name="RenderCrearUsuario"),


    path("login/",include("login.rutas")),
    #path("equipos/",include("equipos.url")),
]
