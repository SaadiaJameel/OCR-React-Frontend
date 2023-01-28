import React, { useEffect, useRef, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Stack, Avatar, Typography, TextField, Skeleton, Button, Divider, 
        FormControl, MenuItem, Select, InputLabel} from '@mui/material';
import { stringAvatar } from '../utils';
import config from '../../config.json'
import axios from 'axios';
import NotificationBar from '../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import ResetPasswordDialog from './ResetPasswordDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { useSelector} from 'react-redux';

const UserDetails = () => {

    const [role, setRole] = useState();
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);
    const formRef = useRef();
    const { id } = useParams();
    const userData = useSelector(state => state.userData.data);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(()=>{

        setLoading(true);
        axios.get(`${config['path']}/admin/users/${id}`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': userData.email,
        },
            withCredentials: true
        }
        ).then(res=>{
            setData(res.data);
            setLoading(false);
            console.log(res.data)
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        })

    },[])

    const handleUpdate = ()=>{

        const formData = new FormData(formRef.current);
        const role = parseInt(formData.get('role'));
        const username = formData.get('username');
      
        setState(1);

        axios.post(`${config['path']}/admin/update/user/${data._id}`,
        {
          username: username,
          role: [role]
        },
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': userData.email,
        },
            withCredentials: true
        }
        ).then(res=>{
            setData(res.data)
            showMsg("User details updated successfully", "success");
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setState(0);
        })

    }

    
    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <Box sx={{my:3}}>
            <Stack direction='row' sx={{my:1}} >
            <ArrowBack fontSize='small' color='action'/>
            <Link to='/adminportal/reviewers'><Typography fontSize='small' color='GrayText'>Go back to Reviewers</Typography></Link>
            </Stack>
            
            {loading?
            <>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Skeleton variant="circular" width={60} height={60} />
                <Stack direction='column'>
                    <Skeleton variant="text" width={210} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" width={210} />
                </Stack>
            </Stack>
            <Stack spacing={2}>
                <Skeleton variant="rounded" height={40} />
                <Skeleton variant="rounded" height={40} />
            </Stack>
            </>
            :
            <>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar {...stringAvatar(data.username, 60)}/>
                <Stack direction='column'>
                    <Typography variant='h6'>{data.username}</Typography>
                    <Typography color='GrayText'>{data.reg_no}</Typography>
                </Stack>
            </Stack>

            <Box component="form" noValidate ref={formRef} sx={{ mt: 5 }}>

            <Stack direction='column' spacing={3}>
                <TextField defaultValue={data.username} name='username' size='small' label='user name'/>
                <TextField  value={data.email} name='email' size='small' disabled label='email'/>
                <TextField value={data.reg_no} name='reg_no' size='small' disabled label='reg no'/>
                <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={data.role[0]}
                    value={role}
                    label="Role"
                    name='role'
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>Reviewer</MenuItem>
                    <MenuItem value={3}>Clinician</MenuItem>
                    </Select>
                </FormControl>
                <TextField value={data.createdAt} name='created_at' size='small' disabled label='Created At'/>
                <TextField value={data.updatedAt} name='updated_at' size='small' disabled label='Updated At'/>
            </Stack>
            <Stack direction='row' spacing={2} sx={{my:3}}>
                <LoadingButton size="small" onClick={handleUpdate} loading={state=== 1} variant="contained" disabled={state!==0}>Update</LoadingButton>
            </Stack>
            </Box>

            <Box sx={{border: '1px solid red', borderRadius:'5px', my:10}}>
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
            </Box>
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default UserDetails;