import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../navbar/Nav';
import Menu from '../navbar/Menu';
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
       isAdmin=localStorage.getItem("isAdmin")
       console.log(isAdmin);
       return isAdmin;
    }
    function isConfigured() {
        let isConfigured=false;
        isConfigured=localStorage.getItem("isConfigured");
        console.log(isConfigured);
        return isConfigured;
    }
   if (!isConfigured()) {
        return (
        <Route {...rest}
            render={props =>(<Config/>)}
        />
    );
   }else if(hasJWT()){
            return(
                <Route {...rest}
                render={props => (
                            <div>
                                <header className='bg-body-tertiary'>        
                                    <Nav/>
                                    {isAdmin()===true?<MenuSeguridad/>:<Menu/>}
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