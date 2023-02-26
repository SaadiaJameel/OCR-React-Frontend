import React from 'react';
import { Typography, Box} from '@mui/material';
import { Outlet } from 'react-router-dom';

const PatientsPage = () => {
    return (
        <div className="inner_content">
        <div>
            <Typography sx={{ fontWeight: 700}} variant="h5">Patients</Typography> 
            <Outlet/>  
        </div>
        </div>
    );
};

export default PatientsPage;