from django.urls import path

from . import views
#from core.views import page_index

app_name = 'inventario'
urlpatterns = [
    #path("listado_alumnos", views.listado_alumnos.as_view()),

    path("", views.resumen),
    path("info", views.inventario),

    path("centro_costo", views.centro_costo.as_view()),
    path("nivel_educativo", views.nivel_educativo.as_view()),
    path("familia", views.familia.as_view()),
    path("grupo", views.grupo.as_view()),
    path("grupo_activo", views.grupo_activo.as_view()),
    path("categorizacion", views.categorizacion.as_view()),
    path("area_asignacion", views.area_asignacion.as_view()),
    path("procedencia", views.procedencia.as_view()),
    path("origen_fondo", views.origen_fondo.as_view()),
    path("estado_conservacion", views.estado_conservacion.as_view()),
    path("inventariable", views.inventariable.as_view()),

    path("all_data", views.all_data.as_view()),
]