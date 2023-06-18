import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function Config() {
    const [mensajeError, setMensajeError]=useState();
    const [email, setEmail]=useState("");
    const [nombre, setNombre]=useState("");
    const [apellidos, setApellidos]=useState("");
    const [nombreUsuario, setNombreUsuario]=useState("");
    const [rol, setRol]=useState("");

    // Mensaje de alerta
    const MySwal = withReactContent(Swal);

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
    function handleRolChange(event) {
        setRol(event.target.value);
    }
    async function iniciarSesion() {
        // función para iniciar sesion que retorna un token
        setMensajeError();
        let data={
            'rol':rol,
            'username':nombreUsuario,
            'email': email,
            'nombre':nombre,
            'apellidos':apellidos
        }
        await axios.post(process.env.REACT_APP_DJANGO_HOST+"/auth/register-usuario", data, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
        }).then(response => { // then print response status
            MySwal.fire({
                title: response.data.mensaje,
                icon:'success'
            }).then((result)=>{
                if(result.isConfirmed){
                    //redirect user to home page
                    window.location.href = '/usuarios'
                }
            });
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
                <div className="d-flex justify-content-center mt-3" >                   
                    <form action="/login" method="post" className="bg-body-tertiary p-4 rounded  align-self-center w-75">
                        <div className="row justify-content-center">
                            <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="pb-2 pt-3 logo-login"/>
                            <p className="text-center">
                                <span className="h4 text-dark-emphasis" >Registrar Usuario</span>
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
                                    <label htmlFor="rol" className="form-label">Rol</label>
                                    <select value={rol} id="rol" name="rol" class="form-select" aria-label="Seleccionar Rol" onChange={handleRolChange}>
                                        <option selected>Seleccionar Rol</option>
                                        <option value="admin">Administrador</option>
                                        <option value="tactico">Táctico</option>
                                        <option value="estrategico">Estratégico</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3 mx-0 ">
                                <div className="px-0 col text-end">
                                    <button
                                    disabled={!((rol!=="")&&(email!==""))}
                                    type="button" className="btn btn-primary px-3" onClick={iniciarSesion}>Registrar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
    );
}

export default Config;