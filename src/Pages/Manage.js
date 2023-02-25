import * as React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { People, ViewList } from '@mui/icons-material';

const NavButton = ({path,startIcon,name}) => (
    <ListItem disablePadding component={NavLink} to={path}
    style={({ isActive }) => ({
          background: isActive ? '#f5f5f5' : '#fff',
        })}
    >
      <ListItemButton>
        <ListItemIcon>
          {startIcon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
)

const Manage = () => {
  
  return (
    <Box className="content_wrapper">
      <div className='sidebar'>
        <List disablePadding>
          <NavButton path={"/manage/entry"} startIcon={<ViewList color='action'/>} name={"Entry"}/> 
          <NavButton path={"/manage/patients"} startIcon={<People color='action'/>} name={"Patients"}/> 
        </List>
      </div>
      <Box sx={{flexGrow:1}} className='content'>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default Manage;