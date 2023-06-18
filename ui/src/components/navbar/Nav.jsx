import React, { useEffect, useState } from 'react';
import { setAuthToken } from '../../seguridad/setAuthToken';

function Nav(){
    const [username, setUsername]=useState();
    const logout=()=>{
      setAuthToken();
      localStorage.clear();
      window.location.href = '/'

    }
    useEffect(()=>{
      let email=localStorage.getItem("username");
      setUsername(email);
    },[])
    return(
      <nav className="navbar"> 
          <div className="container pt-3 justify-content-between container-fluid">
                <div className="btn-group" >
                  <a href="/">
                    <img src="cover.png" alt="Tienda Luisito" style={{width:'300px'}}/>
                  </a>
                </div>
                {username&&
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
                }
                {!username&&	
                <div className="btn-group" >
                  <a
                    href="/iniciar-sesion"
                    name='iniciar-sesion' 
                    className='btn btn-outline-primary mx-1' 
                    >
                      <span style={{position:'relative',bottom:'10px'}}>Iniciar Sesión</span>
                      <span className="material-symbols-outlined fs-2 m-2">login</span>
                    </a>


                    <a
                    href="registrar-usuario"
                    name='registrar-usuario'
                    className='btn btn-outline-primary mx-1'>
                      <span style={{position:'relative',bottom:'10px'}}>
                        Registrarme
                      </span>
                      <span className="material-symbols-outlined fs-2 m-2">person_add</span>
                    </a>
                </div>
                }
          </div>
      </nav>
    );
}

export default Nav;