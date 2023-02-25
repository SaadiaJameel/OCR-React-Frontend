import React from 'react';
import {Typography, Box} from '@mui/material';
import HospitalTable from './HospitalTabel';

const Hospitals = () => {

    return (
        <div className="inner_content">
        <div>
            <Typography sx={{ fontWeight: 700}} variant="h5">Hospitals</Typography> 
            <HospitalTable/>
        </div>
        </div>
    );
};;

export default Hospitals;