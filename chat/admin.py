from django.contrib import admin

from .models import Room, Message


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'mod_at', 'created_at', 'code', 'nombre', 'host', 'slug', 'usuarios')
    list_filter = ('mod_at', 'created_at')

    def usuarios(self, obj):
        return obj.current_users.all()

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'mod_at', 'created_at', 'room', 'text', 'user')
    list_filter = ('mod_at', 'created_at', 'room', 'user')