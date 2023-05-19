import { useState } from 'react';
import App from './App';
import IniciarSesion from './seguridad/IniciarSesion';

function Contenido(){
    const [token, setToken]=useState();
    function guardarToken(tokenTemporal) {
        setToken(tokenTemporal);
    }
    function removerToken() {
        setToken();
    }
    if(!token){
        return(<IniciarSesion setToken={guardarToken}/>);
    }else{
        return(<App cerrarSesion={removerToken}/>);
    }
}
export default Contenido;