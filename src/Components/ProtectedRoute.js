import React from 'react';
import { Navigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const ProtectedRoute = ({children}) => {
    
    // const info = JSON.parse(sessionStorage.getItem("info"))
    const info = {}

    if(!info) return <Navigate to="/login" replace />;

    return (
        <>
        <MenuBar/>
        <div className='page'>
            {children}
        </div>
        </>
    );
};

export default ProtectedRoute;