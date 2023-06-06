import { useState } from "react";
import axios from 'axios';
import { setAuthToken } from "./setAuthToken";

function Config() {
    const [mensajeError, setMensajeError]=useState();
    const [contrasena, setContrasena]=useState("");
    const [contrasena2, setContrasena2]=useState("");
    const [email, setEmail]=useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordlChange(event) {
        setContrasena(event.target.value);
    }
    function handlePasswordlChange2(event) {
        setContrasena2(event.target.value);
    }
    async function iniciarSesion() {
        // función para iniciar sesion que retorna un token
        setMensajeError();
        let data={
            'password':contrasena,
            'checkedPassword':contrasena2,
            'email': email
        }
        await axios.post("http://localhost:8000/auth/register-admin", data, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
        }).then(response => { // then print response status
            //get token from response
            const token  =  response.data.token;
            const isConfigured  =  response.data.isConfigured;
            const isAdmin= response.data.isAdmin;
            
            //set JWT token to local
            localStorage.setItem("token", token);
            localStorage.setItem("isConfigured", isConfigured);
            localStorage.setItem("isAdmin", isAdmin);
            localStorage.setItem("username", email);
            // console.log(localStorage.getItem("token"));
            //set token to axios common header
            setAuthToken(token);

            //redirect user to home page
            window.location.href = '/'
        }).catch(error=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }
            setMensajeError(<div className="bg-light-subtle rounded border fw-bold text-danger-emphasis border-danger text-center my-3 py-1">          
                                <span style={{"position":"relative","bottom":"10px"}}>Credenciales Incorrectas</span>
                                <span className="material-symbols-outlined m-1 fs-2" >report</span>
                            </div>);
        });
    }

    return(
                <div className="d-flex justify-content-center" style={{height: "100vh"}}>                   
                    <form action="/login" method="post" className="m-3 bg-body-tertiary p-4 rounded  align-self-center">
                        <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="pb-2 pt-3 logo-login"/>
                        <p className="text-center"><span className="h4 text-dark-emphasis" >Registrar Administrador</span></p>
                        {mensajeError}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleEmailChange}/>
                            <div id="emailHelp" className="form-text">Ej. carnet@tiendaluisito.com</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password1" value={contrasena} onChange={handlePasswordlChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="password2" value={contrasena2} onChange={handlePasswordlChange2}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="recordar-contrasena"/>
                            <label className="form-check-label" htmlFor="recordar-contrasena">Recordar Contraseña</label>
                        </div>
                        <div>
                            <button
                            disabled={!((contrasena===contrasena2)&&(contrasena!=="")&&(contrasena2!=="")&&(email!==""))}
                             type="button" className="btn btn-primary" onClick={iniciarSesion}>Registrar</button>
                        </div>
                    </form>
                </div>
    );
}

export default Config;