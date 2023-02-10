import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    // Mezclar una clase fija ccon una clase dinamica
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje