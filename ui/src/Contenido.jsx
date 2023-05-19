import { useState } from 'react';
import App from './App';
import IniciarSesion from './seguridad/IniciarSesion';

function Contenido(){
    const [token, setToken]=useState();

    function guardarToken(token) {
        setToken(token);
    }

    if(!token){
        return(<IniciarSesion setToken={guardarToken}/>);
    }else{
        return(<App/>);
    }
}
export default Contenido;