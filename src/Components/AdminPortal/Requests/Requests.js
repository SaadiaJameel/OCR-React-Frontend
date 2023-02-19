import React from 'react';
import {Typography, Box} from '@mui/material';
import { Outlet } from 'react-router-dom';

const Requests = () => {

    return (
        <Box>
            <Typography sx={{ fontWeight: 700}} variant="h5">Requests</Typography>    
            <Outlet/>  
        </Box>
    );
};;

export default Requests;