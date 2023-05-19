import React, { useState } from 'react';
import Nav from './Nav';
import Menu from './Menu';
import DemandaClientes from './DemandaClientes';
import ProductosDanados from './ProductosDanados';
import FrecuenciaCompra from './FrecuenciaCompra';
import IngresosCostos from './IngresosCostos';
import ProductosMasVendidos from './ProductosMasVendidos';
import Bienvenida from './Bienvenida';


function App() {
  // const sigService = new SigService();
  const [reporte, setReporte] = useState(<Bienvenida />);

  const seleccionarReporte=(reporteSeleccionado)=>{
    // eslint-disable-next-line default-case
    switch (reporteSeleccionado) {
      case 'demanda-clientes':
          setReporte(<DemandaClientes />);
          break;
      case 'productos-danados':
          setReporte(<ProductosDanados />);
          break;

      case 'frecuencia-compra':
          setReporte(<FrecuenciaCompra />);
          break;

      case 'ingresos-costos':
          setReporte(<IngresosCostos />);
          break;

      case 'productos-mas-vendidos':
          setReporte(<ProductosMasVendidos />);
          break;
      default:
        setReporte(<Bienvenida />);
        break;
    }
  }

  return (
      <div>
        <header className=' bg-body-tertiary'>        
          <Nav/>
          <Menu seleccionarReporte={seleccionarReporte}/>
        </header>
        {reporte}
        
      </div>
  );
}

export default App;
