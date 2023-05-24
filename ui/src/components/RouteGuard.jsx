import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../navbar/Nav';
import Menu from '../navbar/Menu';
import IniciarSesion from '../seguridad/IniciarSesion';

const RouteGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
   }
 
   return (
       <Route {...rest}
           render={props => (
               hasJWT() ?
                    <div>
                        <header className=' bg-body-tertiary'>        
                            <Nav/>
                            <Menu/>
                        </header>
                        <Component {...props} />               
                    </div>
                   :
                   <IniciarSesion/>
           )}
       />
   );
};
 
export default RouteGuard;