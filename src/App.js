import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import TeamLogin from './Components/login/login_team';
import AdminLogin from './Components/login/login_admin';
import TeamDashboard from './Components/team_dashboard/team_dashboard';
import AdminDashboard from './Components/admin_dashboard/admin_dashboard';
import { AuthContext } from './Contexts/AuthContext';
import Protected from './Routes/Protected'


function App() {
  const router = createBrowserRouter([
    {
      path:"/admindb",
      element:<Protected><AdminDashboard/></Protected>
    },
    {
      path:"/teamdb/:id",
      element:<Protected><TeamDashboard/></Protected>
    },
    {
      path:"/team",
      element:<TeamLogin/>
    },
    {
      path:"/",
      element:<AdminLogin></AdminLogin>
    }
  ])
  return (
    <AuthContext>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TeamLogin/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/admindb' element={<AdminDashboard/>}/>
      <Route path='/teamdb/:id' element={<TeamDashboard/>}/>
      </Routes>  
    </BrowserRouter>
    </AuthContext>
  );
}

 export default App;
