import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import TeamLogin from './Components/login/login_team';
import AdminLogin from './Components/login/login_admin';
import TeamDashboardCSK from './Components/team_dashboard/team_dashboard_csk';
import TeamDashboardRCB from './Components/team_dashboard/team_dashboard_rcb';
import TeamDashboardKKR from './Components/team_dashboard/team_dashboard_kkr';
import TeamDashboardRR from './Components/team_dashboard/team_dashboard_rr';
import TeamDashboardMI from './Components/team_dashboard/team_dashboard_mi';
import TeamDashboardSRH from './Components/team_dashboard/team_dashboard_srh';
import TeamDashboardLSG from './Components/team_dashboard/team_dashboard_lsg';
import TeamDashboardDC from './Components/team_dashboard/team_dashboard_dc';
import TeamDashboardGT from './Components/team_dashboard/team_dashboard_gt';
import TeamDashboardPB from './Components/team_dashboard/team_dashboard_pk';
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
      path:"/teamdb/cHjNpy5X3Vh8ltK4cdrm8D7Srix1",
      element:<Protected><TeamDashboardCSK/></Protected>
    },
    {
      path:"/teamdb/3XzpXXgpcXUqJ25gGNHl3EdaNVE3",
      element:<Protected><TeamDashboardMI/></Protected>
    },
    {
      path:"/teamdb/qsNGzvJJd3eVUasjPgWwtXuMGhL2",
      element:<Protected><TeamDashboardRCB/></Protected>
    },
    {
      path:"/teamdb/frDtSg9mB7RSd6PNlA9D2jGn9ax1",
      element:<Protected><TeamDashboardLSG/></Protected>
    },
    {
      path:"/teamdb/EAhHBdmQZyXvUfIKru640knpyOF2",
      element:<Protected><TeamDashboardDC/></Protected>
    },
    {
      path:"/teamdb/m1tPhODCPHc7qksUGjHqfP7FE942",
      element:<Protected><TeamDashboardGT/></Protected>
    },
    {
      path:"/teamdb/U65uxadEmCXGswuscwC3hKQ9PtQ2",
      element:<Protected><TeamDashboardSRH/></Protected>
    },
    {
      path:"/teamdb/pPr6JbAUwXRnxe05HKvAPytnzdk2",
      element:<Protected><TeamDashboardKKR/></Protected>
    },
    {
      path:"/teamdb/SuANqOmaMzUbWzyBFtNEu3xbP9w2",
      element:<Protected><TeamDashboardPB/></Protected>
    },
    {
      path:"/teamdb/Gl8ZbayBEbhOYdC1gYNksinbyRL2",
      element:<Protected><TeamDashboardRR/></Protected>
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
      <Route path='/teamdb/cHjNpy5X3Vh8ltK4cdrm8D7Srix1' element={<TeamDashboardCSK/>}/>
      <Route path='/teamdb/3XzpXXgpcXUqJ25gGNHl3EdaNVE3' element={<TeamDashboardMI/>}/>
      <Route path='/teamdb/qsNGzvJJd3eVUasjPgWwtXuMGhL2' element={<TeamDashboardRCB/>}/>
      <Route path='/teamdb/frDtSg9mB7RSd6PNlA9D2jGn9ax1' element={<TeamDashboardLSG/>}/>
      <Route path='/teamdb/EAhHBdmQZyXvUfIKru640knpyOF2' element={<TeamDashboardDC/>}/>
      <Route path='/teamdb/m1tPhODCPHc7qksUGjHqfP7FE942' element={<TeamDashboardGT/>}/>
      <Route path='/teamdb/U65uxadEmCXGswuscwC3hKQ9PtQ2' element={<TeamDashboardSRH/>}/>
      <Route path='/teamdb/pPr6JbAUwXRnxe05HKvAPytnzdk2' element={<TeamDashboardKKR/>}/>
      <Route path='/teamdb/SuANqOmaMzUbWzyBFtNEu3xbP9w2' element={<TeamDashboardPB/>}/>
      <Route path='/teamdb/Gl8ZbayBEbhOYdC1gYNksinbyRL2' element={<TeamDashboardRR/>}/>
      </Routes>  
    </BrowserRouter>
    </AuthContext>
  );
}

 export default App;
