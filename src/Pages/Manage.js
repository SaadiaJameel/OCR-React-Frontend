import * as React from 'react';
import {Box, Button} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { Photo, People, ViewList } from '@mui/icons-material';

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

const Manage = () => {
  
  return (
    <div className='body'>
    <Box className="content_wrapper">
      <div className='sidebar'>
          <NavButton path={"/manage/entry"} startIcon={<ViewList color='action'/>} name={"Entry"}/> 
          <NavButton path={"/manage/patients"} startIcon={<People color='action'/>} name={"Patients"}/> 
      </div>
      <Box sx={{flexGrow:1}} className='content'>
        <Outlet/>
      </Box>
    </Box>
    </div>
  );
}

export default Manage;