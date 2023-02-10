import { useState } from "react";
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState("")
    // Función para administrar el presupuesto 
    const handlePresupuesto = (e) => {
          e.preventDefault();

          if(!presupuesto || presupuesto <0) {
            setMensaje("No es un presupuesto válido")
            return
         } 
         setMensaje("")
         setIsValidPresupuesto(true)

          // console.log(Number(presupuesto))
          // console.log(presupuesto)      
    }

    return (
      <div className="contenedor.presupuesto contenedor sombra">
      
       {/* Le asociamos la función handlePresupuesto al form, para que cuando presione el input se ejecute la función */}
        <form onSubmit={handlePresupuesto} className="formulario">
           <div className="campo">

                <label htmlFor="">Definir presupuesto</label>
                {/* type="number" solo deja escribir números */}
                <input type="number" 
                   className="nuevo-presupuesto"
                   placeholder="Añade tu presupuesto"
                   value={presupuesto}
                  //  Cuando escriben un valor en presupuesto se va agragando a setPresupuesto del App.jsx
                   onChange={ e => setPresupuesto(Number(e.target.value))}
                />

           </div>

           <input type="submit" value="Añadir"/>

           {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>

      </div>
  )
}

export default NuevoPresupuesto