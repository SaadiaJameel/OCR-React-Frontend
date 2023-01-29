import * as React from 'react';
import {Box, Button, Stack} from '@mui/material';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AccountCircle, Email } from '@mui/icons-material';


const AdminPage = () => {

  return (
    <div className='body'>
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection:'row'}}>
      <div className='sidebar'>
        <Stack direction='column' spacing={1} color='GrayText'>
          <Button component={NavLink} to="/adminportal/requests" startIcon={<Email/>} 
          sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}}
          style={({ isActive }) => ({
              color: isActive ? '#000' : '#000',
              background: isActive ? '#f5f5f5' : '#fff',
            })}>
            Requests
          </Button>     
          <Button component={NavLink} to="/adminportal/reviewers" startIcon={<AccountCircle/>} 
          sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0}}
          style={({ isActive }) => ({
              color: isActive ? '#000' : '#000',
              background: isActive ? '#f5f5f5' : '#fff',
            })}>
            Reviewers
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

export default AdminPage;