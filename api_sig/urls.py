from django.urls import path
from . import views

urlpatterns = [
    path("msg/", views.index),
    path("upload/", views.main),
    path("save/", views.create_db),
]

