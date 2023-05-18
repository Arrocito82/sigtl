import React, { useEffect, useState } from 'react';
import SigService from './SigService';


function App() {
  const sigService = new SigService();
  const [msg, setMsg] = useState("");
  async function cargarMsg(){
    sigService.getMsg().then(function (data) {
      setMsg(data.Msg)
      // console.log(data.Msg);
    });
  }
  useEffect(()=>{cargarMsg()});
  return (
    <div>
      <h1>
        Mensaje: {msg}
      </h1>
      <button onClick={cargarMsg} >Cargar Mensaje</button>
    </div>
  );
}

export default App;
