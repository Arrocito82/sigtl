from django.urls import path
from . import views

urlpatterns = [
    path("msg/", views.index),
    path("save/", views.validarMovimientos),
    path("saveMovimientos/", views.crearMovimientos),
    path("valProdDan/", views.validarProductosDanados)
]

