from channelsmultiplexer.demultiplexer import AsyncJsonWebsocketDemultiplexer
from chat.consumers import (UserConsumerObserver, RoomConsumer)

class EntryDeMultiplexer(AsyncJsonWebsocketDemultiplexer):
    applications = {
        "room": RoomConsumer.as_asgi(),
        "user": UserConsumerObserver.as_asgi(),
    }
    async def receive_json(self, content, **kwargs):
        print(content)
        return await super().receive_json(content, **kwargs)