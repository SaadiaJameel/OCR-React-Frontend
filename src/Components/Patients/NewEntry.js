import React, {useState} from 'react';
import { Box, Stack, TextField, FormControl, MenuItem, Select, 
    List, ListItem, IconButton, ListItemText, InputLabel, Button} from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import UploadPage from './UploadPage';
import UploadTests from './UploadTests';

const habitOptions = [
    {value: "Smoking", label: "Smoking"},
    {value: "Alcohol", label: "Alcohol"},
    {value: "Betel quid", label: "Betel quid"},
    {value: "Smokeless tobacco", label: "Smokeless tobacco"}
]

const frequencyOptions = [
    {value: "Daily", label: "Daily"},
    {value: "Weekly", label: "Weekly"},
    {value: "Bi-weekly", label: "Bi-weekly"},
    {value: "Monthly", label: "Monthly"},
    {value: "Occasionally", label: "Occasionally"},
]

const NewEntry = ({data}) => {
    const [riskHabits, setRiskHabits] = useState([]);
    const [habit, setHabit] = useState(habitOptions[0].value);
    const [frequency, setFrequency] = useState(frequencyOptions[0].value);

    const removeRisk = (item)=>{
        let newList = riskHabits.filter((habit)=> {return habit !== item})
        setRiskHabits(newList);
    }

    const handleAddRisk = ()=>{
        let newList = riskHabits.filter((newHabit)=> {return newHabit.habit !== habit});
        newList.unshift({habit,frequency});
        setRiskHabits(newList);
    }


    return (
        <Box component='form' my={3} >
        <Stack spacing={2}>
           <TextField fullWidth size='small' defaultValue={data.patient_id} name='patient_id' disabled label="Patient Id"  sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}}/> 
           <TextField fullWidth size='small' defaultValue={data.patient_id} name='patient_name' disabled label="Patient name"  sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000"}}}/> 
           <TextField fullWidth size='small' name='complaints' label="presenting complaint"/> 
           <TextField fullWidth size='small' name='findings' label="examination findings"/>
           <Stack direction='row' spacing={1} alignItems='flex-end' >
           <FormControl fullWidth>
            <InputLabel id="habit-label" size='small' >Habit</InputLabel>
            <Select labelId='habit-label' size='small' label="Habit" value={habit} onChange={(e)=>setHabit(e.target.value)}>
                {
                    habitOptions.map((item,index)=>{return(<MenuItem key={index} value={item.value}>{item.label}</MenuItem>)})
                }
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="frequency-label" size='small' >Frequency</InputLabel>
            <Select labelId="frequency-label" size='small' label="Frequency" value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
                {
                    frequencyOptions.map((item,index)=>{return(<MenuItem key={index} value={item.value}>{item.label}</MenuItem>)})
                }
            </Select>
            </FormControl>
            <IconButton onClick={handleAddRisk} ><Done color='success'/></IconButton>
            </Stack>
            {riskHabits.length > 0 && 
            <List sx={{border:'1px solid lightgray', borderRadius: 1, pl:2}}>
            {
                riskHabits.map((item, index)=>{
                    return(
                        <ListItem key={index} disablePadding
                            secondaryAction={
                                <IconButton edge="end" onClick={()=>removeRisk(item)}>
                                <Close fontSize='small' color='error' />
                                </IconButton>
                            }
                        >
                        <ListItemText
                            primary={item.habit}
                            secondary={item.frequency} 
                        />
                        </ListItem>
                    )
                })
            }
            </List>}
            <Box sx={{border:'1px solid lightgray', borderRadius: 1, p:2}}>
                <UploadPage/>
            </Box>
            <Box sx={{border:'1px solid lightgray', borderRadius: 1, p:2}}>
                <UploadTests/>
            </Box>
        </Stack>
        <Button sx={{my:3}} variant='contained' >Save Entry</Button>
        </Box>
    );
};

export default NewEntry;