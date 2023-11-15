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
    const anhoString = model.año.toString();
    if (anhoString === null || anhoString.trim() === '') {
        return "errores.requerido";
    }
    if (!anhoString.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (anhoString.length !== 4)
    {
        return "errores.longitudExacta";
    }

    const fechaActual = new Date();
    if (model.año > fechaActual.getFullYear() + 1)
    {
        return "errores.fecha";
    }
    if (model.año < 1900)
    {
        return "errores.fecha";
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
    const cilindrajeString = model.cilindraje.toString();
    if (cilindrajeString === null || cilindrajeString.trim() === '') {
        return "errores.requerido";
    }
    if (!cilindrajeString.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (cilindrajeString.length > 4)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkPotencia(model) {
    const potenciaString = model.potencia.toString();
    if (potenciaString === null || potenciaString.trim() === '') {
        return "errores.requerido";
    }
    if (!potenciaString.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (potenciaString.length > 3)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkCombustible(model) {
    if (model.combustible === null || model.combustible.trim() === '') {
        return "errores.requerido";
    }
    return "";
}

function checkNumeroPasajeros(model) {
    const pasajerosString = model.numeroPasajeros.toString();
    if (pasajerosString === null || pasajerosString.trim() === '') {
        return "errores.requerido";
    }
    if (!pasajerosString.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (pasajerosString.length > 1)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkPrecioBase(model) {
    const checkPrecioBase = model.precioBase.toString();
    if (checkPrecioBase === null || checkPrecioBase.trim() === '') {
        return "errores.requerido";
    }
    if (!checkPrecioBase.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

export function checkModel(model, name) {
    if (name === 'nombre') {
        return checkNombre(model);
    }
    if (name === 'año') {
        return checkAño(model);
    }
    if (name === 'carroceria') {
        return checkCarroceria(model);
    }
    if (name === 'cilindraje') {
        return checkCilindraje(model);
    }
    if (name === 'potencia') {
        return checkPotencia(model);
    }
    if (name === 'combustible') {
        return checkCombustible(model);
    }
    if (name === 'numeroPasajeros') {
        return checkNumeroPasajeros(model);
    }
    if (name === 'precioBase') {
        return checkPrecioBase(model);
    }

    return "";
}