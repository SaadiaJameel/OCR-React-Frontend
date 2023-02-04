import * as React from 'react';
import {Box, Button, Stack} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { Photo, People } from '@mui/icons-material';

const Manage = () => {
  
  return (
    <div className='body'>
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection:'row'}}>
      <div className='sidebar'>
        <Stack direction='column' spacing={1}>
          <Button component={NavLink} to="/manage/images" startIcon={<Photo/>} 
          sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}}
          style={({ isActive }) => ({
              color: isActive ? '#000' : '#000',
              background: isActive ? '#f5f5f5' : '#fff',
            })}>
            Images
          </Button>   
          <Button component={NavLink} to="/manage/patients" startIcon={<People/>} 
          sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}}
          style={({ isActive }) => ({
              color: isActive ? '#000' : '#000',
              background: isActive ? '#f5f5f5' : '#fff',
            })}>
            Patients
          </Button>   
        </Stack>
      </div>
      <Box sx={{flexGrow:1, marginLeft:'170px'}}>
        <Outlet/>
      </Box>
    </Box>
    </div>
  );
}

export default Manage;