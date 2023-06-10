from django.db import models
from django.contrib.auth.models import User

class Accion(models.Model):
    fecha=models.DateTimeField(auto_now=False)
    usuario=models.ForeignKey(User,on_delete=models.CASCADE)
    # representa el registro que fue modificado por el usuario y redirige a la vista del lectura del objeto
    registro_afectado=models.URLField()
    # indica la vista desde la cual el usuario realiza la acción
    contexto=models.URLField()
    evento=models.CharField()# indica el nombre del evento
    descripcion=models.CharField()# incluye especificación de ids de los objetos involucrados en el evento

