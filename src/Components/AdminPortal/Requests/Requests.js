import React from 'react';
import {Typography, Box} from '@mui/material';
import { Outlet } from 'react-router-dom';

const Requests = () => {

    return (
        <div className="inner_content">
        <div>
            <Typography sx={{ fontWeight: 700}} variant="h5">Requests</Typography>    
            <Outlet/>  
        </div>
        </div>
    );
};;

export default Requests;