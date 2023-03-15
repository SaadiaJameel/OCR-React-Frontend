import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const NewUserPermission = () => {
    return (
        <div className="inner_content">
        <div>
            <Box className="sticky">    
            <Typography sx={{ fontWeight: 700}} variant="h5">User Permissions</Typography>  
            <Button component={Link} to='/adminportal/permissions' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Permissions</Button>  
            </Box> 
        </div>
        </div>
    );
};

export default NewUserPermission;