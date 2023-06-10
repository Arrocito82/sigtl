import { useState } from "react";
import axios from 'axios';
import { setAuthToken } from "../../seguridad/setAuthToken";

function Config() {
    const [mensajeError, setMensajeError]=useState();
    const [contrasena, setContrasena]=useState("");
    const [contrasena2, setContrasena2]=useState("");
    const [email, setEmail]=useState("");
    const [nombre, setNombre]=useState("");
    const [apellidos, setApellidos]=useState("");
    const [nombreUsuario, setNombreUsuario]=useState("");

    function handleNombreUsuarioChange(event) {
        setNombreUsuario(event.target.value);    
    }

    function handleApellidosChange(event) {
        setApellidos(event.target.value);
    }

    function handleNombreChange(event) {
        setNombre(event.target.value);
    }

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
            'username':nombreUsuario,
            'email': email,
            'nombre':nombre,
            'apellidos':apellidos
        }
        await axios.post("https://sigtl.herokuapp.com"+"/auth/register-admin", data, {
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
            const username=response.data.username;
            
            //set JWT token to local
            localStorage.setItem("token", token);
            localStorage.setItem("isConfigured", isConfigured);
            localStorage.setItem("isAdmin", isAdmin);
            localStorage.setItem("username", username);
            localStorage.setItem("rol", rol);
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
                                <span style={{"position":"relative","bottom":"10px"}}>{error.response.data}</span>
                                <span className="material-symbols-outlined m-1 fs-2" >report</span>
                            </div>);
        });
    }

    return(
                <div className="d-flex justify-content-center" >                   
                    <form action="/login" method="post" className="bg-body-tertiary p-4 rounded  align-self-center w-75">
                        <div className="row justify-content-center">
                            <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="pb-2 pt-3 logo-login"/>
                            <p className="text-center">
                                <span className="h4 text-dark-emphasis" >Registrar Administrador</span>
                            </p>
                            {mensajeError}
                        </div>
                        <div className="col">
                            <div className="row">

                                <div className="col mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" value={nombre} onChange={handleNombreChange}/>
                                    <div id="nombreHelp" className="form-text">Ej. Walberto Jacinto</div>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id="apellidos" aria-describedby="apellidosHelp" value={apellidos} onChange={handleApellidosChange}/>
                                    <div id="apellidosHelp" className="form-text">Ej. Partida Lozada</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleEmailChange}/>
                                    <div id="emailHelp" className="form-text">Ej. carnet@tiendaluisito.com</div>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
                                    <input type="nombreUsuario" className="form-control" id="nombreUsuario" aria-describedby="nombreUsuarioHelp" value={nombreUsuario} onChange={handleNombreUsuarioChange}/>
                                    <div id="nombreUsuarioHelp" className="form-text">Ej. JK1025</div>
                                </div>
                            </div>
                            <div className="row">                            
                                <div className="col mb-3">
                                    <label htmlFor="password1" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password1" value={contrasena} onChange={handlePasswordlChange}/>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="password2" className="form-label">Confirmar Contraseña</label>
                                    <input type="password" className="form-control" id="password2" value={contrasena2} onChange={handlePasswordlChange2}/>
                                </div>
                            </div>
                            <div className="row mb-3 mx-0 ">
                                <div className="col mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="recordar-contrasena"/>
                                    <label className="form-check-label" htmlFor="recordar-contrasena">Recordar Contraseña</label>
                                </div>
                                <div className="px-0 col text-end">
                                    <button
                                    disabled={!((contrasena===contrasena2)&&(contrasena!=="")&&(contrasena2!=="")&&(email!==""))}
                                    type="button" className="btn btn-primary px-3" onClick={iniciarSesion}>Registrar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
    );
}

export default Config;