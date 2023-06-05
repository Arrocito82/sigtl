function MenuSeguridad(){
    return(
        <div className="d-flex pt-2 pb-3 justify-content-center container-fluid">
          
            <div className="btn-group">
              <button type="button" className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <span>Cargar CSV</span> 
                <span className="material-symbols-outlined" style={{position:'relative',top:'5px'}}>upload</span>
              </button>
              <ul className="dropdown-menu">
              <li>
                  <a href="/cargar-sucursales"
                    name='cargar-sucursales' 
                    className='dropdown-item' 
                    >Sucursales</a>
              </li>
              <li>
                <a
                href="/cargar-categorias"
                name='cargar-categorias' 
                className='dropdown-item' 
                >Categorias</a>
              </li>
              <li>
                <a
                href="/cargar-productos"
                name='cargar-productos' 
                className='dropdown-item' 
                >Productos</a>
              </li>
            </ul>
          </div>
          <a
          href="/usuarios"
          name='usuarios' 
          className='btn btn-outline-primary mx-1' 
          >
            <span style={{position:'relative',bottom:'10px'}}>Usuarios</span>
            <span className="material-symbols-outlined fs-2 m-2">person</span>
          </a>
  
  
          <a
           href="/historial"
           name='historial'
           className='btn btn-outline-primary mx-1'>
            <span style={{position:'relative',bottom:'10px'}}>
              Historial
            </span>
            <span className="material-symbols-outlined fs-2 m-2">history</span>
          </a>
  
  
         
  
        </div>
    );
  }
  
  export default MenuSeguridad;