import React, { useRef, useState} from 'react';
import { Button, Box, Stack, TextField, FormControl, MenuItem, Select, InputLabel, Checkbox, FormControlLabel, Avatar, Typography} from '@mui/material';
import NotificationBar from '../NotificationBar';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const data = {
    category: "Healthy",
    risk_factors: ["smoking"],
    patient_id: "p17",
    age: 25,
    gender: "Male"

}
const PatientProfile = () => {

    const [role, setRole] = useState(3);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false});
    const [category, setCategory] = useState(data.category);
    const formRef = useRef();

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleCategoryChange =(e)=>{
        setCategory(e.target.value);
    }

    const handleUpdate = ()=>{

        const formData = new FormData(formRef.current);

    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <Box>
            <Stack direction='row' sx={{my:1}} >
            <ArrowBack fontSize='small' color='action'/>
            <Link to='/manage/patients/all'><Typography fontSize='small' color='GrayText'>Go back to Requests</Typography></Link>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                <Avatar/>
                <Typography variant='h6'>Patients ID: {data.patient_id}</Typography>
            </Stack>

            <Box component="form" noValidate ref={formRef} sx={{mt:5}}>

            <Stack direction='column' spacing={2}>

                <Stack direction='row' spacing={2}>
                    <TextField fullWidth defaultValue={data.patient_id} name='patient_id' size='small' label='Patient ID' disabled/>
                    <TextField fullWidth defaultValue={data.age} name='age' size='small' label='Age'/>
                    <TextField fullWidth defaultValue={data.gender} name='gender' size='small' label='Gender'/>
                </Stack>

                <FormControl margin="normal" fullWidth>
                    <InputLabel size='small' id="category">Category</InputLabel>
                    <Select size='small' labelId="category" value={category} name='category' label="Category" onChange={handleCategoryChange}>
                        <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        <MenuItem value={'Healthy'}>Healthy</MenuItem>
                        <MenuItem value={'Benign'}>Benign</MenuItem>
                        <MenuItem value={'OPMD'}>OPMD</MenuItem>
                        <MenuItem value={'OCA'}>OCA</MenuItem>
                    </Select>
                </FormControl>

                <TextField  defaultValue={data.histo_diagnosis} name='histo_diagnosis' size='small' label='Histopathological Diagnosis'/>

                <Stack direction='row' spacing={2}>
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('alcohol')} name='alcohol'/>} label="Alcohol" />
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('smoking')} name='smoking'/>} label="Smoking" />
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.includes('betel')} name='betel'/>} label="Chewing betel"/>               
                </Stack>
               
                
            </Stack>
            <Stack direction='row' spacing={2} sx={{my:3}}>
                <Button variant='contained' onClick={handleUpdate}>Update</Button>
            </Stack>
            
            </Box>
            <NotificationBar status={status} setStatus={setStatus}/>
        </Box>
    );
};

export default PatientProfile;