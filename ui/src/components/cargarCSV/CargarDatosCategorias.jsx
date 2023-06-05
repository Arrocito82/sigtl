/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import {ProgressBar} from 'react-bootstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'


function CargarDatosCategorias() {
    const [archivo, setArchivo]=useState();
    const [data, setData]=useState();
    //Barra de progreso
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    // Spinner
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showTable, setShowTable] = useState(false);
    // Tabla
    const [posts, setPosts] = useState({movimientos:[]});
    //Paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of items to display per page
    const pageCount = Math.ceil(posts.movimientos.length / itemsPerPage); // Total number of pages
    const [movimientoSeleccionado, setMovimientoSeleccionado] = useState({
      id_movimiento:'',
      id_sucursal_id:'',
      id_producto_id:'',
      fecha_registro:'',
      detalle:'',
      valorUnitario:'',
      cantidad:'',
      total:'',
      tipo:''
    });

    // Mensaje de alerta
    const MySwal = withReactContent(Swal);
    
    const seleccionarMovimiento = (movimiento) => {
      setMovimientoSeleccionado(movimiento);
    }
    const handleChange=(evt)=> {
      const {name, value} = evt.target;
      setMovimientoSeleccionado((movimientoSeleccionado)=>({
        ...movimientoSeleccionado,
        [name]: value
      }))
    }
    
    // Eliminar archivo
    const eliminarArchivo = e => {
      setArchivo(e);
      setShowTable(false);
      setLoadingSpinner(false);
      MySwal.fire({
        title: 'Archivo ELiminado',
        icon:'success'
      });
    }
    // Editar movimiento
    const editarMovimiento=()=>{
      var newMovimiento= posts.movimientos;
      newMovimiento.forEach(mov=>{
        if(mov.id_movimiento===movimientoSeleccionado.id_movimiento){
          mov.fecha_registro=movimientoSeleccionado.fecha_registro;
          mov.detalle=movimientoSeleccionado.detalle;
          mov.valorUnitario=movimientoSeleccionado.valorUnitario;
          mov.cantidad=movimientoSeleccionado.cantidad;
          mov.total=movimientoSeleccionado.total;
          mov.tipo=movimientoSeleccionado.tipo;
        }
      });
      setPosts({movimientos:newMovimiento});
      MySwal.fire({
        title:'Movimiento editado con exito.',
        icon:'success'
      });
      document.getElementById("btn-cerrar").click();
    }

    // Eliminar movimiento
    const eliminarMovimiento=(id)=>{
      MySwal.fire({
        title: '¿Está seguro de eliminar el movimiento?',
        icon:'question',
        showCancelButton:true, confirmButtonText:'Sí, eliminar', cancelButtonText:'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          setPosts({movimientos:posts.movimientos.filter(mov=>mov.id_movimiento!==id)});
        }else{
          MySwal.fire({
            title:'Movimiento no eliminado',
            icon:'info'
          });
        }
      });
    }

async function onClickHandler(){
  // console.log(data);
  // Iniciar la validación de los datos
  setLoadingSpinner(true);
  await axios.post("http://localhost:8000/api/save/", data, {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  },
}).then(res => { // then print response status
  // Simular un retardo para mostrar el spinner
  setTimeout(() => {
    setLoadingSpinner(false);
  }, 1000);
  setPosts({movimientos:res.data});
  setShowTable(true);
  setCurrentPage(0);
  console.log(res.data);
});
}
// Función para guardar los movimientos
async function Guardar(){
  console.log(posts.movimientos);
  await axios.post("http://localhost:8000/api/saveMovimientos/", posts.movimientos, {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  },
}).then(res => { // then print response status
  console.log(res.data)
  if(res.valido===true){
    MySwal.fire({
      title:'Movimientos guardados con exito.',
      icon:'success'
    });
  }else{
    MySwal.fire({
      title:'Verifique que los datos sean correctos.',
      icon:'error'
    });
  }
  setPosts({movimientos:res.data});
});
}

const changeHandler = (event) => {
  setArchivo(event.target.files[0]);
  // console.log(event.target.files[0]);
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setData(results.data);
    },
  });
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
const offset = currentPage * itemsPerPage;
const currentPageItems = posts.movimientos.slice(offset, offset + itemsPerPage);



  return (
    <div className="App">
      <div className="container-sm">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1 className="text-center">Cargar Categorias</h1>
            <div className="cargar-archivo container text-center mt-5"  >
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
                                    <button type="button" className="btn btn-success" onClick={() => onClickHandler()}>Validar</button>
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
                        <img src='excel_icon.png' className="icon-excel" />
                        <h5>Seleccione un archivo para cargar.</h5>
                        <h6>O arrastra y suelte aquí.</h6>
                      </div><input className="entrada" type="file" accept=".csv" name='files' onChange={changeHandler} />
                      </>
                }
            </div>
          </div>
        </div>      
      </div>
      {/* Tabla para verificar los datos cargados */}
      <div className="container-xl mt-4">
        {loadingSpinner && 
        (<div className="row justify-content-md-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)}
        {showTable && <>
          {posts.movimientos && 
            <><table className="table table-bordered table-hover">
              <thead>
                <tr className='text-center'>
                  <th>id_movimiento</th>
                  <th>id_sucursal</th>
                  <th>id_producto</th>
                  <th>fecha_registro</th>
                  <th>detalle</th>
                  <th>valorUnitario</th>
                  <th>cantidad</th>
                  <th>total</th>
                  <th>tipo</th>
                  <th>acción</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((mov) => (
                  mov.valido ? (
                    // muestra movimientos validos
                    <tr className='text-center ' key={mov.id_movimiento}>
                      <th>{mov.id_movimiento}</th>
                      <th>{mov.id_sucursal_id}</th>
                      <th>{mov.id_producto_id}</th>
                      <th>{moment(mov.fecha_registro).format('YYYY/MM/DD')}</th>
                      <th>{mov.detalle}</th>
                      <th>${mov.valorUnitario}</th>
                      <th>{mov.cantidad}</th>
                      <th>${parseFloat(mov.total).toFixed(2)}</th>
                      <th>{mov.tipo}</th>
                      <th>
                      <div className="btn-group">
                          <button type="button" className="btn btn-light pt-1 pb-0.5" style={{ background: 'none', border: 'none' }} data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="material-symbols-outlined">more_horiz</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item">
                              <button type="button" className='btn btn-light btn-sm' onClick={()=> seleccionarMovimiento(mov)} data-bs-toggle='modal' data-bs-target='#modalMovimientos' style={{ background: 'none', border: 'none' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>edit</span>
                                <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Editar</a>
                              </button>
                            </a></li>
                            <li><a className="dropdown-item">
                              <button type="button" className='btn btn-light btn-sm' onClick={()=>eliminarMovimiento(mov.id_movimiento)} style={{ background: 'none', border: 'none' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>delete</span>
                                <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Eliminar</a>
                              </button>
                            </a></li>
                          </ul>
                      </div>
                      </th>
                    </tr>
                  ) : (
                    //muestra movimientos invalidos
                    <tr className='text-center ' key={mov.id_movimiento}>
                      <th>{mov.id_movimiento}
                        {mov.errores.id_movimiento && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.id_movimiento}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{mov.id_sucursal_id}
                        {mov.errores.id_sucursal_id && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.id_sucursal_id}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{mov.id_producto_id}
                        {mov.errores.id_producto_id && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.id_producto_id}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{moment(mov.fecha_registro).format('YYYY/MM/DD')}
                        {mov.errores.fecha_registro && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.fecha_registro}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{mov.detalle}
                        {mov.errores.detalle && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.detalle}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>${mov.valorUnitario}
                        {mov.errores.valorUnitario && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.valorUnitario}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{mov.cantidad}
                        {mov.errores.cantidad && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.cantidad}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>${parseFloat(mov.total).toFixed(2)}
                        {mov.errores.total && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.total}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>{mov.tipo}
                        {mov.errores.tipo && (
                          <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                            <span className="material-symbols-outlined">error</span>
                            <div>
                              {mov.errores.tipo}
                            </div>
                          </div>
                        )}
                      </th>
                      <th>
                        <div className="btn-group">
                          <button type="button" className="btn btn-light pt-1 pb-0.5" style={{ background: 'none', border: 'none' }} data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="material-symbols-outlined">more_horiz</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item">
                              <button type="button" className='btn btn-light btn-sm' onClick={()=> seleccionarMovimiento(mov)} data-bs-toggle='modal' data-bs-target='#modalMovimientos' style={{ background: 'none', border: 'none' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>edit</span>
                                <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Editar</a>
                              </button>
                            </a></li>
                            <li><a className="dropdown-item">
                              <button type="button" className='btn btn-light btn-sm' onClick={()=>eliminarMovimiento(mov.id_movimiento)} style={{ background: 'none', border: 'none' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>delete</span>
                                <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Eliminar</a>
                              </button>
                            </a></li>
                          </ul>
                        </div>
                      </th>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            <div className='container text-center'>
              <div className="row justify-content-md-center">
                <div className='col-md-auto'>
                  <ReactPaginate
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={({ selected }) => setCurrentPage(selected)}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null} />
                </div>
                <div className='col-md-auto'>
                  <button type="button" class="btn btn-primary" onClick={()=>Guardar()}>Guardar</button>
                </div>
              </div>
            </div>
            </>
          }
        </>
        }
      </div>
      {/* Modal para editar el movimiento */}
      <div id='modalMovimientos' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>Editar movimiento</h3>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className="mb-3">
                <label className="form-label">Id movimiento</label>
                <input className='form-control' type='number' name='id_movimiento' readOnly
                value={movimientoSeleccionado.id_movimiento}
                onChange={handleChange} />
                <label className="form-label">Id sucursal</label>
                <input className='form-control' type='number' name='id_sucursal_id' readOnly
                value={movimientoSeleccionado && movimientoSeleccionado.id_sucursal_id}
                onChange={handleChange} />
                <label className="form-label">Id producto</label>
                <input className='form-control' type='number' name='id_producto_id' readOnly
                value={movimientoSeleccionado && movimientoSeleccionado.id_producto_id}
                onChange={handleChange}/>
                <label className="form-label">Fecha de registro</label>
                <input className='form-control' type='date' name='fecha_registro' 
                value={movimientoSeleccionado && moment(movimientoSeleccionado.fecha_registro).format('YYYY-MM-DD')}
                onChange={handleChange}/>
                <label className="form-label">Detalle</label>
                <input className='form-control' type='text' name='detalle' 
                value={movimientoSeleccionado && movimientoSeleccionado.detalle}
                onChange={handleChange}/>
                <label className="form-label">Valor unitario</label>
                <input className='form-control' type='number' name='valorUnitario' 
                value={movimientoSeleccionado && movimientoSeleccionado.valorUnitario}
                onChange={handleChange}/>
                <label className="form-label">Cantidad</label>
                <input className='form-control' type='number' name='cantidad' 
                value={movimientoSeleccionado && movimientoSeleccionado.cantidad}
                onChange={handleChange}/>
                <label className="form-label">Total</label>
                <input className='form-control' type='number' name='total' 
                value={movimientoSeleccionado && movimientoSeleccionado.total}
                onChange={handleChange}/>
                <label className="form-label">Tipo</label>
                <input className='form-control' type='text' name='tipo' 
                value={movimientoSeleccionado && movimientoSeleccionado.tipo}
                onChange={handleChange}/>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' id='btn-cerrar' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-success' onClick={()=>editarMovimiento()} >Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CargarDatosCategorias;