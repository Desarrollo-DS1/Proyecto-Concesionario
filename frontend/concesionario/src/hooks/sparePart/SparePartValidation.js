function checkNombre(sparePart) {
    if (sparePart.nombre === null || sparePart.nombre.trim() === '') {
        return "errores.requerido";
    }
    if (sparePart.nombre.length > 50 || sparePart.nombre.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    return "";
}


function checkPrecio(sparePart) {
    const checkPrecio = sparePart.precio.toString();
    if (checkPrecio === null || checkPrecio.trim() === '') {
        return "errores.requerido";
    }
    if (!checkPrecio.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

function checkModels(vehicle) {
    if (vehicle.modelos.length === 0) {
        return "errores.requerido";
    }
    return "";
}


export function checkSparePart(sparePart, name) {
    if (name === 'nombre') {
        return checkNombre(sparePart);
    }
    if (name === 'precio') {
        return checkPrecio(sparePart);
    }
    if (name === 'modelos') {
        return checkModels(sparePart);
    }
    return "";
}