
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './page/components/Login';
import Register from './page/components/Register';
import CreateSchedule from './page/components/CreateSchedule';
import Calendario from './page/Calendario';

function App(){
  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/create-schedule">create-schedule</Link></li>
          <li><Link to="/Calendario">Calendario</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-schedule" component={CreateSchedule} /> 
        <Route path="/Calendario" component={Calendario} /> 
      </Switch>
    </div>
  </Router>
  );
}

export default App;
