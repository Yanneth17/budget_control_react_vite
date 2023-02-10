import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  // Mis gastos 
  const [gastos, SetGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  // Variable de presupuesto, si no hay nada es cero, si hay algo en local Storage que se muestre el valor
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  // Defino variable si el presupuesto es válido
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  //Defino la ventana modal, valor falso por que no quiero que se muestre desde el inicio
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  //State para editar el gasto selecionado, cada gasto es un objeto
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltros] = useState([])

  //Detecte que gasto editar tenga algo
  useEffect(() => {
      if( Object.keys(gastoEditar).length > 0 ) {
        setModal(true)
  
        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
      }
  }, [ gastoEditar ])

  // Solo reacciona cuando presupuesto cambia
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // Solo reacciona cuando gastos cambia, los gastos son un arreglo y en local storage solo se almacenan strings
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(() => {
    if (filtro) {
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
        setGastosFiltros(gastosFiltrados)
      }
  }, [filtro]);
  
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if (presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    // console.log(gasto)
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto: gastoState)
      // Retorno los demás registros que no fueron actualizados sin perder la información
      SetGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      SetGastos([...gastos, gasto])
    }
    setAnimarModal(false)
      setTimeout(() => {
        setModal(false)
      }, 500);
  }

  const eliminarGasto = id => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id );
      // console.log(gastosActualizados)
      SetGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      {/* Fijar el modal con la clase fijar
      <div className={modal && 'fijar'></div> */}
      <Header
            gastos={gastos}
            SetGastos={SetGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {/* Cuando el presupuesto es verdadero isValidPresupuesto, se ejecuta el siguiente codigo */}
      {isValidPresupuesto && (
        <>
          <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos} 
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                  />}
      
    </div>
  )
}

export default App
