import React from 'react';
import { Navigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const ProtectedRoute = ({allowed, children}) => {
    
    const info = JSON.parse(sessionStorage.getItem("info"))
    const roles = info? info["roles"]: []
    const user = info? info["username"]: null

    if(!user) return <Navigate to="/login" replace />;
    else if(! roles.find(role => allowed.includes(role))) return <Navigate to="/notfound" replace />;

    return (
        <>
        <MenuBar roles={roles} username={user}/>
        <div>
            {children}
        </div>
        </>
    );
};

export default ProtectedRoute;