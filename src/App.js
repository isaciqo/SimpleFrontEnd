
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './page/components/Login';
import Register from './page/components/Register';
import CreateSchedule from './page/components/CreateSchedule';
import Calendario from './page/Calendario';
import CreateAgenda from './page/components/CreateAgenda';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App(){
  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/create-schedule">create-schedule</Link></li>
          <li><Link to="/CreateAgenda">CreateAgenda</Link></li>
          <li><Link to="/Calendario">Calendario</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-schedule" component={CreateSchedule} /> 
        <Route path="/CreateAgenda" component={CreateAgenda} /> 
        <Route path="/Calendario" component={Calendario} /> 
      </Switch>
    </div>
  </Router>
  );
}

export default App;
