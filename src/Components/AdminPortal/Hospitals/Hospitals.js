import React from 'react';
import {Typography, Box, Button, List, ListItem, IconButton, ListItemText, Divider} from '@mui/material';
import { Delete } from '@mui/icons-material';
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