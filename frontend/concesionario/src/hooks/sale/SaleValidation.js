function checkCedulaCliente(sale){
    if (sale.cedulaCliente === null || toString(sale.cedulaCliente).trim() === '' || sale.cedulaCliente  === '') {

        return "errores.requerido";
    }
    if (!sale.cedulaCliente.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (sale.cedulaCliente.length > 10 || sale.cedulaCliente.length < 8)
    {
        return "errores.longitudMaxMin";
    }

    return "";
}

function checkDate(sale){
    if (sale.fechaVenta === null || sale.fechaVenta.trim() === '') {
        return "errores.requerido";
    }
    const fechaVenta = new Date(sale.fechaVenta);
    if (fechaVenta.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    return "";
}

function checkVehicle(cartVehicle){
    if (typeof cartVehicle.vehiculo === 'string')
    {
        if (cartVehicle.vehiculo.trim() === '')
        {
            return  "errores.requerido";
        }
    }
    if (cartVehicle.vehiculo === null) {
        return "errores.requerido";
    }
    return "";
}

function checkDiscount(cartVehicle){
    if (!cartVehicle.descuento.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (cartVehicle.descuento.length > 2)
    {
        return "errores.longitudMax";
    }
    return "";
}

export function checkSale(sale, name) {
    if (name === 'cedulaCliente') {
        return checkCedulaCliente(sale);
    }
    if (name === 'fechaVenta') {
        return checkDate(sale);
    }
    if (name === 'vehiculo') {
        return checkVehicle(sale);
    }
    if (name === 'descuento') {
        return checkDiscount(sale);
    }

    return "";
}