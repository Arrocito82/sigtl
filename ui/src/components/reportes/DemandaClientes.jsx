import React, {useState} from 'react';
import axios from 'axios';

function DemandaClientes() {
    const SUCURSALES = {
        SAN_SALVADOR: 'San Salvador',
        SOYAPANGO: 'Soyapango',
        SANTA_TECLA: 'Santa Tecla',
        DELGADO: 'Delgado',
        ILOPANGO: 'Ilopango',
        MEJICANOS: 'Mejicanos'
    };
    const DAYS_OF_WEEK = {
        SUNDAY: 'Domingo',
        MONDAY: 'Lunes',
        TUESDAY: 'Martes',
        WEDNESDAY: 'Miércoles',
        THURSDAY: 'Jueves',
        FRIDAY: 'Viernes',
        SATURDAY: 'Sábado'
    };
    const MONTHS_OF_YEAR = {
        JANUARY: 'Enero',
        FEBRUARY: 'Febrero',
        MARCH: 'Marzo',
        APRIL: 'Abril',
        MAY: 'Mayo',
        JUNE: 'Junio',
        JULY: 'Julio',
        AUGUST: 'Agosto',
        SEPTEMBER: 'Septiembre',
        OCTOBER: 'Octubre',
        NOVEMBER: 'Noviembre',
        DECEMBER: 'Diciembre'
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
        await axios.post(process.env.REACT_APP_DJANGO_HOST+'/api/demandaClientes/', formJson,{
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then((response) => {
            setReporte(JSON.stringify(response.data, null, 4));
        });
    }
    return(
        <div className="container">
            <h2 className='text-center'>Demanda de clientes</h2>
            <div className="row">
                <div className="col-md-auto">
                    <form method="post" onSubmit={handleFilter}>
                        <h5>Seleccione los filtros necesarios</h5>
                        <label className="form-label mt-2">Sucursal:</label>
                        <select nameName='filterSucursal' className="form-select">
                            {Object.keys(SUCURSALES).map((suc) => (
                            <option key={suc} value={suc}>
                                {SUCURSALES[suc]}
                            </option>
                            ))}
                        </select>
                        <label className="form-label mt-2">Mes:</label>
                        <select name='filterMes' className="form-select">
                            {Object.keys(MONTHS_OF_YEAR).map((mes) => (
                            <option key={mes} value={mes}>
                                {MONTHS_OF_YEAR[mes]}
                            </option>
                            ))}
                        </select>
                        <label className="form-label mt-2">Dia:</label>
                        <select name='filterDia' className="form-select">
                            {Object.keys(DAYS_OF_WEEK).map((dias) => (
                            <option key={dias} value={dias}>
                                {DAYS_OF_WEEK[dias]}
                            </option>
                            ))}
                        </select>
                        <label className="form-label mt-2">Hora:</label>
                        <input type="time" name='filterHora' className="form-control" />
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Mostrar resultados</button>
                        </div>
                    </form>
                </div>
                {reporte ? (
                    <>
                    <div className="col-md ps-5 reporte" >
                        <pre>{reporte}</pre>
                    </div></>
                    ):
                    <>
                    <div className="col-md text-center reporte" >
                        <img src='Waiting-amico.png' alt='Waiting' style={{ width: '30%', marginTop: '30px' }}></img><h2>Seleccione los filtros necesarios...</h2>
                    </div>
                    </>
                }
            </div>
        </div>
  );
}

export default DemandaClientes;