import React , {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import config from '../../config.json';
import NotificationBar from '../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';

export default function DeleteImage({open, setOpen}) {
  const [state, setState] = useState(0);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 

  const handleClose = () => {
    setOpen(false);
  };
 
  const showMsg = (msg, severity)=>{
    setStatus({msg, severity, open:true})
  };

  const handleDeleteImages = () =>{


  }

  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are You sure you want to delete image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancle</Button>
            <LoadingButton onClick={handleDeleteImages} loading={state ===1} variant="contained" disabled={state!==0}>Delete Image</LoadingButton>
        </DialogActions>
    </Dialog>
    <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}
