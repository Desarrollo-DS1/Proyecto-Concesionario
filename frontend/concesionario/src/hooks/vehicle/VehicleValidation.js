function checkEmail(employee){
    if (employee.correo === null || employee.correo === '') {
        return "errores.requerido";
    }
    if (employee.correo.length > 320 || employee.correo.length < 6)
    {
        return "errores.longitudMaxMin";
    }
    if (!employee.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    {
        return "errores.correo";
    }

    return "";
}

function checkCellphone(employee) {
    if (employee.celular === null || employee.celular.trim() === '') {
        return "errores.requerido";
    }
    if ((employee.celular).length !== 10)
    {
        return "errores.longitudExacta";
    }
    if (!employee.celular.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

function checkPhone(employee) {
    if (employee.telefono === null || employee.telefono.trim() === '') {
        return "errores.requerido";
    }
    if (!employee.telefono.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if ((employee.telefono).length < 7 || (employee.telefono).length > 10)
    {
        return "errores.longitudMaxMin";
    }

    return "";
}

function checkPasswordAdd(employee) {
    if (employee.clave === null || employee.clave.trim() === '') {
        return "errores.requerido";
    }
    if ((employee.clave).length > 50 || (employee.clave).length < 8)
    {
        return "errores.longitudMaxMin";
    }
    if (!employee.clave.match(/(?=.*[a-z])/))
    {
        return "errores.contraseña.minuscula";
    }
    if (!employee.clave.match(/(?=.*[A-Z])/))
    {
        return "errores.contraseña.mayuscula";
    }
    if (!employee.clave.match(/(?=.*[0-9])/))
    {
        return "errores.contraseña.numerico";
    }
    if (employee.clave.match(/\s/))
    {
        return "errores.contraseña.espacio";
    }
    if (!employee.clave.match(/(?=.*[!@#$%^&*])/))
    {
        return "errores.contraseña.especial";
    }
    return "";
}

function checkPasswordEdit(employee) {
    if (employee.clave !== null && employee.clave.trim() !== '') {
        if ((employee.clave).length > 50 || (employee.clave).length < 8)
        {
            return "errores.longitudMaxMin";
        }
        if (!employee.clave.match(/(?=.*[a-z])/))
        {
            return "errores.contraseña.minuscula";
        }
        if (!employee.clave.match(/(?=.*[A-Z])/))
        {
            return "errores.contraseña.mayuscula";
        }
        if (!employee.clave.match(/(?=.*[0-9])/))
        {
            return "errores.contraseña.numerico";
        }
        if (employee.clave.match(/\s/))
        {
            return "errores.contraseña.espacio";
        }
        if (!employee.clave.match(/(?=.*[!@#$%^&*])/))
        {
            return "errores.contraseña.especial";
        }
    }

    return "";
}

function checkCity(employee) {
    if (employee.ciudad === null || employee.ciudad === '') {
        return "errores.requerido";
    }
    if ((employee.ciudad).length > 50)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkAddress(employee) {
    if (employee.direccion === null || employee.direccion === '') {
        return "errores.requerido";
    }
    if ((employee.direccion).length > 50 || (employee.direccion).length < 5)
    {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkFirstName(employee) {
    if (employee.primerNombre === null || employee.primerNombre.trim() === '') {
        return "errores.requerido";
    }
    if (employee.primerNombre.length > 50 || employee.primerNombre.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!employee.primerNombre.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondName(employee) {
    if (employee.segundoNombre.trim() !== '') {
        if (employee.segundoNombre.length > 50 || employee.segundoNombre.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!employee.segundoNombre.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkFirstLastName(employee) {
    if (employee.primerApellido === null || employee.primerApellido.trim() === '') {
        return "errores.requerido";
    }
    if (employee.primerApellido.length > 50 || employee.primerApellido.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!employee.primerApellido.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondLastName(employee) {
    if (employee.segundoApellido.trim() !== '') {
        if (employee.segundoApellido.length > 50 || employee.segundoApellido.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!employee.segundoApellido.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkBornDate(employee) {

    if (employee.fechaNacimiento === null || employee.fechaNacimiento.trim() === '') {
        return "errores.requerido";
    }
    const fechaActual = new Date();
    const fechaNac = new Date(employee.fechaNacimiento);
    if (fechaNac > fechaActual)
    {
        return "errores.fecha";
    }
    if (fechaNac.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    if ((fechaActual.getFullYear() - fechaNac.getFullYear()) < 18)
    {
        return "errores.fecha";
    }
    return "";
}

function checkCedula(employee) {

    if (employee.cedula === null || toString(employee.cedula).trim() === '') {
        return "errores.requerido";
    }
    if (!employee.cedula.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (employee.cedula.length > 10 || employee.cedula.length < 8)
    {
        return "errores.longitudMaxMin";
    }

    return "";
}

function checkGender(employee) {
    if (employee.genero === null || employee.genero === '') {
        return "errores.requerido";
    }
    return "";
}

function checkSalary(employee) {
    const strSalario = employee.salario.toString();
    if (employee.salario === null || strSalario.trim() === '') {
        return "errores.requerido";
    }
    if (!strSalario.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

function checkBloodType(employee) {
    if (employee.tipoSangre === null || employee.tipoSangre === '') {
        return "errores.requerido";
    }
    return "";
}

function checkEps(employee) {
    if (employee.eps === null || employee.eps.trim() === '') {
        return "errores.requerido";
    }
    return "";
}

function checkArl(employee) {
    if (employee.arl === null || employee.arl.trim() === '') {
        return "errores.requerido";
    }
    return "";
}

function checkPosition(employee) {
    if (employee.cargo === null || employee.cargo.trim() === '') {
        return "errores.requerido";
    }
    return "";
}

function checkAdmissionDate(employee) {
    if (employee.fechaIngreso === null || employee.fechaIngreso.trim() === '') {
        return "errores.requerido";
    }
    const fechaActual = new Date();
    const fechaIngreso = new Date(employee.fechaIngreso);
    if (fechaIngreso > fechaActual)
    {
        return "errores.fecha";
    }
    if (fechaIngreso.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    return "";
}

function checkRetirementDate(employee) {
    if (employee.fechaRetiro === null || employee.fechaRetiro.trim() === '') {
        return "";
    }
    const fechaActual = new Date();
    const fechaRetiro = new Date(employee.fechaRetiro);
    if (fechaRetiro > fechaActual)
    {
        return "errores.fecha";
    }
    if (fechaRetiro.getFullYear() < 1900)
    {
        return "errores.fecha";
    }
    return "";
}

function checkBranch(employee) {
    if (employee.sucursal === null || employee.sucursal === '') {
        return "errores.requerido";
    }
    return "";
}

export function checkEmployee(employee, name, edit) {
    if (name === 'correo') {
        return checkEmail(employee);
    }
    if (name === 'celular') {
        return checkCellphone(employee);
    }
    if (name === 'telefono') {
        return checkPhone(employee);
    }
    if (name === 'clave' && edit) {
        return checkPasswordEdit(employee);
    }
    if (name === 'clave' && !edit) {
        return checkPasswordAdd(employee);
    }
    if (name === 'ciudad') {
        return checkCity(employee);
    }
    if (name === 'direccion') {
        return checkAddress(employee);
    }
    if (name === 'primerNombre') {
        return checkFirstName(employee);
    }
    if (name === 'segundoNombre') {
        return checkSecondName(employee);
    }
    if (name === 'primerApellido') {
        return checkFirstLastName(employee);
    }
    if (name === 'segundoApellido') {
        return checkSecondLastName(employee);
    }
    if (name === 'fechaNacimiento') {
        return checkBornDate(employee);
    }
    if (name === 'cedula') {
        return checkCedula(employee);
    }
    if (name === 'genero') {
        return checkGender(employee);
    }
    if (name === 'salario') {
        return checkSalary(employee);
    }
    if (name === 'tipoSangre') {
        return checkBloodType(employee);
    }
    if (name === 'eps') {
        return checkEps(employee);
    }
    if (name === 'arl') {
        return checkArl(employee);
    }
    if (name === 'cargo') {
        return checkPosition(employee);
    }
    if (name === 'fechaIngreso') {
        return checkAdmissionDate(employee);
    }
    if (name === 'fechaRetiro') {
        return checkRetirementDate(employee);
    }
    if (name === 'sucursal') {
        return checkBranch(employee);
    }

    return "";
}