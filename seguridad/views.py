
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
import random
import string
import json

# Create your views here.
@csrf_exempt
def iniciarSesion(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    token=generate_random_string(255)
    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    username = data_dict['username']

    if(username=="" or password == ""):
        return HttpResponse("Credenciales Inválidas", status=401)
    else:
        user = authenticate(username=username, password=password)
        if user is not None:
            # A backend authenticated the credentials
            token=get_tokens_for_user(user)
        else:
            # No backend authenticated the credentials
            return HttpResponse("Credenciales Incorrectas", status=401)
    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(username)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': token,
        'username': username,
        'isAdmin': False,
        'isConfigured':True,
        'rol':'estrategico',
        # 'rol':'tactico',
        # 'rol':'admin',
        # 'permisos':[
        #     'cargar-movimientos',
        #     'cargar-productos-danados',
        #     # 'cargar-sucursales',
        #     # 'cargar-categorias',
        #     # 'cargar-productos',
        #     'ver-reporte-demanda-clientes',
        #     'ver-reporte-frecuencia-de-compra',
        #     'ver-reporte-productos-danados',
        #     'ver-reporte-ingresos-y-costos',
        #     'ver-reporte-productos-mas-vendidos',
        #     # 'ver-historial-usuarios',
        #     # 'ver-configuracion-usuarios',
        #     # 'crear-usuarios',
        #     # 'suspender-usuarios',
        #     # 'cambiar-contrasena-usuarios',
        #     'cambiar-mi-contrasena',
        # ]
    }
    return JsonResponse(data)

@csrf_exempt
def registrarAdmin(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    token= generate_random_string(255)
    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    email = data_dict['email']
    nombre = data_dict['nombre']
    apellidos = data_dict['apellidos']
    username = data_dict['username']

    if(email=="" or password == "" or nombre == "" or apellidos == "" or username == ""):
        return HttpResponse("Campos vacíos", status=401)
    else: 
        # crear usuario
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=nombre,
                last_name=apellidos
                )
            token=get_tokens_for_user(user)
        except IntegrityError:
            return HttpResponse("Usuario ya existe", status=401)
            

    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': token,
        'username': username,
        'isAdmin': True,
        'isConfigured':True,
        # 'rol':'estrategico',
        # 'rol':'tactico',
        'rol':'admin',
        # 'permisos':[
        #     # 'cargar-movimientos',
        #     # 'cargar-productos-danados',
        #     'cargar-sucursales',
        #     'cargar-categorias',
        #     'cargar-productos',
        #     # 'ver-reporte-demanda-clientes',
        #     # 'ver-reporte-frecuencia-de-compra',
        #     # 'ver-reporte-productos-danados',
        #     # 'ver-reporte-ingresos-y-costos',
        #     # 'ver-reporte-productos-mas-vendidos'
        #     'ver-historial-usuarios',
        #     'ver-configuracion-usuarios',
        #     'crear-usuarios',
        #     'suspender-usuarios',
        #     'cambiar-contrasena-usuarios',
        #     'cambiar-mi-contrasena',
        # ]
    }
    return JsonResponse(data)

@csrf_exempt
def cambiarContrasena(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    token = generate_random_string(255)

    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    password = data_dict['password']
    username = data_dict['username']

    if(password == ""):
        return HttpResponse("Credenciales Inválidas", status=401)
    else:
        try: 
            user=User.objects.get(username=username)
            user.set_password(password)
            user.save()
            token=get_tokens_for_user(user)
        except User.DoesNotExist:
            return HttpResponse("Usuario no existe.", status=401)
    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'token': token,
        'username': username,
        'isAdmin': False,
        'isConfigured':True,
        # 'rol':'estrategico',
        'rol':'tactico',
        # 'rol':'admin',
        # 'permisos':[
        #     'cargar-movimientos',
        #     'cargar-productos-danados',
        #     # 'cargar-sucursales',
        #     # 'cargar-categorias',
        #     # 'cargar-productos',
        #     'ver-reporte-demanda-clientes',
        #     'ver-reporte-frecuencia-de-compra',
        #     'ver-reporte-productos-danados',
        #     'ver-reporte-ingresos-y-costos',
        #     'ver-reporte-productos-mas-vendidos',
        #     # 'ver-historial-usuarios',
        #     # 'ver-configuracion-usuarios',
        #     # 'crear-usuarios',
        #     # 'suspender-usuarios',
        #     # 'cambiar-contrasena-usuarios',
        #     'cambiar-mi-contrasena',
        # ]
    }
    return JsonResponse(data)

# Crear función para refrescar el token, el request contendrá email y token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh)
    # return {
    #     'refresh': str(refresh),
    #     'access': str(refresh.access_token),
    # }

# Simula un Token JWT
def generate_random_string(length):
    letters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(letters) for _ in range(length))


