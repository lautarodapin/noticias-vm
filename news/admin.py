# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import  Nota, Comentario



@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = (
    'id',
     'titulo',
     'subtitulo',
     'slug',
     'autor',
     'created_at',
     'mod_at',
    )
    list_filter = ('autor',)
    search_fields = ('slug',)


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'cuerpo', 'nota', 'autor')
    list_filter = ('nota', 'autor')

