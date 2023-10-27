import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const models = [...Array(50)].map((_, index) => ({
    id: faker.datatype.uuid(),
    nombre: faker.vehicle.vehicle(),
    año: faker.datatype.number({min:2000,max:2021}).toString(),
    carroceria: faker.vehicle.type(),
    cilindraje: faker.datatype.number({min:1000,max:9999}).toString(),
    potencia: faker.datatype.number({min:100,max:999}).toString(),
    combustible: faker.vehicle.fuel(),
    numeroPasajeros: faker.datatype.number({min:2,max:8}).toString(),
    precioBase: faker.datatype.number({min:10000000,max:99999999}).toString(),
}));

export default models;
