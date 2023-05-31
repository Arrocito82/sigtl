from django.urls import path
from . import views

urlpatterns = [
    path("msg/", views.index),
    path("save/", views.create_db),
]

