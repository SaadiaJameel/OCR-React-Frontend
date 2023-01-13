import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { infoContext } from '../App';
import MenuBar from './MenuBar';

const ProtectedRoute = ({children}) => {
    const info = useContext(infoContext)

    if(!info) return <Navigate to="/login" replace />;

    return (
        <>
        <MenuBar info={info}/>
        <div className='page_body'>
            {children}
        </div>
        </>
    );
};

export default ProtectedRoute;