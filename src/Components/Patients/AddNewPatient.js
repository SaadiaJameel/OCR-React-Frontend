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

export default function AddNewPatient() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(0);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
  const idRef = useRef()
  const navigate = useNavigate()

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

    axios.post(`${config['path']}/user/patient/add`,
        {
          patient_id
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success");
            navigate(`/manage/patients/${res.data._id}`);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            setState(0);
        })
  }

  return (
    <div>
    <Button variant='contained' size='small' endIcon={<PersonAdd/>} sx={{mt:2}} onClick={handleClickOpen}>Add New</Button>   
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the patients' register number to create new patients account.
          </DialogContentText>
          <TextField
            inputRef={idRef}
            autoFocus
            margin="dense"
            label="Reg No"
            type='text'
            fullWidth
            variant="standard"
          />
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
