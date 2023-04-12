import datetime
from api_sig.models import *
from api_sig.random_datetime import get_current_time as get_custom_random_datetime
import random
from django.db.models import Sum
# sucursal = Sucursal.objects.get(pk=1)
MIN_LINEA_PEDIDO=1
MAX_LINEA_PEDIDO=20
MIN_CANT_PRODUCTO=1
MAX_CANT_PRODUCTO=3
MIN_ID_PRODUCTO=1
MAX_ID_PRODUCTO=124
MIN_ID_SUCURSAL=1
MAX_ID_SUCURSAL=5

def generar_datos(cantidad):
    for n in range(cantidad):
        generar_pedido()
        print(n)

def generar_pedido():
    fecha_registro=get_custom_random_datetime()
    random_sucursal=random.randint(MIN_ID_SUCURSAL,MAX_ID_SUCURSAL)
    sucursal=Sucursal.objects.get(pk=random_sucursal)
    pedido=Pedido.objects.create(fecha_registro=fecha_registro, estado=Pedido.VENDIDO)
    pedido.save()
    
    # random_lineas_pedido=random.randint(MIN_LINEA_PEDIDO, MAX_LINEA_PEDIDO)
    random_lineas_pedido=1
    # print(random_lineas_pedido)
    total_venta=0
    for x in range(random_lineas_pedido):
        # random_cantidad_producto=random.randint(MIN_CANT_PRODUCTO, MAX_CANT_PRODUCTO)
        random_cantidad_producto=200
        # random_producto=random.randint(MIN_ID_PRODUCTO, MAX_ID_PRODUCTO)
        random_producto=48
        producto = Producto.objects.get(pk=random_producto)
        # creando linea producto
        linea_pedido=generar_linea_pedido(pedido, producto, random_cantidad_producto)
        reabastecer_inventario(sucursal, producto, fecha_registro)
        # validar que hay existencias antes de guardar sino no guardar 
        if hay_existencias(sucursal, producto, random_cantidad_producto):
            linea_pedido.save()
            # creando movimiento
            generar_movimiento(sucursal,producto, fecha_registro,linea_pedido.cantidad)        
            total_venta=total_venta+linea_pedido.total
        
    # registrar venta
    venta=generar_venta(pedido, fecha_registro, total_venta)
    venta.save()
    # return pedido

def generar_linea_pedido(pedido, producto, cantidad):
    importe=producto.precio*cantidad
    total=importe*(1-producto.descuento)
    # agregar movimiento de entrada
    linea_pedido=LineaPedido.objects.create(id_pedido=pedido,id_producto=producto,precioUni=producto.precio,descuento=producto.descuento,importe=importe,cantidad=cantidad,total=total, movimiento=[])
    return linea_pedido

def generar_movimiento(sucursal, producto, fecha_registro, cantidad):
    # comprobar costo de producto cuando entro al inventario mientras existencias sean mayor a cantidad,
    # se realizaran los movimientos necesarios para cubrir la demanda

    # recupera el inventario en orden Primeras Entradas Primeras Salidas
    inventario=ProductoEnSucursal.objects.filter(id_sucursal=sucursal,id_producto=producto, cantidad__gt=0).order_by('fecha_registro')
    cantidad_linea_pedido=cantidad
    movimientos=[]
    for lote in inventario:
        if cantidad_linea_pedido>0:
            cantidad_disponible=lote.cantidad
            if cantidad_disponible>=cantidad_linea_pedido:
                # hay más en este lote de lo que se va a vender
                cantidad_movimiento=cantidad_linea_pedido
                cantidad_linea_pedido=0 #demanda cubierta

            elif cantidad_disponible<cantidad_linea_pedido:
                # este lote no cubre la demanda y por lo tanto hay que dar de otro lote para cubrir la demanda
                cantidad_movimiento=cantidad_disponible
                cantidad_linea_pedido-=cantidad_movimiento # se resta la cantidad de este movimiento a la cantidad demandada por el cliente

            # calculando el costo de este movimiento, en terminos del precio al que se compro al proveedor
            total=cantidad_movimiento*lote.valorUnitario
            movimiento=Movimiento.objects.create(id_sucursal=sucursal, 
                                                    id_producto=producto, 
                                                    fecha_registro=fecha_registro,
                                                    detalle=producto.nombre, 
                                                    valorUnitario=lote.valorUnitario, 
                                                    cantidad=cantidad_movimiento, 
                                                    total=total, 
                                                    tipo="S")
            movimiento.save()
            # modificar producto en sucursal (inventario)
            lote.cantidad=lote.cantidad-cantidad_movimiento
            lote.save()
        else:
            break


def generar_venta(pedido, fecha_registro, total_venta):
    iva=total_venta*0.13
    venta = Venta.objects.create(pedido_venta=pedido, total=total_venta, iva=iva, fecha_registro=fecha_registro)
    return venta

def hay_existencias(sucursal, producto, cantidad):
    total=ProductoEnSucursal.objects.filter(id_sucursal=sucursal,id_producto=producto).aggregate(total=Sum('cantidad'))['total']
    return total>=cantidad

def reabastecer_inventario(sucursal, producto, fecha_actual):
    
    total_disponible=ProductoEnSucursal.objects.filter(id_sucursal=sucursal,id_producto=producto).aggregate(total=Sum('cantidad'))['total']
    # si no hay existencias hacer el nuevo pedido
    primer_movimiento=Movimiento.objects.filter(id_sucursal=sucursal, id_producto=producto, tipo="E").order_by('fecha_registro').first()
    if total_disponible<primer_movimiento.total*0.2:
        minutos_aleatorio=random.randint(0,59)
        segundos_aleatorio=random.randint(0,59)
        dias_aleagorio=random.randint(0,3)
        fecha_registro=fecha_actual+datetime.timedelta(days=dias_aleagorio,minutes=minutos_aleatorio,seconds=segundos_aleatorio)
        porcentaje_fluctuacion_mercado=random.uniform(-0.15,0.15)
        valorUnitario=round(primer_movimiento.valorUnitario*(1+porcentaje_fluctuacion_mercado),2)
        valor_maximo=(primer_movimiento.cantidad%12)
        if valor_maximo==0:
            valor_maximo=2
        cantidad=random.randint(1,valor_maximo)*12
        total=cantidad*valorUnitario
        movimiento=Movimiento.objects.create(id_sucursal=sucursal, 
                                                    id_producto=producto, 
                                                    fecha_registro= fecha_registro,
                                                    detalle=producto.nombre, 
                                                    valorUnitario=valorUnitario, 
                                                    cantidad=cantidad, 
                                                    total=total, 
                                                    tipo="E")
        movimiento.save()
        nuevo_lote=ProductoEnSucursal.objects.create(id_sucursal=sucursal,
                                                     id_producto=producto,
                                                     valorUnitario=valorUnitario, 
                                                     cantidad=cantidad, 
                                                     fecha_registro=fecha_registro)
        nuevo_lote.save()


