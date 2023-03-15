import React, {useRef, useState} from 'react';
import { Box, Stack, TextField, FormControl, MenuItem, Select, 
    List, ListItem, IconButton, ListItemText, InputLabel, Button, ListItemAvatar, Avatar} from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import UploadPage from './UploadPage';
import UploadTests from './UploadTests';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AssigneeDropdown from '../AssigneeDropDown';
import { stringAvatar } from '../utils';

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
    const [assignee, setAssignee] = useState([]);
    const [habit, setHabit] = useState(habitOptions[0].value);
    const [frequency, setFrequency] = useState(frequencyOptions[0].value);
    const [startTime, setStartTime] = useState(dayjs(new Date()));
    const [endTime, setEndTime] = useState(dayjs(new Date()));
    const formRef = useRef();

    const removeRisk = (item)=>{
        let newList = riskHabits.filter((habit)=> {return habit !== item})
        setRiskHabits(newList);
    }

    const removeAssignee = (item)=>{
        let newList = assignee.filter((assignee)=> {return assignee !== item})
        setAssignee(newList);
    }

    const handleAddRisk = ()=>{
        let newList = riskHabits.filter((newHabit)=> {return newHabit.habit !== habit});
        newList.unshift({habit,frequency});
        setRiskHabits(newList);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const complaint = formData.get('complaint');
        const findings = formData.get('findings');
        const currentHabits = riskHabits;
        const assignees = "";

        const upload = {
            complaint,findings,currentHabits,assignees
        }

        console.log(upload);
    }



    return (
        <Box component='form' my={3} onSubmit={handleSubmit} ref={formRef} >
        <Stack spacing={3}>
            <Stack direction='row' spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateTimePicker format='DD/MM/YYYY HH:mm' label="Start Time"  value={startTime} onChange={(newValue) => setStartTime(newValue)}
                     componentsProps={{ textField: { size: 'small', fullWidth:true  }}}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="End Time" format='DD/MM/YYYY HH:mm' value={endTime} onChange={(newValue) => setEndTime(newValue)}
                    componentsProps={{ textField: { size: 'small', fullWidth:true }}}
                    />
                </LocalizationProvider>
            </Stack>
           <TextField fullWidth size='small' name='complaint' multiline maxRows={4} label="presenting complaint"/> 
           <TextField fullWidth size='small' name='findings' multiline maxRows={4} label="examination findings"/>

           <Stack direction='row' spacing={2}>
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
            <Button onClick={handleAddRisk} variant='outlined' color='inherit' >Add</Button>
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
            
            
            <AssigneeDropdown assignee={assignee} setAssignee={setAssignee}/>
                

            {assignee.length > 0 && 
            <List sx={{border:'1px solid lightgray', borderRadius: 1, pl:2}}>
            {
                assignee.map((item, index)=>{
                    return(
                        <ListItem key={index} disablePadding
                            secondaryAction={
                                <IconButton edge="end" onClick={()=>removeAssignee(item)}>
                                <Close fontSize='small' color='error' />
                                </IconButton>
                            }
                        >
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(item.username)}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.username}
                            secondary={item.reg_no} 
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
        <Button sx={{my:3}} variant='contained' type='submit' >Save Entry</Button>
        </Box>
    );
};

export default NewEntry;