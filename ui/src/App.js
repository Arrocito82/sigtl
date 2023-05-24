import { setAuthToken } from './seguridad/setAuthToken';
import Routes from './seguridad/routes'

function App() {
  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
