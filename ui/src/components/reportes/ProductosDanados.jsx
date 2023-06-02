/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';

function ProductosDanados() {
  const PRODUCTOS = {
    TV: 'Televisor',
    SMARTPHONE: 'Teléfono inteligente',
    LAPTOP: 'Portátil',
    HEADPHONES: 'Audífonos',
    CAMERA: 'Cámara',
    SMARTWATCH: 'Reloj inteligente',
    SPEAKERS: 'Altavoces',
    GAMING_CONSOLE: 'Consola de videojuegos',
    BLENDER: 'Licuadora',
    VACUUM_CLEANER: 'Aspiradora',
    COFFEE_MACHINE: 'Máquina de café'
  };

  const [reporte, setReporte] = useState(null);
    async function handleFilter(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson); 
        await axios.post('/some-api', formJson,{
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then((response) => {
            console.log(response);
            setReporte(response.data);
        });
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-auto">
                    <form method="post" onSubmit={handleFilter}>
                        <h5>Seleccione los filtros necesarios</h5>
                        <label className="form-label mt-2">Producto:</label>
                        <select name='filterProducto' className="form-select">
                            {Object.keys(PRODUCTOS).map((pro) => (
                            <option key={pro} value={pro}>
                                {PRODUCTOS[pro]}
                            </option>
                            ))}
                        </select>
                        <label className="form-label mt-2">Fecha:</label>
                        <input type="date" name="filterFecha" className="form-control" />
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Mostrar resultados</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg text-center reporte" >
                    {reporte ? (
                        <><h2>reporte aqui</h2></>
                        ):
                        <><img src='Waiting-amico.png' alt='Waiting' style={{ width: '30%', marginTop: '30px' }}></img><h2>Seleccione los filtros necesarios...</h2></>
                    }
                </div>
            </div>
        </div>
  );
}

export default ProductosDanados;