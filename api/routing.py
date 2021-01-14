from channelsmultiplexer.demultiplexer import AsyncJsonWebsocketDemultiplexer
from chat.consumers import (UserConsumerObserver, RoomConsumer)

class EntryDeMultiplexer(  AsyncJsonWebsocketDemultiplexer):
    applications = {
        "room": RoomConsumer.as_asgi(),
        "user": UserConsumerObserver.as_asgi(),


    }