import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Nav(){

    return(
      <nav className="navbar navbar-expand-lg"> 
      <div className="container container-fluid pt-3">
        <div>
          <img src="cover.png" alt="Tienda Luisito" style={{width:'300px'}}/>
        </div> 
        
        {/* Botones de configuración */}
        <div>
          <button name='configuracion' className="btn btn-outline-dark mx-1">
            <span style={{position:'relative',bottom:'0.5rem'}} >Configuración</span>
            <span className='material-symbols-outlined m-2'>settings</span>
          </button>
          <button name='cerrar-sesion' className="btn btn-outline-dark mx-1 ">
            <span style={{position:'relative',bottom:'0.5rem'}}>Cerrar Sesión</span> 
            <span className="material-symbols-outlined m-2">logout</span>
          </button>
          <button name='iniciar-sesion' className="btn btn-outline-dark mx-1 d-none">
            <span style={{position:'relative',bottom:'0.5rem'}}>Iniciar Sesión</span> 
            <span className="material-symbols-outlined m-2">login</span>
          </button>
        </div>
      </div>
      </nav>
    );
}

export default Nav;