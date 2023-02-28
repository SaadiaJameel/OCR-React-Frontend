import * as React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { AccountBox, Email, LocalHospital} from '@mui/icons-material';

const NavButton = ({path,startIcon,name}) => (
  <ListItem disablePadding component={NavLink} to={path}
    style={({ isActive }) => ({
          color: isActive ? '#000' : '#000',
          background: isActive ? '#f5f5f5' : '#fff',
        })}
  >
    <ListItemButton>
      <ListItemIcon>
        {startIcon}
      </ListItemIcon>
      <ListItemText primary={name}/>
    </ListItemButton>
  </ListItem>
)

const AdminPage = () => {

  return (
    <Box className="content_wrapper">
      <div className='sidebar'>
        <List disablePadding>
          <NavButton path={"/adminportal/requests"} startIcon={<Email/>} name={"Requests"}/> 
          <NavButton path={"/adminportal/reviewers"} startIcon={<AccountBox/>} name={"Reviewers"}/> 
          <NavButton path={"/adminportal/hospitals"} startIcon={<LocalHospital/>} name={"Hospitals"}/> 
        </List>
      </div>
      <Box sx={{flexGrow:1}} className='content'>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default AdminPage;