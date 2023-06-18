import React from 'react';
import { Route } from 'react-router-dom';
import { setAuthToken } from "./setAuthToken";
import axios from 'axios';

const RouteGuard = ({ component: Component, ...rest }) => {
    
    function isLoggedIn() {
        if (localStorage.getItem("token")) {
           return true;
        }else{
            return false;
        }
    }
    async function refreshToken() {
        let data={
            'refresh': localStorage.getItem("token")
        }
        await axios.post(process.env.REACT_APP_DJANGO_HOST+"/auth/token/refresh/", data, {
            headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
            }
            }).then(response => { // then print response status
                //get token from response
                const token  =  response.data.token;
                
                //set JWT token to local
                localStorage.setItem("token", token);
                // console.log(localStorage.getItem("token"));
                // console.log(localStorage.getItem("username"));
                //set token to axios common header
                setAuthToken(token);

                //redirect user to home page
                window.location.href = '/'
            }).catch(error=>{
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                }
        });
    }
   if (isLoggedIn()){
        refreshToken();
        return(
            <Route {...rest}
            render={props => (<Component {...props} />)}
            />
        );
   }else if(window.location.pathname==="/iniciar-sesion" || window.location.pathname==="/registrar-usuario" || window.location.pathname==="/"){
        return(
            <Route {...rest}
            render={props => (<Component {...props} />)}
            />
        );
    }else {
        window.location.href = '/iniciar-sesion';
    }
   
};
 
export default RouteGuard;