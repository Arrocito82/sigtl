
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
    error=False

    contador = 0

    formato_fecha = "%Y-%m-%d %H:%M:%S %z"

    fecha=datetime.now()
    
    p=parser()

    for l in data_dict:

        movimiento=Movimiento()
        if l["id_movimiento"] != "" and l["id_movimiento"].isdigit():
            try:
                movimiento.id_movimiento=int(l["id_movimiento"])
            except Exception as e:
                l["errores"]="formato no valido"
        if l["id_sucursal_id"] != "":
            try:
                movimiento.id_sucursal_id=int(l["id_sucursal_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["id_producto_id"] != "":    
            try:
                movimiento.id_producto_id=int(l["id_producto_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}

        # print(l["fecha_registro"])
        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            # print(fecha_div[0])
            try:
                fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
                # print(type(fecha_div))
                #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
                #print("hola", my_datetime_utc)
                movimiento.fecha_registro=fecha
            except Exception as e:
                l["errores"]="formato no valido"

        if l["valorUnitario"] != "":
            try:
                movimiento.valorUnitario=float(l["valorUnitario"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["detalle"] != "":
            try:
                movimiento.detalle=l["detalle"]
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["cantidad"] != "":
            try:
                movimiento.cantidad=int(l["cantidad"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["total"] != "":
            try:
                movimiento.total=float(l["total"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["tipo"] != "":
            try:
                movimiento.tipo =l["tipo"].strip(" ")
            except Exception as e:
                l["errores"]={"formato no valido"}
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

    contador = 0

    formato_fecha = "%Y-%m-%d %H:%M:%S %z"

    fecha=datetime.now()
    
    p=parser()

    for l in data_dict:

        movimiento=Movimiento()
        if l["id_movimiento"] != "" and l["id_movimiento"].isdigit():
            try:
                movimiento.id_movimiento=int(l["id_movimiento"])
            except Exception as e:
                l["errores"]="formato no valido"
        if l["id_sucursal_id"] != "":
            try:
                movimiento.id_sucursal_id=int(l["id_sucursal_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["id_producto_id"] != "":    
            try:
                movimiento.id_producto_id=int(l["id_producto_id"])
            except Exception as e:
                l["errores"]={"formato no valido"}

        # print(l["fecha_registro"])
        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            # print(fecha_div[0])
            try:
                fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
                # print(type(fecha_div))
                #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
                #print("hola", my_datetime_utc)
                movimiento.fecha_registro=fecha
            except Exception as e:
                l["errores"]="formato no valido"

        if l["valorUnitario"] != "":
            try:
                movimiento.valorUnitario=float(l["valorUnitario"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["detalle"] != "":
            try:
                movimiento.detalle=l["detalle"]
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["cantidad"] != "":
            try:
                movimiento.cantidad=int(l["cantidad"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["total"] != "":
            try:
                movimiento.total=float(l["total"])
            except Exception as e:
                l["errores"]={"formato no valido"}
        if l["tipo"] != "":
            try:
                movimiento.tipo =l["tipo"].strip(" ")
            except Exception as e:
                l["errores"]={"formato no valido"}
        try:
            movimiento.full_clean()
            l["valido"]=True
            l["errores"]={}
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
    for m in movimientos:
        if m.tipo=="E":
            totalE+=(m.valorUnitario*m.cantidad)
        else:
            totalS+=(m.valorUnitario*m.cantidad)
    data_dic["ingresos"]=totalE
    data_dic["costos"]=totalS
    return data_dic
