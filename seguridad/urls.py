from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("login", views.iniciarSesion),# autenticación
    path("usuarios",views.getUsuarios),
    path("register-admin", views.registrarAdmin),
    path("register-usuario", views.registrarUsuario),
    path("cambiar-contrasena", views.cambiarContrasena),
    path("historial-usuarios", views.getAcciones),
    # agregar aqui path para refrescar el token
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
