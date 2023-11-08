function checkVin(vehicle) {
    if (vehicle.vin === null || vehicle.vin.trim() === '') {
        return "errores.requerido";
    }
    if (vehicle.vin.length > 17 || vehicle.vin.length < 5)
    {
        return "errores.longitudMaxMin";
    }
    if (/[ioq]/i.test(vehicle.vin)) {
        return "errores.vinCaracteresNoPermitidos";
    }
    return "";
}


function checkBranch(vehicle) {
    if (vehicle.sucursal === null || vehicle.sucursal === '') {
        return "errores.requerido";
    }
    return "";
}

function checkModel(vehicle) {
    if (vehicle.modelo === null || vehicle.modelo === '') {
        return "errores.requerido";
    }
    return "";
}

function checkColor(vehicle) {
    if (vehicle.color === null || vehicle.color === '') {
        return "errores.requerido";
    }
    return "";
}


export function checkVehicle(vehicle, name) {
    if (name === 'vin') {
        return checkVin(vehicle);
    }
    if (name === 'sucursal') {
        return checkBranch(vehicle);
    }
    if (name === 'modelo') {
        return checkModel(vehicle);
    }
    if (name === 'color') {
        return checkColor(vehicle);
    }


    return "";
}