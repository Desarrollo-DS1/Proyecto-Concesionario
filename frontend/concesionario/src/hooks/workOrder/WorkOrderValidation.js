function checkCedulaCliente(workOrder) {
    if (workOrder.cedulaCliente === null || toString(workOrder.cedulaCliente).trim() === '' || workOrder.cedulaCliente  === '') {

        return "errores.requerido";
    }
    if (!workOrder.cedulaCliente.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (workOrder.cedulaCliente.length > 10 || workOrder.cedulaCliente.length < 8)
    {
        return "errores.longitudMaxMin";
    }

    return "";
}

function checkModel(workOrder) {
    if (workOrder.modelo === null || workOrder.modelo === '') {
        return "errores.requerido";
    }
    return "";
}

function checkPlate(workOrder) {
    if (workOrder.placa === null || workOrder.placa.trim() === '') {
        return "errores.requerido";
    }
    if (workOrder.placa.length !== 6)
    {
        return "errores.longitudExacta";
    }

    const letters = workOrder.placa.slice(0, 3);
    const numbers = workOrder.placa.slice(3);

    if (!/^[A-Za-z]+$/.test(letters) || !/^\d+$/.test(numbers)) {
        return "errores.placa";
    }
    return "";
}

function checkFechaEsperada(workOrder) {
    if (workOrder.fechaEsperada === null || workOrder.fechaEsperada.trim() === '') {
        return "errores.requerido";
    }

    const fechaActual = new Date(workOrder.fechaInicio);
    const fechaEsperada = new Date(workOrder.fechaEsperada);
    if (fechaEsperada < fechaActual)
    {
        return "errores.fecha";
    }

    return "";
}

function checkServicios(workOrder) {
    if (workOrder.servicios.length === 0) {
        return "errores.requerido";
    }
    return "";
}

function checkRepuestos(workOrder) {
    if (workOrder.repuestos.length === 0) {
        return "errores.requerido";
    }
    return "";
}


export function checkWorkOrder(workOrder, name) {
    if (name === 'cedulaCliente') {
        return checkCedulaCliente(workOrder);
    }
    if (name === 'modelo') {
        return checkModel(workOrder);
    }
    if (name === 'placa') {
        return checkPlate(workOrder);
    }
    if (name === 'fechaEsperada') {
        return checkFechaEsperada(workOrder);
    }
    if (name === 'servicios') {
        return checkServicios(workOrder);
    }
    if (name === 'repuestos') {
        return checkRepuestos(workOrder);
    }
    return "";
}