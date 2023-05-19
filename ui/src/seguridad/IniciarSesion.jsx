function IniciarSesion({guardarToken}) {
    return(
    <div className='bg-body-tertiary'>
        <div style={{height:"100vh"}}>
            <div className="d-flex align-items-baseline">
                <div className="col">
                    <div className="row justify-content-center pb-2 pt-3">
                        <img src="cover.png" alt="Bienvenidos a Tienda Luisito" className="logo-login"/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-11">    
                            <form action="/login" method="post" className="m-3">
                                <p className="text-center"><span className="h4 text-dark-emphasis" >Iniciar Sesión</span></p>
                                
                                <div class="mb-3">
                                    <label for="email" class="form-label">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                                    <div id="emailHelp" class="form-text">Ej. carnet@tiendaluisito.com</div>
                                </div>
                                <div class="mb-3">
                                    <label for="password1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password1"/>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="recordar-contrasena"/>
                                    <label class="form-check-label" for="recordar-contrasena">Recordar Contraseña</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default IniciarSesion;