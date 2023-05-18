from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
import random


def index(request):
    mensaje = ["Hello, World", "Hello, Universe!", "Hola, Mundo!"]
    index=random.randrange(0,len(mensaje))
    return JsonResponse({
        'Msg':mensaje[index]
        })
