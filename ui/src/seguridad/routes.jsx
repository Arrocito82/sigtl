import React from "react";
import { Redirect, Switch, Router } from "react-router-dom";
 
//history
import { history } from './history';
import RouteGuard from "./RouteGuard";
 
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


import Nav from '../components/navbar/Nav';
import MenuTactico from '../components/navbar/MenuTactico';
import MenuEstrategico from '../components/navbar/MenuEstrategico';
import MenuSeguridad from '../components/navbar/MenuSeguridad';

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
            {menuAsignado}
        </header>
        <Switch>
            <RouteGuard
                exact
                path="/"
                component={Bienvenida}
                />
            <RouteGuard
                exact
                path="/cargar-sucursales"
                component={CargarDatosSucursales}
                />
            <RouteGuard
                exact
                path="/cargar-categorias"
                component={CargarDatosCategorias}
                />
            <RouteGuard
                exact
                path="/cargar-productos"
                component={CargarDatosProductos}
                />
            <RouteGuard
                exact
                path="/cargar-movimientos"
                component={CargarDatosMovimientos}
                />
            <RouteGuard
                exact
                path="/cargar-productos-danados"
                component={CargarProductosDanados}
                />
            <RouteGuard
                exact
                path="/demanda-clientes"
                component={DemandaClientes}
                />
            <RouteGuard
                exact
                path="/frecuencia-compra"
                component={FrecuenciaCompra}
                />
            <RouteGuard
                exact
                path="/ingresos-costos"
                component={IngresosCostos}
                />
            <RouteGuard
                exact
                path="/productos-danados"
                component={ProductosDanados}
                />
            <RouteGuard
                exact
                path="/productos-mas-vendidos"
                component={ProductosMasVendidos}
                />
            <RouteGuard
                exact
                path="/usuarios"
                component={Usuarios}
                />
            <RouteGuard
                exact
                path="/historial"
                component={HistorialUsuarios}
                />
            <RouteGuard
                exact
                path="/cambiar-contrasena"
                component={CambiarContrasena}
                />
            <RouteGuard
                exact
                path="/respaldo-datos"
                component={RespaldoDatos}
                />
            <RouteGuard
                exact
                path="/registrar-usuario"
                component={RegistrarUsuario}
                />
            <Redirect to="/" />
        </Switch>
    </Router>
   );
}
 
export default Routes;