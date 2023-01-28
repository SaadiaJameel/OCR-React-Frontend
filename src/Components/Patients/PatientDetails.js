import * as React from 'react';
import {Stack,Button, Avatar, Typography, Box} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const PatientDetails = ({setView, data}) => {
    
  return (
    <>
    <Stack direction='row' alignItems='center' sx={{my:3}}>
      <ArrowBack fontSize='small'/>
      <Button onClick={()=>setView(false)} size='small' color='inherit'>Go back to Patient Details</Button>
    </Stack>
    <Stack sx={{my:3}} direction='row' alignItems='center' spacing={2}>
        <Avatar/>
        <Typography variant='h6'>Patient ID: {data.patient_id}</Typography>
    </Stack>
    <Box sx={{ bgcolor: 'background.paper', display: 'flex'}}>
      
    </Box>
    </>
  );
}

export default PatientDetails;
