from django.contrib import admin
from api_sig.models import *

# Register your models here.
admin.site.register(Sucursal)
admin.site.register(LineaPedido)
admin.site.register(Pedido)
admin.site.register(Venta)
admin.site.register(Producto)
admin.site.register(ProductoDanado)
admin.site.register(ProductoEnSucursal)