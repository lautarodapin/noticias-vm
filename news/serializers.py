from rest_framework import serializers
from .models import  Nota, Comentario
from django.utils.safestring import mark_safe
from django.contrib.humanize.templatetags.humanize import naturaltime

class ComentarioSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    mod_at = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comentario
        fields = [
            "id",
            "cuerpo",
            "nota",
            "autor",
            "created_at",
            "mod_at",
        ]
        depth = 1

    def create(self, validated_data):
        data = self.context["request"].data
        validated_data["autor"] = self.context["request"].user #Usuario.objects.get(pk=data["autor"])
        validated_data["nota"] = Nota.objects.get(slug=data["nota"])
        return super().create(validated_data)

    def get_created_at(self, obj:Comentario):
        return naturaltime(obj.created_at)
    
    def get_mod_at(self, obj:Comentario):
        return naturaltime(obj.mod_at)



class NotaSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)
    mod_at = serializers.SerializerMethodField(read_only=True)
    comentarios = serializers.SerializerMethodField()
    class Meta:
        model = Nota
        fields = ["id", "titulo", "subtitulo", "cuerpo", "autor", "slug", "created_at", "mod_at", "comentarios"]
        lookup_field = "slug"
        read_only_fields = ["autor",]

    def create(self, validated_data):
        validated_data["autor"] = self.context["request"].user
        return super().create(validated_data=validated_data)

    def get_created_at(self, obj:Nota):
        return naturaltime(obj.created_at)
    
    def get_mod_at(self, obj:Nota):
        return naturaltime(obj.mod_at)

    def get_cuerpo(self, obj:Nota)->str:
        return mark_safe(obj.cuerpo)

    def get_comentarios(self, obj:Nota):
        return ComentarioSerializer(obj.comentarios.order_by('created_at'), many=True, context=self.context).data