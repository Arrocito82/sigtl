import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function HistorialUsuarios() {
    const [page, setPage]=useState(1);
    const [totalPages, setTotalPages]=useState(1);
    const [historial, setHistorial]=useState([]);
    async function getAcciones(pageSelected) {
        axios.get(process.env.REACT_APP_DJANGO_HOST+"/auth/historial-usuarios?page="+parseInt(pageSelected), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
        }).then(({data}) => { // then print response status
            setHistorial(data.items);
            setTotalPages(data.count);
            setPage(pageSelected);
            // console.log(data);
        }).catch(error=>{
        });
    };
    useEffect(()=>{
    getAcciones(page);
    },[]);
    return(
        <div style={{textAlign:'center'}}>
            <h2>Historial</h2>
            <table className="table container">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Usuario</th>
                    {/* <th scope="col">Usuario Afectado</th> */}
                    <th scope="col">Registro Afectado</th>
                    <th scope="col">Contexto del Evento</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Descripción</th>
                    {/* <td>Origen</td> */}
                    {/* <td>IP</td> */}
                    </tr>
                </thead>
                <tbody>    
                        {historial.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.fecha}</td>
                                    <td>{item.usuario}</td>
                                    <td><a href={item.registro_afectado}>{item.registro_afectado}</a></td>
                                    <td><a href={item.contexto}>{item.contexto}</a></td>
                                    <td>{item.evento}</td>
                                    <td>{item.descripcion}</td>
                                </tr>
                            );
                        })}
                    </tbody>
            </table>
            <PaginationControl
                page={page}
                between={4}
                total={totalPages}
                limit={10}
                changePage={(pageSelected) => {
                // setPage(page); 
                getAcciones(pageSelected);
                // console.log(page)
                }}
                ellipsis={1}
            />
        </div>
    );
}

export default HistorialUsuarios;