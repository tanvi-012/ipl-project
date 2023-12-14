import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamLogin from './Components/login/login_team';
import AdminLogin from './Components/login/login_admin';
import TeamDashboard from './Components/team_dashboard/team_dashboard';
import AdminDashboard from './Components/admin_dashboard/admin_dashboard';
import { AuthContext } from './Contexts/AuthContext';
import { TimerProvider } from './Components/timer';
import { Provider } from 'react-redux';
import {store} from './store/store';

function App() {
  return (
    <Provider store={store}>
    <AuthContext>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<TeamLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admindb" element={<AdminDashboard />} />
            <Route path="/teamdb/:id" element={<TeamDashboard />} />
          </Routes>
      </BrowserRouter>
    </AuthContext>
    </Provider>
  );
}
// function App() {
//   // const router = createBrowserRouter([
//   //   {
//   //     path:"/admindb",
//   //     element:<Protected><AdminDashboard/></Protected>
//   //   },
//   //   {
//   //     path:"/teamdb/:id",
//   //     element:<Protected><TeamDashboard/></Protected>
//   //   },
//   //   {
//   //     path:"/team",
//   //     element:<TeamLogin/>
//   //   },
//   //   {
//   //     path:"/",
//   //     element:<AdminLogin></AdminLogin>
//   //   }
//   //])
//   return (
//     <AuthContext>
//     <BrowserRouter>
//     <TimerProvider>
//     <Routes>
//       <Route path='/' element={<TeamLogin/>}/>
//       <Route path='/admin' element={<AdminLogin/>}/>
//       <Route path='/admindb' element={<AdminDashboard/>}/>
//       <Route path='/teamdb/:id' element={<TeamDashboard/>}/>
//       </Routes>  
//       </TimerProvider>
//     </BrowserRouter>
//     </AuthContext>
//   );
// }

 export default App;
