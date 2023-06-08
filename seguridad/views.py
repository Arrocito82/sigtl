
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth import authenticate
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
import random
import string
import json
import time

from api_sig.models import *

def getUsuarios(request):
    # users=User.objects.prefetch_related("groups").values('first_name','last_name', 'email', 'username', 'last_login').filter(groups__isnull=False).distinct()
    users = []
    for user in User.objects.prefetch_related("groups"):
        if user.groups.exists():
            if str(user.groups.get())=='sig_usuario_admin':
                rol='Admin'
            if str(user.groups.get())=='sig_usuario_tactico':
                rol='Táctico'
            if str(user.groups.get())=='sig_usuario_estrategico':
                rol='Estratégico'
            data={
                'nombre': user.first_name,
                'apellidos': user.last_name,
                'email':user.email,
                'rol': rol,
                'usuario':user.username,
                'fecha_creacion':user.date_joined.strftime("%d/%m/%Y %H:%M:%S")
            }
            users.append(data)
    return JsonResponse(users, safe=False)

@csrf_exempt
def iniciarSesion(request):
    # Simulador de Token JWT, eliminar cuando ya se genere el token real
    token=generate_random_string(255)
    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')
    rol=None

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
            if User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_admin').exists():
                rol='admin'
            elif User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_tactico').exists():
                rol='tactico'
            elif User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_estrategico').exists():
                rol='estrategico'
            else:
                return HttpResponse("No tiene rol asignado.", status=401)

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
        'rol':rol
    }
    return JsonResponse(data)

@csrf_exempt
def registrarAdmin(request):
    # CREAR PERMISOS EN CASO DE QUE NO EXISTAN
    crearPermisos()
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
            gropo_admin = Group.objects.get(name='sig_usuario_admin')
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=nombre,
                last_name=apellidos
                )
            user.groups.add(gropo_admin)
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
        'rol':'admin'
    }
    return JsonResponse(data)

@csrf_exempt
def registrarUsuario(request):
    password=generate_random_string(25)
    # Decode the byte string to UTF-8 and convert it to a string
    string_data=request.body.decode('utf-8')

    # Parse the string as JSON and convert it to a dictionary
    data_dict = json.loads(string_data)

    # Access the values in the dictionary
    email = data_dict['email']
    nombre = data_dict['nombre']
    apellidos = data_dict['apellidos']
    username = data_dict['username']
    rol=data_dict['rol']

    if(email=="" 
       or nombre == "" 
       or apellidos == "" 
       or username == "" 
       or rol==""
       or (rol !='admin' and rol!='estrategico' and rol!= 'tactico')):
        return HttpResponse("Campos vacíos", status=401)
    else: 
        # crear usuario
        try:
            grupo_admin = Group.objects.get(name='sig_usuario_admin')
            grupo_tactico = Group.objects.get(name='sig_usuario_tactico')
            grupo_estrategico = Group.objects.get(name='sig_usuario_estrategico')
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=nombre,
                last_name=apellidos
                )
            if rol=='admin':
                user.groups.add(grupo_admin)
            if rol=='tactico':
                user.groups.add(grupo_tactico)
            if rol=='estrategico':    
                user.groups.add(grupo_estrategico)    
            token=get_tokens_for_user(user)
        except IntegrityError:
            return HttpResponse("Usuario ya existe", status=401)
            

    # print(password)  # Output: YzMSuERT2D8Kwjb
    # print(email)  # Output: hemdad.tahaj@theboty.com

    # diccionario de datos a retornar
    data = {
        'mensaje': 'Usuario '+username+' creado con éxito.'
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
            if User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_admin').exists():
                rol='admin'
            elif User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_tactico').exists():
                rol='tactico'
            elif User.objects.filter(username="mm18057@ues.edu.sv",groups__name='sig_usuario_estrategico').exists():
                rol='estrategico'
            else:
                return HttpResponse("No tiene rol asignado.", status=401)
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
        'rol':rol
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

# función para crear permisos en la configuración inicial

def crearPermisos():
    content_type_productos = ContentType.objects.get_for_model(Producto)
    content_type_movimiento = ContentType.objects.get_for_model(Movimiento)
    content_type_producto_danado = ContentType.objects.get_for_model(ProductoDanado)
    content_type_sucursal = ContentType.objects.get_for_model(Sucursal)
    content_type_categoria = ContentType.objects.get_for_model(Categoria)
    content_type_usuario = ContentType.objects.get_for_model(User)

    # CREAR PERMISOS
    #     'cargar-movimientos'
    permiso_cargar_movimientos, created_permiso_cargar_movimientos = Permission.objects.get_or_create(
                    codename="cargar_movimientos",
                    name="Cargar CSV Movimientos",
                    content_type=content_type_movimiento,
                )
    #     'cargar_productos_danados'
    permiso_cargar_productos_danados, created_permiso_cargar_productos_danados = Permission.objects.get_or_create(
                    codename="cargar_productos_danados",
                    name="Cargar CSV Productos Dañados",
                    content_type=content_type_producto_danado,
                )
    #     'cargar_sucursales'
    permiso_cargar_sucursales, created_permiso_cargar_sucursales = Permission.objects.get_or_create(
                    codename="cargar_sucursales",
                    name="Cargar CSV Sucursales",
                    content_type=content_type_sucursal,
                )
    #     'cargar_categorias'
    permiso_cargar_categorias, created_permiso_cargar_categorias = Permission.objects.get_or_create(
                    codename="cargar_categorias",
                    name="Cargar CSV Categorias",
                    content_type=content_type_categoria,
                )
    #     'cargar_productos'
    permiso_cargar_productos, created_permiso_cargar_productos = Permission.objects.get_or_create(
                    codename="cargar_productos",
                    name="Cargar CSV Productos",
                    content_type=content_type_productos,
                )
    #     'ver_reporte_demanda_clientes'
    permiso_ver_reporte_demanda_clientes, created_permiso_ver_reporte_demanda_clientes= Permission.objects.get_or_create(
                    codename="ver_reporte_demanda_clientes",
                    name="Ver Reporte Demanda Clientes",
                    content_type=content_type_movimiento,
                )
    #     'ver_reporte_frecuencia_de_compra'
    permiso_ver_reporte_frecuencia_de_compra, created_permiso_ver_reporte_frecuencia_de_compra = Permission.objects.get_or_create(
                    codename="ver_reporte_frecuencia_de_compra",
                    name="Ver Reporte Frecuencia Compra",
                    content_type=content_type_movimiento,
                )
    #     'ver_reporte_productos_danados'
    permiso_ver_reporte_productos_danados, created_permiso_ver_reporte_productos_danados = Permission.objects.get_or_create(
                    codename="ver_reporte_productos_danados",
                    name="Ver Reporte Productos Dañados",
                    content_type=content_type_producto_danado,
                )
    #     'ver_reporte_ingresos_y_costos'
    permiso_ver_reporte_ingresos_y_costos, created_permiso_ver_reporte_ingresos_y_costos = Permission.objects.get_or_create(
                    codename="ver_reporte_ingresos_y_costos",
                    name="Ver Reporte Ingresos y Costos",
                    content_type=content_type_movimiento,
                )
    #     'ver_reporte_productos_mas_vendidos'
    permiso_ver_reporte_productos_mas_vendidos, created_permiso_ver_reporte_productos_mas_vendidos = Permission.objects.get_or_create(
                    codename="ver_reporte_productos_mas_vendidos",
                    name="Ver Reporte Productos Más Vendidos",
                    content_type=content_type_movimiento,
                )
    #     'ver_historial_usuarios'
    permiso_ver_historial_usuarios, created_permiso_ver_historial_usuarios = Permission.objects.get_or_create(
                    codename="ver_historial_usuarios",
                    name="Ver Reporte Historial de Usuarios",
                    content_type=content_type_usuario,
                )
    #     'ver_configuracion_usuarios'
    permiso_ver_configuracion_usuarios, created_permiso_ver_configuracion_usuarios = Permission.objects.get_or_create(
                    codename="ver_configuracion_usuarios",
                    name="Ver Configuración de Usuarios",
                    content_type=content_type_usuario,
                )
    #     'crear_usuarios'
    permiso_crear_usuarios, created_permiso_crear_usuarios = Permission.objects.get_or_create(
                    codename="crear_usuarios",
                    name="Crear Usuario",
                    content_type=content_type_usuario,
                )
    #     'suspender_usuarios'
    permiso_suspender_usuarios, created_permiso_suspender_usuarios = Permission.objects.get_or_create(
                    codename="suspender_usuarios",
                    name="Suspender Usuario",
                    content_type=content_type_usuario,
                )
    #     'cambiar_contrasena_usuarios'
    permiso_cambiar_contrasena_otros_usuarios, created_permiso_cambiar_contrasena_otros_usuarios = Permission.objects.get_or_create(
                    codename="cambiar_contrasena_otros_usuarios",
                    name="Cambiar Contraseña De Otros Usuarios",
                    content_type=content_type_usuario,
                )
    #     'cambiar_mi_contrasena'
    permiso_cambiar_mi_contrasena, created_permiso_cambiar_mi_contrasena = Permission.objects.get_or_create(
                    codename="cambiar_mi_contrasena",
                    name="Cambiar Mi Contraseña",
                    content_type=content_type_usuario,
                )
    # CREAR GRUPOS
    grupo_admin, created =Group.objects.get_or_create(name='sig_usuario_admin')
    grupo_tactico, created =Group.objects.get_or_create(name='sig_usuario_tactico')
    grupo_estrategico, created =Group.objects.get_or_create(name='sig_usuario_estrategico')
    
    # 'permisos_admin':[
        #     'cargar-sucursales',
        #     'cargar-categorias',
        #     'cargar-productos',
        #     'ver-historial-usuarios',
        #     'ver-configuracion-usuarios',
        #     'crear-usuarios',
        #     'suspender-usuarios',
        #     'cambiar-contrasena-usuarios',
        #     'cambiar-mi-contrasena',
        # ]
    grupo_admin.permissions.add(permiso_cargar_categorias)
    grupo_admin.permissions.add(permiso_cargar_sucursales)
    grupo_admin.permissions.add(permiso_cargar_productos)
    grupo_admin.permissions.add(permiso_ver_historial_usuarios)
    grupo_admin.permissions.add(permiso_ver_configuracion_usuarios)
    grupo_admin.permissions.add(permiso_crear_usuarios)
    grupo_admin.permissions.add(permiso_suspender_usuarios)
    grupo_admin.permissions.add(permiso_cambiar_contrasena_otros_usuarios)
    grupo_admin.permissions.add(permiso_cambiar_mi_contrasena)
    
    # 'permisos_tactico':[
        #     'cargar-movimientos',
        #     'cargar-productos-danados',
        #     'ver-reporte-demanda-clientes',
        #     'ver-reporte-frecuencia-de-compra',
        #     'ver-reporte-productos-danados',
        #     'ver-reporte-ingresos-y-costos',
        #     'ver-reporte-productos-mas-vendidos',
        #     'cambiar-mi-contrasena',
        # ]
    grupo_tactico.permissions.add(permiso_cargar_movimientos)
    grupo_tactico.permissions.add(permiso_cargar_productos_danados)
    grupo_tactico.permissions.add(permiso_ver_reporte_demanda_clientes)
    grupo_tactico.permissions.add(permiso_ver_reporte_frecuencia_de_compra)
    grupo_tactico.permissions.add(permiso_ver_reporte_productos_danados)
    grupo_tactico.permissions.add(permiso_cambiar_mi_contrasena)
    
    # 'permisos_estrategico':[
        #     'ver-reporte-ingresos-y-costos',
        #     'ver-reporte-productos-mas-vendidos',
        #     'cambiar-mi-contrasena',
        # ]
    grupo_estrategico.permissions.add(permiso_ver_reporte_ingresos_y_costos)
    grupo_estrategico.permissions.add(permiso_ver_reporte_productos_mas_vendidos)
    grupo_estrategico.permissions.add(permiso_cambiar_mi_contrasena)
    return