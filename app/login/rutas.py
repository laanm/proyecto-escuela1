from django.urls import path
from . import views

app_name = 'login'
urlpatterns = [
    path("", views.loginForm, name="index"),
    path("error", views.error, name="error"),
    path("usuario/nuevo", views.newUser, name="usuario-nuevo"),
    path("usuario/eliminar", views.deleteUser, name="usuario-eliminar"),
    path("usuario/new-password", views.editPassword, name="usuario-new-password"),
    path("autenticar", views.autenticar, name="autenticar"),
    path("logout", views.logout, name="logout"),

    path("test", views.test, name="test"),


]