import React, {useState, useRef} from 'react';
import NotificationBar from '../NotificationBar';
import { Box, Stack, Avatar, Typography, TextField, Skeleton, Button, Tab,
    FormControl, MenuItem, Select, InputLabel, FormControlLabel, Checkbox, Grid} from '@mui/material';
    import {TabContext,TabList,TabPanel} from '@mui/lab';
    import { stringAvatar } from '../utils';
    import config from '../../config.json'
    import axios from 'axios';
    import { useSelector} from 'react-redux';


const PatientProfile = ({data}) => {
    const [status, setStatus] = useState({msg:"",severity:"success", open:false})
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(data.category);
    const [gender, setGender] = useState(data.gender);
    const [state, setState] = useState(0);
    const userData = useSelector(state => state.data);

    const formRef = useRef();
    
    const handleSave = ()=>{

        const formData = new FormData(formRef.current);
        const age = formData.get('age');
        const gender = formData.get('gender');
        const smoking = formData.get('smoking')?true:false;
        const betel = formData.get('betel')?true:false;
        const alcohol = formData.get('alcohol')?true:false;
        const histo_diagnosis = formData.get('histo_diagnosis');
        const category = formData.get('category');
        
        const updated = {
            gender,age,histo_diagnosis,category,
            risk_factors:{betel,alcohol,smoking}
        }

        setState(1);

        axios.post(`${config['path']}/user/patient/update/${data._id}`, updated,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg("Patient details updated successfully", "success");
            window.location.reload(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setState(0);
        })

    }

    const handleCategoryChange =(e)=>{
        setCategory(e.target.value);
    }

    const handleGenderChange =(e)=>{
        setGender(e.target.value);
    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }


    return (
        <div>
        <Box component="form" noValidate ref={formRef} sx={{mt:3}}>

        <Stack direction='column' spacing={2} sx={{maxWidth:'600px'}}>


            <TextField fullWidth defaultValue={data.patient_id} name='patient_id' size='small' label='Patient ID' disabled/>
            <TextField fullWidth defaultValue={data.age} type='number' name='age' size='small' label='Age'/>

            <FormControl margin="normal" fullWidth>
                <InputLabel size='small' id="gender">Gender</InputLabel>
                <Select size='small' labelId="gender" value={gender} name='gender' label="Gender" onChange={handleGenderChange} sx={{background:"#fbfbfb"}}>
                    <MenuItem value={''}>-------</MenuItem>
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel size='small' id="category">Category</InputLabel>
                <Select size='small' labelId="category" value={category} name='category' label="Category" onChange={handleCategoryChange} sx={{background:"#fbfbfb"}}>
                    <MenuItem value={'Unknown'}>Unknown</MenuItem>
                    <MenuItem value={'Healthy'}>Healthy</MenuItem>
                    <MenuItem value={'Benign'}>Benign</MenuItem>
                    <MenuItem value={'OPMD'}>OPMD</MenuItem>
                    <MenuItem value={'OCA'}>OCA</MenuItem>
                </Select>
            </FormControl>

            <TextField  defaultValue={data.histo_diagnosis} name='histo_diagnosis' multiline maxRows={4} size='small' label='Histopathological Diagnosis' sx={{background:"#fbfbfb"}}/>

            <Grid container>
                <Grid item xs={12} md={4}>
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.alcohol} name='alcohol'/>} label="Alcohol" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.smoking} name='smoking'/>} label="Smoking" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControlLabel control={<Checkbox defaultChecked={data.risk_factors.betel} name='betel'/>} label="Chewing betel"/>               
                </Grid>
            </Grid>

            
        </Stack>
        <Stack direction='row' spacing={2} sx={{my:3}}>
            <Button variant='contained' onClick={handleSave}>Save</Button>
        </Stack>

        </Box>
        <NotificationBar status={status} setStatus={setStatus}/>
        </div>
    );
};

export default PatientProfile;