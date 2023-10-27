function checkNombre(model) {
    if (model.nombre === null || model.nombre.trim() === '') {
        return "El campo es requerido";
    }
    if (model.nombre.length > 50 || model.nombre.length < 2)
    {
        return "Max: 50 caracteres, Min: 2 caracteres";
    }
    return "";
}

function checkAño(model) {
    if (model.año === null || model.año.trim() === '') {
        return "El campo es requerido";
    }
    if (!model.año.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (model.año.length !== 4)
    {
        return "Debe tener 4 digitos";
    }

    const fechaActual = new Date();
    if (model.año > fechaActual.getFullYear())
    {
        return "Seleccione una fecha valida";
    }
    if (model.año < 1900)
    {
        return "Seleccione una fecha valida";
    }

    return "";
}

function checkCarroceria(model) {
    if (model.carroceria === null || model.carroceria.trim() === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkCilindraje(model) {
    if (model.cilindraje === null || model.cilindraje.trim() === '') {
        return "El campo es requerido";
    }
    if (!model.cilindraje.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (model.cilindraje.length > 4)
    {
        return "Max: 4 digitos";
    }
    return "";
}

function checkPotencia(model) {
    if (model.potencia === null || model.potencia.trim() === '') {
        return "El campo es requerido";
    }
    if (!model.potencia.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (model.potencia.length > 3)
    {
        return "Max: 3 digitos";
    }
    return "";
}

function checkCombustible(model) {
    if (model.combustible === null || model.combustible.trim() === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkNumeroPasajeros(model) {
    if (model.numeroPasajeros === null || model.numeroPasajeros.trim() === '') {
        return "El campo es requerido";
    }
    if (!model.numeroPasajeros.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (model.numeroPasajeros.length > 1)
    {
        return "Max: 1 digito";
    }
    return "";
}

function checkPrecioBase(model) {
    if (model.precioBase === null || model.precioBase.trim() === '') {
        return "El campo es requerido";
    }
    if (!model.precioBase.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    return "";
}

export function checkCustomer(employee, name) {
    if (name === 'nombre') {
        return checkNombre(employee);
    }
    if (name === 'año') {
        return checkAño(employee);
    }
    if (name === 'carroceria') {
        return checkCarroceria(employee);
    }
    if (name === 'cilindraje') {
        return checkCilindraje(employee);
    }
    if (name === 'potencia') {
        return checkPotencia(employee);
    }
    if (name === 'combustible') {
        return checkCombustible(employee);
    }
    if (name === 'numeroPasajeros') {
        return checkNumeroPasajeros(employee);
    }
    if (name === 'precioBase') {
        return checkPrecioBase(employee);
    }

    return "";
}