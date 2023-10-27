function checkEmail(employee){
    if (employee.correo === null || employee.correo === '') {
        return "El campo es requerido";
    }
    if (employee.correo.length > 320 || employee.correo.length < 6)
    {
        return "Max: 320 caracteres, Min: 6 caracteres";
    }
    if (!employee.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    {
        return "Ingrese un correo valido";
    }

    return "";
}

function checkCellphone(employee) {
    if (employee.celular === null || employee.celular.trim() === '') {
        return "El campo es requerido";
    }
    if ((employee.celular).length !== 10)
    {
        return "Debe tener 10 digitos";
    }
    if (!employee.celular.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    return "";
}

function checkPhone(employee) {
    if (employee.telefono === null || employee.telefono.trim() === '') {
        return "El campo es requerido";
    }
    if (!employee.telefono.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if ((employee.telefono).length !== 7)
    {
        return "Debe tener 7 digitos";
    }

    return "";
}

function checkPassword(employee) {
    if (employee.clave === null || employee.clave.trim() === '') {
        return "El campo es requerido"
    }
    if ((employee.clave).length > 50 || (employee.clave).length < 8)
    {
        return "Max: 50 caracteres, Min: 8 caracteres"
    }
    if (!employee.clave.match(/(?=.*[a-z])/))
    {
        return "Debe tener al menos una letra minuscula"
    }
    if (!employee.clave.match(/(?=.*[A-Z])/))
    {
        return "Debe tener al menos una letra mayuscula"
    }
    if (!employee.clave.match(/(?=.*[0-9])/))
    {
        return "Debe tener al menos un numero"
    }
    if (employee.clave.match(/\s/))
    {
        return "No se permiten espacios en blanco"
    }
    return "";
}

function checkCity(employee) {
    if (employee.ciudad === null || employee.ciudad === '') {
        return "El campo ciudad es requerido"
    }
    if ((employee.ciudad).length > 50)
    {
        return "La ciudad no puede tener mas de 50 caracteres"
    }
    return "";
}

function checkAddress(employee) {
    if (employee.direccion === null || employee.direccion === '') {
        return "El campo es requerido";
    }
    if ((employee.direccion).length > 50 || (employee.direccion).length < 5)
    {
        return "Max: 50 caracteres, Min: 5 caracteres";
    }
    return "";
}

function checkFirstName(employee) {
    if (employee.primerNombre === null || employee.primerNombre.trim() === '') {
        return "El campo es requerido";
    }
    if (employee.primerNombre.length > 50 || employee.primerNombre.length < 2)
    {
        return "Max: 50 caracteres, Min: 2 caracteres";
    }
    if (!employee.primerNombre.match(/^[a-zA-Z]+$/))
    {
        return "Solo se permiten letras";
    }
    return "";
}

function checkSecondName(employee) {
    if (employee.segundoNombre.trim() !== '') {
        if (employee.segundoNombre.length > 50 || employee.segundoNombre.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!employee.segundoNombre.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
    }
    return "";
}

function checkFirstLastName(employee) {
    if (employee.primerApellido === null || employee.primerApellido.trim() === '') {
        return "El campo es requerido";
    }
    if (employee.primerApellido.length > 50 || employee.primerApellido.length < 2)
    {
        return "Max: 50 caracteres, Min: 2 caracteres";
    }
    if (!employee.primerApellido.match(/^[a-zA-Z]+$/))
    {
        return "Solo se permiten letras";
    }
    return "";
}

function checkSecondLastName(employee) {
    if (employee.segundoApellido.trim() !== '') {
        if (employee.segundoApellido.length > 50 || employee.segundoApellido.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!employee.segundoApellido.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
    }
    return "";
}

function checkBornDate(employee) {

    if (employee.fechaNacimiento === null || employee.fechaNacimiento.trim() === '') {
        return "El campo es requerido";
    }
    const fechaActual = new Date();
    const fechaNac = new Date(employee.fechaNacimiento);
    if (fechaNac > fechaActual)
    {
        return "Seleccione una fecha valida";
    }
    if (fechaNac.getFullYear() < 1900)
    {
        return "Seleccione una fecha valida";
    }
    if ((fechaActual.getFullYear() - fechaNac.getFullYear()) < 18)
    {
        return "Edad minima 18 años";
    }
    return "";
}

function checkCedula(employee) {

    if (employee.cedula === null || toString(employee.cedula).trim() === '') {
        return "El campo es requerido";
    }
    if (!employee.cedula.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (employee.cedula.length !== 10)
    {
        return "Debe tener 10 digitos";
    }

    return "";
}

function checkGender(employee) {
    if (employee.genero === null || employee.genero === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkSalary(employee) {
    if (employee.salario === null || employee.salario.trim() === '') {
        return "El campo es requerido";
    }
    if (!employee.salario.match(/^[0-9]+$/))
    {
        return "Solo se permiten numeros";
    }
    if (employee.salario < 0)
    {
        return "El salario no puede ser negativo";
    }
    return "";
}

function checkBloodType(employee) {
    if (employee.tipoSangre === null || employee.tipoSangre === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkEps(employee) {
    if (employee.eps === null || employee.eps.trim() === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkArl(employee) {
    if (employee.arl === null || employee.arl.trim() === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkPosition(employee) {
    if (employee.cargo === null || employee.cargo.trim() === '') {
        return "El campo es requerido";
    }
    return "";
}

function checkAdmissionDate(employee) {
    if (employee.fechaIngreso === null || employee.fechaIngreso.trim() === '') {
        return "El campo es requerido";
    }
    const fechaActual = new Date();
    const fechaIngreso = new Date(employee.fechaIngreso);
    if (fechaIngreso > fechaActual)
    {
        return "Seleccione una fecha valida";
    }
    if (fechaIngreso.getFullYear() < 1900)
    {
        return "Seleccione una fecha valida";
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
        return "Seleccione una fecha valida";
    }
    if (fechaRetiro.getFullYear() < 1900)
    {
        return "Seleccione una fecha valida";
    }
    return "";
}

export function checkCustomer(employee, name) {
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