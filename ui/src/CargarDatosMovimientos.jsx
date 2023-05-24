/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import React, { useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import {ProgressBar} from 'react-bootstrap';

function CargarDatosMovimientos() {
    const [archivo, setArchivo]=useState();
    const [data, setData]=useState();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
// Verificar datos del archivo cargado
  const subirArchivo = e => {
    setArchivo(e);
    // console.log(e[0]);
  }

async function onClickHandler(){
  // console.log(data);

  await axios.post("http://localhost:8000/api/save/", data, {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  },
}).then(res => { // then print response status
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
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1 className="text-center">Cargar CSV Movimientos</h1>
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
                                    <button type="button" className="btn btn-danger" onClick={(e) => subirArchivo(null)}>Eliminar</button>
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
    </div>
  );
}

export default CargarDatosMovimientos;