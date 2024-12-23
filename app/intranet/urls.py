from django.contrib import admin
from django.urls import path, include




from . import views
from .administracion import *
from .impresion import *
from .salas import *


import paginafrontal.views
import login.views
from api.schema import schema
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from login.decorador import *
from django.conf.urls.static import static
from django.conf import settings
from graphene_file_upload.django import FileUploadGraphQLView

# NECESARIO PARA LOS STATIC
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [

    
    path('admin/', admin.site.urls),

    #path("",paginafrontal.views.index,name="index"),  con esto pude usar el index de otra app junto al import paginafrontal.views
    path("",login.views.loginForm,name="index"),

    path("graphql/", csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True, schema=schema))),

#----------------------------------------Render Modulos NAV (Definitivo)----------------------------------------------------------#
    
    #Modulo Noticias
    path("Noticias/",views.pagNoticias,name="pagNoticias"),


    #Modulo Reserva salas
    path("PedirSalas/",views.pagPedirSalas,name="RenderPedirSalas"),
    #--¬
        path("PedirSala",views.crearpedirsala),

    #Modulo Impresion
    path("AdminImpresion/",RenderAdminImpresion,name="RenderAdminImpresion"),
    #--¬
        path("VistaProfesor/",RenderVistaProfesor,name="RenderVistaProfesor"),
        path("HistorialProfesor/",RenderHistorialProfesor,name="RenderHistorialProfesor"),
        #
        path("VistaCordinador/",RenderVistaCordinador,name="RenderVistaCordinador"),
        path("HistorialCordinador/",RenderHistorialCordinador,name="RenderHistorialCordinador"),
        #
        path("VistaImpresor/",RenderVistaImpresor,name="RenderVistaImpresor"),
        path("HistorialImpresor/",RenderHistorialImpresor,name="RenderHistorialImpresor"),


    #Modulo CRA
    path("MenuCra/",views.pagCra,name="RenderCra"),
    #--¬
        path("LibrosCra/",views.pagLibros, name="RenderLibrosCra"),
        #--¬
            path("MisLibrosCra/",views.pagMisLibrosPedidos,name="RenderMisLibrosCra"),
            path("AdminLibrosPedidosCra/",views.pagAdminLibrosPedidos,name="RenderAdminLibrosPedidos"),
            path("AdminLibrosCra/",views.pagAdminLibros,name="RenderAdminLibros"),

            #--¬(Envio y consulta de datos)
            
                path("ImportacionLibrosMasivo",views.ImportacionLibrosMasivo),
                path("CrearPeticionesLibrosCRA",views.CrearPeticionesLibrosCRA),
                path("peticioneslibroscra",views.PeticionesLibrosCRA),
                path("MisPeticionesLibrosCRA",views.MisPeticionesLibrosCRA),
                path("EditarLibrosCRA",views.editarlibro),
                path("EditarLibrosCRAFinal",views.EditarLibroFinal),
                path("CrearLibroFinal",views.CrearLibroFinal),
        #
        path("EquiposCra/",views.pagEquipos,name="RenderEquiposCra"),
        #--¬
            path("MisEquiposCra/",views.pagMisEquipos,name="RenderMisEquiposCra"),
            path("AdminEquiposCra/",views.pagAdminEquipos,name="RenderAdminEquiposCra"),
            path("AdminPedidosCra/",views.pagAdminPedidos,name="RenderAdminPedidosCra"),
            #--¬
                path("CrearPeticionesEquiposCRA",views.CrearPeticionesEquiposCRA),
                path("PeticionesEquipoCRA",views.PeticionesEquipoCRA),
                path("MisPeticionesProductosCRA",views.MisPeticionesProductosCRA),
                path("EditarEquipoCRA",views.editarequipo),
                path("EditarEquipoCRAFinal",views.EditarEquipoFinal),
                path("CrearEquipoFinal",views.CrearEquipoFinal),

    #Modulo Calificaciones
    path("Notas/",views.pagNotas,name="RenderMisCursos"),
    #--¬
        path("datosalumnosasignatura",views.notasalumnos), # CONSULTA DE NOTAS POR ASIGNATURA Y CURSO
        path("crearnotasalumno",views.crearnotasalumnos),

        path("asistenciaporcurso",views.asistenciaporcurso),
        path("ponerpresente",views.ponerpresente),
        path("eliminarasistencia",views.eliminarasistencia),

    #Modulo Mi Asistencia
    path("Miasistencia/",views.pagMiAsistencia,name="RenderMiAsistencia"),
        path("ListaAsistenciaDocente",views.ListaAsistenciaDocente),
        path("ObtenerHorarioLaboral",views.ObtenerHorarioLaboral),

        path("CambiarHorarioLaboral",views.CambiarHorarioLaboral),
        

    #Modulo Sistema Asistencias
    path("Huella/",views.pagHuella, name="RenderHuella"),
    #--¬
        path("asistenciaalumnos",views.asistenciaalumnos),
        path("asistenciaalumnosmes",views.asistenciaalumnosmes),
        path("asistenciaalumnoindividual",views.asistenciaalumnoindividual),
        path("ponerpresentemasivo",views.ponerpresentemasivo),
        

    #Modulo Matriculas
    path("CrearMatriculas/",views.pagCrearMatriculas,name="RenderCrearMatriculas"),
    #--¬
        path("VerMatriculas",views.pagVerMatriculas,name="RenderVerMatriculas"),
        path("EditarMatricula",views.EditarMatricula),
            path("cambiarcursoalumno",views.cambiarcursoalumno),
        path("VerRegistroPublico",views.pagVerListaEspera,name="RenderVerListaEspera"),
        path("RegistroPublico",views.pagListaEspera,name="RenderListaEspera"),
        #--¬(Envio y consulta de datos)
            path("DatosListaEspera",views.ListaDeEspera),
            path("EditarListaEspera",views.EditarListaDeEspera),
            path("ActivarListaEspera",views.ActivarListaEspera),
            
        path("MatriculasPublicas/",views.PagMatriculasPublicas,name="RenderMatriculasPublicas"),
        #--¬(Envio y consulta de datos)
            path("alumnosporcurso",views.alumnosporcurso), # CONSULTA DE ALUMNOS GLOBAL O POR CURSO
            path("alumnosindividual",views.ObtenerDatosAlumnos),  # CONSULTA DE ALUMNOS INDIVIDUAL
            
            path("MatriculacionIndividual",views.CreacionMatricula),
            path("ImportacionMasiva",views.ImportacionMasivaMatriculas),
    
    #Modulo Calendario
    path("Organigrama/",views.pagOrganigrama,name="RenderOrganigrama"),
    #--¬(Envio y consulta de datos)
        path("loadcalendario",views.loadcalendario), # CONSULTA DE CALENDARIO GLOBAL
        path("crearyear",views.crearyear),
        path("eliminaryear",views.eliminaryear),
        path("cambiardiacalendario",views.cambiardiacalendario),
        
        #(Eventos)
        path("crearevento",views.crearevento), # CONSULTA Y CREACION DE EVENTOS GLOBAL
        path("eliminarevento",views.eliminarevento),

    #Modulo Junaeb
    path("Junaeb/",views.pagJunaeb,name="RenderJunaeb"),
    #--¬
        path("junaebalumnos",views.junaebalumnos), # CONSULTA DE ALUMNOS CON JUNAEB GLOBAL
        path("historialjunaeb",views.historialjunaeb),
        path("junaebasignar",views.junaebasignar),
        path("junaebeditar",views.junaebeditar),
        path("junaebdesasignar",views.junaebdesasignar),
        path("junaebasignarmasivo",views.junaebasignarmasivo),

    #Modulo Mantenimiento
    path("Mantencion/",views.pagMantencion,name="RenderMantencion"),

    #Modulo Administracion
    path("Administracion/",views.pagAdministracion,name="administracion"),
    #--¬
#----------------------------------------Render Administracion (Definitivo)----------------------------------------------------------#
    
    path("AdminSalas/",RenderSalas,name="RenderSalas"),
    #--¬
        path("editarsala",views.editarsala),

    path("AdminHorarios/",RenderHorarios,name="RenderHorarios"),
    #--¬
        path("cambiarordenhorarios",views.cambiarordenhorarios),

    path("Asignaturas/",RenderAsignaturas,name="RenderAsignaturas"),
    #--¬(Envio y consulta de datos)
        path("listado_asignaturas",views.listado_asignaturas), # CONSULTA DE ASIGNATURAS GLOBAL
        path("asignaturasprofesor",views.asignaturasprofesor), # CONSULTA DE ASIGNATURAS DE UN PROFESOR

    path("SeleccionarProfesor/",RenderSeleccionarProfesor, name="RenderSeleccionarProfesor"),

    path("Cursos/",RenderCursos,name="RenderCursos"),
    #--¬(Envio y consulta de datos)
        path("datoscursos",views.cursos), # CONSULTA DE CURSOS GLOBAL

    path("NoticiasFront/",views.pagNoticiasFront, name="RenderNoticiasFront"),
    #--¬(Envio y consulta de datos)
        path("crearnoticia",views.crearnoticia),
        path("editarnoticia",views.editarnoticia),
        path("editarportadanoticia",views.cambiarportadanoticia),
        path("editaractivonoticia",views.cambiaractivonoticia),


    path("MisOa",views.pagOA,name="RenderMisOA"),
    #--¬(Envio y consulta de datos)
        path("objetivoaprendizaje",views.oaasignaturasprofesor), # CONSULTA DE OAS GLOBAL
        path("crearoa",views.crearoa),
        path("editaroa",views.editaroa), # CONSULTA DE OAS GLOBAL
        path("eliminaroa",views.eliminaroa),

    path("CrearUsuario/",RenderCrearUsuario,name="RenderCrearUsuario"),
    #--¬(Envio y consulta de datos)
        path("Listado_Usuarios",views.Listado_Usuarios), # CONSULTA DE USUARIOS GLOBAL
        path("AsignarPerfilPermisos",views.AsignarPerfilPermisos),
        path("CreacionUsuario",views.CrearUsuario),
        path("CreacionUsuarioMasivo",views.CrearUsuarioMasivo),
        path("EditarUsuario",views.EditarUsuario),

    path("Permisos/",views.pagPermisos,name="RenderPermisos"),
     #--¬(Envio y consulta de datos)
        path("obtenerperfilpermisos",views.ObtenerPerfilPermisos),
        path("crearperfilpermisos",views.CrearPerfilPermisos),
        path("editarperfilpermisos",views.EditarPerfilPermisos),
        path("eliminarperfilpermisos",views.EliminarPerfilPermisos),

    path("ConfiguracionSistemaPag",views.pagConfiguracionSistema,name="RenderPagConfiguracionSistema"),
    #--¬(Envio y consulta de datos)
        path("ConfiguracionSistema",views.ConfiguracionSistema),
        path("aplicarferiadosnuevos",views.aplicarferiadosnuevos),
        



    #cosas del profe

    path("caja/caja",views.profecaja,name="RenderProfeCaja"),
    path("crearventa",views.crearventa),
    path("obtenerventas",views.obtenerventas),
    path("obtenerproductos",views.obtenerproductos),
    path("crearproducto",views.crearproducto),
    path("editarproducto",views.editarproducto),
    path("eliminarproducto",views.eliminarproducto),

    

    
    path("login/",include("login.rutas")),



    path("paginafrontal/",include("paginafrontal.rutas")),
    path("api_rest/",include("api_rest.rutas")), #api pa huella
    path("inventario/",include("inventario.rutas")),

]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # para que se vean los archivos de media