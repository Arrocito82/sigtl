from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import random
import string
import json

# Create your views here.
@csrf_exempt
def iniciarSesion(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    random_string = generate_random_string(255)

    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    email = data_dict['email']

    if(email=="" or password == ""):
        return HttpResponse("Credenciales Inválidas", status=401)

    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': random_string,
        'email': email,
        'isAdmin': False,
        'isConfigured':True
    }
    return JsonResponse(data)

@csrf_exempt
def registrarAdmin(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    random_string = generate_random_string(255)

    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    email = data_dict['email']

    if(email=="" or password == ""):
        return HttpResponse("Credenciales Inválidas", status=401)

    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': random_string,
        'email': email,
        'isAdmin': True,
        'isConfigured':True
    }
    return JsonResponse(data)

@csrf_exempt
def cambiarContrasena(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    random_string = generate_random_string(255)

    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    # email = data_dict['email']

    if(password == ""):
        return HttpResponse("Credenciales Inválidas", status=401)

    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': random_string,
        'email': "ejemplo@tiendaluisito.com",
        'isAdmin': False,
        'isConfigured':True
    }
    return JsonResponse(data)

# Simula un Token JWT
def generate_random_string(length):
    letters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(letters) for _ in range(length))

# Crear función para refrescar el token, el request contendrá email y token