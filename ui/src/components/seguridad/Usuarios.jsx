import axios from 'axios';
import { useEffect, useState } from 'react';
function Usuarios() {
    const [usuarios, setUsuarios]=useState([]);
    function getUsuarios() {
        axios.get(process.env.REACT_APP_DJANGO_HOST+"/auth/usuarios", {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
        }).then(({data}) => { // then print response status
            setUsuarios(data);
        }).catch(error=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }
        });
    }
    useEffect(()=>{
        getUsuarios();
    },[]);
    

    return(
        <div className="container" style={{textAlign:'center'}}>
            <h2>Usuarios</h2>
            <div className="row text-end">
                <div className="col">
                    <a className="btn btn-outline-success" href="/registrar-usuario">Registrar Usuario</a>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Activo</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {usuarios.map(usuario => {
                            return (
                                <tr key={usuario.usuario}>
                                    <td>{usuario.usuario}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellidos}</td>
                                    <td>{usuario.rol}</td>
                                    <td>{usuario.is_active}</td>
                                    <td>{usuario.fecha_creacion}</td>
                                    <td><button className='btn btn-outline-primary'>Editar</button></td>
                                    <td><button className='btn btn-outline-danger'>Eliminar</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;