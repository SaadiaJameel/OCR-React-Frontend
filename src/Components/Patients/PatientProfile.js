// import React, { useRef, useState} from 'react';
// import { Button, Box, Stack, TextField, FormControl, MenuItem, Select, InputLabel, Checkbox, FormControlLabel, Avatar, Typography} from '@mui/material';
// import NotificationBar from '../NotificationBar';
// import { Link } from 'react-router-dom';
// import { ArrowBack } from '@mui/icons-material';

// const data = {
//     category: "Healthy",
//     risk_factors: ["smoking"],
//     patient_id: "p17",
//     age: 25,
//     gender: "Male"

// }
// const PatientProfile = () => {

//     const [role, setRole] = useState(3);
//     const [status, setStatus] = useState({msg:"",severity:"success", open:false});
//     const [category, setCategory] = useState(data.category);
//     const formRef = useRef();

//     const handleChange = (event) => {
//         setRole(event.target.value);
//     };

//     const handleCategoryChange =(e)=>{
//         setCategory(e.target.value);
//     }

//     const handleUpdate = ()=>{

//         const formData = new FormData(formRef.current);

//     }

//     const showMsg = (msg, severity)=>{
//         setStatus({msg, severity, open:true})
//     }

//     return (
//         <Box>
//             <Stack direction='row' sx={{my:1}} >
//             <ArrowBack fontSize='small' color='action'/>
//             <Link to='/manage/patients/all'><Typography fontSize='small' color='GrayText'>Go back to Requests</Typography></Link>
//             </Stack>
//             <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
//                 <Avatar/>
//                 <Typography variant='h6'>Patients ID: {data.patient_id}</Typography>
//             </Stack>

//             <Box component="form" noValidate ref={formRef} sx={{mt:5}}>

//             <Stack direction='column' spacing={2}>

//                 <Stack direction='row' spacing={2}>
//                     <TextField fullWidth defaultValue={data.patient_id} name='patient_id' size='small' label='Patient ID' disabled/>
//                     <TextField fullWidth defaultValue={data.age} name='age' size='small' label='Age'/>
//                     <TextField fullWidth defaultValue={data.gender} name='gender' size='small' label='Gender'/>
//                 </Stack>

//                 <FormControl margin="normal" fullWidth>
//                     <InputLabel size='small' id="category">Category</InputLabel>
//                     <Select size='small' labelId="category" value={category} name='category' label="Category" onChange={handleCategoryChange}>
//                         <MenuItem value={'Unknown'}>Unknown</MenuItem>
//                         <MenuItem value={'Healthy'}>Healthy</MenuItem>
//                         <MenuItem value={'Benign'}>Benign</MenuItem>
//                         <MenuItem value={'OPMD'}>OPMD</MenuItem>
//                         <MenuItem value={'OCA'}>OCA</MenuItem>
//                     </Select>
//                 </FormControl>

//                 <TextField  defaultValue={data.histo_diagnosis} name='histo_diagnosis' size='small' label='Histopathological Diagnosis'/>

//                 <Stack direction='row' spacing={2}>
//                     <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('alcohol')} name='alcohol'/>} label="Alcohol" />
//                     <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('smoking')} name='smoking'/>} label="Smoking" />
//                     <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('betel')} name='betel'/>} label="Chewing betel"/>               
//                 </Stack>
               
                
//             </Stack>
//             <Stack direction='row' spacing={2} sx={{my:3}}>
//                 <Button variant='contained' onClick={handleUpdate}>Update</Button>
//             </Stack>
            
//             </Box>
//             <NotificationBar status={status} setStatus={setStatus}/>
//         </Box>
//     );
// };

// export default PatientProfile;

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
import { useSelector} from 'react-redux';

const PatientProfile = () => {

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
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
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
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
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
                <Skeleton variant="rounded" height={40} width={600}/>
                <Skeleton variant="rounded" height={40} width={600}/>
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

            <Stack direction='column' spacing={3} sx={{maxWidth:'600px'}}>
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
                    sx= {{backgroundColor: '#fbfbfb'}}  
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
                <LoadingButton onClick={handleUpdate} loading={state=== 1} variant="contained" disabled={state!==0}>Update</LoadingButton>
            </Stack>
            </Box>
            </>
}
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default PatientProfile;