import React, { useEffect, useState } from 'react';
import { setAuthToken } from '../../seguridad/setAuthToken';

function Nav(){
    const [username, setUsername]=useState();
    const logout=()=>{
      setAuthToken();
      localStorage.removeItem("token");
      // localStorage.removeItem("isConfigured");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("username");
      // console.log(localStorage.getItem("token"));
      window.location.href = '/'
      // history.forward();

    }
    useEffect(()=>{
      let email=localStorage.getItem("username");
      setUsername(email);
    },[])
    return(
      <nav className="navbar"> 
          <div className="container pt-3 justify-content-between container-fluid">
                <div className="btn-group" >
                  <img src="cover.png" alt="Tienda Luisito" style={{width:'300px'}}/>
                </div>
                <div className="btn-group" >
                    <button type="button" className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="material-symbols-outlined" style={{position:'relative',top:'5px'}}>person</span>
                      <span>{username}</span> 
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <p
                          onClick={logout}
                          name='cerrar-sesion' 
                          className="dropdown-item">
                            <span className="material-symbols-outlined m-2">logout</span>
                            <span style={{position:'relative',bottom:'0.2rem'}}>Cerrar Sesión</span> 
                          </p>
                        </li>
                        <li>
                          <a
                          href="/cambiar-contrasena"
                          name='cambiar-contrasena' 
                          className='dropdown-item' 
                          >
                            <span className="material-symbols-outlined m-2">password</span>
                            <span style={{position:'relative',bottom:'0.2rem'}}>Cambiar Contraseña</span> 
                          </a>
                        </li>
                    </ul>
                </div>
          </div>
      </nav>
    );
}

export default Nav;