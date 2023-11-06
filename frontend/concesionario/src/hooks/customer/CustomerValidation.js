function checkEmail(customer){
    if (customer.correo === null || customer.correo === '') {
        return "errores.requerido";
    }
    if (customer.correo.length > 320 || customer.correo.length < 6)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    {
        return "errores.correo";
    }

    return "";
}

function checkCellphone(customer) {
    if (customer.celular === null || customer.celular.trim() === '') {
        return "errores.requerido";
    }
    if ((customer.celular).length !== 10)
    {
        return "errores.longitudExacta";
    }
    if (!customer.celular.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

function checkPhone(customer) {
    if (customer.telefono === null || customer.telefono.trim() === '') {
        return "errores.requerido";
    }
    if (!customer.telefono.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if ((customer.telefono).length !== 10 && (customer.telefono).length !== 7)
    {
        return "errores.longitudExacta";
    }

    return "";
}

function checkPasswordAdd(customer) {
    if (customer.clave === null || customer.clave.trim() === '') {
        return "errores.requerido";
    }
    if ((customer.clave).length > 50 || (customer.clave).length < 8)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.clave.match(/(?=.*[a-z])/))
    {
        return "errores.contraseña.minuscula";
    }
    if (!customer.clave.match(/(?=.*[A-Z])/))
    {
        return "errores.contraseña.mayuscula";
    }
    if (!customer.clave.match(/(?=.*[0-9])/))
    {
        return "errores.contraseña.numerico";
    }
    if (customer.clave.match(/\s/))
    {
        return "errores.contraseña.espacio";
    }
    if (!customer.clave.match(/(?=.*[!@#$%^&*])/))
    {
        return "errores.contraseña.especial";
    }
    return "";
}

function checkPasswordEdit(customer) {

    if ((customer.clave).length > 50 || (customer.clave).length < 8)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.clave.match(/(?=.*[a-z])/))
    {
        return "errores.contraseña.minuscula";
    }
    if (!customer.clave.match(/(?=.*[A-Z])/))
    {
        return "errores.contraseña.mayuscula";
    }
    if (!customer.clave.match(/(?=.*[0-9])/))
    {
        return "errores.contraseña.numerico";
    }
    if (customer.clave.match(/\s/))
    {
        return "errores.contraseña.espacio";
    }
    if (!customer.clave.match(/(?=.*[!@#$%^&*])/))
    {
        return "errores.contraseña.especial";
    }
    return "";
}

function checkCity(customer) {
    if (customer.ciudad === null || customer.ciudad === '') {
        return "errores.requerido";
    }
    if ((customer.ciudad).length > 50)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkAddress(customer) {
    if (customer.direccion === null || customer.direccion === '') {
        return "errores.requerido";
    }
    if ((customer.direccion).length > 50 || (customer.direccion).length < 5)
    {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkFirstName(customer) {
    if (customer.primerNombre === null || customer.primerNombre.trim() === '') {
        return "errores.requerido";
    }
    if (customer.primerNombre.length > 50 || customer.primerNombre.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.primerNombre.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondName(customer) {
    if (customer.segundoNombre.trim() !== '') {
        if (customer.segundoNombre.length > 50 || customer.segundoNombre.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!customer.segundoNombre.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkFirstLastName(customer) {
    if (customer.primerApellido === null || customer.primerApellido.trim() === '') {
        return "errores.requerido";
    }
    if (customer.primerApellido.length > 50 || customer.primerApellido.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.primerApellido.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondLastName(customer) {
    if (customer.segundoApellido.trim() !== '') {
        if (customer.segundoApellido.length > 50 || customer.segundoApellido.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!customer.segundoApellido.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkBornDate(customer) {

    if (customer.fechaNacimiento === null || customer.fechaNacimiento.trim() === '') {
        return "errores.requerido";
    }
    const fechaActual = new Date();
    const fechaNac = new Date(customer.fechaNacimiento);
    if (fechaNac > fechaActual)
    {
        return "errores.fecha";
    }
    if (fechaNac.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    if ((fechaActual.getFullYear() - fechaNac.getFullYear()) < 18)
    {
        return "errores.fecha";
    }
    return "";
}

function checkCedula(customer) {

    if (customer.cedula === null || toString(customer.cedula).trim() === '') {
        return "errores.requerido";
    }
    if (!customer.cedula.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (customer.cedula.length !== 8 && customer.cedula.length !== 9 && customer.cedula.length !== 10)
    {
        return "errores.longitudExacta";
    }

    return "";
}

function checkGender(customer) {
    if (customer.genero === null || customer.genero === '') {
        return "errores.requerido";
    }
    return "";
}

export function checkCustomer(customer, name, edit) {
    if (name === 'correo') {
        return checkEmail(customer);
    }
    if (name === 'celular') {
        return checkCellphone(customer);
    }
    if (name === 'telefono') {
        return checkPhone(customer);
    }
    if (name === 'clave' && edit) {
        return checkPasswordEdit(customer);
    }
    if (name === 'clave' && !edit) {
        return checkPasswordAdd(customer);
    }
    if (name === 'ciudad') {
        return checkCity(customer);
    }
    if (name === 'direccion') {
        return checkAddress(customer);
    }
    if (name === 'primerNombre') {
        return checkFirstName(customer);
    }
    if (name === 'segundoNombre') {
        return checkSecondName(customer);
    }
    if (name === 'primerApellido') {
        return checkFirstLastName(customer);
    }
    if (name === 'segundoApellido') {
        return checkSecondLastName(customer);
    }
    if (name === 'fechaNacimiento') {
        return checkBornDate(customer);
    }
    if (name === 'cedula') {
        return checkCedula(customer);
    }
    if (name === 'genero') {
        return checkGender(customer);
    }
    return "";
}