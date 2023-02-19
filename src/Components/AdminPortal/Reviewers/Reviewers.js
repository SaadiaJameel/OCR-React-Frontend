import React from 'react';
import {Typography, Box} from '@mui/material';
import { Outlet } from 'react-router-dom';

const Reviewers = () => {

    return (
        <Box>
            <Typography sx={{ fontWeight: 700}} variant="h5">Reviewers</Typography>    
            <Outlet/>  
        </Box>
    );
};;

export default Reviewers;