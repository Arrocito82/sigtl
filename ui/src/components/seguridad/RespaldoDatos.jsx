import { useState } from "react";
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function RespaldoDatos() {
    const [estadoRespaldo, setEstadoRespaldo]=useState("No hay respaldo de datos");
    const [fecha, setFecha]=useState("-");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    
    // Mensaje de alerta
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const [archivo, setArchivo]=useState();
    const [progress, setProgress] = useState(0);

    // Eliminar archivo
    const eliminarArchivo = e => {
        setArchivo(e);
        setLoadingSpinner(false);
        MySwal.fire({
            title: 'Archivo ELiminado',
            icon:'success'
        });
        }

    async function crearRespaldo(){
        setLoadingSpinner(true);
        await axios.get("http://127.0.0.1:8000/api/crearRespaldoDatos/", {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
        },
        }).then(res => { // then print response status
        // Simular un retardo para mostrar el spinner
        // console.log(res);
        setEstadoRespaldo(res.data.mensaje);
        setFecha(res.data.fecha);
        setTimeout(() => {
            setLoadingSpinner(false);
            }, 1000);
        });
    }
    async function descargarRespaldo(){
        window.open("http://127.0.0.1:8000/api/descargarRespaldoDatos/", "_top", "noreferrer");
        const current = new Date();
        const time = current.toLocaleString("es-es");
        setEstadoRespaldo("Respaldo de datos descargados con éxito.");
        setFecha(time);
    }
    async function onClickHandler(){
        const current = new Date();
        const time = current.toLocaleString("es-es");
        // console.log(data);
        // Iniciar la validación de los datos
        setLoadingSpinner(true);
        // Simular un retardo para mostrar el spinner
        setTimeout(() => {
          setLoadingSpinner(false);
        }, 1000);
        setEstadoRespaldo("Respaldo de datos cargado con éxito.");
        setFecha(time);
    }

    const changeHandler = (event) => {
        setArchivo(event.target.files[0]);
        // console.log(event.target.files[0]);
        // Papa.parse(event.target.files[0], {
        //   header: true,
        //   skipEmptyLines: true,
        //   complete: function (results) {
        //     setData(results.data);
        //   },
        // });
        const file = event.target.files[0];
          
          // Iniciar la carga del archivo
          setLoading(true);
      
          const reader = new FileReader();
      
          reader.onloadend = () => {
            // Simular un retardo para mostrar la barra de progreso
            setTimeout(() => {
              setLoading(false);
              setProgress(0);
            }, 1000);
          };
      
          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const porcentaje = Math.round((event.loaded * 100) / event.total);
              setProgress(porcentaje);
            }
          };
          reader.readAsText(file);
    };
    return(
        <div className="d-flex container flex-column">
            {loadingSpinner && 
            (<div className="row justify-content-md-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>)}
                <div className="d-flex justify-content-center flex-column ">
                    <div className="w-50 m-auto">
                        <h2 className="text-center">Respaldo de Datos</h2>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>        
                                <tr>
                                    <td>{fecha}</td>
                                    <td>{estadoRespaldo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="m-auto my-3">
                            <button className="btn btn-outline-secondary mx-1" onClick={crearRespaldo}>Crear Respaldo de Datos</button>
                            <button className="btn btn-outline-primary mx-1" onClick={descargarRespaldo}>Descargar Respaldo de Datos</button>
                    </div>
                    <div className="m-auto my-3">
                        <h5 className="text-center">Cargar Respaldo de Datos</h5>
                        <div className="cargar-archivo container text-center">
                                {archivo ?
                                <>
                                    <div className="row justify-content-md-center archivo-cargado bg-primary-subtle border border-primary-subtle rounded-3 m-6 pb-3 pt-3">
                                        <div className="col-md-auto">
                                        <img src='excel_icon.png' className="icon-excel"/>
                                        </div>
                                        <div className="col-md-auto pt-2 ">
                                        <h5>{archivo && `${archivo.name}`}</h5>
                                        {loading ? (
                                            <>
                                            <ProgressBar now={progress} label={`${progress}%`} animated />
                                            <span>{Math.round(archivo.size/1000)} Kb</span>
                                            </>
                                            ):
                                            <><div className="row justify-content-around">
                                                <div className="col-md-auto">
                                                    <button type="button" className="btn btn-success" onClick={() => onClickHandler()}>Cargar</button>
                                                </div><div className="col-md-auto">
                                                    <button type="button" className="btn btn-danger" onClick={(e) => eliminarArchivo(null)}>Eliminar</button>
                                                </div>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    </>
                                    :
                                    <><div className="row justify-content-md-center">
                                        <img src='zip-file-format.png' style={{ width: '4rem'}} />
                                        <h5>Seleccione un archivo para cargar.</h5>
                                        <h6>O arrastra y suelte aquí.</h6>
                                    </div><input className="entrada" type="file" accept=".zip" name='files' onChange={changeHandler}/>
                                    </>
                                }
                            </div>
                    </div>
                </div>                
        </div>
        );
}
export default RespaldoDatos;