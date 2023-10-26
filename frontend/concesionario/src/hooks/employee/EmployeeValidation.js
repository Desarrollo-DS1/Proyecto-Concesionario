function checkEmail(customer){
    if (customer.correo === null || customer.correo === '') {
        return "El campo es requerido";
    }
    if (customer.correo.length > 320 || customer.correo.length < 6)
    {
        return "Max: 320 caracteres, Min: 6 caracteres";
    }
    if (!customer.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    {
        return "Ingrese un correo valido";
    }

    return "";
}

function checkCellphone(customer) {
    if (customer.celular === null || customer.celular.trim() === '') {
        return "El campo es requerido";
    }
    if ((customer.celular).length !== 10)
    {
        return "Debe tener 10 digitos";
    }
    if (!customer.celular.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    return "";
}

function checkPhone(customer) {
    if (customer.telefono === null || customer.telefono.trim() === '') {
        return "El campo es requerido";
    }
    if (!customer.telefono.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if ((customer.telefono).length !== 7)
    {
        return "Debe tener 7 digitos";
    }

    return "";
}

function checkPassword(customer) {
    if (customer.clave === null || customer.clave.trim() === '') {
        return "El campo es requerido"
    }
    if ((customer.clave).length > 50 || (customer.clave).length < 8)
    {
        return "Max: 50 caracteres, Min: 8 caracteres"
    }
    if (!customer.clave.match(/(?=.*[a-z])/))
    {
        return "Debe tener al menos una letra minuscula"
    }
    if (!customer.clave.match(/(?=.*[A-Z])/))
    {
        return "Debe tener al menos una letra mayuscula"
    }
    if (!customer.clave.match(/(?=.*[0-9])/))
    {
        return "Debe tener al menos un numero"
    }
    if (customer.clave.match(/\s/))
    {
        return "No se permiten espacios en blanco"
    }
    return "";
}

function checkCity(customer) {
    if (customer.ciudad === null || customer.ciudad === '') {
        return "El campo ciudad es requerido"
    }
    if ((customer.ciudad).length > 50)
    {
        return "La ciudad no puede tener mas de 50 caracteres"
    }
    return "";
}

function checkAddress(customer) {
    if (customer.direccion === null || customer.direccion === '') {
        return "El campo es requerido";
    }
    if ((customer.direccion).length > 50 || (customer.direccion).length < 5)
    {
        return "Max: 50 caracteres, Min: 5 caracteres";
    }
    return "";
}

function checkFirstName(customer) {
    if (customer.primerNombre === null || customer.primerNombre.trim() === '') {
        return "El campo es requerido";
    }
    if (customer.primerNombre.length > 50 || customer.primerNombre.length < 2)
    {
        return "Max: 50 caracteres, Min: 2 caracteres";
    }
    if (!customer.primerNombre.match(/^[a-zA-Z]+$/))
    {
        return "Solo se permiten letras";
    }
    return "";
}

function checkSecondName(customer) {
    if (customer.segundoNombre.trim() !== '') {
        if (customer.segundoNombre.length > 50 || customer.segundoNombre.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!customer.segundoNombre.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
    }
    return "";
}

function checkFirstLastName(customer) {
    if (customer.primerApellido === null || customer.primerApellido.trim() === '') {
        return "El campo es requerido";
    }
    if (customer.primerApellido.length > 50 || customer.primerApellido.length < 2)
    {
        return "Max: 50 caracteres, Min: 2 caracteres";
    }
    if (!customer.primerApellido.match(/^[a-zA-Z]+$/))
    {
        return "Solo se permiten letras";
    }
    return "";
}

function checkSecondLastName(customer) {
    if (customer.segundoApellido.trim() !== '') {
        if (customer.segundoApellido.length > 50 || customer.segundoApellido.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!customer.segundoApellido.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
    }
    return "";
}

function checkBornDate(customer) {

    if (customer.fechaNacimiento === null || customer.fechaNacimiento.trim() === '') {
        return "El campo es requerido";
    }
    const fechaActual = new Date();
    const fechaNac = new Date(customer.fechaNacimiento);
    if (fechaNac > fechaActual)
    {
        return "Seleccione una fecha valida";
    }
    if (fechaNac.getFullYear() < 1900)
    {
        return "Seleccione una fecha valida";
    }
    if ((fechaActual.getFullYear() - fechaNac.getFullYear()) < 18)
    {
        return "Edad minima 18 años";
    }
    return "";
}

function checkCedula(customer) {

    if (customer.cedula === null || toString(customer.cedula).trim() === '') {
        return "El campo es requerido";
    }
    if (!customer.cedula.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (customer.cedula.length !== 10)
    {
        return "Debe tener 10 digitos";
    }

    return "";
}

function checkGender(customer) {
    if (customer.genero === null || customer.genero === '') {
        return "El campo genero es requerido";
    }
    return "";
}

export function checkCustomer(customer, name) {
    if (name === 'correo') {
        return checkEmail(customer);
    }
    if (name === 'celular') {
        return checkCellphone(customer);
    }
    if (name === 'telefono') {
        return checkPhone(customer);
    }
    if (name === 'clave') {
        return checkPassword(customer);
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