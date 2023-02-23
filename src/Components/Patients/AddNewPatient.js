import React , {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PersonAdd } from '@mui/icons-material';
import axios from 'axios';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';


export default function AddNewPatient() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(0);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 

  const [regNo,setRegNo] = useState("");
  const [birthDate,setBirthDate] = useState("");
  const idRef = useRef()
  const navigate = useNavigate()


  ////
  // const [alignment, setAlignment] = React.useState('');
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  // const handleChangegender = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };
 
  const showMsg = (msg, severity)=>{
    setStatus({msg, severity, open:true})
  };

  const handleCreateNewPatient = () =>{

    const patient_id = idRef.current.value ;
    if(patient_id === "") {
      handleClose()
      return;
    };

    // axios.post(`${config['path']}/user/patient/add`,
    //     {
    //       patient_id
    //     },
    //     { headers: {
    //         'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
    //         'email': JSON.parse(sessionStorage.getItem("info")).email,
    //     }}
    //     ).then(res=>{
    //         showMsg(res.data.message, "success");
    //         navigate(`/manage/patients/${res.data._id}`);
    //     }).catch(err=>{
    //         if(err.response) showMsg(err.response.data.message, "error")
    //         else alert(err)
    //         setState(0);
    //     })
  }

  return (
    <div>
    <Button variant='contained' size='small' endIcon={<PersonAdd/>} sx={{mt:2}} onClick={handleClickOpen}>Add New</Button>   
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Enter the patients' Details to create new patients account.</b>
          </DialogContentText>
          <FormLabel component="legend">Register Number</FormLabel>
          <TextField
            inputRef={idRef}
            autoFocus
            margin="dense"
            label="Reg No"
            type='text'
            fullWidth
            variant="standard"
          />
          <FormLabel component="legend">Date of Birth</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                // label="Date desktop"
                inputFormat="MM/DD/YYYY"
                // value={value}
                // onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
             
          </LocalizationProvider>

       
        <RadioGroup
          
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>

        {/*Risk habits */}
        <FormLabel component="legend">Risk Habits</FormLabel>
        <FormGroup >
            <FormControlLabel control={<Checkbox />} label="Smoking"  />
            <FormControlLabel control={<Checkbox />} label="Alcohol" />
            <FormControlLabel control={<Checkbox />} label="Betal quid" />
            <FormControlLabel control={<Checkbox />} label="Smokeless tobacco use" />
            <FormControlLabel control={<Checkbox />} label="Family history of cancer" />
          </FormGroup>
        
          <FormLabel component="legend">Medical History</FormLabel>
          <TextField
            inputRef={idRef}
            autoFocus
            margin="dense"
            label="medical history"
            type='text'
            fullWidth
            variant="standard"
          />
          
          <Stack direction="row" alignItems="center" spacing={2}>
          <FormLabel component="legend">Please Upload Consest form(pdf)</FormLabel>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept=".pdf" multiple type="file" />
            </Button>
           
          </Stack>


        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancle</Button>
            <LoadingButton onClick={handleCreateNewPatient} loading={state ===1} variant="contained" disabled={state!==0}>Create</LoadingButton>
        </DialogActions>
    </Dialog>
    <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}