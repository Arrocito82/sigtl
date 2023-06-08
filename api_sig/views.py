
from datetime import datetime
import time
import json
from django.forms import ValidationError
from django.http import  HttpResponse, JsonResponse
from .models import *
import random
import csv
import os
import zipfile
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
from dateutil.parser import parser


def index(request):
    mensaje = ["Hello, World", "Hello, Universe!", "Hola, Mundo!"]
    index=random.randrange(0,len(mensaje))
    return JsonResponse({
        'Msg':mensaje[index]
        })

#VALIDAR EXCEL MOVIMIENTOS
@csrf_exempt
def validarMovimientos(request):
    data=request.body
    #print(data)
    string_data=request.body.decode('utf-8')
    data_dict = json.loads(string_data)
    error=[]

    contador = 0

    formato_fecha = "%Y-%m-%d %H:%M:%S %z"

    
    p=parser()

    for l in data_dict:
        id="formato"
        fecha="formato"
        idSuc="formato"
        idProd="formato"
        valU="formato"
        deta="formato"
        canti="formato"
        tot="formato"
        tip="formato"
        
        movimiento=Movimiento()
        if l["id_movimiento"] != "":
            try:
                id=int(l["id_movimiento"])
                print(movimiento.id_movimiento)
            except Exception as e:
                l["errores"]="formato no valido"
            movimiento.id_movimiento=id

        if l["id_sucursal_id"] != "":
            try:
                movimiento.id_sucursal_id=int(l["id_sucursal_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            
        if l["id_producto_id"] != "":    
            try:
                idProd=int(l["id_producto_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.id_producto_id=idProd

        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            #print(fecha_div[0])
            try:
                fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
            except ValueError as e:
                l["errores"]="formato no valido"
            movimiento.fecha_registro=fecha

        if l["valorUnitario"] != "":
            try:
                valU=float(l["valorUnitario"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.valorUnitario=valU

        if l["detalle"] != "":
            try:
                deta=l["detalle"]
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.detalle=deta

        if l["cantidad"] != "":
            try:
                canti=int(l["cantidad"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.cantidad=canti

        if l["total"] != "":
            try:
                tot=float(l["total"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.total=tot

        if l["tipo"] != "":
            try:
                tip =l["tipo"].strip(" ")
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.tipo=tip
        try:
            movimiento.full_clean()
            l["valido"]=True
            l["errores"]={}
        except ValidationError as e:
            l["valido"]=False
            l["errores"]=e.message_dict
            # print(e)
    print(data_dict)
    return JsonResponse(data_dict, safe=False)

#GUARDAR EXCEL MOVIMIENTOS EN DB
@csrf_exempt
def crearMovimientos(request):
    data=request.body
    #print(data)
    string_data=request.body.decode('utf-8')
    data_dict = json.loads(string_data)
    error=False

    fecha=datetime.now()
    
    p=parser()

    for l in data_dict:
        id="formato"
        fecha="formato"
        idSuc="formato"
        idProd="formato"
        valU="formato"
        deta="formato"
        canti="formato"
        tot="formato"
        tip="formato"
        
        movimiento=Movimiento()
        if l["id_movimiento"] != "":
            try:
                id=int(l["id_movimiento"])
                print(movimiento.id_movimiento)
            except Exception as e:
                l["errores"]="formato no valido"
            movimiento.id_movimiento=id

        if l["id_sucursal_id"] != "":
            try:
                movimiento.id_sucursal_id=int(l["id_sucursal_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            
        if l["id_producto_id"] != "":    
            try:
                idProd=int(l["id_producto_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.id_producto_id=idProd

        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            #print(fecha_div[0])
            try:
                fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
            except ValueError as e:
                l["errores"]="formato no valido"
            movimiento.fecha_registro=fecha

        if l["valorUnitario"] != "":
            try:
                valU=float(l["valorUnitario"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.valorUnitario=valU

        if l["detalle"] != "":
            try:
                deta=l["detalle"]
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.detalle=deta

        if l["cantidad"] != "":
            try:
                canti=int(l["cantidad"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.cantidad=canti

        if l["total"] != "":
            try:
                tot=float(l["total"])
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.total=tot

        if l["tipo"] != "":
            try:
                tip =l["tipo"].strip(" ")
            except Exception as e:
                l["errores"]={"formato no valido"}
            movimiento.tipo=tip
        try:
            movimiento.full_clean()
            l["valido"]=True
            l["errores"]={}
            movimiento.save()
        except ValidationError as e:
            l["valido"]=False
            l["errores"]=e.message_dict
            # print(e)
    # print(data_dict)
    return JsonResponse(data_dict, safe=False)

#VALIDAR EXCEL PRODUCTOS DAÑADOS
@csrf_exempt
def validarProductosDanados(request):

    string_data=request.body.decode('utf-8')
    data_dict = json.loads(string_data)

    fecha=datetime.now()
    
    for l in data_dict:

        productoDanado=ProductoDanado()
        if l["id_productoDanado"] != "":
            productoDanado.id_productoDanado=int(l["id_productoDanado"])
        if l["id_producto_id"] != "":    
            productoDanado.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            # print(fecha_div[0])
            fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
            # print(type(fecha_div))
            #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
            #print("hola", my_datetime_utc)
            productoDanado.fecha_registro=fecha
        if l["detalle"] != "":
            productoDanado.detalle=l["detalle"]
        if l["cantidad"] != "":
            productoDanado.cantidad=int(l["cantidad"])

        try:
            productoDanado.full_clean()
            l["valido"]=True
            l["errores"]={}
        except ValidationError as e:
            l["valido"]=False
            l["errores"]=e.message_dict
            # print(e)
    # print(data_dict)
    return JsonResponse(data_dict, safe=False)

#Guardar EXCEL PRODUCTOS DAÑADOS
@csrf_exempt
def crearProductosDanados(request):

    string_data=request.body.decode('utf-8')
    data_dict = json.loads(string_data)

    fecha=datetime.now()
    
    for l in data_dict:

        productoDanado=ProductoDanado()
        if l["id_productoDanado"] != "":
            productoDanado.id_productoDanado=int(l["id_productoDanado"])
        if l["id_producto_id"] != "":    
            productoDanado.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            # print(fecha_div[0])
            fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
            # print(type(fecha_div))
            #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
            #print("hola", my_datetime_utc)
            productoDanado.fecha_registro=fecha
        if l["detalle"] != "":
            productoDanado.detalle=l["detalle"]
        if l["cantidad"] != "":
            productoDanado.cantidad=int(l["cantidad"])

        try:
            productoDanado.full_clean()
            l["valido"]=True
            l["errores"]={}
            productoDanado.save()
        except ValidationError as e:
            l["valido"]=False
            l["errores"]=e.message_dict
            # print(e)
    # print(data_dict)
    return JsonResponse(data_dict, safe=False)

#Reporte de ingresos y Costos
@csrf_exempt
def reporteIngresosCostos(filtro):
    data_dic={}
    movimientos=Movimiento.objects.all()
    totalE=0
    totalS=0
    anios=set()
    #extraer años registrados 
    for a in movimientos:
        anios.add(a.fecha_registro.year)

    for m in movimientos:
        for anio in anios:
            if m.fecha_registro.year== anio:
                if m.fecha_registro.month <=3:
                    data_dic["anio"]=m.fecha_registro.year
                    data_dic["trimestre"]="Primer trimestre"
                    if m.tipo=="E":
                        totalE+=(m.valorUnitario*m.cantidad)
                        data_dic["ingresos"]=totalE
                    else:
                        totalS+=(m.valorUnitario*m.cantidad)
                        data_dic["costos"]=totalS
                elif m.fecha_registro.month <=6:
                    data_dic["anio"]=m.fecha_registro.year
                    data_dic["trimestre"]="Segundo trimestre"
                    data_dic["total"]
                    if m.tipo=="E":
                        totalE+=(m.valorUnitario*m.cantidad)
                        data_dic["ingresos"]=totalE
                    else:
                        totalS+=(m.valorUnitario*m.cantidad)
                        data_dic["costos"]=totalS
                elif m.fecha_registro.month <=9:
                    data_dic["anio"]=m.fecha_registro.year
                    data_dic["trimestre"]="Tercer trimestre"
                    data_dic["total"]
                    if m.tipo=="E":
                        totalE+=(m.valorUnitario*m.cantidad)
                        data_dic["ingresos"]=totalE
                    else:
                        totalS+=(m.valorUnitario*m.cantidad)
                        data_dic["costos"]=totalS
                else:
                    data_dic["anio"]=m.fecha_registro.year
                    data_dic["trimestre"]="Cuarto trimestre"
                    data_dic["total"]
                    if m.tipo=="E":
                        totalE+=(m.valorUnitario*m.cantidad)
                        data_dic["ingresos"]=totalE
                    else:
                        totalS+=(m.valorUnitario*m.cantidad)
                        data_dic["costos"]=totalS
            #fin comparación de años
        #fin for de años
    #fin for de lista de movimientos        

    dicci=[
        {
            "sucursal": "todas",
            "anio": "2022",
            "trimestre": "primero",
            "ingresos": 7134.56,
            "costos": 4128.45,
        },
        {
            "sucursal": "todas",
            "anio": "2022",
            "trimestre": "segundo",
            "ingresos": 6873.31,
            "costos": 4035.12,
        },
        {
            "sucursal": "todas",
            "anio": "2022",
            "trimestre": "tercero",
            "ingresos": 6214.94,
            "costos":4035.12,
        },
        {
            "sucursal": "todas",
            "anio": "2022",
            "trimestre": "cuarto",
            "ingresos": 7417.28,
            "costos": 5259.75,
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return HttpResponse(jsonString)

#Reporte de Productos mas vendidos por sucursal
@csrf_exempt
def reporteProductosMasVendidos(filtro):

    dicci=[
        {
            "sucursal": "Sucursal San Salvador",
            "anio": "2022",
            "trimestre": "primero",
            "producto":"Esmalte de uÃ±as rojo intenso",
        },
        {
            "sucursal": "Sucursal Santa Tecla",
            "anio": "2022",
            "trimestre": "primero",
            "producto":" El SeÃ±or de los Anillos",
        },
        {
            "sucursal": "Sucursal San Miguel",
            "anio": "2022",
            "trimestre": "primero",
            "producto":" Don Quijote de la Mancha",
        },
        {
            "sucursal": "Sucursal Santa Ana",
            "anio": "2022",
            "trimestre": "primero",
            "producto":"El SeÃ±or de los Anillos",
        },
        {
            "sucursal": "Sucursal Sonsonate",
            "anio": "2022",
            "trimestre": "primero",
            "producto":"Sudadera con capucha",
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return HttpResponse(jsonString)

#Reporte de Frecuencia de compra
@csrf_exempt
def reporteFrecuenciaDeCompra(filtro):

    dicci=[
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":"Cien aÃ±os de soledad",
            "cantidad promedio": 1
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" Don Quijote de la Mancha",
            "cantidad promedio": 1.75
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" El Gran Gatsby",
            "cantidad promedio": 1.5
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" El Hobbit",
            "cantidad promedio": 1
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" El SeÃ±or de los Anillos",
            "cantidad promedio": 2.25
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" El viejo y el mar",
            "cantidad promedio": 1.5
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" Matar a un ruiseÃ±or",
            "cantidad promedio": 1.25
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":" Orgullo y prejuicio",
            "cantidad promedio": 1.5
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":"Abrigo de lana",
            "cantidad promedio": 0.5
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":"BalÃ³n de baloncesto",
            "cantidad promedio": 0.25
        },
        {
            "anio": "2022",
            "trimestre": "primero",
            "producto":"Barra de labios nude",
            "cantidad promedio": 1.75
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return HttpResponse(jsonString)

#Reporte de Productos Dañados
@csrf_exempt
def reporteProductosDaniados(filtro):

    dicci=[
        {
            "sucursal": "Sucursal San Salvador",
            "producto":"Esmalte de uÃ±as rojo intenso",
            "fecha de vencimiento": "2022-01-04",
            "descuento": 0.2,
        },
        {
            "sucursal": "Sucursal Santa Tecla",
            "producto":" Atun Enlatado",
            "fecha de vencimiento": "2022-01-03",
            "descuento": 0.3,
        },
        {
            "sucursal": "Sucursal San Miguel",
            "producto":"Mantequilla de Mano",
            "fecha de vencimiento": "2022-01-05",
            "descuento": 0.3,
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return HttpResponse(jsonString)

#Reporte de Clientes
@csrf_exempt
def reporteDemandaClientes(filtro):

    dicci=[
        {
            "sucursal": "Sucursal San Salvador",
            "mañana": 7,
            "Tarde-noche": 8, 
        },
        {
            "sucursal": "Sucursal San Salvador",
            "mañana": 9,
            "Tarde-noche": 7, 
        },
        {
            "sucursal": "Sucursal San Salvador",
            "mañana": 8,
            "Tarde-noche": 9,  
        },
        {
            "sucursal": "Sucursal San Salvador",
            "mañana": 9,
            "Tarde-noche": 9, 
        },
        {
            "sucursal": "Sucursal San Salvador",
            "mañana": 7,
            "Tarde-noche": 9, 
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return HttpResponse(jsonString)


# BACKUP
def crearBackup(request):
    # crearBackupCategorias()
    # crearBackupSucursales()
    # crearBackupProductos()
    # crearBackupMovimientos()
    # crearBackupProductosDanados()
    fecha=time.strftime("%d/%m/%Y, %H:%M:%S",time.localtime())
    return JsonResponse({"mensaje":"Respaldo de datos creado con éxito.", "fecha":fecha }, safe=False)

def descargarBackup(request):
    filenames = [
        "backup/categorias.csv", 
        "backup/sucursales.csv",
        "backup/productos.csv",
        "backup/movimientos.csv",
        "backup/productosDanados.csv",
                 ]
    zip_subdir = "backup"
    zip_filename = "%s.zip" % zip_subdir
    
    # Open StringIO to grab in-memory ZIP contents
    s=BytesIO()

    # The zip compressor
    zf = zipfile.ZipFile(s, "w")

    for fpath in filenames:
        # Calculate path for file in zip
        fdir, fname = os.path.split(fpath)
        zip_path = os.path.join(zip_subdir, fname)

        # Add file, at correct path
        zf.write(fpath, zip_path)

    # Must close zip for all contents to be written
    zf.close()

    # Grab ZIP file from in-memory, make response with correct MIME-type
    response = HttpResponse(s.getvalue(), content_type = "application/x-zip-compressed")
    # ..and correct content-disposition
    response['Content-Disposition'] = 'attachment; filename=%s' % zip_filename

    return response

def crearBackupProductos():
    productos=Producto.objects.all()
    with open('backup/productos.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "id_producto",
            "id_categoria",
            "nombre",
            "precio",
            "descripcion_producto",
            "descuento",
            "cantidad_disponible",
            "valorInv"
            ])
        for producto in productos:
            
            writer.writerow([
                producto.id_producto,
                producto.id_categoria.id_categoria,
                producto.nombre,
                producto.precio,
                producto.descripcion_producto,
                producto.descuento,
                producto.cantidad_disponible,
                producto.valorInv
                ])
        file.close()
    return

def crearBackupSucursales():
    sucursales=Sucursal.objects.all()
    with open('backup/sucursales.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "id_sucursal",
            "nombre_sucursal",
            "direccion"
            ])
        for sucursal in sucursales:
            
            writer.writerow([
                sucursal.id_sucursal,
                sucursal.nombre_sucursal,
                sucursal.direccion
                ])
        file.close()
    return

def crearBackupCategorias():
    categorias=Categoria.objects.all()
    with open('backup/categorias.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "id_categoria",
            "nombre_categoria",
            "descripcion_categoria"
            ])
        for categoria in categorias:
            
            writer.writerow([
                categoria.id_categoria,
                categoria.nombre_categoria,
                categoria.descripcion_categoria
                ])
        file.close()
    return

def crearBackupMovimientos():
    movimientos=Movimiento.objects.all()
    with open('backup/movimientos.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "id_movimiento",
            "id_sucursal",
            "id_producto",
            "fecha_registro",
            "detalle",
            "valorUnitario",
            "cantidad",
            "total",
            "tipo"
            ])
        for movimiento in movimientos:
            
            writer.writerow([
                movimiento.id_movimiento,
                movimiento.id_sucursal.id_sucursal,
                movimiento.id_producto.id_producto,
                movimiento.fecha_registro,
                movimiento.detalle,
                movimiento.valorUnitario,
                movimiento.cantidad,
                movimiento.total,
                movimiento.tipo
                ])
        file.close()
    return

def crearBackupProductosDanados():
    productos=ProductoDanado.objects.all()
    with open('backup/productosDanados.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "id_productoDanado",
            "id_producto",
            "fecha_registro",
            "detalle",
            "cantidad"
            ])
        for producto in productos:
            
            writer.writerow([
                producto.id_productoDanado,
                producto.id_producto.id_producto,
                producto.fecha_registro,
                producto.detalle,
                producto.cantidad
                ])
        file.close()
    return
