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
import AdminPage from './Pages/AdminPage';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
        <Route index path='/adminportal' element={<ProtectedRoute allowed={[1]}><AdminPage/></ProtectedRoute>}/>
        <Route index path='/upload' element={<ProtectedRoute allowed={[1,2]}><UploadPage/></ProtectedRoute>}/>
        <Route index path='/annotation' element={<ProtectedRoute allowed={[1,2]}><Canvas/></ProtectedRoute>}/>
        <Route index path='/patients' element={<ProtectedRoute allowed={[1,2]}><PatientsPage/></ProtectedRoute>}/>
        <Route index path='/images' element={<ProtectedRoute allowed={[1,2]}><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )
  
  return (
      <RouterProvider router={router}/>
  );
}

export default App;