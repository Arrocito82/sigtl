import React from "react";
import { Redirect, Switch, Router } from "react-router-dom";
 
//history
import { history } from './history';
import RouteGuard from "../components/RouteGuard";
 
//pages
import Bienvenida from '../components/Bienvenida';
import CargarDatosMovimientos from "../components/cargarCSV/CargarDatosMovimientos";
import CargarProductosDanados from "../components/cargarCSV/CargarDatosProductosDanados";
import DemandaClientes from "../components/reportes/DemandaClientes";
import FrecuenciaCompra from "../components/reportes/FrecuenciaCompra";
import IngresosCostos from "../components/reportes/IngresosCostos";
import ProductosDanados from "../components/reportes/ProductosDanados";
import ProductosMasVendidos from "../components/reportes/ProductosMasVendidos";

function Routes() {
   return (
    <Router history={history}>
        <Switch>
            <RouteGuard
                exact
                path="/"
                component={Bienvenida}
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
            <Redirect to="/" />
        </Switch>
    </Router>
   );
}
 
export default Routes;