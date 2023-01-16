import React, {useState} from 'react';
import { Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Box, Grid, Button, FormControlLabel, Checkbox} from "@mui/material";

const AllRiskFactors = ['Smoking', 'Chewing Betel','Alcohol'];

const PatientsPage = () => {

    const [riskFactor, setRiskFactor] = useState([]);
    const [category, setCategory] = useState("");  
    const [gender, setGender] = useState("");  

    const handleRiskFactorChange = (event) => {
      const {target: { value },} = event;
      setRiskFactor(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleGenderChange = (event) =>{
        setGender(event.target.value);
    }

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('reg_no'))
        console.log(data.get('category'))
    }
    return (
        <div className='body'>
         <Paper sx={{p:2, my:1}}>
                <Typography sx={{ fontWeight: 700, m: 1 }}>Add Patients Details</Typography>               
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>                    
                                    
                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }}>
                        <Grid item>
                            <TextField margin="normal" size='small' label="Patients' Reg No" name="reg_no" sx={{width:'250px'}}/>
                        </Grid>
                        <Grid item>
                        <FormControl margin="normal">
                            <InputLabel size='small' id="gender">Gender</InputLabel>
                            <Select size='small' labelId="gender" value={gender} name='gender' label="Gender" onChange={handleGenderChange} sx={{width:'250px'}}>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Male'}>Male</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField margin="normal" type='number' size='small' label="Age" name="age" sx={{width:'250px'}}/>
                        </Grid>
                        <Grid item>
                            <FormControl margin="normal">
                                <InputLabel size='small' id="category">Category</InputLabel>
                                <Select size='small' labelId="category" name='category' label="Category" sx={{width:'250px'}} onChange={handleCategoryChange}>
                                    <MenuItem value={'Healthy'}>Healthy</MenuItem>
                                    <MenuItem value={'Benign'}>Benign</MenuItem>
                                    <MenuItem value={'OPMD'}>OPMD</MenuItem>
                                    <MenuItem value={'OCA'}>OCA</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} sx={{my:1}}>
                        <Grid item>
                            <TextField fullWidth margin="normal" size='small' label="Histopathological diagnosis" multiline maxRows={4} sx={{width:'250px'}}/>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} sx={{my:1}}>
                        <Grid item>
                            <FormControlLabel control={<Checkbox name='smoking'/>} label="Smoking" />
                        </Grid>
                        <Grid item>
                            <FormControlLabel control={<Checkbox name='betel'/>} label="Chewing Betel" />
                        </Grid>
                        <Grid item>
                            <FormControlLabel control={<Checkbox name='alchol'/>} label="Alchol" />
                        </Grid>
                    </Grid>
                    
                    
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Add </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default PatientsPage;