function checkCedulaCliente(price){
    if (price.cedulaCliente === null || toString(price.cedulaCliente).trim() === '' || price.cedulaCliente  === '') {

        return "errores.requerido";
    }
    if (!price.cedulaCliente.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (price.cedulaCliente.length > 10 || price.cedulaCliente.length < 8)
    {
        return "errores.longitudMaxMin";
    }

    return "";
}

function checkDate(price){
    if (price.fechaCotizacion === null || price.fechaCotizacion.trim() === '') {
        return "errores.requerido";
    }
    const fechaCotizacion = new Date(price.fechaCotizacion);
    if (fechaCotizacion.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    return "";
}

function checkModel(cartModel){
    if (typeof cartModel.modelo === 'string')
    {
        if (cartModel.modelo.trim() === '')
        {
            return  "errores.requerido";
        }
    }
    if (cartModel.modelo === null) {
        return "errores.requerido";
    }
    return "";
}

function checkColor(cartModel){
    if (typeof cartModel.color === 'string')
    {
        if (cartModel.color.trim() === '')
        {
            return  "errores.requerido";
        }
    }
    if (cartModel.color === null) {
        return "errores.requerido";
    }
    return "";
}

export function checkSale(price, name) {
    if (name === 'cedulaCliente') {
        return checkCedulaCliente(price);
    }
    if (name === 'fechaCotizacion') {
        return checkDate(price);
    }
    if (name === 'modelo') {
        return checkModel(price);
    }
    if (name === 'color') {
        return checkColor(price);
    }

    return "";
}