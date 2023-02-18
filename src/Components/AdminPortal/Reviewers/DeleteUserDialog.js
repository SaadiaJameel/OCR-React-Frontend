import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent,DialogActions, TextField, Typography } from '@mui/material';
import config from '../../../config.json';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../../NotificationBar';
import { useSelector} from 'react-redux';

export default function DeleteUserDialog({user}) {

    const [open, setOpen] =  useState(false);
    const [state, setState] = useState(0);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData.data);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (e)=>{
        setConfirmed(e.target.value === user.username)
    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    const handleDelete = ()=>{
      
        setState(1);

        axios.post(`${config['path']}/admin/delete/user/${user._id}`,
        {},
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}).then(res=>{
            navigate("/adminportal/reviewers");
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setState(0);
        })

    }


  return (
    <div>
        <Button variant='contained' color='error' onClick={handleClickOpen}>Delete User</Button>
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent dividers>
        <Typography color='red'>WARNING: </Typography>
        <Typography>
        This action is irreversible and will permanently delete the user. Please proceed with caution.
        Enter username: <strong>'{user.username}'</strong> to confirm the action.
        </Typography>
        <br/>
        <TextField label='confirm username' size='small' color='error' variant='standard' focused onChange={(e)=>handleConfirm(e)}/>
        </DialogContent>
        <DialogActions>
            <LoadingButton size="small" onClick={handleDelete} loading={state === 1} variant="contained" disabled={!confirmed || state !==0}>Delete User</LoadingButton>
            <Button onClick={handleClose} color='inherit' variant='outlined' disabled={state!==0}>Cancel</Button>
            </DialogActions>
        </Dialog>
        <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}