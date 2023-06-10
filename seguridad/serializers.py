from rest_framework import serializers

class AccionSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    fecha = serializers.DateTimeField(format='%d/%b/%Y %I:%M %p')
    usuario= serializers.CharField(source="usuario.username")
    registro_afectado=serializers.URLField()
    contexto=serializers.URLField()
    evento=serializers.CharField()
    descripcion=serializers.CharField()
