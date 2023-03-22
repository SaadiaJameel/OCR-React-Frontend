import React, { useEffect, useRef, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Stack, Avatar, Typography, Skeleton, Button, Divider, 
         Table, TableBody, TableCell, TableRow, Paper} from '@mui/material';
import { stringAvatar } from '../../utils';
import config from '../../../config.json'
import axios from 'axios';
import NotificationBar from '../../NotificationBar';
import ResetPasswordDialog from './ResetPasswordDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { useSelector} from 'react-redux';

const UserDetails = () => {

    const [role, setRole] = useState();
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [isDeelete, setIsDelete] = useState(false);
    const [state, setState] = useState(0);
    const formRef = useRef();
    const { id } = useParams();
    const userData = useSelector(state => state.data);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(()=>{

        setLoading(true);
        axios.get(`${config['path']}/admin/users/${id}`,
        { headers: {
            'Authorization':  `Bearer ${userData.accessToken.token}`,
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
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
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
        <div className="inner_content">
        <div> 
        <Box className='sticky'>    
            <Typography sx={{ fontWeight: 700}} variant="h5">Users</Typography>    
        
        <Button component={Link} to='/adminportal/users' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Users</Button>
        </Box>
        <Box sx={{my:3}}>            
            {loading?
            <Paper sx={{p:2, my:3}}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Skeleton variant="rounded" width={60} height={60} />
                <Stack direction='column'>
                    <Skeleton variant="text" width={210} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" width={210} />
                </Stack>
            </Stack>
            <Stack spacing={2}>
                <Skeleton variant="rounded" height={40} width={600}/>
                <Skeleton variant="rounded" height={40} width={600}/>
            </Stack>
            </Paper>
            :
            <>
            <Paper sx={{p:2, my:3}}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar {...stringAvatar(data.username, 60)} variant='rounded' />
                <Stack direction='column'>
                    <Typography variant='h6'>{data.username}</Typography>
                    <Typography color='GrayText'>{data.reg_no}</Typography>
                </Stack>
            </Stack>

            <Box component="form" noValidate ref={formRef} sx={{ mt: 5 }}>

            <Table  sx={{border: '1px solid lightgray'}}>
                <TableBody>
                    <TableRow>
                        <TableCell>Name:</TableCell>
                        <TableCell>{data.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>SLMC Register Number:</TableCell>
                        <TableCell>{data.reg_no}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email:</TableCell>
                        <TableCell>{data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Contact No:</TableCell>
                        <TableCell>{data.contact_no? data.contact_no.replace(/\s/g, ''):""}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hospital:</TableCell>
                        <TableCell>{data.hospital}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Role</TableCell>
                        <TableCell>{data.role}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Created at:</TableCell>
                        <TableCell>{(data.createdAt?.split("T"))[0]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* <Stack direction='row' spacing={2} sx={{my:3}}>
                <LoadingButton onClick={handleUpdate} loading={state=== 1} variant="contained" disabled={state!==0}>Update</LoadingButton>
            </Stack> */}
            </Box>
            </Paper>
            <Paper sx={{p:2, my:3}}>
            <Box sx={{border: '1px solid red', borderRadius:'5px'}}>
                <Stack direction='row' sx={{p:3}} alignItems='end'>
                    <div style={{flexGrow: 1}}>
                    <Typography color='error'>Reset Password</Typography>
                    <Typography color='GrayText'>Once you change the password, the user will no longer be able to log in to the application using the current password.</Typography>
                    </div>
                    <Button variant='contained' color='error' onClick={()=>setIsReset(!isReset)}>Reset Password</Button>
                </Stack>
                {
                    isReset &&
                    <Stack sx={{p:3}} justifyContent='center' direction='row'>
                        <ResetPasswordDialog user={data} setIsReset={setIsReset}/>
                    </Stack>
                    
                }
                <Divider sx={{bgcolor: 'red'}}/>
                <Stack direction='row' sx={{p:3}} alignItems='end'>
                    <div style={{flexGrow: 1}}>
                    <Typography color='error'>Delete user</Typography>
                    <Typography color='GrayText'>This action will permanently delete the user from the organization. Please be certain before you proceed.</Typography>
                    </div>
                    <Button variant='contained' color='error' onClick={()=>setIsDelete(!isDeelete)}>Delete User</Button>
                </Stack>
                {
                    isDeelete &&
                    <Stack sx={{p:3}} direction='row'>
                        <DeleteUserDialog user={data} setIsDelete={setIsDelete}/>
                    </Stack>
                    
                }
            </Box>
            </Paper>
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
        </div>
        </div>
    );
};

export default UserDetails;