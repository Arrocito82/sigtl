import { useState } from "react";

function IniciarSesion({setToken}) {
    const [contrasena, setContrasena]=useState();
    const [email, setEmail]=useState();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordlChange(event) {
        setContrasena(event.target.value);
    }
    function iniciarSesion() {
        // función para iniciar sesion que retorna un token
        setToken("ramdon-token");
    }
    return(
                <div className="d-flex justify-content-center" style={{height: "100vh"}}>                   
                    <form action="/login" method="post" className="m-3 bg-body-tertiary p-4 rounded  align-self-center">
                        <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="pb-2 pt-3 logo-login"/>
                        <p className="text-center"><span className="h4 text-dark-emphasis" >Iniciar Sesión</span></p>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleEmailChange}/>
                            <div id="emailHelp" className="form-text">Ej. carnet@tiendaluisito.com</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password1" value={contrasena} onChange={handlePasswordlChange}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="recordar-contrasena"/>
                            <label className="form-check-label" htmlFor="recordar-contrasena">Recordar Contraseña</label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={iniciarSesion}>Iniciar Sesión</button>
                    </form>
                </div>
    );
}

export default IniciarSesion;