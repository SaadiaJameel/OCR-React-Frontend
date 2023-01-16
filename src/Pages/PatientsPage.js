import React, {useState} from 'react';
import { Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Box, Grid, Button, FormControlLabel, Checkbox} from "@mui/material";

const PatientsPage = () => {
    
    const [category, setCategory] = useState("");  
    const [gender, setGender] = useState("");  

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
         <Paper sx={{p:3, my:1}}>
                <Typography sx={{ fontWeight: 700, m: 1 }}>Add Patients Details</Typography>               
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>                    
                                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField margin="normal" size='small' label="Patients' Reg No" name="reg_no" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel size='small' id="gender">Gender</InputLabel>
                            <Select size='small' labelId="gender" value={gender} name='gender' label="Gender" onChange={handleGenderChange}>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Male'}>Male</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField margin="normal" type='number' size='small' label="Age" name="age" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel size='small' id="category">Category</InputLabel>
                                <Select size='small' labelId="category" name='category' label="Category" onChange={handleCategoryChange}>
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
                            <TextField fullWidth margin="normal" size='small' label="Histopathological diagnosis" multiline maxRows={4}/>
                        </Grid>
                    </Grid>


                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }} sx={{my:1}}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='smoking'/>} label="Smoking" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='betel'/>} label="Chewing Betel" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControlLabel control={<Checkbox name='alchol'/>} label="Alchol" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button type="submit" variant="contained" fullWidth> Add </Button>
                        </Grid>
                    </Grid>
                    
                    
                </Box>
            </Paper>
        </div>
    );
};

export default PatientsPage;