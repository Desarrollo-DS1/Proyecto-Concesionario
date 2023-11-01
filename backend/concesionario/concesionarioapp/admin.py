from django.contrib import admin
from django.apps import apps
from .models import *

models = apps.get_models()

for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
