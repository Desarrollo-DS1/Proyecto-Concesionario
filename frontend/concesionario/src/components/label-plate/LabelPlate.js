import React from "react";

function formatPlate(plate) {
    const regex = /^[A-Za-z]{3}\d{3}$/;
    if (!regex.test(plate)) {
        console.error('Formato de placa no válido. Debe ser en el formato ABC123.');
        return plate;
    }

    const letras = plate.slice(0, 3);
    const numeros = plate.slice(3);

    const placaFormateada = `${letras} • ${numeros}`;

    return placaFormateada;
}

export default function LabelPlate({ plate }) {
    return (
        <div
            style={{
                backgroundColor: '#FFD100',
                padding: '2px',
                borderRadius: '4px',
                display: 'inline-block',
            }}
        >
            <div
                style={{
                    backgroundColor: '#FFD100',
                    color: '#000000',
                    border: '2px solid #000000',
                    padding: '3px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {formatPlate(plate)}
            </div>
        </div>
    );
}
