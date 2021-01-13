from __future__ import absolute_import

import os
import django

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

django.setup()

app = Celery('project')

app.config_from_object('django.conf:settings')
# app.autodiscover_tasks()
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# app.conf.beat_schedule = {
#     # Executes every Monday morning at 7:30 a.m.
#      "remove-old-lecturas":{
#         "task":"TaskApp.tasks.remove_old_lecturas",
#         "schedule":60*60*2,
#     }
# }
app.conf.broker_transport = 'redis'
app.conf.broker_url = 'redis://localhost:6379/1'
app.conf.celerybeat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'