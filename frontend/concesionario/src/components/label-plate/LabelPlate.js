import React from "react";

function formatPlate(plate) {
    // Verifica si la cadena tiene el formato esperado
    const regex = /^[A-Za-z]{3}\d{3}$/;
    if (!regex.test(plate)) {
        console.error('Formato de placa no válido. Debe ser en el formato ABC123.');
        return plate; // Retorna la placa sin cambios si el formato no es válido
    }

    // Separa la parte de las letras y los números
    const letras = plate.slice(0, 3);
    const numeros = plate.slice(3);

    // Formatea como "ABC • 123"
    const placaFormateada = `${letras} • ${numeros}`;

    return placaFormateada;
}

export default function labelPlate({plate}) {

    return (
        <div
            style={{
                backgroundColor: '#FFD100', // Fondo negro para el borde exterior
                padding: '2px', // Ajusta el espaciado interior según necesidades
                borderRadius: '4px', // Bordes redondeados
                display: 'inline-block',
            }}
        >
            <div
                style={{
                    backgroundColor: '#FFD100', // Amarillo - color de fondo de placas colombianas
                    color: '#000000', // Negro - color de texto
                    border: '2px solid #000000', // Borde negro de 2px
                    padding: '3px', // Ajusta el espaciado interior según necesidades
                    borderRadius: '4px', // Bordes redondeados
                    fontSize: '12px', // Tamaño de fuente
                    fontWeight: 'bold', // Peso de la fuente
                    display: 'flex',
                    justifyContent: 'center', // Centra el texto horizontalmente
                    alignItems: 'center', // Centra el texto verticalmente
                    // Otros estilos según necesidades
                }}
            >
                {formatPlate(plate)}
            </div>
        </div>
    );
};