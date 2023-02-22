import * as React from 'react';
import {Box, Button} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { AccountBox, Email, LocalHospital} from '@mui/icons-material';

const NavButton = ({path,startIcon,name}) => (
  <Button
    component={NavLink}
    to={path}
    startIcon={startIcon}
    sx={{ my: 2, display: 'flex', justifyContent: "flex-start", m:0, minWidth:'fit-content' }}
    style={({ isActive }) => ({
      color: isActive ? '#000' : '#000',
      background: isActive ? '#f5f5f5' : '#fff',
    })}
  >
  {name}
  </Button>
)

const AdminPage = () => {

  return (
    <div className='body'>
    <Box className="content_wrapper">
      <div className='sidebar'>
          <NavButton path={"/adminportal/requests"} startIcon={<Email color='action'/>} name={"Requests"}/> 
          <NavButton path={"/adminportal/reviewers"} startIcon={<AccountBox color='action'/>} name={"Reviewers"}/> 
          <NavButton path={"/adminportal/hospitals"} startIcon={<LocalHospital color='action'/>} name={"Hospitals"}/> 
      </div>
      <Box sx={{flexGrow:1}} className='content'>
        <Outlet/>
      </Box>
    </Box>
    </div>
  );
}

export default AdminPage;