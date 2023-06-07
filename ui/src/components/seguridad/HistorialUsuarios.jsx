function HistorialUsuarios() {
    return(
        <div style={{textAlign:'center'}}>
            <h2>Historial</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Usuario Afectado</th>
                    <th scope="col">Registro Afectado</th>
                    <th scope="col">Contexto del Evento</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Descripción</th>
                    {/* <td>Origen</td> */}
                    {/* <td>IP</td> */}
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default HistorialUsuarios;