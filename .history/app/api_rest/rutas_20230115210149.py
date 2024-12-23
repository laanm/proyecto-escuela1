from django.urls import path

from . import views
#from core.views import page_index

app_name = 'api_rest'
urlpatterns = [
    path("listado_alumnos", views.listado_alumnos.as_view()),
    path("listado_asistencia", views.listado_asistencia.as_view()),
    path("listado_notas", views.listado_notas.as_view()),
    path("listado_cursos", views.listado_cursos.as_view()),
    path("listado_libros_cra", views.listado_libros_cra.as_view()),
    path("listado_productos_cra", views.listado_productos_cra.as_view()),

    path("crear_asistencia",views.crear_asistencia.as_view()),
    path("crear_huella",views.crear_huella.as_view()),

    path("crear_solicitud_libro",views.crear_solicitud_libro.as_view()),
    path("crear_solicitud_producto",views.crear_solicitud_producto.as_view()),

    path("devolver_libro",views.devolver_libro.as_view()),
    path("devolver_libro",views.devolver_producto.as_view()),

    path("listado_alumnos_year",views.asistencia_lista.as_view()),

    path("actualizar",views.actualizar()),
    
]