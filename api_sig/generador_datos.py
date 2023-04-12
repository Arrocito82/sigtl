from api_sig.models import *
from api_sig.random_datetime import get_current_time as get_custom_random_datetime

producto = Producto.objects.get(pk=1)
sucursal = Sucursal.objects.get(pk=1)
def generar_pedido():
    fecha_registro=get_custom_random_datetime()
    pedido=Pedido.objects.create(fecha_registro=fecha_registro, estado=Pedido.VENDIDO)
    return pedido

def generar_linea_pedido():
    
#lineaPedido = LineaPedido.objects.create()