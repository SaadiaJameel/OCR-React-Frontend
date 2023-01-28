import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Button, Box, Stack, Avatar, Typography, TextField, FormControl, MenuItem, Select, InputLabel, Skeleton} from '@mui/material';
import { stringAvatar } from '../utils';
import config from '../../config.json'
import axios from 'axios';
import NotificationBar from '../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';

const CheckRequest = () => {

    const [role, setRole] = useState(3);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);
    const formRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate()

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(()=>{

        setLoading(true);
        axios.get(`${config['path']}/admin/requests/${id}`,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        })

    },[])

    const handleAccept = ()=>{

        const formData = new FormData(formRef.current);
        const role = formData.get('role');
        const username = formData.get('username');
        const reason = formData.get('reason');

        setState(1);

        axios.post(`${config['path']}/admin/accept/${data._id}`,
        {
          username: username,
          role: [role],
          reason: reason
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            navigate("/adminportal/requests");
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            setState(0);
        })

    }

    const handleReject = ()=>{

        const formData = new FormData(formRef.current);
        const reason = formData.get('reason');
       
        setState(2);
        
        axios.post(`${config['path']}/admin/requests/${data._id}`,
        {
            reason: reason
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success")
            navigate("/adminportal/requests");
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message)
            else alert(err)
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
            <Link to='/adminportal/requests'><Typography fontSize='small' color='GrayText'>Go back to Requests</Typography></Link>
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
                <TextField defaultValue={data.username} name='username' size='small' label='User name' inputProps={{maxLength: 50}}/>
                <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                <TextField  value={data.email} name='email' size='small' disabled label='Email'/>
                <TextField value={data.reg_no} name='reg_no' size='small' disabled label='Reg no'/>
                <TextField label="Reason (optional)" multiline maxRows={4} name='reason' size='small' inputProps={{maxLength: 200}}/>
            </Stack>
            <Stack direction='row' spacing={2} sx={{my:3}}>
                <LoadingButton size="small" onClick={handleAccept} loading={state=== 1} variant="contained" disabled={state!=0}>Accept</LoadingButton>
                <LoadingButton size="small" onClick={handleReject} loading={state === 2} variant="outlined" disabled={state!=0}>Reject</LoadingButton>
            </Stack>
            </Box>
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default CheckRequest;