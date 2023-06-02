/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import {ProgressBar,Toast, ToastContainer} from 'react-bootstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

function CargarDatosProductosDanados() {
  const [archivo, setArchivo]=useState();
  const [data, setData]=useState();
  //Barra de progreso
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  //Toast
  const [show, setShow] = useState(false);
  // Spinner
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [showTable, setShowTable] = useState(false);
  // Tabla
  const [posts, setPosts] = useState({productos:[]});
  //Paginacion
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(posts.productos.length / itemsPerPage); // Total number of pages


// Eliminar archivo
const eliminarArchivo = e => {
  setArchivo(e);
  setShow(true);
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
  setPosts({productos:res.data});
  setShowTable(true);
  setCurrentPage(0);
  console.log(res);
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
const currentPageItems = posts.productos.slice(offset, offset + itemsPerPage);

return (
  <div className="App">
    <div className="container-sm">
      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
          <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header className="bg-success">
                <span className="material-symbols-outlined rounded me-2">check_circle</span>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body style={{textAlign:'center'}}>El archivo ha sido eliminado.</Toast.Body>
          </Toast>
      </ToastContainer>
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h1 className="text-center">Cargar CSV Productos dañados</h1>
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
          <>

          </>}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>id_productoDanado</th>
                <th>id_producto</th>
                <th>fecha_registro</th>
                <th>detalle</th>
                <th>cantidad</th>
                <th>acción</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((prod) =>(
                prod.valido ?(
                  // muestra productos validos
                  <tr className='text-center' key={prod.id_movimiento}>
                      <th>{prod.id_productoDanado}</th>
                      <th>{prod.id_producto_id}</th>
                      <th>{moment(prod.fecha_registro).format("DD/MM/YYYY")}</th>
                      <th>{prod.detalle}</th>
                      <th>{prod.cantidad}</th>
                      <th>
                          <div className="btn-group">
                            <button type="button" className="btn btn-light pt-1 pb-0.5" style={{background:'none', border:'none'}} data-bs-toggle="dropdown" aria-expanded="false">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" >
                                <button type="button" className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                                  <span className="material-symbols-outlined" style={{fontSize:'25px'}}>edit</span>
                                  <a style={{fontSize:'16px', paddingLeft:'8px', paddingBottom:'10px'}}>Editar</a>
                                </button>
                              </a></li>
                              <li><a className="dropdown-item" >
                                <button type="button" className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                                  <span className="material-symbols-outlined" style={{fontSize:'25px'}} >delete</span>
                                  <a style={{fontSize:'16px', paddingLeft:'8px', paddingBottom:'10px'}}>Eliminar</a>
                                </button>
                              </a></li>
                            </ul>
                          </div>
                      </th>
                    </tr>
                ):(
                  // muestra productos invalidos
                  <tr className='text-center' key={prod.id_movimiento}>
                      <th>{prod.id_productoDanado}
                        {
                          prod.errores.id_productoDanado && (
                            <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                              <span class="material-symbols-outlined">error</span>
                              <div>
                                {prod.errores.id_productoDanado}
                              </div>
                            </div>
                          )
                        }
                      </th>
                      <th>{prod.id_producto_id}
                        {
                          prod.errores.id_producto_id && (
                            <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                              <span class="material-symbols-outlined">error</span>
                              <div>
                                {prod.errores.id_producto_id}
                              </div>
                            </div>
                          )
                        }
                      </th>
                      <th>{moment(prod.fecha_registro).format("DD/MM/YYYY")}
                        {
                          prod.errores.fecha_registro && (
                            <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                              <span class="material-symbols-outlined">error</span>
                              <div>
                                {prod.errores.fecha_registro}
                              </div>
                            </div>
                          )
                        }
                      </th>
                      <th>{prod.detalle}
                        {
                          prod.errores.detalle && (
                            <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                              <span class="material-symbols-outlined">error</span>
                              <div>
                                {prod.errores.detalle}
                              </div>
                            </div>
                          )
                        }
                      </th>
                      <th>{prod.cantidad}
                        {
                          prod.errores.cantidad && (
                            <div className="alert alert-danger d-flex align-items-center p-1 fs-6" role="alert">
                              <span class="material-symbols-outlined">error</span>
                              <div>
                                {prod.errores.cantidad}
                              </div>
                            </div>
                          )
                        }
                      </th>
                      <th>
                          <div className="btn-group">
                            <button type="button" className="btn btn-light pt-1 pb-0.5" style={{background:'none', border:'none'}} data-bs-toggle="dropdown" aria-expanded="false">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" >
                                <button type="button" className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                                  <span className="material-symbols-outlined" style={{fontSize:'25px'}}>edit</span>
                                  <a style={{fontSize:'16px', paddingLeft:'8px', paddingBottom:'10px'}}>Editar</a>
                                </button>
                              </a></li>
                              <li><a className="dropdown-item" >
                                <button type="button" className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                                  <span className="material-symbols-outlined" style={{fontSize:'25px'}} >delete</span>
                                  <a style={{fontSize:'16px', paddingLeft:'8px', paddingBottom:'10px'}}>Eliminar</a>
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
                  <button type="button" class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </div>
        </>
        }
      </div>
  </div>
);
}

export default CargarDatosProductosDanados;