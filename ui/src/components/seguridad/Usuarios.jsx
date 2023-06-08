function Usuarios() {
    return(
        <div className="container" style={{textAlign:'center'}}>
            <h2>Usuarios</h2>
            <div className="row text-end">
                <div className="col">
                    <a className="btn btn-outline-success" href="/registrar-usuario">Registrar Usuario</a>
                </div>
            </div>
            <div className="row">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Es Administrador</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Ver</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;