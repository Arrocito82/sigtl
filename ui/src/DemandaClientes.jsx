/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Papa from "papaparse";

function DemandaClientes() {
    const [archivo, setArchivo]=useState();
    const [data, setData]=useState();
// Verificar datos del archivo cargado
//   const subirArchivo = e => {
//     setArchivo(e[0]);
//     // console.log(e[0]);
//   }

// const onClickHandler = () => {
//   const data = new FormData() ;
//   data.append('archivo', archivo);
//   console.log(data)

//   axios.post("http://localhost:8000/api/upload/", 
//     data,{

//     })
//     .then(res => { // then print response status
//       console.log(res)
//     })
//     .catch(err=>console.log(err)
//     );
    
// 
async function onClickHandler(){
  console.log(data);

  await axios.post("http://localhost:8000/api/save/", data, {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  }
  }).then(res => { // then print response status
    console.log(res)
  });
}
const changeHandler = (event) => {
  console.log(event.target.files[0])
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      console.log(results.data)
      setData(results.data);
    },
  });
};

  return (
    // <div className="App">
    //   <div className="container-sm">
    //     <div className="row justify-content-md-center">
    //       <div className="col-md-auto">
    //         <h1>Demanda de compra de clientes</h1>
    //         <div className="cargar-archivo container text-center mt-5"  >
    //           <div className="row justify-content-md-center">
    //             <img src='excel_icon.png' className="icon-excel"/>
    //             <h5>Seleccione un archivo para cargar.</h5>
    //             <h6>O arrastra y suelte aquí.</h6>
    //           </div>
    //           <input className="entrada" type="file" name='files'onChange={(e)=>subirArchivo(e.target.files)}/>
    //         </div>
    //             {archivo &&
    //               <>
    //                 <div className="row justify-content-md-center archivo-cargado bg-primary-subtle border border-primary-subtle rounded-3 mt-5 pt-3">
    //                     <div className="col-md-auto">
    //                     <img src='excel_icon.png' className="icon-excel"/>
    //                     </div>
    //                     <div className="col-md-auto pt-2">
    //                     <h5>{archivo && `${archivo.name}`}</h5>
    //                     </div>
    //                     <div className="col-md-auto">
    //                     <button type="button" className="btn btn-success" onClick={(e)=>onClickHandler()}>Validar</button>
    //                     </div>
    //                     <div className="col-md-auto">
    //                     <button type="button" className="btn btn-danger" onClick={(e)=>subirArchivo(null)}>Eliminar</button>
    //                     </div>
    //                 </div>
    //                 </>
    //             }
    //       </div>
    //     </div>      
    //   </div>
    // </div>
    <form method="post" action="http://localhost:8000/api/upload/" id="cargarArchivo">
      <input type="file" name="file" accept=".csv" id="file" onChange={changeHandler}/>
      <button type="button" onClick={()=>onClickHandler()} id="enviarArchivo">Enviar</button>
    </form>
  );
}

export default DemandaClientes;