
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
from .models import *
import random
import pandas as pd
from django.views.decorators.csrf import csrf_exempt

def index(request):
    mensaje = ["Hello, World", "Hello, Universe!", "Hola, Mundo!"]
    index=random.randrange(0,len(mensaje))
    return JsonResponse({
        'Msg':mensaje[index]
        })

@csrf_exempt
def main(request):
    # if request.method == "POST":
    #     file = request.FILES['archivo']
    #     obj = File.objects.create(file = file)
    #     create_db(obj.file)
    # return render(request, 'main.html')
    return HttpResponse("<h1>Válido</h1>")

def create_db(file_path):
    df=pd.read_csv(file_path, delimiter=',')
    print(df.values)
    list_of_csv = [list(row) for row in df.values]

    for l in list_of_csv:
        Movimiento.objects.create(
            id_movimiento=l[1],
            id_sucursal=l[2],
            id_producto=l[3],
            fecha_registro=l[4],
            detalle=l[5],
            valorUnitario=l[6],
            cantidad=l[7],
            total=l[8],
            tipo =l[9],
        )