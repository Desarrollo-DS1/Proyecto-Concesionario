import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const employees = [...Array(50)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    cedula: faker.datatype.number({min:1000000000,max:9999999999}).toString(),
    primerNombre: faker.name.firstName(),
    segundoNombre: faker.name.firstName(),
    primerApellido: faker.name.lastName(),
    segundoApellido: faker.name.lastName(),
    correo: faker.internet.email(),
    telefono: faker.datatype.number({min:1000000,max:9999999}).toString(),
    celular: faker.datatype.number({min:1000000000,max:9999999999}).toString(),
    ciudad: faker.address.city(),
    direccion: faker.address.streetAddress(),
    fechaNacimiento: faker.date.birthdate().toISOString().split('T')[0],
    genero: faker.name.sex(),
    clave: faker.internet.password(),
    fechaIngreso: faker.date.past().toISOString().split('T')[0],
    fechaRetiro: faker.date.past().toISOString().split('T')[0],
    salario: faker.datatype.number({min:1000000,max:9999999}).toString(),
    tipoSangre: "O+",
    eps: faker.company.companyName(),
    arl: faker.company.companyName(),
    cargo: faker.name.jobTitle(),
}));

export default employees;