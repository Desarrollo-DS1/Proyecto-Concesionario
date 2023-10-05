import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(50)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  cedula: faker.datatype.number(),
  primerNombre: faker.name.firstName(),
  segundoNombre: faker.name.firstName(),
  primerApellido: faker.name.lastName(),
  segundoApellido: faker.name.lastName(),
  nombre: faker.name.fullName(),
  correo: faker.internet.email(),
  celular: faker.phone.number(),
  direccion: faker.address.streetAddress(),
  fechaNacimiento: faker.date.birthdate().toISOString().split('T')[0],
  genero: faker.name.sex(),

  // id: faker.datatype.uuid(),
  //
  // name: faker.name.fullName(),
  // company: faker.company.name(),
  // isVerified: faker.datatype.boolean(),
  // status: sample(['active', 'banned']),
  // role: sample([
  //   'Leader',
  //   'Hr Manager',
  //   'UI Designer',
  //   'UX Designer',
  //   'UI/UX Designer',
  //   'Project Manager',
  //   'Backend Developer',
  //   'Full Stack Designer',
  //   'Front End Developer',
  //   'Full Stack Developer',
  // ]),
}));

export default users;
