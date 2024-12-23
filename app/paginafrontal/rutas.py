from django.urls import path
from . import views

app_name = 'paginafrontal'
urlpatterns = [
    path("", views.index, name="index"),
    path("Documentos",views.pagdocumentos,name="RenderDocumentos"),
    

    
    

]