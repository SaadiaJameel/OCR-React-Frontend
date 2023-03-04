import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { ArrowBack, LocalHospital } from '@mui/icons-material';
import { Box, Stack, Avatar, Typography, TextField, FormControl, 
     Skeleton, Divider, Button, Table, TableBody, TableCell, TableRow, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormGroup} from '@mui/material';
import { useSelector} from 'react-redux';
import config from '../../../config.json'
import axios from 'axios';
import NotificationBar from '../../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import View from './View';

const HospiatalDetails = () => {

    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [data, setData] = useState({});
    const [page, setPage] = useState("");
    const selectorData = useSelector(state => state.data);
    const [userData, setUserData] = useState(selectorData);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(()=>{
        setLoading(true);
        axios.get(`${config['path']}/user/hospitals/${id}`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data);
            console.log(data)
            setLoading(false);
            setPage("View")
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        })
        setLoading(false);
    },[])

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <div className="inner_content">
        <div>
            <Box>    
            <Typography sx={{ fontWeight: 700}} variant="h5">Hospital</Typography>    
            
            <Button component={Link} to='/adminportal/hospitals' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Hospitals</Button>
            </Box>  
            {loading?
            <>
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
            </>
            :
            <>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mt:3}}>
                <LocalHospital sx={{width:'60px',height:'60px'}} color='error'/>
                <Stack direction='column'>
                    <Typography variant='h6'>{"Hospital Name"}</Typography>
                </Stack>
            </Stack>
            {
                page === "View" &&
                <View data={data}/>
            }
            
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </div>
    </div>
    );
};

export default HospiatalDetails;