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

function CargarDatosProductosDanados() {
  const [archivo, setArchivo]=useState();
  const [data, setData]=useState();
  //Barra de progreso
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  // Spinner
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [showTable, setShowTable] = useState(false);
  // Tabla
  const [posts, setPosts] = useState({productos:[]});
  //Paginacion
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(posts.productos.length / itemsPerPage); // Total number of pages
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id_productoDanado:'',
    id_producto_id:'',
    fecha_registro:'',
    detalle:'',
    cantidad:''
  });

// Mensaje de alerta
const MySwal = withReactContent(Swal);

const seleccionarProducto = (producto) => {
  setProductoSeleccionado(producto);
}
const handleChange=(evt)=> {
  const {name, value} = evt.target;
  setProductoSeleccionado((productoSeleccionado)=>({
    ...productoSeleccionado,
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
// Editar producto
const editarProducto=()=>{
  var newProducto= posts.productos;
  newProducto.forEach(pro=>{
    if(pro.id_productoDanado===productoSeleccionado.id_productoDanado){
      pro.fecha_registro=productoSeleccionado.fecha_registro;
      pro.detalle=productoSeleccionado.detalle;
      pro.cantidad=productoSeleccionado.cantidad;
    }
  });
  setPosts({productos:newProducto});
  MySwal.fire({
    title:'Producto editado con exito.',
    icon:'success'
  });
  document.getElementById("btn-cerrar").click();
}
//Eliminar producto
const eliminarProducto=(id)=>{
  MySwal.fire({
    title: '¿Está seguro de eliminar el movimiento?',
    icon:'question',
    showCancelButton:true, confirmButtonText:'Sí, eliminar', cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      setPosts({productos:posts.productos.filter(pro=>pro.id_productoDanado!==id)});
    }else{
      MySwal.fire({
        title:'Producto no eliminado',
        icon:'info'
      });
    }
  });
}

async function onClickHandler(){
// console.log(data);
// Iniciar la validación de los datos
setLoadingSpinner(true);
await axios.post(process.env.REACT_APP_DJANGO_HOST+"/api/valProdDan/", data, {
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
// Funcion para guardar los productos
async function Guardar(){
  await axios.post(process.env.REACT_APP_DJANGO_HOST+"/api/saveProdDan/", posts.productos, {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  },
}).then(res => { // then print response status
  console.log(posts.productos);
  if(res.valido===true){
    MySwal.fire({
      title:'Productos dañados guardados con exito.',
      icon:'success'
    });
  }else{
    MySwal.fire({
      title:'Verifique que los datos sean correctos.',
      icon:'error'
    });
  }
  setPosts({productos:res.data});

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
          {posts.productos &&
          <>
          <table className="table table-striped table-hover">
            <thead>
              <tr className='text-center'>
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
                  <tr className='text-center' key={prod.id_producto}>
                      <th>{prod.id_productoDanado}</th>
                      <th>{prod.id_producto_id}</th>
                      <th>{moment(prod.fecha_registro).format('YYYY/MM/DD')}</th>
                      <th>{prod.detalle}</th>
                      <th>{prod.cantidad}</th>
                      <th>
                        <div className="btn-group">
                            <button type="button" className="btn btn-light pt-1 pb-0.5" style={{ background: 'none', border: 'none' }} data-bs-toggle="dropdown" aria-expanded="false">
                              <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item">
                                <button type="button" className='btn btn-light btn-sm' onClick={()=> seleccionarProducto(prod)} data-bs-toggle='modal' data-bs-target='#modalProducto' style={{ background: 'none', border: 'none' }}>
                                  <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>edit</span>
                                  <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Editar</a>
                                </button>
                              </a></li>
                              <li><a className="dropdown-item">
                                <button type="button" className='btn btn-light btn-sm' onClick={()=>eliminarProducto(prod.id_productoDanado)} style={{ background: 'none', border: 'none' }}>
                                  <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>delete</span>
                                  <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Eliminar</a>
                                </button>
                              </a></li>
                            </ul>
                        </div>
                      </th>
                    </tr>
                ):(
                  // muestra productos invalidos
                  <tr className='text-center' key={prod.id_producto}>
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
                      <th>{moment(prod.fecha_registro).format('YYYY/MM/DD')}
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
                              <button type="button" className="btn btn-light pt-1 pb-0.5" style={{ background: 'none', border: 'none' }} data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="material-symbols-outlined">more_horiz</span>
                              </button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item">
                                  <button type="button" className='btn btn-light btn-sm' onClick={()=> seleccionarProducto(prod)} data-bs-toggle='modal' data-bs-target='#modalProducto' style={{ background: 'none', border: 'none' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '25px' }}>edit</span>
                                    <a style={{ fontSize: '16px', paddingLeft: '8px', paddingBottom: '10px' }}>Editar</a>
                                  </button>
                                </a></li>
                                <li><a className="dropdown-item">
                                  <button type="button" className='btn btn-light btn-sm' onClick={()=>eliminarProducto(prod.id_productoDanado)} style={{ background: 'none', border: 'none' }}>
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
      {/* Modal para editar el producto */}
      <div id='modalProducto' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>Editar Producto dañado</h3>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div class="mb-3">
                <label class="form-label">Id Producto Dañado</label>
                <input className='form-control' type='number' name='id_productoDanado' readOnly
                value={productoSeleccionado.id_productoDanado}
                onChange={handleChange} />
                <label class="form-label">Id Producto</label>
                <input className='form-control' type='number' name='id_producto_id' readOnly
                value={productoSeleccionado && productoSeleccionado.id_producto_id}
                onChange={handleChange} />
                <label class="form-label">Fecha de registro</label>
                <input className='form-control' type='date' name='fecha_registro' 
                value={productoSeleccionado && moment(productoSeleccionado.fecha_registro).format('YYYY-MM-DD')}
                onChange={handleChange}/>
                <label class="form-label">Detalle</label>
                <input className='form-control' type='text' name='detalle' 
                value={productoSeleccionado && productoSeleccionado.detalle}
                onChange={handleChange}/>
                <label class="form-label">Cantidad</label>
                <input className='form-control' type='number' name='cantidad' 
                value={productoSeleccionado && productoSeleccionado.cantidad}
                onChange={handleChange}/>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' id='btn-cerrar' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-success' onClick={()=>editarProducto()} >Guardar</button>
            </div>
          </div>
        </div>
      </div>
  </div>
);
}

export default CargarDatosProductosDanados;