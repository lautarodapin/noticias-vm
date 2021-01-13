from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify

def generate_random_code()->str:
    from secrets import token_urlsafe
    while True:
        code = token_urlsafe(50)
        if not Room.objects.filter(code=code).exists():
            return code

class AbstractDatetime(models.Model):
    class Meta:
        abstract = True

    mod_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Room(AbstractDatetime, models.Model):
    code = models.CharField(max_length=255, blank=True, null=False, default=generate_random_code, unique=True)
    nombre = models.CharField(max_length=255, null=False, blank=False)
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="rooms", default=1)
    slug = models.SlugField(max_length=50, unique=True, blank=True)
    current_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="current_rooms", blank=True)


    def __str__(self):
        return f"Room({self.nombre} {self.host})"
    

    def save(self, *args, **kwargs):
        self.slug = slugify("{obj.nombre}-{obj.host}".format(obj=self))
        super().save(*args, **kwargs)

class Message(AbstractDatetime, models.Model):
    room = models.ForeignKey("chat.Room", on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="messages", null=True, default=None)

    def __str__(self):
        return f"Message({self.user} {self.room})"
    