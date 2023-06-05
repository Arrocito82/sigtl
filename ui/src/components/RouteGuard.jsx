import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../navbar/Nav';
import Menu from '../navbar/Menu';
import IniciarSesion from '../seguridad/IniciarSesion';
import Config from '../seguridad/config';

const RouteGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
    }
    function isConfig() {
        let isConfig=false;
        localStorage.getItem("isConfig") ? isConfig=true : isConfig=false
        console.log(isConfig);
        return isConfig
   }
   if (!isConfig()) {
        return (
        <Route {...rest}
            render={props =>(<Config/>)}
        />
    );
   }else if(hasJWT()){
        return (
            <Route {...rest}
                render={props => (
                            <div>
                                <header className=' bg-body-tertiary'>        
                                    <Nav/>
                                    <Menu/>
                                </header>
                                <Component {...props} />               
                            </div>
                )}
            />
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