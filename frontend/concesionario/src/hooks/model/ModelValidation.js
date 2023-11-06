function checkNombre(model) {
    if (model.nombre === null || model.nombre.trim() === '') {
        return "errores.requerido";
    }
    if (model.nombre.length > 50 || model.nombre.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkAño(model) {
    if (model.año === null || model.año.trim() === '') {
        return "error.requerido";
    }
    if (!model.año.match(/^[0-9]+$/))
    {
        return "error.numerico";
    }
    if (model.año.length !== 4)
    {
        return "error.longitudExacta";
    }

    const fechaActual = new Date();
    if (model.año > fechaActual.getFullYear())
    {
        return "error.fecha";
    }
    if (model.año < 1900)
    {
        return "error.fecha";
    }

    return "";
}

function checkCarroceria(model) {
    if (model.carroceria === null || model.carroceria.trim() === '') {
        return "errores.requerido";
    }
    return "";
}

function checkCilindraje(model) {
    if (model.cilindraje === null || model.cilindraje.trim() === '') {
        return "errores.requerido";
    }
    if (!model.cilindraje.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (model.cilindraje.length > 4)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkPotencia(model) {
    if (model.potencia === null || model.potencia.trim() === '') {
        return "errores.requerido";
    }
    if (!model.potencia.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (model.potencia.length > 3)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkCombustible(model) {
    if (model.combustible === null) {
        return "errores.requerido";
    }
    return "";
}

function checkNumeroPasajeros(model) {
    if (model.numeroPasajeros === null || model.numeroPasajeros.trim() === '') {
        return "errores.requerido";
    }
    if (!model.numeroPasajeros.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (model.numeroPasajeros.length > 1)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkPrecioBase(model) {
    if (model.precioBase === null || model.precioBase.trim() === '') {
        return "errores.requerido";
    }
    if (!model.precioBase.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

export function checkModel(employee, name) {
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