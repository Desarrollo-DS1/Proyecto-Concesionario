from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AdministradorUsuarios(BaseUserManager):
	use_in_migrations = True

	def _create_user(self, cedula, email, primer_nombre, primer_apellido, password, **campos_extra):
		if not cedula:
			raise ValueError('El usuario debe tener una cédula válida.')
		
		email = self.normalize_email(email)
		
		usuario = self.model(
			cedula=cedula,
			email=email,
			primer_nombre=primer_nombre,
			primer_apellido=primer_apellido,
			**campos_extra
		)

		usuario.set_password(password)
		usuario.save(using=self._db)
		return usuario
	

	def create_user(self, cedula, email, primer_nombre, primer_apellido, password, **campos_extra):
		campos_extra.setdefault('is_active', True)
		campos_extra.setdefault('is_staff', False)
		campos_extra.setdefault('is_superuser', False)
		return self._create_user(cedula, email, primer_nombre, primer_apellido, password, **campos_extra)
	

	def create_superuser(self, cedula, email, primer_nombre, primer_apellido, password, **campos_extra):
		campos_extra.setdefault('is_active', True)
		campos_extra.setdefault('is_staff', True)
		campos_extra.setdefault('is_superuser', True)

		if campos_extra.get('is_staff') is not True:
			raise ValueError('El superusuario debe tener el parámetro is_staff=True.')
		if campos_extra.get('is_superuser') is not True:
			raise ValueError('El superusuario debe tener el parámetro is_superuser=True.')
		
		return self._create_user(cedula, email, primer_nombre, primer_apellido, password, **campos_extra)


class Usuario(AbstractBaseUser, PermissionsMixin):
	cedula = models.CharField(verbose_name='Cédula', max_length=15, unique=True)
	email = models.EmailField(verbose_name='Correo Electrónico', unique=True)
	primer_nombre = models.CharField(verbose_name='Primer Nombre', max_length=30)
	segundo_nombre = models.CharField(verbose_name='Segundo Nombre', max_length=30, blank=True, null=True)
	primer_apellido = models.CharField(verbose_name='Primer Apellido', max_length=30)
	segundo_apellido = models.CharField(verbose_name='Segundo Apellido', max_length=30, blank=True, null=True)
	telefono = models.CharField(verbose_name='Teléfono', max_length=10, blank=True, null=True)
	celular = models.CharField(verbose_name='Celular', max_length=10, blank=True, null=True)
	direccion = models.CharField(verbose_name='Dirección', max_length=100, blank=True, null=True)
	ciudad = models.CharField(verbose_name='Ciudad', max_length=30, blank=True, null=True)
	fecha_nacimiento = models.DateField(verbose_name='Fecha de Nacimiento', blank=True, null=True)
	genero = models.CharField(verbose_name='Género', max_length=1, choices=(('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')), blank=True, null=True)
	is_active = models.BooleanField(verbose_name='Usuario activo', default=True)
	is_staff = models.BooleanField(verbose_name='Usuario parte del staff', default=False)
	is_superuser = models.BooleanField(verbose_name='Usuario es superusuario', default=False)

	objects = AdministradorUsuarios()

	USERNAME_FIELD = 'cedula'
	EMAIL_FIELD = 'email'
	REQUIRED_FIELDS = ['email', 'primer_nombre', 'primer_apellido']


	class Meta:
		verbose_name = 'Usuario'
		verbose_name_plural = 'Usuarios'
		ordering = ['primer_apellido', 'primer_nombre']


	def __str__(self):
		return 'Usuario: ' + self.cedula + ' - ' + self.primer_nombre + ' ' + self.primer_apellido




	   

	