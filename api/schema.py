import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from chat.models import (Room, Message,)
from news.models import (Nota, Comentario,)
from users.models import (User,)
# }from graphene_subscriptions.events import CREATED

class ComentarioNode(DjangoObjectType):
    class Meta:
        model = Comentario
        fields = ["id", "cuerpo", "nota", "autor"]
        filter_fields = {
            "id":["exact"],
            "nota__titulo":["exact", "icontains"],
            "nota__subtitulo":["exact", "icontains"],
            "nota__slug":["exact", "icontains"],
            "nota__autor__username":["exact", "icontains"],
            "autor__username":["exact", "icontains"],
        }
        interfaces = (relay.Node,)

class NotaNode(DjangoObjectType):
    class Meta:
        model = Nota
        fields = ["id", "titulo", "subtitulo", "cuerpo", "slug", "autor"]
        filter_fields = {
            "id":["exact",],
            "titulo":["exact", "icontains"],
            "subtitulo":["exact", "icontains"],
            "slug":["exact", "icontains"],
            "autor__username":["exact", "icontains"],
        }
        interfaces = (relay.Node,)

class MessageNode(DjangoObjectType):
    class Meta:
        model = Message
        fields = ["id", "user", "room", "text"]
        filter_fields = {
            "id":["exact"], 
            "user__username":["icontains"], 
            "room__nombre":["icontains"],
            "room__slug":["icontains"],
            "room__code":["exact"],
            "room__host__username":["exact", "icontains"],
            "room__current_users__username":["exact", "icontains"],
            }
        interfaces = (relay.Node,)

class UsuarioNode(DjangoObjectType):
    class Meta:
        model = Usuario
        fields = ["id", "username",]
        filter_fields = {
            "id":["exact"], 
            "username":["icontains", "exact",],
            "rooms__nombre":["icontains", "exact",],
            "rooms__slug":["icontains", "exact",],
            "rooms__code":["exact",],
        }
        interfaces = (relay.Node,)

class RoomNde(DjangoObjectType):
    class Meta:
        model = Room
        fields = ["id", "code", "nombre", "host", "slug", "current_users",]
        filter_fields = {
            "id":["exact"], 
            "code":["exact"],
            "nombre":["exact", "icontains"], 
            "host__username":["icontains", "exact"], 
            "slug":["exact", "icontains"], 
            "current_users__username":["icontains", "exact"],
            }
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    room = relay.Node.Field(RoomNde)
    all_rooms = DjangoFilterConnectionField(RoomNde)

    message = relay.Node.Field(MessageNode)
    all_messages = DjangoFilterConnectionField(MessageNode)
    
    user = relay.Node.Field(UsuarioNode)
    all_users = DjangoFilterConnectionField(UsuarioNode)

    nota = relay.Node.Field(NotaNode)
    all_notas = DjangoFilterConnectionField(NotaNode)

    comment = relay.Node.Field(ComentarioNode)
    all_comments = DjangoFilterConnectionField(ComentarioNode)

schema = graphene.Schema(query=Query, )
