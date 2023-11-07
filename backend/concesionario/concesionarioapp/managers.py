from django.contrib.auth.models import BaseUserManager


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