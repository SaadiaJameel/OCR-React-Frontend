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
import { trySilentRefresh } from './utils/authUtils';
import { useDispatch } from 'react-redux';
import { setUserData } from './Reducers/userDataSlice';


function App() {
  const timeout = 1000 * 60 * 60;
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();

  const silentRefresh = () => {
    console.log("aaaaaaaa");
    trySilentRefresh().then(data => {
      if(data){
        console.log(data);
        dispatch(setUserData({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          roles: data.user.roles,
          accessToken: data.accessToken,
          reg_no: data.user.reg_no
        }))
      }
      else if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        setMessage('Your session has expired. Please login again.');
        window.location.pathname = '/login';
    }
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/adminportal' element={<AdminPage/>}/>
        {/* <Route index path='/images' element={<ImagesPage/>}/>
        <Route index path='/patients' element={<PatientsPage/>}/> */}
        <Route index path='/adminportal' element={<ProtectedRoute allowed={[1]}><AdminPage/></ProtectedRoute>}/>
        <Route index path='/upload' element={<ProtectedRoute allowed={[1,2]}><UploadPage/></ProtectedRoute> }/>
        <Route index path='/annotation' element={<ProtectedRoute allowed={[1,2]}><Canvas/></ProtectedRoute>}/>
        <Route index path='/patients' element={<ProtectedRoute allowed={[1,2]}><PatientsPage/></ProtectedRoute>}/>
        <Route index path='/images' element={<ProtectedRoute allowed={[1,2]}><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )

  React.useEffect(() => {

      setTimeout(() => {
        console.log('aaaaaaa');
      silentRefresh();

          // setMessage(localStorage.getItem('loggedOut'));
          // localStorage.removeItem('loggedOut');
      }, timeout);

}, []);
  return (
      <RouterProvider router={router}/>
  );
}

export default App;