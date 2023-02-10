// Función para generar id unico

export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

// Formatear la fecha de formato milisegundos (Date.now();) a formato español (DD/MM/AAAA)
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const opciones = {
        year : 'numeric',
        month: 'long',
        day: '2-digit',
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}