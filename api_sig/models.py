from django.db import models

class Categoria(models.Model):
    id_categoria = models.BigAutoField(unique=True, primary_key=True, blank=False, null=False)
    nombre_categoria = models.CharField(max_length=30, blank=False, null=False)
    descripcion_categoria = models.TextField(blank=False, null=False)
    is_active = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return '%s, %s' % (self.id_categoria, self.nombre_categoria)


class Producto(models.Model):
    id_producto = models.BigAutoField(unique=True, primary_key=True, null=False, blank=False)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, blank=False, null=False)
    precio = models.FloatField(blank=False, null=False)
    descripcion_producto = models.TextField(blank=True, null=True)
    descuento = models.FloatField(blank=False, null=False, default=0.0)
    cantidad_disponible = models.IntegerField(
        blank=False, null=False, default=0)
    valorInv = models.FloatField(blank=False, null=False, default=0)
    is_active = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        return '%s, %s' % (self.nombre, self.descripcion_producto)

class Sucursal(models.Model):
    id_sucursal = models.BigAutoField(unique=True, primary_key=True, blank=False, null=False)
    nombre_sucursal = models.CharField(max_length=50, blank=False, null=False)
    direccion = models.TextField(blank=False, null=False)
    is_active = models.BooleanField(null=False, blank=False, default=True)
    productos = models.ManyToManyField(Producto, through='ventas.ProductoEnSucursal',                              through_fields=('id_sucursal', 'id_producto'),related_name='sucursal_productos',)

    def __str__(self):
        return '%s, %s' % (self.nombre_sucursal, self.id_municipio)

class Pedido(models.Model):
    VENDIDO = 'VND'
    EN_ESPERA= 'EES'
    ESTADOS = [
        (VENDIDO, 'Vendido'),
        (EN_ESPERA, 'En espera'),
    ]
    id_pedido = models.BigAutoField(unique=True, primary_key=True, blank=False, null=False)
    fecha_registro = models.DateTimeField(blank=False, null=False, auto_now=True)
    estado = models.CharField(choices=ESTADOS, max_length=3, default=EN_ESPERA)
    cliente = models.CharField(null=False, blank=True, max_length=50)

class LineaPedido(models.Model):
    id_linea_pedido = models.BigAutoField(unique=True, primary_key=True, blank=False, null=False)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='lineas')
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    precioUni = models.FloatField(null=False, blank=False)
    descuento = models.FloatField(null=False, blank=False, default=0)
    importe = models.FloatField(null=False, blank=False)
    cantidad = models.IntegerField(null=False, blank=False)
    total = models.FloatField(null=False, blank=False)

class Venta(models.Model):
    pedido_venta = models.OneToOneField(Pedido, on_delete=models.CASCADE, primary_key=True,related_name='pedido_vendido')
    total = models.FloatField(null=False, blank=False)
    iva = models.FloatField(null=False, blank=False)
    fecha_registro = models.DateTimeField(blank=False, null=False, auto_now_add=True)

class ProductoEnSucursal(models.Model):
    id_sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name="prods_sucursal")
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    valorUnitario = models.FloatField(blank=False, null=False)
    cantidad = models.IntegerField(blank=False, null=False)
    fecha_registro = models.DateTimeField(blank=False, null=False)

class ProductoDanado(models.Model):
    id_productoDanado = models.BigAutoField(unique=True, blank=False, null=False, primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha_registro = models.DateField(blank=False, null=False)
    detalle = models.CharField(max_length=100, blank=False, null=False)
    cantidad = models.IntegerField(blank=False, null=False)