
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

@csrf_exempt
def create_db(request):
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
        movimiento.id_movimiento=l["id_movimiento"],
        movimiento.id_sucursal_id=l["id_sucursal_id"],
        movimiento.id_producto_id=l["id_producto_id"],

        print(l["fecha_registro"])
        fecha_div=l["fecha_registro"].split("+")
        print(fecha_div[0])
        fecha=datetime.strptime(fecha_div, "%Y-%m-%d %H:%M:%S")
        print(type(fecha_div))
        #my_datetime_utc = fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        #print("hola", my_datetime_utc)
        #movimiento.fecha_registro=fecha_div,

        movimiento.detalle=l["detalle"],
        movimiento.valorUnitario=l["valorUnitario"],
        movimiento.cantidad=l["cantidad"],
        movimiento.total=l["total"],
        movimiento.tipo =l["tipo"],
        try:
            movimiento.full_clean()
        except ValidationError as e:
            print(e)
    #print(data_dict)
    return JsonResponse(data_dict, safe=False)