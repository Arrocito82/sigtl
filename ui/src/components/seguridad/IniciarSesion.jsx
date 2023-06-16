import { useState } from "react";
import axios from 'axios';
import { setAuthToken } from "../../seguridad/setAuthToken";

function IniciarSesion() {
    const [mensajeError, setMensajeError]=useState();
    const [contrasena, setContrasena]=useState("");
    const [username, setUsername]=useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordlChange(event) {
        setContrasena(event.target.value);
    }
    async function iniciarSesion() {
        // función para iniciar sesion que retorna un token
        setMensajeError();
        let data={
            'password':contrasena,
            'username': username
        }
        await axios.post("https://sigtl.herokuapp.com"+"/auth/login", data, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
        }).then(response => { // then print response status
            //get token from response
            const token  =  response.data.token;
            const isConfigured  =  response.data.isConfigured;
            const isAdmin= response.data.isAdmin;
            const rol= response.data.rol;
            
            //set JWT token to local
            localStorage.setItem("token", token);
            localStorage.setItem("isConfigured", isConfigured);
            localStorage.setItem("isAdmin", isAdmin);
            localStorage.setItem("username", username);
            localStorage.setItem("rol", rol);
            console.log(localStorage.getItem("token"));
            console.log(localStorage.getItem("username"));
            //set token to axios common header
            setAuthToken(token);

            //redirect user to home page
            window.location.href = '/'
        }).catch(error=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            setMensajeError(<div className="bg-light-subtle rounded border fw-bold text-danger-emphasis border-danger text-center my-3 py-1">          
                                <span style={{"position":"relative","bottom":"10px"}}>{error.response.data}</span>
                                <span className="material-symbols-outlined m-1 fs-2" >report</span>
                            </div>);
        });
    }

    return(
                <div className="d-flex justify-content-center" style={{height: "80vh"}}>                   
                    <form action="/login" method="post" className="m-3 bg-body-tertiary p-4 rounded  align-self-center">
                        <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="pb-2 pt-3 logo-login"/>
                        <p className="text-center"><span className="h4 text-dark-emphasis" >Iniciar Sesión</span></p>
                        {mensajeError}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" value={username} onChange={handleUsernameChange}/>
                            <div id="usernameHelp" className="form-text">Ej. mm18057</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password1" value={contrasena} onChange={handlePasswordlChange}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="recordar-contrasena"/>
                            <label className="form-check-label" htmlFor="recordar-contrasena">Recordar Contraseña</label>
                        </div>
                        <div className="text-end">
                            <button type="button" className="btn btn-primary" onClick={iniciarSesion}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
    );
}

export default IniciarSesion;