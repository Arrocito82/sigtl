function Menu(){
  return(
      <div className="d-flex pt-2 pb-3 justify-content-between container-fluid">
        
          <div className="btn-group">
            <button type="button" className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <span>Cargar CSV</span> 
              <span className="material-symbols-outlined" style={{position:'relative',top:'5px'}}>upload</span>
            </button>
            <ul className="dropdown-menu">
            <li>
                <a href="/cargar-movimientos"
                  name='cargar-movimientos' 
                  className='dropdown-item' 
                  >Cargar Movimientos</a>
            </li>
            <li>
              <a
              href="/cargar-productos-danados"
              name='cargar-productos-danados' 
              className='dropdown-item' 
              >Cargar Productos Dañados</a>
            </li>
          </ul>
        </div>
        <a
        href="/demanda-clientes"
        name='demanda-clientes' 
        className='btn btn-outline-primary mx-1' 
        >
          <span style={{position:'relative',bottom:'10px'}}>Demanda de Clientes</span>
          <span className="material-symbols-outlined fs-2 m-2">groups</span>
        </a>


        <a
         href="productos-danados"
         name='productos-danados'
         className='btn btn-outline-primary mx-1'>
          <span style={{position:'relative',bottom:'10px'}}>
            Productos Dañados
          </span>
          <span className="material-symbols-outlined fs-2 m-2">timer_off</span>
        </a>


        <a
        href="/frecuencia-compra"
        name='frecuencia-compra' 
        className='btn btn-outline-primary mx-1'>
          <span style={{position:'relative',bottom:'10px'}}>
          Frecuencia de compra de productos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">shopping_cart</span>
        </a>


        <a 
        href="/ingresos-costos"
        name='ingresos-costos' 
        className='btn btn-outline-primary mx-1'>
          <span style={{position:'relative',bottom:'10px'}}>
          Ingresos y Costos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">request_quote</span>
        </a>


        <a
        href="/productos-mas-vendidos"
        name='productos-mas-vendidos' 
        className='btn btn-outline-primary mx-1'>
          <span style={{position:'relative',bottom:'10px'}}>
          Productos más vendidos
          </span>
          <span className="material-symbols-outlined fs-2 m-2">monitoring</span>
        </a>


      </div>
  );
}

export default Menu;