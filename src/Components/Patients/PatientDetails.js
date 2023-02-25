import React, { useEffect, useRef, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import { ArrowBack, AccountBox, AddAPhoto, Image} from '@mui/icons-material';
import { Box, Stack, Avatar, Typography, Skeleton,Tab} from '@mui/material';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import { stringAvatar } from '../utils';
import config from '../../config.json'
import axios from 'axios';
import { useSelector} from 'react-redux';
import PatientProfile from './PatientProfile';
import NotificationBar from '../NotificationBar';
import UploadPage from './UploadPage';
import PatientImages from './PatientImages';

const tempdata = {_id: '63c771ab19fa3b752054d449', patient_id: 'P1', risk_factors: {smoking: false, betel: false, alcohol: true}, age: 28, gender: '',updatedAt
: "2023-01-18T04:12:27.061Z",createdAt : "2023-01-18T04:12:27.061Z",histo_diagnosis: "", category: "Unknown"}


const PatientDetails = () => {

  
    const [data, setData] = useState(tempdata);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = React.useState('1');
    const [status, setStatus] = useState({msg:"",severity:"success", open:false});
    const { id } = useParams();
    const userData = useSelector(state => state.data);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    };

    useEffect(()=>{

        setLoading(true);
        axios.get(`${config['path']}/user/patient/${id}`,
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

   
    return (
        <Box sx={{my:3}}>
            <Stack direction='row' sx={{my:1}} >
            <ArrowBack fontSize='small' color='action'/>
            <Link to='/manage/patients'><Typography fontSize='small' color='GrayText'>Go back to Patients</Typography></Link>
            </Stack>
            
            {loading?
            <>
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
            </>
            :
            <>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar {...stringAvatar("P", 60)} variant='rounded'/>
                <Stack direction='column'>
                    <Typography variant='h6'>Patients ID: {data.patient_id}</Typography>
                    <Typography color='GrayText'>Category: {data.category}</Typography>
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab icon={<AccountBox fontSize='small'/>}  disableRipple label="Profile" value="1" />
                    <Tab icon={<Image fontSize='small'/>} disableRipple label="Images" value="2" />
                    <Tab icon={<AddAPhoto fontSize='small'/>} disableRipple label="Upload" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1" sx={{px:0}}><PatientProfile data={data}/></TabPanel>
                <TabPanel value="2" sx={{px:0}}><PatientImages/></TabPanel>
                <TabPanel value="3" sx={{px:0}}><UploadPage/></TabPanel>
            </TabContext>
            </Box>

            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default PatientDetails;