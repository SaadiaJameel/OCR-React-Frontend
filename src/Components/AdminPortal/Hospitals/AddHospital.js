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
import config from '../../../config.json';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';

export default function AddHospital() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(0);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
  const hospitalRef = useRef();
  const hospitalDetailsRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };
 
  const showMsg = (msg, severity)=>{
    setStatus({msg, severity, open:true})
  };

  const handleCreateHospital = () =>{

    const hospitalName = hospitalRef.current.value ;
    if(hospitalName === "") {
      handleClose()
      return;
    };

    // axios.post(`${config['path']}/user/patient/add`,
    //     {
    //       hospitalName
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
    <Button size='small' sx={{mt:2}} onClick={handleClickOpen}>Add New</Button>   
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Hospital</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter hospital name and a description (optional) to create new hospital.
          </DialogContentText>
          <TextField
            inputRef={hospitalRef}
            margin="dense"
            label="Hospital Name"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 100}}
          />
          <TextField
            inputRef={hospitalDetailsRef}
            margin="dense"
            label="Description (optional)"
            type='text'
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 100}}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancle</Button>
            <LoadingButton onClick={handleCreateHospital} loading={state ===1} variant="contained" disabled={state!==0}>Create</LoadingButton>
        </DialogActions>
    </Dialog>
    <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}
