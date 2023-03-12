import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Stack, Avatar, Typography, TextField, FormControl, 
     Skeleton, Divider, Button, Table, TableBody, TableCell, TableRow, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormGroup, Paper} from '@mui/material';
import { stringAvatar } from '../../utils';
import config from '../../../config.json'
import axios from 'axios';
import NotificationBar from '../../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector} from 'react-redux';

const RequestDetails = () => {

    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);
    const formRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.data);
    const [selected, setSelected] = React.useState("Recruiter");
    const [permisions, setPermissions] = React.useState({
        admin: false,
        reviewer: false,
        recruiter: false,
    });
    
    const handlePermissions = (event) => {
    setPermissions({
        ...permisions,
        [event.target.name]: event.target.checked,
    });
    };
    
    const { admin, reviewer, recruiter } = permisions;
    const error = [admin, reviewer, recruiter].filter((v) => v).length === 0;

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

    const handleRole = (e)=>{
        setSelected(e.target.value);
        setPermissions({
            admin: false,
            reviewer: false,
            recruiter: false,
        })
    }

    const handleAccept = ()=>{

        const formData = new FormData(formRef.current);
        const reason = formData.get('reason');

        const role = [];
        if(permisions.admin) role.push(1);
        if(permisions.reviewer) role.push(2);
        if(permisions.recruiter) role.push(3);

        setState(1);

        axios.post(`${config['path']}/admin/accept/${data._id}`,
        {
          username: data.username,
          role: role,
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
        <div className="inner_content">
        <div>
            <Box className='sticky'>    
            <Typography sx={{ fontWeight: 700}} variant="h5">Requests</Typography>    
            
            <Button component={Link} to='/adminportal/requests' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Requests</Button>
            </Box>
            {loading?
            <Paper sx={{p:2, my:3}}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:1}}>
                <Skeleton variant="rounded" width={60} height={60} />
                <Stack direction='column'>
                    <Skeleton variant="text" width={210} sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" width={210} />
                </Stack>
            </Stack>
            <Stack spacing={2}>
                <Skeleton variant="rounded" height={40} />
                <Skeleton variant="rounded" height={40} />
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
                        <TableCell>Hospital</TableCell>
                        <TableCell>{data.hospital}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        
            </Paper>
            <Paper sx={{p:2, my:3}}>
            <Box component="form" noValidate ref={formRef}>
            <Stack direction='row' spacing={2} sx={{my:2}}>
            <FormControl>
            <FormLabel>User Role</FormLabel>
            <RadioGroup
                defaultValue="Recruiter"
                name="radio-buttons-group"
                onChange={handleRole}
            >
                <FormControlLabel value="Admin" control={<Radio />} label={<Typography variant='body2' >Admin</Typography>} />
                <FormControlLabel value="Reviewer" control={<Radio />} label={<Typography variant='body2' >Reviewer</Typography>} />
                <FormControlLabel value="Recruiter" control={<Radio />} label={<Typography variant='body2' >Recruiter</Typography>} />
            </RadioGroup>
            </FormControl>
            { selected === 'Admin' &&
                <FormControl required error={error} component="fieldset" variant="standard">
                <FormLabel component="legend">Permisions</FormLabel>
                <FormGroup>
                <FormControlLabel control={<Checkbox checked={admin} onChange={handlePermissions} name="admin" />}
                    label={<Typography variant='body2' >Accept/Reject Login Requests, Add hospitals, Manage user accounts</Typography>}
                />
                <FormControlLabel control={ <Checkbox checked={reviewer} onChange={handlePermissions} name="reviewer" /> }
                    label={<Typography variant='body2' >Review assigned consultation entries and add comments</Typography>}
                />
                <FormControlLabel control={<Checkbox checked={recruiter} onChange={handlePermissions} name="recruiter" />}
                    label={<Typography variant='body2' >Add patients and add consultation entries</Typography>}
                />
                </FormGroup>
                </FormControl>
            }
            { selected === 'Reviewer' &&
                <FormControl required error={error} component="fieldset" variant="standard">
                <FormLabel component="legend">Permisions</FormLabel>
                <FormGroup>
                <FormControlLabel control={ <Checkbox checked={reviewer} onChange={handlePermissions} name="reviewer" /> }
                    label={<Typography variant='body2' >Review assigned consultation entries and add comments</Typography>}
                />
                <FormControlLabel control={<Checkbox checked={recruiter} onChange={handlePermissions} name="recruiter" />}
                    label={<Typography variant='body2' >Add patients and add consultation entries</Typography>}
                />
                </FormGroup>
                </FormControl>
            }
            { selected === 'Recruiter' &&
                <FormControl required error={error} component="fieldset" variant="standard">
                <FormLabel component="legend">Permisions</FormLabel>
                <FormGroup>
                <FormControlLabel control={<Checkbox checked={recruiter} onChange={handlePermissions} name="recruiter" />}
                    label={<Typography variant='body2' >Add patients and add consultation entries</Typography>}
                />
                </FormGroup>
                </FormControl>
            }
            </Stack>
        
            <TextField label="Reason for Approval/Rejection (optional)" fullWidth multiline maxRows={4} name='reason' size='small' inputProps={{maxLength: 200}}/>
            
            <Stack direction='row' spacing={2} sx={{mt:3}}>
                <LoadingButton onClick={handleAccept} loading={state=== 1} variant="contained" disabled={state!==0 || error}>Accept</LoadingButton>
                <LoadingButton onClick={handleReject} loading={state === 2} variant="outlined" disabled={state!==0}>Reject</LoadingButton>
            </Stack>
            </Box>
            </Paper>
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
            <Box sx={{padding:'100px'}}></Box>
        </div>
    </div>
    );
};

export default RequestDetails;