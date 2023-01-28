import * as React from 'react';
import {Box, Button, Stack} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Manage = () => {
  
  return (
    <div className='body'>
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection:'row'}}>
      <div className='sidebar'>
        <Stack direction='column' spacing={1}>
          <Button sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}} color='inherit'>
            <Link to="/manage/images">Images</Link>
          </Button>     
          <Button sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}} color='inherit'>
            <Link to="/manage/patients">Patients</Link>
          </Button>
        </Stack>
      </div>
      <Box sx={{flexGrow:1, marginLeft:'160px'}}>
        <Outlet/>
      </Box>
    </Box>
    </div>
  );
}

export default Manage;