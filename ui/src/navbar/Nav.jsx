import React from 'react';
import { setAuthToken } from '../seguridad/setAuthToken';
import { history } from '../seguridad/history';

function Nav(){
    const logout=()=>{
      setAuthToken();
      localStorage.removeItem("token");
      // console.log(localStorage.getItem("token"));
      window.location.href = '/'
      // history.forward();

    }
    return(
      <nav className="navbar"> 
      <div className="container-fluid pt-3">
        <div>
          <img src="cover.png" alt="Tienda Luisito" style={{width:'300px'}}/>
        </div> 
        
        {/* Botones de configuración */}
        <div>
          <button name='configuracion' className="btn btn-outline-dark mx-1">
            <span style={{position:'relative',bottom:'0.5rem'}} >Configuración</span>
            <span className='material-symbols-outlined m-2'>settings</span>
          </button>
          <button 
          onClick={logout}
          name='cerrar-sesion' 
          className="btn btn-outline-dark mx-1 ">
            <span style={{position:'relative',bottom:'0.5rem'}}>Cerrar Sesión</span> 
            <span className="material-symbols-outlined m-2">logout</span>
          </button>
        </div>
      </div>
      </nav>
    );
}

export default Nav;