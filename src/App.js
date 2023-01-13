import React, {useState, createContext} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider , Outlet} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ProtectedEl from './Components/ProtectedEl';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';

const infoContext = createContext(null);

function App() {

  const [user, setUser] = useState({});

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage user={user} setUser={user}/>}/>
        <Route path='/login' element={<LoginPage user={user} setUser={user}/>}/>
        
        <Route index path='/pro' element={<ProtectedRoute><ProtectedEl/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>
      </Route>
    )
  )
  return (
    <infoContext.Provider value={user}>
      <RouterProvider router={router}/>
    </infoContext.Provider>
  );
}

export default App;
export {infoContext};