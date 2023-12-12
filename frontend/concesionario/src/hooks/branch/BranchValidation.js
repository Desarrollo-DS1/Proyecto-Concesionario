function checkName(branch) {
    if (branch.nombre === null || branch.nombre === undefined || branch.nombre === '') {
        return "errores.requerido";
    }
    if (branch.nombre.length > 100 || branch.nombre.length < 2) {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkAddress(branch) {
    if (branch.direccion === null || branch.direccion === undefined || branch.direccion === '') {
        return "errores.requerido";
    }
    if (branch.direccion.length > 100 || branch.direccion.length < 2) {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkCity(branch) {
    if (branch.ciudad === null || branch.ciudad === undefined || branch.ciudad === '') {
        return "errores.requerido";
    }
    if (branch.ciudad.length > 50 || branch.ciudad.length < 2) {
        return "errores.longitudMaxMin";
    }
    if (!branch.ciudad.match(/^[a-zA-Z]+$/)) {
        return "errores.alfabetico";
    }
    return "";
}

function checkPhone(branch) {
    if (branch.telefono === null || branch.telefono === undefined || branch.telefono === '') {
        return "errores.requerido";
    }
    if (branch.telefono.length > 10 || branch.telefono.length < 7) {
        return "errores.longitudMaxMin";
    }
    if (!branch.telefono.match(/^[0-9]+$/)) {
        return "errores.numerico";
    }
    return "";
}

function checkBranch(branch, name, edit) {
    if (name === "nombre") {
        return checkName(branch);
    }
    if (name === "direccion") {
        return checkAddress(branch);
    }
    if (name === "ciudad") {
        return checkCity(branch);
    }
    if (name === "telefono") {
        return checkPhone(branch);
    }
    return "";
}

