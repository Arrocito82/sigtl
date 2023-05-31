/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import {ProgressBar,Toast, ToastContainer} from 'react-bootstrap';

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
  setShowTable(true);
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
        {showTable && 
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
              <tr className="table-info">
                <th>xxxx</th>
                <th>xxxx</th>
                <th>xx/xx/xxxx</th>
                <th>xxxxxxxxxxxxxx</th>
                <th>xxxx</th>
                <th>
                  <button type="button" className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className='btn btn-light btn-sm' style={{background:'none', border:'none'}}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        }
      </div>
  </div>
);
}

export default CargarDatosProductosDanados;