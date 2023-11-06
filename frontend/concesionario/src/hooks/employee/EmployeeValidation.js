function checkEmail(customer){
    if (customer.correo === null || customer.correo === '') {
        return "errores.requerido";
    }
    if (customer.correo.length > 320 || customer.correo.length < 6)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    {
        return "errores.correo";
    }

    return "";
}

function checkCellphone(customer) {
    if (customer.celular === null || customer.celular.trim() === '') {
        return "errores.requerido";
    }
    if ((customer.celular).length !== 10)
    {
        return "errores.longitudExacta";
    }
    if (!customer.celular.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    return "";
}

function checkPhone(customer) {
    if (customer.telefono === null || customer.telefono.trim() === '') {
        return "errores.requerido";
    }
    if (!customer.telefono.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if ((customer.telefono).length !== 7)
    {
        return "errores.longitudExacta";
    }

    return "";
}

function checkPassword(customer) {
    if (customer.clave === null || customer.clave.trim() === '') {
        return "errores.requerido";
    }
    if ((customer.clave).length > 50 || (customer.clave).length < 8)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.clave.match(/(?=.*[a-z])/))
    {
        return "errores.contraseña.minuscula";
    }
    if (!customer.clave.match(/(?=.*[A-Z])/))
    {
        return "errores.contraseña.mayuscula";
    }
    if (!customer.clave.match(/(?=.*[0-9])/))
    {
        return "errores.contraseña.numerico";
    }
    if (customer.clave.match(/\s/))
    {
        return "errores.contraseña.espacio";
    }
    if (!customer.clave.match(/(?=.*[!@#$%^&*])/))
    {
        return "errores.contraseña.especial";
    }
    return "";
}

function checkCity(customer) {
    if (customer.ciudad === null || customer.ciudad === '') {
        return "errores.requerido";
    }
    if ((customer.ciudad).length > 50)
    {
        return "errores.longitudMax";
    }
    return "";
}

function checkAddress(customer) {
    if (customer.direccion === null || customer.direccion === '') {
        return "errores.requerido";
    }
    if ((customer.direccion).length > 50 || (customer.direccion).length < 5)
    {
        return "errores.longitudMaxMin";
    }
    return "";
}

function checkFirstName(customer) {
    if (customer.primerNombre === null || customer.primerNombre.trim() === '') {
        return "errores.requerido";
    }
    if (customer.primerNombre.length > 50 || customer.primerNombre.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.primerNombre.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondName(customer) {
    if (customer.segundoNombre.trim() !== '') {
        if (customer.segundoNombre.length > 50 || customer.segundoNombre.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!customer.segundoNombre.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkFirstLastName(customer) {
    if (customer.primerApellido === null || customer.primerApellido.trim() === '') {
        return "errores.requerido";
    }
    if (customer.primerApellido.length > 50 || customer.primerApellido.length < 2)
    {
        return "errores.longitudMaxMin";
    }
    if (!customer.primerApellido.match(/^[a-zA-Z]+$/))
    {
        return "errores.alfabetico";
    }
    return "";
}

function checkSecondLastName(customer) {
    if (customer.segundoApellido.trim() !== '') {
        if (customer.segundoApellido.length > 50 || customer.segundoApellido.length < 2)
        {
            return "errores.longitudMaxMin";
        }
        if (!customer.segundoApellido.match(/^[a-zA-Z]+$/))
        {
            return "errores.alfabetico";
        }
    }
    return "";
}

function checkBornDate(customer) {

    if (customer.fechaNacimiento === null || customer.fechaNacimiento.trim() === '') {
        return "errores.requerido";
    }
    const fechaActual = new Date();
    const fechaNac = new Date(customer.fechaNacimiento);
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

function checkCedula(customer) {

    if (customer.cedula === null || toString(customer.cedula).trim() === '') {
        return "errores.requerido";
    }
    if (!customer.cedula.match(/^[0-9]+$/))
    {
        return "errores.numerico";
    }
    if (customer.cedula.length !== 8 && customer.cedula.length !== 9 && customer.cedula.length !== 10)
    {
        return "errores.longitudExacta";
    }

    return "";
}

function checkGender(customer) {
    if (customer.genero === null || customer.genero === '') {
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

export function checkEmployee(employee, name) {
    if (name === 'correo') {
        return checkEmail(employee);
    }
    if (name === 'celular') {
        return checkCellphone(employee);
    }
    if (name === 'telefono') {
        return checkPhone(employee);
    }
    if (name === 'clave') {
        return checkPassword(employee);
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

    return "";
}