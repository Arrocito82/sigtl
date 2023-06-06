function Usuarios() {
    return(
        <div style={{textAlign:'center'}}>
            <h2>Usuarios</h2>
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
    );
}

export default Usuarios;