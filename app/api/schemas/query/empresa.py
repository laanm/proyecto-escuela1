import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from api.models import *
from login.models import *

from graphene.types.generic import GenericScalar # Solution

class EmpresaType(DjangoObjectType):
    class Meta:
        model = Empresa
        fields = "__all__"

class SucursalType(DjangoObjectType):
    class Meta:
        model = Empresa_sucursal
        fields = "__all__"

class UsuarioEmpresaType(DjangoObjectType):
    class Meta:
        model = Usuario_empresa
        fields = "__all__"

class RepresentanteLegalType(DjangoObjectType):
    class Meta:
        model = Representante_legal
        fields = "__all__"

class EmpresaGiroType(DjangoObjectType):
    class Meta:
        model = Empresa_giro
        fields = "__all__"

class CargoType(DjangoObjectType):
    class Meta:
        model = Cargo
        fields = "__all__"

class UnidadType(DjangoObjectType):
    class Meta:
        model = Unidad
        fields = "__all__"

class TrabajadorType(DjangoObjectType):
    class Meta:
        model = Trabajador
        fields = "__all__"

class DatosLiquidacionType(DjangoObjectType):
    class Meta:
        model = Datos_liquidacion
        fields = "__all__"

class LiquidacionHaberType(DjangoObjectType):
    class Meta:
        model = Liquidacion_haber
        fields = "__all__"

class LiquidacionDescuentoType(DjangoObjectType):
    class Meta:
        model = Liquidacion_descuento
        fields = "__all__"

class AsistenciaType(DjangoObjectType):
    class Meta:
        model = Asistencia
        fields = "__all__"

class DocumentoClausulaType(DjangoObjectType):
    class Meta:
        model = Documento_clausula
        fields = "__all__"

class DocumentoModeloType(DjangoObjectType):
    data = GenericScalar() # Solution
    
    class Meta:
        model = Documento_modelo
        fields= "id", "nombre"

    def resolve_data(self, info):
        # What you return here depends on how you are unpacking the JSON data
        return self.datos

class DocumentoTrabajador(DjangoObjectType):
    class Meta:
        model = Documento_trabajador
        fields = "__all__"

class TicketType(DjangoObjectType):
    class Meta:
        model = Ticket
        fields = "__all__"

class Query(graphene.ObjectType):
    all_empresas = graphene.List(EmpresaType)
    empresa = graphene.Field(EmpresaType, id=graphene.Int())
    all_sucursal = graphene.List(SucursalType)
    sucursal = graphene.Field(SucursalType, id=graphene.Int())
    sucursal_by_empresa = graphene.List(SucursalType, empresa_id=graphene.Int())
    all_usuario_empresa = graphene.List(UsuarioEmpresaType)
    usuario_empresa = graphene.Field(UsuarioEmpresaType, id=graphene.Int())
    usuario_empresa_by_empresa = graphene.List(UsuarioEmpresaType, empresa_id=graphene.Int())
    all_representantes_legales = graphene.List(RepresentanteLegalType)
    representante_legal = graphene.Field(RepresentanteLegalType, id=graphene.Int())
    representante_legal_by_empresa = graphene.List(RepresentanteLegalType, empresa_id=graphene.Int())
    all_empresa_giro = graphene.List(EmpresaGiroType)
    empresa_giro = graphene.Field(EmpresaGiroType, id=graphene.Int())
    empresa_giro_by_empresa = graphene.List(EmpresaGiroType, empresa_id=graphene.Int())
    all_cargo_giro = graphene.List(CargoType)
    cargo_giro = graphene.Field(CargoType, id=graphene.Int())
    cargo_giro_by_empresa = graphene.List(CargoType, empresa_id=graphene.Int())
    all_unidad = graphene.List(UnidadType)
    unidad = graphene.Field(UnidadType, id=graphene.Int())
    unidad_by_empresa = graphene.List(UnidadType, empresa_id=graphene.Int())
    all_trabajador = graphene.List(TrabajadorType)
    trabajador = graphene.Field(TrabajadorType, id=graphene.Int())
    trabajador_by_empresa = graphene.List(TrabajadorType, empresa_id=graphene.Int())
    trabajador_by_cargo = graphene.List(TrabajadorType, cargo_id=graphene.Int())
    trabajador_by_unidad = graphene.List(TrabajadorType, unidad_id=graphene.Int())
    trabajador_by_jefe = graphene.List(TrabajadorType, jefe_id=graphene.Int())
    all_datos_liquidacion = graphene.List(DatosLiquidacionType)
    datos_liquidacion = graphene.Field(DatosLiquidacionType, id=graphene.Int())
    datos_liquidacion_by_trabajador = graphene.List(DatosLiquidacionType, trabajador_id=graphene.Int())
    liquidacion_haber = graphene.List(LiquidacionHaberType, id=graphene.Int())
    liquidacion_haber_by_liquidacion = graphene.List(LiquidacionHaberType, liquidacion_id=graphene.Int())
    liquidacion_descuento = graphene.List(LiquidacionDescuentoType, id=graphene.Int())
    liquidacion_descuento_by_liquidacion = graphene.List(LiquidacionDescuentoType, liquidacion_id=graphene.Int())
    asistencia_by_trabajador = graphene.List(AsistenciaType, trabajador_id=graphene.Int())
    all_documento_clausula = graphene.List(DocumentoClausulaType)
    documento_clausula = graphene.Field(DocumentoClausulaType, id=graphene.Int())
    all_documento_modelo = graphene.List(DocumentoModeloType)
    documento_modelo = graphene.Field(DocumentoModeloType, id=graphene.Int())
    documento_trabajador = graphene.List(DocumentoTrabajador, id=graphene.Int())
    documento_trabajador_by_trabajador = graphene.List(DocumentoTrabajador, trabajador_id=graphene.Int())
    all_ticket = graphene.List(TicketType)
    ticket = graphene.List(TicketType, ticket_id=graphene.Int())
    ticket_by_trabajador = graphene.List(TicketType, trabajador_id=graphene.Int())
    ticket_by_usuario = graphene.List(TicketType, usuario_id=graphene.Int())
    

    def resolve_all_empresas(self, info, **kwargs):
        return Empresa.objects.all()
    
    def resolve_empresa(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Empresa.objects.get(pk=id)
        return None

    def resolve_all_sucursal(self, info, **kwargs):
        return Empresa_sucursal.objects.all()

    def resolve_sucursal(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Empresa_sucursal.objects.get(pk=id)
        return None
    
    def resolve_sucursal_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Empresa_sucursal.objects.filter(empresa_id=empresa_id)
        return None
    
    def resolve_all_usuario_empresa(self, info, **kwargs):
        return Usuario_empresa.objects.all()

    def resolve_usuario_empresa(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Usuario_empresa.objects.get(pk=id)
        return None
    
    def resolve_usuario_empresa_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Usuario_empresa.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_all_representantes_legales(self, info, **kwargs):
        return Representante_legal.objects.all()

    def resolve_representante_legal(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Representante_legal.objects.get(pk=id)
        return None

    def resolve_representante_legal_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Representante_legal.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_all_empresa_giro(self, info, **kwargs):
        return Empresa_giro.objects.all()

    def resolve_empresa_giro(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Empresa_giro.objects.get(pk=id)
        return None

    def resolve_empresa_giro_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Empresa_giro.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_all_cargo_giro(self, info, **kwargs):
        return Cargo.objects.all()

    def resolve_cargo_giro(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Cargo.objects.get(pk=id)
        return None

    def resolve_cargo_giro_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Cargo.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_all_unidad(self, info, **kwargs):
        return Unidad.objects.all()

    def resolve_unidad(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Unidad.objects.get(pk=id)
        return None
    
    def resolve_unidad_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Unidad.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_all_trabajador(self, info, **kwargs):
        return Trabajador.objects.all()
    
    def resolve_trabajador(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Trabajador.objects.get(pk=id)
        return None

    def resolve_trabajador_by_empresa(self, info, **kwargs):
        empresa_id = kwargs.get('empresa_id')
        if empresa_id is not None:
            return Trabajador.objects.filter(empresa_id=empresa_id)
        return None

    def resolve_trabajador_by_cargo(self, info, **kwargs):
        cargo_id = kwargs.get('cargo_id')
        if cargo_id is not None:
            return Trabajador.objects.filter(cargo_id=cargo_id)
        return None

    def resolve_trabajador_by_unidad(self, info, **kwargs):
        unidad_id = kwargs.get('unidad_id')
        if unidad_id is not None:
            return Trabajador.objects.filter(unidad_id=unidad_id)
        return None

    def resolve_trabajador_by_jefe(self, info, **kwargs):
        jefe_id = kwargs.get('jefe_id')
        if jefe_id is not None:
            return Trabajador.objects.filter(jefe_id=jefe_id)
        return None

    def resolve_all_datos_liquidacion(self, info, **kwargs):
        return Datos_liquidacion.objects.all()

    def resolve_datos_liquidacion(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Datos_liquidacion.objects.get(pk=id)
        return None

    def resolve_datos_liquidacion_by_trabajador(self, info, **kwargs):
        trabajador_id = kwargs.get('trabajador_id')
        if trabajador_id is not None:
            return Datos_liquidacion.objects.filter(trabajador_id=trabajador_id)
        return None

    def resolve_liquidacion_haber(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Liquidacion_haber.objects.get(pk=id)
        return None
    
    def resolve_liquidacion_haber_by_liquidacion(self, info, **kwargs):
        liquidacion_id = kwargs.get('liquidacion_id')
        if liquidacion_id is not None:
            return Liquidacion_haber.objects.filter(datos_liquidacion=liquidacion_id)
        return None

    def resolve_liquidacion_descuento(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Liquidacion_descuento.objects.get(pk=id)
        return None

    def resolve_liquidacion_descuento_by_liquidacion(self, info, **kwargs):
        liquidacion_id = kwargs.get('liquidacion_id')
        if liquidacion_id is not None:
            return Liquidacion_descuento.objects.filter(datos_liquidacion=liquidacion_id)
        return None

    def resolve_asistencia_by_trabajador(self, info, **kwargs):
        trabajador_id = kwargs.get('trabajador_id')
        if trabajador_id is not None:
            return Asistencia.objects.filter(trabajador=trabajador_id)
        return None

    def resolve_all_documento_clausula(self, info, **kwargs):
        return Documento_clausula.objects.all()

    def resolve_documento_clausula(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Documento_clausula.objects.get(pk=id)
        return None

    def resolve_all_documento_modelo(self, info, **kwargs):
        return Documento_modelo.objects.all()

    def resolve_documento_modelo(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Documento_modelo.objects.get(pk=id)
        return None

    def resolve_documento_trabajador(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Documento_trabajador.objects.get(pk=id)
        return None

    def resolve_documento_trabajador_by_trabajador(self, info, **kwargs):
        trabajador_id = kwargs.get('trabajador_id')
        if trabajador_id is not None:
            return Documento_trabajador.objects.filter(trabajador=trabajador_id)
        return None

    def resolve_all_ticket(self, info, **kwargs):
        return Ticket.objects.all()
    
    def resolve_ticket(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Ticket.objects.get(pk=id)
        return None
    
    def resolve_ticket_by_trabajador(self, info, **kwargs):
        trabajador_id = kwargs.get('trabajador_id')
        if trabajador_id is not None:
            return Ticket.objects.filter(trabajador=trabajador_id)
        return None
    
    def resolve_ticket_by_usuario(self, info, **kwargs):
        usuario_id = kwargs.get('usuario_id')
        if usuario_id is not None:
            return Ticket.objects.filter(usuario=usuario_id)
        return None


####################
class testMutate(graphene.Mutation):

    class Arguments:
        id = graphene.Int(required = True)

    success = graphene.Boolean()
    

    def mutate(self, info,id):
        return testMutate(success=True)

class Mutation(graphene.ObjectType):
    testMutate = testMutate.Field()
