function Menu(props){
  return(
      <div className="d-flex pt-2 pb-3 justify-content-between container-fluid">
        <button onClick={()=>{props.seleccionarReporte("demanda-clientes")}} 
        name='demanda-clientes' 
        className='btn btn-outline-primary mx-1' 
        >
          <span style={{position:'relative',bottom:'10px'}}>Demanda de Clientes</span>
          <span className="material-symbols-outlined fs-2 m-2">groups</span>
        </button>


        <button name='productos-danados' className='btn btn-outline-primary mx-1'
        onClick={()=>{props.seleccionarReporte('productos-danados')}} >
          <span style={{position:'relative',bottom:'10px'}}>
            Productos Dañados
          </span>
          <span className="material-symbols-outlined fs-2 m-2">timer_off</span>
        </button>


        <button name='frecuencia-compra' className='btn btn-outline-primary mx-1'
        onClick={()=>{props.seleccionarReporte('frecuencia-compra')}}>
          <span style={{position:'relative',bottom:'10px'}}>
          Frecuencia de compra de productos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">shopping_cart</span>
        </button>


        <button name='ingresos-costos' className='btn btn-outline-primary mx-1'
        onClick={()=>{props.seleccionarReporte('ingresos-costos')}}>
          <span style={{position:'relative',bottom:'10px'}}>
          Ingresos y Costos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">request_quote</span>
        </button>


        <button name='productos-mas-vendidos' className='btn btn-outline-primary mx-1'
        onClick={()=>{props.seleccionarReporte('productos-mas-vendidos')}}>
          <span style={{position:'relative',bottom:'10px'}}>
          Productos más vendidos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">monitoring</span>
        </button>


      </div>
  );
}

export default Menu;