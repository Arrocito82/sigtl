from django.urls import path
from . import views

urlpatterns = [
    path("login", views.iniciarSesion),
    # agregar aqui path para refrescar el token
]
