import React, { useEffect, useRef, useState} from 'react';
import { Box, Stack, Avatar, Typography, TextField, Skeleton,
       Grid, Paper} from '@mui/material';
import { stringAvatar } from './utils';
import config from '../config.json'
import axios from 'axios';
import NotificationBar from './NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector} from 'react-redux';
import ChangePasswordDialog from './ChangePasswordDialog';

const UserProfile = () => {

    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);
    const formRef = useRef();
    const userData = useSelector(state => state.userData.data);

    useEffect(()=>{
        
        const _id = JSON.parse(sessionStorage.getItem("info"))._id

        setLoading(true);

        axios.get(`${config['path']}/admin/users/${_id}`,
        { headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("info")).atoken}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        },
            withCredentials: true
        }
        ).then(res=>{
            setData(res.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        })

    },[])

    const handleUpdate = ()=>{

        const formData = new FormData(formRef.current);
        const username = formData.get('username');
      
        if(username ==="" || username.length <5){
            showMsg("Username should inlclude minimum 5 characters", "error");
            return;
        }

        setState(1);

        axios.post(`${config['path']}/auth/update`,
        {
          username: username,
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data)
            let newData = JSON.parse(sessionStorage.getItem("info"))
            newData.username = res.data.username;
            sessionStorage.setItem("info", JSON.stringify(newData));
            showMsg("User details updated successfully", "success");
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            console.log(err)
        }).finally(()=>{
            setState(0);
        })

    }

    
    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <div className='body'>
        <Box sx={{my:3}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                {loading?
                        <Paper sx={{p:3}}>
                        <Stack direction='column' spacing={2} alignItems='center'>
                            <Skeleton variant="circular" width={60} height={60} />
                            <Skeleton variant="text" width={210} sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" width={210} />
                        </Stack>
                        </Paper>
                    :
                        <Paper sx={{p:3, background:"#fbfbfb"}}>
                       <Stack direction='column' spacing={2} alignItems='center'>
                            <Avatar {...stringAvatar(data.username, 60)}/>
                            <Typography variant='h6'>{data.username}</Typography>
                            <Typography color='GrayText'>{data.reg_no}</Typography>
                        </Stack>
            
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} md={8}>
                {loading?
                    <Paper sx={{p:3}}>
                    <Stack spacing={2}>
                        <Skeleton variant="rounded" height={40}/>
                        <Skeleton variant="rounded" height={40}/>
                    </Stack>
                    </Paper>
                    :
                    <Paper sx={{p:3}}>
                    <Box component="form" noValidate ref={formRef}>

                    <Stack direction='column' spacing={3}>
                        <TextField defaultValue={data.username} name='username' size='small' label='User name'/>
                        <TextField  value={data.email} name='email' size='small' disabled label='Email'/>
                        <TextField value={data.reg_no} name='reg_no' size='small' disabled label='Reg NO'/>
                        <TextField value={data.role[0]===1?"Admin":data.role[0]===1?"Reviewer":"Clinicain"} name='role' size='small' disabled label='Role'/>
                        <TextField value={data.createdAt} name='created_at' size='small' disabled label='Created At'/>
                        <TextField value={data.updatedAt} name='updated_at' size='small' disabled label='Updated At'/>
                    </Stack>
                    <Stack direction='row' spacing={2} sx={{my:3}}>
                        <LoadingButton onClick={handleUpdate} loading={state=== 1} variant="contained" disabled={state!==0}>Update</LoadingButton>
                        <ChangePasswordDialog/>
                    </Stack>
                    </Box>

                    {/* <Box sx={{border: '1px solid red', borderRadius:'5px', my:10}}>
                        <Stack direction='row' sx={{p:3}} alignItems='end'>
                            <div style={{flexGrow: 1}}>
                            <Typography color='error'>Reset Password</Typography>
                            <Typography color='GrayText'>Once you change the password, the user will no longer be able to log in to the application using the current password.</Typography>
                            </div>
                            <ResetPasswordDialog user={data}/>
                        </Stack>
                        <Divider sx={{bgcolor: 'red'}}/>
                        <Stack direction='row' sx={{p:3}} alignItems='end'>
                            <div style={{flexGrow: 1}}>
                            <Typography color='error'>Delete user</Typography>
                            <Typography color='GrayText'>This action will permanently delete the user from the organization. Please be certain before you proceed.</Typography>
                            </div>
                            <DeleteUserDialog user={data}/>
                        </Stack>
                    </Box> */}
                    </Paper>
            }
                </Grid>
            </Grid>
            
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
        </div>
    );
};

export default UserProfile;