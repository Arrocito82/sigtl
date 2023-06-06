import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../navbar/Nav';
import MenuTactico from '../navbar/MenuTactico';
import MenuEstrategico from '../navbar/MenuEstrategico';
import IniciarSesion from '../seguridad/IniciarSesion';
import Config from '../seguridad/config';
import MenuSeguridad from '../navbar/menuSeguridad';

const RouteGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;

       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag;
    }
    function isAdmin() {
       let isAdmin = false;
       isAdmin=JSON.parse(localStorage.getItem("isAdmin"));
    //    console.log(isAdmin);
       return isAdmin;
    }
    function getMenu() {
        let rol=localStorage.getItem("rol");
        let menu;
        switch (rol) {
            case "tactico":
                menu=<MenuTactico/>;
                break;
            case "estrategico":
                menu=<MenuEstrategico/>
                break;
            case "admin":
                menu=<MenuSeguridad/>
                break;
            default:
                menu=null;
                break;
        }
        return menu;
    }
    function isConfigured() {
        let isConfigured=false;
        isConfigured=JSON.parse(localStorage.getItem("isConfigured"));
        // console.log(isConfigured);
        return isConfigured;
    }
   if (!isConfigured()) {
        return (
        <Route {...rest}
            render={props =>(<Config/>)}
        />
    );
   }else if(hasJWT()){
            let menuAsignado=getMenu();
            return(
                <Route {...rest}
                render={props => (
                            <div>
                                <header className='bg-body-tertiary'>        
                                    <Nav/>
                                    {menuAsignado}
                                </header>
                                <Component {...props} />               
                            </div>
                        )}/>
            );
       
   }else{
    return (
        <Route {...rest}
            render={props => (<IniciarSesion/>)}
        />
    );
   }
   
};
 
export default RouteGuard;