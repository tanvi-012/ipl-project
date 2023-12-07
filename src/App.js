import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TeamLogin from './Components/login/login_team';
import AdminLogin from './Components/login/login_admin';
import TeamDashboard from './Components/team_dashboard/team_dashboard';
import AdminDashboard from './Components/admin_dashboard/admin_dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={AdminLogin}></Route>
        <Route exact path="/team" Component={TeamLogin}></Route>
        <Route exact path="/teamdb" Component={TeamDashboard}></Route>
        <Route exact path="/admindb" Component={AdminDashboard}></Route>
      </Routes>
    </Router>
  );
}

export default App;
