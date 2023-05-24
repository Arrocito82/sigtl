/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
function IngresosCostos() {
    const [archivo, setArchivo]=useState(null);
    // Verificar datos del archivo cargado
      const subirArchivo = e => {
        setArchivo(e);
      }
    
      return (
        <div classNameName="App">
          <div className="container-sm">
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <h1 className="text-center">Ingresos y Costos trimestrales</h1>
                <div className="cargar-archivo container text-center mt-5"  >
                  <div className="row justify-content-md-center">
                    <img src='excel_icon.png' className="icon-excel"/>
                    <h5>Seleccione un archivo para cargar.</h5>
                    <h6>O arrastra y suelte aquí.</h6>
                  </div>
                  <input className="entrada" type="file" name='files' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(e)=>subirArchivo(e.target.files)}/>
                </div>
                    {archivo &&
                      <>
                        <div className="row justify-content-md-center archivo-cargado bg-primary-subtle border border-primary-subtle rounded-3 mt-5 pt-3">
                            <div className="col-md-auto">
                            <img img src='excel_icon.png' className="icon-excel"/>
                            </div>
                            <div className="col-md-auto pt-2">
                            <h5>{archivo && `${archivo[0].name}`}</h5>
                            </div>
                            <div className="col-md-auto">
                            <button type="button" className="btn btn-success">Validar</button>
                            </div>
                            <div className="col-md-auto">
                            <button type="button" className="btn btn-danger" onClick={(e)=>subirArchivo(null)}>Eliminar</button>
                            </div>
                        </div>
                        </>
                    }
              </div>
            </div>      
          </div>
        </div>
      );
}

export default IngresosCostos;