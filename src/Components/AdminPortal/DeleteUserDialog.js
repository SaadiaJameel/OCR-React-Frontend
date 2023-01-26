import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent,DialogActions, TextField, Checkbox, Typography } from '@mui/material';

export default function DeleteUserDialog({user}) {

    const [open, setOpen] =  useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (e)=>{
        setConfirmed(e.target.value === user.username)
    }

  return (
    <div>
        <Button variant='contained' color='error' size='small' onClick={handleClickOpen}>Delete User</Button>
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
            <Button onClick={handleClose} color='inherit' variant='outlined'>Cancel</Button>
            <Button onClick={handleClose} color='error' variant='contained' disabled={!confirmed}>Delete User</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}