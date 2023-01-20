import React, {useState} from 'react';
import { Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Box, Grid, Button, FormControlLabel, Checkbox, IconButton} from "@mui/material";
import { Close } from '@mui/icons-material';
import axios from 'axios';
import config from '../config.json';
import CopyToClipboard from '../Components/CopyToClipBoard';
import NotificationBar from '../Components/NotificationBar';

const pdata = {
    patient_id: "P158",
    age: "28",
    gender: "Male",
    risk_factors:["smoking"],
    category:"Benign",
    histo_diagnosis: ""
}

const PatientsPage = () => {
    
    const [category, setCategory] = useState("Unknown");  
    const [gender, setGender] = useState('Male'); 
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState(null);

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    const handleGenderChange = (event) =>{
        setGender(event.target.value);
    }

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleGet = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(data.get('patient_id')===""){
            showMsg("Enter the patient ID", "error")
            return
        }

        setPatientData(pdata);

    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('patient_id')==="" || data.get('age')==="" || data.get('gender')===""){
            showMsg("Cannot leave required fields empty", "error")
            return
        }

        if(data.get('age') < 0 || data.get('age') > 100){
            showMsg("Age is out of range (0 < Age < 100)", "error")
            return
        }

        let dataToSend ={
            patient_id: data.get('patient_id'),
            risk_factors:{
                smoking: data.get('smoking')? true: false,
                betel: data.get('betel')? true: false,
                alcohol: data.get('alcohol')? true: false
            },
            age: data.get('age'),
            gender: data.get('gender'),
            histo_diagnosis: data.get('histo_diagnosis'),
            category: data.get('category')
        }

        setLoading(true)

        axios.post(`${config['path']}/user/patient/add`,dataToSend,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success")
           
        }).catch(err=>{
            console.log(err)
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setLoading(false)
        })
        
    }

    return (
        <div className='body'>
            <Paper sx={{p:3, my:1}}>
                <Typography sx={{ fontWeight: 700, m: 1 }}>Check Patient Details</Typography>               
                <Box component="form" onSubmit={handleGet} noValidate sx={{ mt: 1 }}>                    
                                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField margin="normal" size='small' required label="Patients' Reg No" name="patient_id" fullWidth autoComplete='off' inputProps={{ maxLength: 100 }}/>
                        </Grid>                       
                        <Grid item xs={12} sm={6} md={3}>
                            <Button type="submit" sx={{mt:2}} variant="contained" disabled={loading} fullWidth> Get Details </Button>
                        </Grid>
                    </Grid>
                </Box>
                {
                    patientData &&
                    <Box style={{border:'1px solid lightgray', padding: '10px'}}>
                        <div style={{display: 'flex', flexDirection:'row-reverse'}}>
                            <IconButton size='small' onClick={()=>setPatientData(null)}><Close fontSize='small'/></IconButton>
                        </div>
                        <table><tbody>
                        <tr><td>Register No:</td><td>{patientData.patient_id} <CopyToClipboard text={patientData.patient_id}/></td></tr>
                        <tr><td>Age:</td><td>{patientData.age}</td></tr>
                        <tr><td>Gender:</td><td>{patientData.gender}</td></tr>
                        <tr><td>Category:</td><td>{patientData.category}</td></tr>
                        <tr><td>Histopathological Diagnosis:</td><td>{patientData.histo_diagnosis}</td></tr>
                        </tbody></table>
                    </Box>
                }
            </Paper>

            <Paper sx={{p:3, my:1}}>
                <Typography sx={{ fontWeight: 700, m: 1 }}>Add Patient Details</Typography>               
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>                    
                                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField margin="normal" size='small' required label="Patients' Reg No" name="patient_id" fullWidth autoComplete='off' inputProps={{ maxLength: 100 }}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <FormControl required margin="normal" fullWidth>
                            <InputLabel size='small' id="gender">Gender</InputLabel>
                            <Select size='small' labelId="gender" value={gender} name='gender' label="Gender" onChange={handleGenderChange}>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Male'}>Male</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField margin="normal" required size='small' label="Age" name="age" inputProps={{ type:'number', min: 0, max: 100 }} fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
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
                        </Grid>
                    </Grid>


                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} sx={{my:1}}>
                        <Grid item md={12}>
                            <TextField fullWidth margin="normal" size='small' label="Histopathological diagnosis" name="histo_diagnosis" multiline maxRows={4}/>
                        </Grid>
                    </Grid>


                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} sx={{my:1}}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='smoking'/>} label="Smoking" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='betel' defaultChecked={false} />} label="Chewing Betel" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='alcohol' defaultChecked={false} />} label="Alcohol" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button type="submit" variant="contained" disabled={loading} fullWidth> Add </Button>
                        </Grid>
                    </Grid> 
                </Box>
            </Paper>

            <NotificationBar status={status} setStatus={setStatus}/>       
        </div>
    );
};

export default PatientsPage;