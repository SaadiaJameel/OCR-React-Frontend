import React from 'react';
import {Typography, Box} from '@mui/material';
import HospitalTable from './HospitalTabel';

const Hospitals = () => {

    return (
        <Box>
            <Typography sx={{ fontWeight: 700}} variant="h5">Hospitals</Typography> 
            <HospitalTable/>
        </Box>
    );
};;

export default Hospitals;