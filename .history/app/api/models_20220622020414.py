from django.db import models
from login.models import *
# Create your models here.


class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

class SubCategoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    estado = models.BooleanField(default=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'SubCategoria'
        verbose_name_plural = 'SubCategorias'

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    codigo_barra = models.CharField(max_length=100)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    estado = models.BooleanField(default=True)
    sub_categoria = models.ForeignKey(SubCategoria, on_delete=models.CASCADE)
    precio = models.IntegerField(default = 0)
    oferta = models.IntegerField(default = 0)
    stock = models.IntegerField(default= 0)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

class ColorProducto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre + ' ' + self.producto.nombre

    class Meta:
        verbose_name = 'Color Producto'
        verbose_name_plural = 'Colores Productos'

class SizeProducto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre + ' ' + self.producto.nombre

    class Meta:
        verbose_name = 'Tamaño Producto'
        verbose_name_plural = 'Tamaños Productos'

class Caracteristica(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    sub_categoria = models.ForeignKey(SubCategoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Caracteristica'
        verbose_name_plural = 'Caracteristicas'

class CaracteristicaProducto(models.Model):
    id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    caracteristica = models.ForeignKey(Caracteristica, on_delete=models.CASCADE)
    valor = models.CharField(max_length=50)

    def __str__(self):
        return self.producto.nombre + ' ' + self.caracteristica.nombre + ' ' + self.valor

    class Meta:
        verbose_name = 'Caracteristica Producto'
        verbose_name_plural = 'Caracteristicas Productos'
class Imagen(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    ruta = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Imagen'
        verbose_name_plural = 'Imagenes'

class ImagenProducto(models.Model):
    id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    imagen = models.ForeignKey(Imagen, on_delete=models.CASCADE)

    def __str__(self):
        return self.producto.nombre

    class Meta:
        verbose_name = 'Imagen Producto'
        verbose_name_plural = 'Imagenes Productos'





class Pedido(models.Model):
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(default = None, null=True, blank=True)
    track_id = models.CharField(max_length=100, default='')
    estado = models.CharField(max_length=50) #pendiente, en proceso, entregado, cancelado
    monto_total = models.IntegerField(default=0)
    direccion_envio = models.ForeignKey(DireccionUsuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.cliente.nombre + ' ' +  str(self.id)

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'

class Documento(models.Model):
    id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=50)
    rut = models.CharField(max_length=200)
    fecha = models.DateField()
    folio = models.IntegerField(default=0)
    ruta_pdf = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Documento'
        verbose_name_plural = 'Documentos'

class PedidoContenido(models.Model):
    id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)
    precio = models.IntegerField(default=0)

    def __str__(self):
        return self.producto.nombre + ' ' + str(self.cantidad)

    class Meta:
        verbose_name = 'Contenido Pedido'
        verbose_name_plural = 'Contenido Pedidos'

class Configuracion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_pagina = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre_pagina

    class Meta:
        verbose_name = 'Configuracion'
        verbose_name_plural = 'Configuraciones'

