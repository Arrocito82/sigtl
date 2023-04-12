from api_sig.models import *
from api_sig.random_datetime import get_current_time as get_custom_random_datetime
import random
# sucursal = Sucursal.objects.get(pk=1)
MIN_LINEA_PEDIDO=1
MAX_LINEA_PEDIDO=25
MIN_CANT_PRODUCTO=1
MAX_CANT_PRODUCTO=3
MIN_ID_PRODUCTO=1
MAX_ID_PRODUCTO=124
MIN_ID_SUCURSAL=1
MAX_ID_SUCURSAL=5

def generar_pedido():
    fecha_registro=get_custom_random_datetime()
    random_sucursal=random.randint(MIN_ID_SUCURSAL,MAX_ID_SUCURSAL)
    sucursal=Sucursal.objects.get(pk=random_sucursal)
    pedido=Pedido.objects.create(fecha_registro=fecha_registro, estado=Pedido.VENDIDO)
    pedido.save()
    
    random_lineas_pedido=random.randint(MIN_LINEA_PEDIDO, MAX_LINEA_PEDIDO)
    print(random_lineas_pedido)
    total_venta=0
    for x in range(random_lineas_pedido):
        random_cantidad_producto=random.randint(MIN_CANT_PRODUCTO, MAX_CANT_PRODUCTO)
        random_producto=random.randint(MIN_ID_PRODUCTO, MAX_ID_PRODUCTO)
        producto = Producto.objects.get(pk=random_producto)
        # creando linea producto
        linea_pedido=generar_linea_pedido(pedido, producto, random_cantidad_producto)
        
        # validar que hay existencias antes de guardar sino no guardar 
        # si no hay existencias hacer el nuevo pedido
        linea_pedido.save()
        # creando movimiento
        movimiento=generar_movimiento(sucursal,producto, fecha_registro,linea_pedido.cantidad, linea_pedido.total)
        movimiento.save()
        # modificar producto en sucursal
        # registrar venta
        total_venta=total_venta+linea_pedido.total
        
    venta=generar_venta(pedido, fecha_registro, total_venta)
    venta.save()
    return pedido

def generar_linea_pedido(pedido, producto, cantidad):
    importe=producto.precio*cantidad
    total=importe*(1-producto.descuento)
    # agregar movimiento de entrada
    linea_pedido=LineaPedido.objects.create(id_pedido=pedido,id_producto=producto,precioUni=producto.precio,descuento=producto.descuento,importe=importe,cantidad=cantidad,total=total, movimiento=[])
    return linea_pedido

def generar_movimiento(sucursal, producto, fecha_registro, cantidad, total):
    # comprobar costo de producto cuando entro al inventario
    movimiento=Movimiento.objects.create(id_sucursal=sucursal, id_producto=producto, fecha_registro=fecha_registro,
                                          detalle=producto.nombre, valorUnitario=producto.precio, cantidad=cantidad, total=total, tipo="S")
    return movimiento

def generar_venta(pedido, fecha_registro, total_venta):
    iva=total_venta*0.13
    venta = Venta.objects.create(pedido_venta=pedido, total=total_venta, iva=iva, fecha_registro=fecha_registro)
    return venta
