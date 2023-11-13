from django.contrib.auth.hashers import make_password
from .models import Usuario

print("Running startup.py...........")

usarios = Usuario.objects.all()

for user in usarios:

    if user.password[0:6] != 'pbkdf2':
        user.password = make_password(user.password)
        user.save()