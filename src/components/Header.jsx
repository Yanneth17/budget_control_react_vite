// Componentes importados 
import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

// props
const Header = ({
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto
}) => {
  return (
    <header>

        <h1>Planificador de Gastos</h1>

        {/*Si ternario que valida si el presupuesto es valido y me activa la siguiente ventana  */}
        {isValidPresupuesto ? (
          <ControlPresupuesto
              gastos={gastos}
              setGastos={setGastos}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
              <NuevoPresupuesto 
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}

    </header>
  )
}

export default Header