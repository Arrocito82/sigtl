import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
function MenuSeguridad(){
    return(
        <div className="d-flex pt-2 pb-3 mb-3 justify-content-center container-fluid">
          

            <Router forceRefresh={true}>
            <div className="btn-group">
              <button type="button" className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <span>Cargar CSV</span> 
                <span className="material-symbols-outlined" style={{position:'relative',top:'5px'}}>upload</span>
              </button>
              <ul className="dropdown-menu">
              <li>
                  <Link to="/cargar-sucursales"
                    name='cargar-sucursales' 
                    className='dropdown-item' 
                    >Sucursales</Link>
              </li>
              <li>
                <Link
                to="/cargar-categorias"
                name='cargar-categorias' 
                className='dropdown-item' 
                >Categorias</Link>
              </li>
              <li>
                <Link
                to="/cargar-productos"
                name='cargar-productos' 
                className='dropdown-item' 
                >Productos</Link>
                
              </li>
            </ul>
          </div>
            <Link
            to="/usuarios"
            name='usuarios' 
            className='btn btn-outline-primary mx-1' 
            >
              <span style={{position:'relative',bottom:'10px'}}>Usuarios</span>
              <span className="material-symbols-outlined fs-2 m-2">person</span>
            </Link>
    
    
            <Link
            to="/historial"
            name='historial'
            className='btn btn-outline-primary mx-1'>
              <span style={{position:'relative',bottom:'10px'}}>
                Historial
              </span>
              <span className="material-symbols-outlined fs-2 m-2">history</span>
            </Link>
            <Link
            to="/respaldo-datos"
            name='respaldo-datos'
            className='btn btn-outline-primary mx-1'>
              <span style={{position:'relative',bottom:'10px'}}>
                Respaldo de Datos
              </span>
              <span className="material-symbols-outlined fs-2 m-2">settings_backup_restore</span>
            </Link>
          </Router>
        </div>
    );
  }
  
  export default MenuSeguridad;