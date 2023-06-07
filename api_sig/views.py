
from datetime import datetime
import json
from django.forms import ValidationError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.http import HttpRequest
from rest_framework import serializers
from .models import *
import random
import pandas as pd
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
            "anio": "2022",
            "trimestre": "primero",
            "ingresos": 7134.56,
            "costos": 4128.45,
        },
        {
            "anio": "2022",
            "trimestre": "segundo",
            "ingresos": 6873.31,
            "costos": 4035.12,
        },
        {
            "anio": "2022",
            "trimestre": "tercero",
            "ingresos": 6214.94,
            "costos":4035.12,
        },
        {
            "anio": "2022",
            "trimestre": "cuarto",
            "ingresos": 7417.28,
            "costos": 5259.75,
        },
    ]

    jsonString= json.dumps(dicci)   
        
    return jsonString
