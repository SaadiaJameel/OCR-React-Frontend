import React, { useRef, useState} from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Button, Box, Stack, Avatar, Typography, TextField, FormControl, MenuItem, Select, InputLabel} from '@mui/material';
import { stringAvatar } from '../utils';
import config from '../../config.json'
import axios from 'axios';
import NotificationBar from '../NotificationBar';

const CheckRequest = ({setView, data}) => {

    const [role, setRole] = useState(3);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const formRef = useRef();

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleAccept = ()=>{

        const formData = new FormData(formRef.current);

        axios.post(`${config['path']}/admin/accept/${data._id}`,
        {
          email: JSON.parse(sessionStorage.getItem("info")).email,
          username: JSON.parse(sessionStorage.getItem("info")).username,
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success")
            setView(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        })

    }

    const handleReject = ()=>{
       
        axios.delete(`${config['path']}/admin/requests/${data._id}`,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }},
        {
            email: JSON.parse(sessionStorage.getItem("info")).email,
            username: JSON.parse(sessionStorage.getItem("info")).username,
        }
        ).then(res=>{
            setView(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message)
            else alert(err)
        })
    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <Box sx={{my:3}}>
            <Stack direction='row' alignItems='center'>
            <ArrowBack fontSize='small'/>
            <Button onClick={()=>setView(false)} size='small' color='inherit'>Go back to Requests</Button>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar {...stringAvatar(data.username, 60)}/>
                <Stack direction='column'>
                    <Typography variant='h6'>{data.username}</Typography>
                    <Typography color='GrayText'>{data.reg_no}</Typography>
                </Stack>
            </Stack>
            <Box component="form" noValidate ref={formRef} sx={{ mt: 5 }}>

            <Stack direction='column' spacing={3}>
                <TextField defaultValue={data.username} name='username' size='small' label='User name'/>
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
            </Stack>
            <Stack direction='row' spacing={2} sx={{my:3}}>
                <Button variant='contained' onClick={handleAccept}>Accept</Button>
                <Button variant='outlined' onClick={handleReject}>Reject</Button>
            </Stack>
            </Box>
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default CheckRequest;