import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MenuBar from './MenuBar';
// import { useSelector, useDispatch } from 'react-redux';
// import { trySilentRefresh } from '../utils/authUtils';
// import {setUserData } from '../Reducers/userDataSlice';
// import ClipLoader from 'react-spinners/ClipLoader';

const ProtectedRoute = ({allowed, children}) => {
    
    const info = JSON.parse(sessionStorage.getItem("info"))
    const roles = info? info["roles"]: []
    const user = info? info["username"]: null
    // const userData = useSelector(state => state.userData.data);
    // const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
	// 	// Silence refresh.
    //     setIsLoading(true);
	// 	const res = async() => {
    //         await trySilentRefresh().then((data) => {
    //             if (data) {
    //                 dispatch(setUserData({
    //                     _id: data.ref._id,
    //                     username: data.ref.username,
    //                     email: data.ref.email,
    //                     roles: data.ref.role,
    //                     accessToken: data.accessToken,
    //                     reg_no: data.ref.reg_no
    //                   }))
    //             }
    //         });
    //     }
    //     setIsLoading(false);
	// }, []);

    if(!user) return <Navigate to="/login" replace />;
    else if(! roles.find(role => allowed.includes(role))) return <Navigate to="/notfound" replace />;


    // if (isLoading){
    //     return(
    //         <>
    //         <MenuBar roles={roles} username={user}/>
    //         <div
    //         style={{
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             height: '100vh',
    //           }}>
    //             <ClipLoader color="#52bfd9" size={100}/>
    //         </div>
    //         </>
    //     )
    // }else{
        return (
            <>
            <MenuBar roles={roles} username={user}/>
            <div>
                {children}
            </div>
            </>
        );
    // }
};

export default ProtectedRoute;