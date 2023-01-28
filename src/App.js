import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider , Outlet} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import Canvas from './Components/Annotation/Canvas';
import './App.css';
import PatientsPage from './Components/Patients/PatientsPage';
import ImagesPage from './Pages/ImagesPage';
import UploadPage from './Pages/UploadPage';
import AdminPage from './Pages/AdminPage';
import { trySilentRefresh } from './utils/authUtils';
import { useDispatch } from 'react-redux';
import { setUserData } from './Reducers/userDataSlice';
import Requests from './Components/AdminPortal/Requests';
import Reviewers from './Components/AdminPortal/Reviewers';
import Manage from './Pages/Manage';
import PatientsTable from './Components/Patients/PatientsTable';
import PatientProfile from './Components/Patients/PatientProfile';
import RequestsTable from './Components/AdminPortal/RequestsTable';
import RequestDetails from './Components/AdminPortal/RequestDetails';
import ReviewersTable from './Components/AdminPortal/ReviewersTable';
import UserDetails from './Components/AdminPortal/UserDetails';


function App() {
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
            <Route index element={<Reviewers/>}/>
            <Route path='/manage/images' element={<Reviewers/>}/>
            <Route path ='/manage/patients' element={<PatientsPage/>}>
                <Route  index element={<PatientsTable/>}></Route>
                <Route  index path="/manage/patients/all" element={<PatientsTable/>}></Route>
                <Route path="/manage/patients/:id" element={<PatientProfile/>}></Route>
            </Route>
        </Route>

        <Route path='/upload' element={<ProtectedRoute allowed={[1,2]}><UploadPage/></ProtectedRoute> }/>
        <Route path='/annotation' element={<ProtectedRoute allowed={[1,2]}><Canvas/></ProtectedRoute>}/>
        <Route path='/patients' element={<ProtectedRoute allowed={[1,2]}><PatientsPage/></ProtectedRoute>}/>
        <Route path='/images' element={<ProtectedRoute allowed={[1,2]}><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )

//   React.useEffect(() => {

//     if (localStorage.getItem('loggedOut')) {
//       setTimeout(() => {
//           setMessage(localStorage.getItem('loggedOut'));
//           localStorage.removeItem('loggedOut');
//       }, 5000);
//     }
// }, []);
  return (
      <RouterProvider router={router}/>
  );
}

export default App;