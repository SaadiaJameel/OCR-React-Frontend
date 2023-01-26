import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Button, Box, Stack, Avatar, Typography, TextField, Divider} from '@mui/material';
import { stringAvatar } from '../utils';
import ResetPasswordDialog from './ResetPasswordDialog';
import DeleteUserDialog from './DeleteUserDialog';

const EditProfile = ({setEditing, data}) => {
    const handleSave = (e)=>{
        e.preventDefault();
    }

    return (
        <Box sx={{my:3}}>
            <Stack direction='row' alignItems='center'>
            <ArrowBack fontSize='small'/>
            <Button onClick={()=>setEditing(false)} size='small' color='inherit'>Go back to Reviewers</Button>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar {...stringAvatar(data.username, 60)}/>
                <Stack direction='column'>
                    <Typography variant='h6'>{data.username}</Typography>
                    <Typography color='GrayText'>{data.reg_No}</Typography>
                </Stack>
            </Stack>
            <Box component="form" noValidate onSubmit={handleSave} sx={{ mt: 5 }}>

            <Stack direction='column' spacing={3}>
                <TextField defaultValue={data.username} name='username' size='small' label='user name'/>
                <TextField  value={data.email} name='email' size='small' disabled label='email'/>
                <TextField value={data.reg_No} name='reg_no' size='small' disabled label='reg no'/>
            </Stack>
            <Stack direction='row' spacing={2} sx={{my:3}}>
                <Button type='submit' variant='contained'>Update</Button>
                <Button onClick={()=>setEditing(false)} variant='outlined'>Cancle</Button>
            </Stack>
            </Box>
            <Box sx={{border: '1px solid red', borderRadius:'5px', my:10}}>
                <Stack direction='row' sx={{p:3}} alignItems='end'>
                    <div style={{flexGrow: 1}}>
                    <Typography color='error'>Reset Password</Typography>
                    <Typography color='GrayText'>Once you change the password, the user will no longer be able to log in to the application using the current password.</Typography>
                    </div>
                    <ResetPasswordDialog/>
                </Stack>
                <Divider sx={{bgcolor: 'red'}}/>
                <Stack direction='row' sx={{p:3}} alignItems='end'>
                    <div style={{flexGrow: 1}}>
                    <Typography color='error'>Delete user</Typography>
                    <Typography color='GrayText'>This action will permanently delete the user from the organization. Please be certain before you proceed.</Typography>
                    </div>
                    <DeleteUserDialog user={data}/>
                </Stack>
            </Box>
        </Box>
    );
};

export default EditProfile;