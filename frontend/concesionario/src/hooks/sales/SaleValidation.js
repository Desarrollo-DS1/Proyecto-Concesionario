

function checkVendedor(sale){
    if(sale.cedulaVenderor === null || toString(sale.cedulaVenderor).trim() === ''){
        return 'errores.requerido';
    }
    if(!sale.cedulaVenderor.match(/^[0-9]+$/)){
        return 'errores.numerico';
    }
    if(sale.cedulaVenderor.length > 10 || sale.cedulaVenderor.length < 8){
        return 'errores.longitudMaxMin';
    }

    return '';
}

function checkCliente(sale){
    if (sale.cedulaCliente === null || toString(sale.cedulaCliente).trim() === '') {
        return "errores.requerido";
    }
    if(!sale.cedulaCliente.match(/^[0-9]+$/)){
        return 'errores.numerico';
    }
    if(sale.cedulaCliente.length > 10 || sale.cedulaCliente.length < 8){
        return 'errores.longitudMaxMin';
    }

    return '';
}

function checkDate(sale){
    if(sale.fechaVenta === null || toString(sale.fecha).trim() === ''){
        return 'errores.requerido';
    }
    return '';
}