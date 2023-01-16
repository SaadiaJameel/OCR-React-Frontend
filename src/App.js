import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider , Outlet} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProtectedEl from './Pages/ProtectedEl';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import Canvas from './Components/Annotation/Canvas';
import './App.css';
import PatientsPage from './Pages/PatientsPage';
import ImagesPage from './Pages/ImagesPage';
import UploadPage from './Pages/UploadPage';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
        <Route index path='/adminportal' element={<ProtectedRoute><ProtectedEl/></ProtectedRoute>}/>
        <Route index path='/upload' element={<ProtectedRoute><UploadPage/></ProtectedRoute>}/>
        <Route index path='/annotation' element={<ProtectedRoute><Canvas/></ProtectedRoute>}/>
        <Route index path='/patients' element={<ProtectedRoute><PatientsPage/></ProtectedRoute>}/>
        <Route index path='/images' element={<ProtectedRoute><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )
  
  return (
      <RouterProvider router={router}/>
  );
}

export default App;