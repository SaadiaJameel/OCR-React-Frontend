import React from 'react';
import { Typography, Box} from '@mui/material';
import { Outlet } from 'react-router-dom';

const PatientsPage = () => {
    return (
        <Box>
            <Typography sx={{ fontWeight: 700}} variant="h5">Patients</Typography> 
            <Outlet/>  
        </Box>
    );
};

export default PatientsPage;