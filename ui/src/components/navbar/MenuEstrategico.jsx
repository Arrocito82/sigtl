function MenuEstrategico(){
  return(
      <div className="d-flex pt-2 pb-3 justify-content-center container-fluid">
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

export default MenuEstrategico;