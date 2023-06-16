import React from "react";
import { Redirect, Switch, Router, Route } from "react-router-dom";
 
//history
import { history } from './history';
 
//pages
import Bienvenida from '../components/Bienvenida';
import CargarDatosMovimientos from "../components/cargarCSV/CargarDatosMovimientos";
import CargarProductosDanados from "../components/cargarCSV/CargarDatosProductosDanados";
import CargarDatosSucursales from "../components/cargarCSV/CargarDatosSucursales";
import CargarDatosCategorias from "../components/cargarCSV/CargarDatosCategorias";
import CargarDatosProductos from "../components/cargarCSV/CargarDatosProductos";
import DemandaClientes from "../components/reportes/DemandaClientes";
import FrecuenciaCompra from "../components/reportes/FrecuenciaCompra";
import IngresosCostos from "../components/reportes/IngresosCostos";
import ProductosDanados from "../components/reportes/ProductosDanados";
import ProductosMasVendidos from "../components/reportes/ProductosMasVendidos";
import HistorialUsuarios from "../components/seguridad/HistorialUsuarios";
import Usuarios from "../components/seguridad/Usuarios";
import CambiarContrasena from "../components/seguridad/CambiarContrasena";
import RespaldoDatos from "../components/seguridad/RespaldoDatos";
import RegistrarUsuario from "../components/seguridad/RegistrarUsuario";
import RegistrarAdmin from "../components/seguridad/RegistrarAdmin";


import Nav from '../components/navbar/Nav';
import MenuTactico from '../components/navbar/MenuTactico';
import MenuEstrategico from '../components/navbar/MenuEstrategico';
import MenuSeguridad from '../components/navbar/MenuSeguridad';
import IniciarSesion from "../components/seguridad/IniciarSesion";

function Routes() {
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
    let menuAsignado=getMenu();
    return (
    <Router history={history}>
        <header className='bg-body-tertiary'>        
            <Nav/>
            {menuAsignado&&menuAsignado}
        </header>
        <Switch>
            <Route
                exact
                path="/"
                component={Bienvenida}
                />
            <Route
                exact
                path="/cargar-sucursales"
                component={CargarDatosSucursales}
                />
            <Route
                exact
                path="/cargar-categorias"
                component={CargarDatosCategorias}
                />
            <Route
                exact
                path="/cargar-productos"
                component={CargarDatosProductos}
                />
            <Route
                exact
                path="/cargar-movimientos"
                component={CargarDatosMovimientos}
                />
            <Route
                exact
                path="/cargar-productos-danados"
                component={CargarProductosDanados}
                />
            <Route
                exact
                path="/demanda-clientes"
                component={DemandaClientes}
                />
            <Route
                exact
                path="/frecuencia-compra"
                component={FrecuenciaCompra}
                />
            <Route
                exact
                path="/ingresos-costos"
                component={IngresosCostos}
                />
            <Route
                exact
                path="/productos-danados"
                component={ProductosDanados}
                />
            <Route
                exact
                path="/productos-mas-vendidos"
                component={ProductosMasVendidos}
                />
            <Route
                exact
                path="/usuarios"
                component={Usuarios}
                />
            <Route
                exact
                path="/historial"
                component={HistorialUsuarios}
                />
            <Route
                exact
                path="/cambiar-contrasena"
                component={CambiarContrasena}
                />
            <Route
                exact
                path="/respaldo-datos"
                component={RespaldoDatos}
                />
            <Route
                exact
                path="/registrar-usuario"
                component={RegistrarUsuario}
                />
            <Route
                exact
                path="/registrar-admin"
                component={RegistrarAdmin}
                />
            <Route
                exact
                path="/iniciar-sesion"
                component={IniciarSesion}
                />
            <Redirect to="/" />
        </Switch>
    </Router>
   );
}
 
export default Routes;