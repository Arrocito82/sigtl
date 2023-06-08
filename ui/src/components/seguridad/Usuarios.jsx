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
                        <th scope="col">Usuario</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;