import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from api.models import *
from login.models import *
from administrator import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from graphene.types.generic import GenericScalar # Solution


class CategoriaType(DjangoObjectType):
    class Meta:
        model = Categoria
        fields = "__all__"

class SubCategoriaType(DjangoObjectType):

    class Meta:
        model = SubCategoria
        fields = "__all__"

class ProductoType(DjangoObjectType):
    class Meta:
        model = Producto
        fields = "__all__"

class ColorProductoType(DjangoObjectType):
    class Meta:
        model = ColorProducto
        fields = "__all__"

class SizeProductoType(DjangoObjectType):
    class Meta:
        model = SizeProducto
        fields = "__all__"

class CaracteristicaType(DjangoObjectType):
    class Meta:
        model = Caracteristica
        fields = "__all__"

class CaracteristicaProductoType(DjangoObjectType):
    class Meta:
        model = CaracteristicaProducto
        fields = "__all__"

class ImagenType(DjangoObjectType):
    class Meta:
        model = Imagen
        fields = "__all__"

class ImagenProductoType(DjangoObjectType):
    class Meta:
        model = ImagenProducto
        fields = "__all__"

class PedidoType(DjangoObjectType):
    class Meta:
        model = Pedido
        fields = "__all__"

class DocumentoType(DjangoObjectType):
    class Meta:
        model = Documento
        fields = "__all__"

class PedidoContenidoType(DjangoObjectType):
    class Meta:
        model = PedidoContenido
        fields = "__all__"

class ConfiguracionType(DjangoObjectType):
    class Meta:
        model = Configuracion
        fields = "__all__"



class Query(graphene.ObjectType):
    all_categoria = graphene.List(CategoriaType)
    categoria = graphene.Field(CategoriaType, id=graphene.Int())

    def resolve_all_categoria(self, info, **kwargs):
        return Categoria.objects.all()

    def resolve_categoria(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Categoria.objects.get(pk=id)
        return None

    all_subcategoria = graphene.List(SubCategoriaType)
    subcategoria = graphene.Field(SubCategoriaType, id=graphene.Int())

    def resolve_all_subcategoria(self, info, **kwargs):
        return SubCategoria.objects.all()

    def resolve_subcategoria(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return SubCategoria.objects.get(pk=id)
        return None

    all_producto = graphene.List(ProductoType)
    producto = graphene.Field(ProductoType, id=graphene.Int())

    def resolve_all_producto(self, info, **kwargs):
        return Producto.objects.all()
    
    def resolve_producto(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Producto.objects.get(pk=id)
        return None

    all_color_producto = graphene.List(ColorProductoType)
    color_producto = graphene.Field(ColorProductoType, id=graphene.Int())

    def resolve_all_color_producto(self, info, **kwargs):
        return ColorProducto.objects.all()

    def resolve_color_producto(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return ColorProducto.objects.get(pk=id)
        return None

    all_size_producto = graphene.List(SizeProductoType)
    size_producto = graphene.Field(SizeProductoType, id=graphene.Int())

    def resolve_all_size_producto(self, info, **kwargs):
        return SizeProducto.objects.all()

    def resolve_size_producto(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return SizeProducto.objects.get(pk=id)
        return None
    
    all_caracteristica = graphene.List(CaracteristicaType)
    caracteristica = graphene.Field(CaracteristicaType, id=graphene.Int())

    def resolve_all_caracteristica(self, info, **kwargs):
        return Caracteristica.objects.all()

    def resolve_caracteristica(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Caracteristica.objects.get(pk=id)
        return None

    all_caracteristica_producto = graphene.List(CaracteristicaProductoType)
    caracteristica_producto = graphene.Field(CaracteristicaProductoType, id=graphene.Int())

    def resolve_all_caracteristica_producto(self, info, **kwargs):
        return CaracteristicaProducto.objects.all()

    def resolve_caracteristica_producto(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return CaracteristicaProducto.objects.get(pk=id)
        return None

    all_imagen = graphene.List(ImagenType)
    imagen = graphene.Field(ImagenType, id=graphene.Int())

    def resolve_all_imagen(self, info, **kwargs):
        return Imagen.objects.all()

    def resolve_imagen(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Imagen.objects.get(pk=id)
        return None

    all_imagen_producto = graphene.List(ImagenProductoType)
    imagen_producto = graphene.Field(ImagenProductoType, id=graphene.Int())

    def resolve_all_imagen_producto(self, info, **kwargs):
        return ImagenProducto.objects.all()

    def resolve_imagen_producto(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return ImagenProducto.objects.get(pk=id)
        return None

    all_pedido = graphene.List(PedidoType)
    pedido = graphene.Field(PedidoType, id=graphene.Int())

    def resolve_all_pedido(self, info, **kwargs):
        return Pedido.objects.all()

    def resolve_pedido(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Pedido.objects.get(pk=id)
        return None

    all_documento = graphene.List(DocumentoType)
    documento = graphene.Field(DocumentoType, id=graphene.Int())

    def resolve_all_documento(self, info, **kwargs):
        return Documento.objects.all()

    def resolve_documento(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Documento.objects.get(pk=id)
        return None

    all_pedido_contenido = graphene.List(PedidoContenidoType)
    pedido_contenido = graphene.Field(PedidoContenidoType, id=graphene.Int())

    def resolve_all_pedido_contenido(self, info, **kwargs):
        return PedidoContenido.objects.all()

    def resolve_pedido_contenido(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return PedidoContenido.objects.get(pk=id)
        return None

    configuracion = graphene.Field(ConfiguracionType)

    def resolve_configuracion(self, info, **kwargs):
        return Configuracion.objects.get(pk=1)

# MUTATION DATA

class CategoriaCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        descripcion = graphene.String(required=True)
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, descripcion):
        try:
            
            if Categoria.objects.filter(nombre=nombre).exists():
                raise Exception('Ya existe una categoria con ese nombre')
            registro = Categoria()
            registro.nombre = nombre
            registro.descripcion = descripcion
            registro.save()


            return CategoriaCreate(success=True)

        except Exception as e:
            print(e)
            return CategoriaCreate(success=False, error = e)

class CategoriaEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()
        descripcion = graphene.String()
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info,id, nombre, descripcion):
        if id is not None:
            try:
                registro = Categoria.objects.get(pk=id)
                registro.nombre = nombre if nombre != '' else registro.nombre
                registro.descripcion = descripcion if descripcion != '' else registro.descripcion
                return CategoriaEdit(success=True)

            except Exception as e:
                print(e)
                return CategoriaEdit(success=False, error = e)

class CategoriaDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        
    success = graphene.Boolean()
    error = graphene.String()


    def mutate(self, info,id):
        if id is not None:
            try:
                registro = Categoria.objects.get(pk=id)
                registro.delete()
                return CategoriaDelete(success=True)

            except Exception as e:
                print(e)
                return CategoriaDelete(success=False, error = e)


class SubCategoriaCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        descripcion = graphene.String(required=True)
        categoria = graphene.Int(required=True)
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, descripcion, categoria):
        try:
            registro = SubCategoria()
            registro.nombre = nombre
            registro.descripcion = descripcion
            registro.categoria = Categoria.objects.get(pk=categoria)
            registro.save()

            return SubCategoriaCreate(success=True)

        except Exception as e:
            print(e)
            return SubCategoriaCreate(success=False,error = e)

class SubCategoriaEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()
        descripcion = graphene.String()
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, descripcion, id):
        try:
            registro = SubCategoria.objects.get(pk=id)
            if nombre:
                registro.nombre = nombre
            if descripcion:
                registro.descripcion = descripcion
            registro.save()

            return SubCategoriaEdit(success=True)

        except Exception as e:
            print(e)
            return SubCategoriaEdit(success=False, error = e)

class SubCategoriaDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = SubCategoria.objects.get(pk=id)
            registro.delete()
            return SubCategoriaDelete(success=True)

        except Exception as e:
            print(e)
            return SubCategoriaDelete(success=False, error = e)

class ProductoCreate(graphene.Mutation):
    class Arguments:
        codigo_barra = graphene.String()
        nombre = graphene.String(required=True)
        descripcion = graphene.String(required=True)
        sub_categoria = graphene.Int(required=True)
        precio = graphene.Int(required=True)
        oferta = graphene.Int()
        stock = graphene.Int()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, codigo_barra, nombre, descripcion, sub_categoria, precio, oferta, stock):
        try:
            registro = Producto()
            registro.codigo_barra = codigo_barra
            registro.nombre = nombre
            registro.descripcion = descripcion
            registro.sub_categoria = SubCategoria.objects.get(pk=sub_categoria)
            registro.precio = precio
            registro.oferta = oferta
            registro.stock = stock
            registro.save()
            return ProductoCreate(success=True)

        except Exception as e:
            print(e)
            return ProductoCreate(success=False, error = e)


class ProductoEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        codigo_barra = graphene.String()
        nombre = graphene.String()
        descripcion = graphene.String()
        sub_categoria = graphene.Int()
        precio = graphene.Int()
        oferta = graphene.Int()
        stock = graphene.Int()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, codigo_barra, nombre, descripcion, sub_categoria, precio, oferta, stock):
        try:
            registro = Producto.objects.get(pk=id)

            if codigo_barra:
                registro.codigo_barra = codigo_barra
            if nombre:
                registro.nombre = nombre
            if descripcion:
                registro.descripcion = descripcion
            if sub_categoria: 
                registro.sub_categoria =  SubCategoria.objects.get(pk=sub_categoria)
            if precio:
                registro.precio = precio
            if oferta:
                registro.oferta = oferta
            if stock:
                registro.stock = stock

            registro.save()
            return ProductoEdit(success=True)

        except Exception as e:
            print(e)
            return ProductoEdit(success=False, error = e)


class ProductoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Producto.objects.get(pk=id)
            registro.delete()
            return ProductoDelete(success=True)

        except Exception as e:
            print(e)
            return ProductoDelete(success=False, error = e)


class ColorProductoCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        producto = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, producto):
        try:
            registro = ColorProducto()
            registro.nombre = nombre
            registro.producto = Producto.objects.get(pk=producto)
            registro.save()

            return ColorProductoCreate(success=True)

        except Exception as e:
            print(e)
            return ColorProductoCreate(success=False, error = e)

class ColorProductoEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, nombre):
        try:
            registro = ColorProducto.objects.get(pk=id)

            if nombre:
                registro.nombre = nombre
            registro.save()

            return ColorProductoEdit(success=True)

        except Exception as e:
            print(e)
            return ColorProductoEdit(success=False, error = e)

class ColorProductoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = ColorProducto.objects.get(pk=id)
            registro.delete()
            return ColorProductoDelete(success=True)

        except Exception as e:
            print(e)
            return ColorProductoDelete(success=False, error = e)

class SizeProductoCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        producto = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, producto):
        try:
            registro = SizeProducto()
            registro.nombre = nombre
            registro.producto = Producto.objects.get(pk=producto)
            registro.save()

            return SizeProductoCreate(success=True)

        except Exception as e:
            print(e)
            return SizeProductoCreate(success=False, error = e)     

class SizeProductoEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, nombre):
        try:
            registro = SizeProducto.objects.get(pk=id)
            if nombre:
                registro.nombre = nombre
            registro.save()

            return SizeProductoEdit(success=True)

        except Exception as e:
            print(e)
            return SizeProductoEdit(success=False, error = e)


class SizeProductoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = SizeProducto.objects.get(pk=id)
            registro.delete()
            return SizeProductoDelete(success=True)

        except Exception as e:
            print(e)
            return SizeProductoDelete(success=False, error = e)

class CaracteristicaCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        sub_categoria = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, sub_categoria):
        try:
            registro = Caracteristica()
            registro.nombre = nombre
            registro.sub_categoria = SubCategoria.objects.get(pk=sub_categoria)
            registro.save()

            return CaracteristicaCreate(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaCreate(success=False, error = e)


class CaracteristicaEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()
        
    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, nombre):
        try:
            registro = Caracteristica.objects.get(pk=id)
            if nombre:  
                registro.nombre = nombre
            registro.save()

            return CaracteristicaEdit(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaEdit(success=False, error = e)

class CaracteristicaDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Caracteristica.objects.get(pk=id)
            registro.delete()
            return CaracteristicaDelete(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaDelete(success=False, error = e)


class CaracteristicaProductoCreate(graphene.Mutation):
    class Arguments:
        caracteristica = graphene.Int(required=True)
        producto = graphene.Int(required=True)
        valor = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, caracteristica, producto, valor):
        try:
            registro = CaracteristicaProducto()
            registro.caracteristica = Caracteristica.objects.get(pk=caracteristica)
            registro.producto = Producto.objects.get(pk=producto)
            registro.valor = valor
            registro.save()

            return CaracteristicaProductoCreate(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaProductoCreate(success=False, error = e)


class CaracteristicaProductoEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        valor = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, valor):
        try:
            registro = CaracteristicaProducto.objects.get(pk=id)
            if valor:
                registro.valor = valor
            registro.save()

            return CaracteristicaProductoEdit(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaProductoEdit(success=False, error = e)

class CaracteristicaProductoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = CaracteristicaProducto.objects.get(pk=id)
            registro.delete()
            return CaracteristicaProductoDelete(success=True)

        except Exception as e:
            print(e)
            return CaracteristicaProductoDelete(success=False, error = e)

class ImagenCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)
        ruta = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre, ruta):
        try:
            registro = Imagen()
            registro.nombre = nombre
            registro.ruta = ruta
            registro.save()

            return ImagenCreate(success=True)

        except Exception as e:
            print(e)
            return ImagenCreate(success=False, error = e)

class ImagenDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Imagen.objects.get(pk=id)
            registro.delete()
            return ImagenDelete(success=True)

        except Exception as e:
            print(e)
            return ImagenDelete(success=False, error = e)

class ImagenProductoCreate(graphene.Mutation):
    class Arguments:
        imagen = graphene.Int(required=True)
        producto = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, imagen, producto):
        try:
            registro = ImagenProducto()
            registro.imagen = Imagen.objects.get(pk=imagen)
            registro.producto = Producto.objects.get(pk=producto)
            registro.save()

            return ImagenProductoCreate(success=True)

        except Exception as e:
            print(e)
            return ImagenProductoCreate(success=False, error = e)


class ImagenProductoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = ImagenProducto.objects.get(pk=id)
            registro.delete()
            return ImagenProductoDelete(success=True)

        except Exception as e:
            print(e)
            return ImagenProductoDelete(success=False, error = e)


class PedidoCreate(graphene.Mutation):
    class Arguments:
        cliente = graphene.Int(required=True)
        monto_total = graphene.Int(required=True)
        direccion_envio = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, cliente, monto_total, direccion_envio):
        try:
            registro = Pedido()
            registro.cliente = Usuario.objects.get(pk=cliente)
            registro.estado = "pendiente"
            registro.monto_total = monto_total
            registro.direccion_envio = DireccionUsuario.objects.get(pk=direccion_envio)
            registro.save()

            return PedidoCreate(success=True)

        except Exception as e:
            print(e)
            return PedidoCreate(success=False, error = e)

        
class PedidoEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        estado = graphene.String()
        track_id = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, estado, track_id):
        try:
            registro = Pedido.objects.get(pk=id)
            registro.fecha_actualizacion = datetime.now()
            if estado:
                registro.estado = estado
            if track_id:
                registro.track_id = track_id
            registro.save()

            return PedidoEdit(success=True)

        except Exception as e:
            print(e)
            return PedidoEdit(success=False, error = e)


class PedidoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Pedido.objects.get(pk=id)
            registro.delete()
            return PedidoDelete(success=True)

        except Exception as e:
            print(e)
            return PedidoDelete(success=False, error = e)

class DocumentoCreate(graphene.Mutation):
    class Arguments:
        pedido = graphene.Int(required=True)
        tipo = graphene.String(required=True)
        rut = graphene.String(required=True)
        fecha = graphene.String(required=True)
        folio = graphene.String(required=True)
        ruta_pdf = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, pedido, tipo, rut, fecha, folio, ruta_pdf):
        try:
            registro = Documento()
            registro.pedido = Pedido.objects.get(pk=pedido)
            registro.tipo = tipo
            registro.rut = rut
            registro.fecha = fecha
            registro.folio = folio
            registro.ruta_pdf = ruta_pdf
            registro.save()

            return DocumentoCreate(success=True)

        except Exception as e:
            print(e)
            return DocumentoCreate(success=False, error = e)


class DocumentoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Documento.objects.get(pk=id)
            registro.delete()
            return DocumentoDelete(success=True)

        except Exception as e:
            print(e)
            return DocumentoDelete(success=False, error = e)


class PedidoContenidoCreate(graphene.Mutation):
    class Arguments:
        pedido = graphene.Int(required=True)
        producto = graphene.Int(required=True)
        cantidad = graphene.Int(required=True)
        precio = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, pedido, producto, cantidad, precio):
        try:
            registro = PedidoContenido()
            registro.pedido = Pedido.objects.get(pk=pedido)
            registro.producto = Producto.objects.get(pk=producto)
            registro.cantidad = cantidad
            registro.precio = precio
            registro.save()

            return PedidoContenidoCreate(success=True)

        except Exception as e:
            print(e)
            return PedidoContenidoCreate(success=False, error = e)


class PedidoContenidoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = PedidoContenido.objects.get(pk=id)
            registro.delete()
            return PedidoContenidoDelete(success=True)

        except Exception as e:
            print(e)
            return PedidoContenidoDelete(success=False, error = e)


class ConfiguracionCreateBase(graphene.Mutation):
    class Arguments:
        nombre_pagina = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre_pagina):
        try:
            registro = Configuracion()
            registro.id = 1
            registro.nombre_pagina = nombre_pagina
            registro.save()

            return ConfiguracionCreateBase(success=True)

        except Exception as e:
            print(e)
            return ConfiguracionCreateBase(success=False, error = e)
class ConfiguracionEdit(graphene.Mutation):
    class Arguments:
        nombre_pagina = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre_pagina):
        try:
            registro = Configuracion.objects.get(pk=1)
            if nombre_pagina:
                registro.nombre_pagina = nombre_pagina
            registro.save()

            return ConfiguracionEdit(success=True)

        except Exception as e:
            print(e)
            return ConfiguracionEdit(success=False, error = e)


class PerfilesCreate(graphene.Mutation):
    class Arguments:
        nombre = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, nombre):
        try:
            registro = Perfiles()

            if Perfiles.objects.filter(nombre=nombre).exists():
                return PerfilesCreate(success=False, error = "El perfil ya existe")
            registro.nombre = nombre
            registro.save()

            return PerfilesCreate(success=True)

        except Exception as e:
            print(e)
            return PerfilesCreate(success=False, error = e)

class PerfilesEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombre = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, nombre):
        try:
            registro = Perfiles.objects.get(pk=id)
            if nombre:
                if Perfiles.objects.filter(nombre=nombre).exists():
                    return PerfilesEdit(success=False, error = "El perfil ya existe")
                registro.nombre = nombre
            registro.save()

            return PerfilesEdit(success=True)

        except Exception as e:
            print(e)
            return PerfilesEdit(success=False, error = e)

class PerfilesDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Perfiles.objects.get(pk=id)
            registro.delete()
            return PerfilesDelete(success=True)

        except Exception as e:
            print(e)
            return PerfilesDelete(success=False, error = e)
class UsuarioCreate(graphene.Mutation):
    class Arguments:
        perfil = graphene.Int(required=True)
        nombres = graphene.String(required=True)
        rut = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, perfil, nombres, rut, email, password):
        try:
            if Usuario.objects.filter(email=email).exists() == False :

                registro = Usuario()
                registro.perfil = Perfiles.objects.get(pk=perfil)
                registro.nombres = nombres
                registro.rut = rut
                registro.email = email
                registro.password = make_password(password)
                registro.save()

                return UsuarioCreate(success=True)

        except Exception as e:
            print(e)
            return UsuarioCreate(success=False, error = e)


class UsuarioEdit(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        nombres = graphene.String()
        password = graphene.String()

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id, nombres, password):
        try:
            registro = Usuario.objects.get(pk=id)
            if nombres:
                registro.nombres = nombres
            if password:
                registro.password = make_password(password)
            registro.save()

            return UsuarioEdit(success=True)

        except Exception as e:
            print(e)
            return UsuarioEdit(success=False, error = e)

class UsuarioDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = Usuario.objects.get(pk=id)
            registro.delete()
            return UsuarioDelete(success=True)

        except Exception as e:
            print(e)
            return UsuarioDelete(success=False, error = e)

class DireccionUsuarioCreate(graphene.Mutation):
    class Arguments:
        usuario = graphene.Int(required=True)
        direccion = graphene.String(required=True)
        comuna = graphene.String(required=True)
        ciudad = graphene.String(required=True)
    

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, usuario, direccion, comuna, ciudad):
        try:
            registro = DireccionUsuario()
            registro.usuario = Usuario.objects.get(pk=usuario)
            registro.direccion = direccion
            registro.comuna = comuna
            registro.ciudad = ciudad
            registro.save()

            return DireccionUsuarioCreate(success=True)

        except Exception as e:
            print(e)
            return DireccionUsuarioCreate(success=False, error = e)        

class DireccionUsuarioDelete(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()
    error = graphene.String()

    def mutate(self, info, id):
        try:
            registro = DireccionUsuario.objects.get(pk=id)
            registro.delete()
            return DireccionUsuarioDelete(success=True)

        except Exception as e:
            print(e)
            return DireccionUsuarioDelete(success=False, error = e)


class Mutation(graphene.ObjectType):
    categoriaCreate = CategoriaCreate.Field()
    categoriaEdit = CategoriaEdit.Field()
    categoriaDelete = CategoriaDelete.Field()
    subcategoriaCreate = SubCategoriaCreate.Field()
    subcategoriaEdit = SubCategoriaEdit.Field()
    subcategoriaDelete = SubCategoriaDelete.Field()
    productoCreate = ProductoCreate.Field()
    productoEdit = ProductoEdit.Field()
    productoDelete = ProductoDelete.Field()
    colorProductoCreate = ColorProductoCreate.Field()
    colorProductoEdit = ColorProductoEdit.Field()
    colorProductoDelete = ColorProductoDelete.Field()
    sizeProductoCreate = SizeProductoCreate.Field()
    sizeProductoEdit = SizeProductoEdit.Field()
    sizeProductoDelete = SizeProductoDelete.Field()
    caracteristicaCreate = CaracteristicaCreate.Field()
    caracteristicaEdit = CaracteristicaEdit.Field()
    caracteristicaDelete = CaracteristicaDelete.Field()
    caracteristicaProductoCreate = CaracteristicaProductoCreate.Field()
    caracteristicaProductoEdit = CaracteristicaProductoEdit.Field()
    caracteristicaProductoDelete = CaracteristicaProductoDelete.Field()
    imagenCreate = ImagenCreate.Field()
    imagenDelete = ImagenDelete.Field()
    imagenProductoCreate = ImagenProductoCreate.Field()
    imagenProductoDelete = ImagenProductoDelete.Field()
    pedidoCreate = PedidoCreate.Field()
    pedidoEdit = PedidoEdit.Field()
    pedidoDelete = PedidoDelete.Field()
    documentoCreate = DocumentoCreate.Field()
    documentoDelete = DocumentoDelete.Field()
    pedidoContenidoCreate = PedidoContenidoCreate.Field()
    pedidoContenidoDelete = PedidoContenidoDelete.Field()
    configuracionCreateBase = ConfiguracionCreateBase.Field()
    configuracionEdit = ConfiguracionEdit.Field()
    PerfilesCreate = PerfilesCreate.Field()
    PerfilesEdit = PerfilesEdit.Field()
    PerfilesDelete = PerfilesDelete.Field()
    UsuarioCreate = UsuarioCreate.Field()
    UsuarioEdit = UsuarioEdit.Field()
    UsuarioDelete = UsuarioDelete.Field()
    DireccionUsuarioCreate = DireccionUsuarioCreate.Field()
    DireccionUsuarioDelete = DireccionUsuarioDelete.Field()








