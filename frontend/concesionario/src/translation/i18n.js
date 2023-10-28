import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next) // inicializa react-i18next
    .init({
        resources: {
            es: {
                translations: {
                    "Editar": "Editar",
                    "Agregar": "Agregar",
                    "Cancelar": "Cancelar",
                    "Si": "Si",
                    "No": "No",

                    // Clientes
                    "Clientes": "Clientes",
                    "Cliente": "Cliente",
                    "EditarCliente": "Editar cliente",
                    "AgregarCliente": "Agregar cliente",
                    "EliminarCliente": "Eliminar cliente",
                    "Buscar": "Buscar {{nombre}}...",
                    "Cedula": "Cedula",
                    "Nombre": "Nombre",
                    "Correo": "Correo",
                    "Telefono": "Telefono",
                    "Celular": "Celular",
                    "Direccion": "Direccion",
                    "Ciudad": "Ciudad",
                    "FechaNacimiento": "Fecha de nacimiento",
                    "Genero": "Genero",
                    "FilasPorPagina": "Filas por pagina",
                    "PrimerNombre": "Primer nombre",
                    "SegundoNombre": "Segundo nombre",
                    "PrimerApellido": "Primer apellido",
                    "SegundoApellido": "Segundo apellido",
                    "Contraseña": "Contraseña",
                    "ClienteAgregado": "Cliente agregado correctamente",
                    "ClienteEditado": "Cliente editado correctamente",
                    "ClienteEliminado": "Cliente eliminado correctamente",
                    "ElimniarCliente?": "¿Estas seguro que deseas eliminar al cliente de cédula {{cedula}}?",

                    // Empleados
                    "Empleados": "Empleados",
                    "Empleado": "Empleado",
                    "EditarEmpleado": "Editar empleado",
                    "AgregarEmpleado": "Agregar empleado",
                    "EliminarEmpleado": "Eliminar empleado",
                    "FechaIngreso": "Fecha de ingreso",
                    "FechaRetiro": "Fecha de retiro",
                    "Salario": "Salario",
                    "Cargo": "Cargo",
                    "T. Sangre": "T. Sangre",
                    "EmpleadoAgregado": "Empleado agregado correctamente",
                    "EmpleadoEditado": "Empleado editado correctamente",
                    "EmpleadoEliminado": "Empleado eliminado correctamente",
                    "EliminarEmpleado?": "¿Estas seguro que deseas eliminar al empleado de cédula {{cedula}}?",

                    // Modelos
                    "Modelos": "Modelos",
                    "Modelo": "Modelo",
                    "EditarModelo": "Editar modelo",
                    "AgregarModelo": "Agregar modelo",
                    "EliminarModelo": "Eliminar modelo",
                    "Año": "Año",
                    "Carroceria": "Carroceria",
                    "Cilindraje": "Cilindraje",
                    "Potencia": "Potencia",
                    "Combustible": "Combustible",
                    "Capacidad": "Capacidad",
                    "PrecioBase": "Precio Base",
                    "ModeloAgregado": "Modelo agregado correctamente",
                    "ModeloEditado": "Modelo editado correctamente",
                    "ModeloEliminado": "Modelo eliminado correctamente",
                    "EliminarModelo?": "¿Estas seguro que deseas eliminar el modelo {{modelo}}?",




                }
            }
        },
        lng: 'es', // idioma predeterminado
        fallbackLng: 'es', // idioma de respaldo si la traducción no está disponible
        interpolation: {
            escapeValue: false, // No necesitas escapar valores traducidos
        },
    });

export default i18n;
