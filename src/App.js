import React, { useEffect } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider , Outlet} from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import Canvas from './Components/Annotation/Canvas';
import PatientsPage from './Components/Patients/PatientsPage';
import ImagesPage from './Pages/ImagesPage';
import AdminPage from './Pages/AdminPage';
import Requests from './Components/AdminPortal/Requests';
import Reviewers from './Components/AdminPortal/Reviewers';
import Manage from './Pages/Manage';
import PatientsTable from './Components/Patients/PatientsTable';
import PatientDetails from './Components/Patients/PatientDetails';
import RequestsTable from './Components/AdminPortal/RequestsTable';
import RequestDetails from './Components/AdminPortal/RequestDetails';
import ReviewersTable from './Components/AdminPortal/ReviewersTable';
import UserDetails from './Components/AdminPortal/UserDetails';
import UserProfile from './Components/UserProfile';
import ImagesSearch from './Components/ImagesSearch';
import ImageCropper from './Components/Crop/ImageCropper';
import { useSelector, useDispatch } from 'react-redux';
import { trySilentRefresh } from './utils/authUtils';
import {setUserData } from './Reducers/userDataSlice';


function App() {
  const userData = useSelector(state => state.data);
  const dispatch = useDispatch();

  const silentRefresh = () => {
    trySilentRefresh().then(data => {
      if(data){
        dispatch(setUserData({
          _id: data.ref._id,
          username: data.ref.username,
          email: data.ref.email,
          roles: data.ref.role,
          accessToken: data.accessToken,
          reg_no: data.ref.reg_no
        }));
      }
    })
  }
  // useEffect(() => {
  //   if (userData.accessToken.token == null){
  //     silentRefresh();
  //   }
  // }, [])
  useEffect(() => {
    if (localStorage.getItem('loggedOut')) {
      setTimeout(() => {
          localStorage.removeItem('loggedOut');
      }, 1000);
      silentRefresh();

  }
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/adminportal' element={<ProtectedRoute allowed={[1]}><AdminPage/></ProtectedRoute>}>

            <Route path='/adminportal/requests' element={<Requests/>}>
              <Route index element={<RequestsTable/>}/>
              <Route path='/adminportal/requests/:id' element={<RequestDetails/>}/>
            </Route>

            <Route path='/adminportal/reviewers' element={<Reviewers/>}>
              <Route index element={<ReviewersTable/>}/>
              <Route path='/adminportal/reviewers/:id' element={<UserDetails/>}/>
            </Route>
        </Route>

        <Route path='/manage' element={<ProtectedRoute allowed={[1,2]}><Manage/></ProtectedRoute>}>
            <Route index element={<ImagesSearch/>}/>
            <Route path='/manage/images' element={<ImagesSearch/>}/>
            <Route path ='/manage/patients' element={<PatientsPage/>}>
                <Route  index element={<PatientsTable/>}></Route>
                <Route  index path="/manage/patients/all" element={<PatientsTable/>}></Route>
                <Route path="/manage/patients/:id" element={<PatientDetails/>}></Route>
            </Route>
        </Route>

        <Route path='/profile' element={<ProtectedRoute allowed={[1,2,3]}><UserProfile/></ProtectedRoute> }/>
        <Route path='/cropper' element={<ProtectedRoute allowed={[1,2]}><ImageCropper/></ProtectedRoute>}/>
        <Route path='/images' element={<ProtectedRoute allowed={[1,2]}><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )

  return (
      <RouterProvider router={router}/>
  );
}

export default App;