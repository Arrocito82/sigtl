
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
        movimiento.id_movimiento=int(l["id_movimiento"])
        movimiento.id_sucursal_id=int(l["id_sucursal_id"])
        movimiento.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        if l["fecha_registro"] != "":
            fecha_div=l["fecha_registro"].split("+")
            # print(fecha_div[0])
            fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
            # print(type(fecha_div))
            #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
            #print("hola", my_datetime_utc)
            movimiento.fecha_registro=fecha

        movimiento.valorUnitario=float(l["valorUnitario"])
        movimiento.detalle=l["detalle"]
        movimiento.cantidad=int(l["cantidad"])
        movimiento.total=float(l["total"])
        movimiento.tipo =l["tipo"].strip(" ")
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
        movimiento.id_movimiento=int(l["id_movimiento"])
        movimiento.id_sucursal_id=int(l["id_sucursal_id"])
        movimiento.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        fecha_div=l["fecha_registro"].split("+")
        # print(fecha_div[0])
        fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
        # print(type(fecha_div))
        #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        #print("hola", my_datetime_utc)
        movimiento.fecha_registro=fecha

        movimiento.valorUnitario=float(l["valorUnitario"])
        movimiento.detalle=l["detalle"]
        movimiento.cantidad=int(l["cantidad"])
        movimiento.total=float(l["total"])
        movimiento.tipo =l["tipo"].strip(" ")
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
        productoDanado.id_productoDanado=int(l["id_productoDanado"])
        productoDanado.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        fecha_div=l["fecha_registro"].split("+")
        # print(fecha_div[0])
        fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
        # print(type(fecha_div))
        #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        #print("hola", my_datetime_utc)
        productoDanado.fecha_registro=fecha

        productoDanado.detalle=l["detalle"]
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

#VALIDAR EXCEL PRODUCTOS DAÑADOS
@csrf_exempt
def crearProductosDanados(request):

    string_data=request.body.decode('utf-8')
    data_dict = json.loads(string_data)

    fecha=datetime.now()
    
    for l in data_dict:

        productoDanado=ProductoDanado()
        productoDanado.id_productoDanado=int(l["id_productoDanado"])
        productoDanado.id_producto_id=int(l["id_producto_id"])

        # print(l["fecha_registro"])
        fecha_div=l["fecha_registro"].split("+")
        # print(fecha_div[0])
        fecha=datetime.strptime(fecha_div[0], "%Y-%m-%d %H:%M:%S")
        # print(type(fecha_div))
        #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        #print("hola", my_datetime_utc)
        productoDanado.fecha_registro=fecha

        productoDanado.detalle=l["detalle"]
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
@csrf_exempt
def reporteIngresosCostos(request):
    
    return
