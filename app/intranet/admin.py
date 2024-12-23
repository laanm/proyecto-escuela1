from django.contrib import admin
from .models import *
from login.models import *

admin.site.register(Salas)
admin.site.register(Horarios)
admin.site.register(SalasPedidas)
admin.site.register(ConstanciasSalas)
admin.site.register(Asignaturas)
admin.site.register(AsignaturasAsignadas)
admin.site.register(Cursos)
admin.site.register(PeticionesImpresion)
admin.site.register(ArchivosSalasPedidas)
admin.site.register(Imagen)
admin.site.register(NoticiasFront)
admin.site.register(OpinionesProfesores)
admin.site.register(TemaHablado)

admin.site.register(AsitenciaAlumno)
admin.site.register(ProblemaAsistencia)
admin.site.register(Mantencion)
admin.site.register(CategoriaMantencion)
admin.site.register(RecursosMantencion)
admin.site.register(ProductoCra)
admin.site.register(PeticionesProductoCra)

admin.site.register(LibrosCra)
admin.site.register(PeticionesLibrosCra)

admin.site.register(NotasAlumno)

admin.site.register(MatriculaAlumno)
admin.site.register(MatriculaSeccionPersonalizada)
admin.site.register(MatriculasOpcionPersonalizada)
admin.site.register(MatriculasAlternativasOpcion)
admin.site.register(MatriculasDatosOpcion)
admin.site.register(RegistroPublico)

admin.site.register(HistorialJunaeb)

admin.site.register(Calendario)
admin.site.register(EventoDias)
admin.site.register(Eventos)
admin.site.register(ObjetivoAprendizaje)

admin.site.register(AsistenciaDocente)
admin.site.register(HorarioLaboral)

admin.site.register(ConfiguracionAdministrativa)


admin.site.register(CajaProducto)
admin.site.register(CajaVenta)