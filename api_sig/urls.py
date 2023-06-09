from django.urls import path
from . import views

urlpatterns = [
    path("msg/", views.index),
    path("save/", views.validarMovimientos),
    path("saveMovimientos/", views.crearMovimientos),
    path("valProdDan/", views.validarProductosDanados),
    path("saveProdDan/", views.crearProductosDanados),
    path("ingresosCostos", views.reporteIngresosCostos),
    path("crearRespaldoDatos/", views.crearBackup),
    path("descargarRespaldoDatos/", views.descargarBackup),
    path("prodMasVendidos/", views.reporteProductosMasVendidos),
    path("frecuenciaCompra/", views.reporteFrecuenciaDeCompra),
    path("prodDaniados/", views.reporteProductosDaniados),
    path("demandaClientes/", views.reporteDemandaClientes)
]

