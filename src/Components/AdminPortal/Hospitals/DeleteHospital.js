import React , {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import config from '../../../config.json';
import NotificationBar from '../../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function DeleteHospital({name}){
  const [state, setState] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
  const hospitalRef = useRef();

  const handleClose = () => {
    setOpen(false);
  };
 
  const showMsg = (msg, severity)=>{
    setStatus({msg, severity, open:true})
  };

  const handleDeleteHospital = () =>{
    const hospitalName = hospitalRef.current.value ;
    if(hospitalName === "") {
      handleClose()
      return;
    };

  }

  return (
    <div>
    <IconButton fontSize='small' onClick={()=>{setOpen(true)}}><Delete fontSize='small'/></IconButton>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are You sure you want to delete Hospital entry?
          </DialogContentText>
          <DialogContentText>
            Enter hospital name <strong>{name}</strong> to confirm.
          </DialogContentText>
          <TextField
            inputRef={hospitalRef}
            margin="dense"
            label="Hospital Name"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 100}}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancle</Button>
            <LoadingButton onClick={handleDeleteHospital} loading={state ===1} variant="contained" disabled={state!==0}>Delete Entry</LoadingButton>
        </DialogActions>
    </Dialog>
    <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}
