import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent,DialogActions, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, LinearProgress, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PasswordStrengthIndicator, passwordStrength } from '../utils';

export default function ResetPasswordDialog() {

    const [open, setOpen] =  useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [password, setPassword] = useState("");
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlePasswordChange = (e)=>{
        const ok = passwordStrength(e.target.value) >30;
        setPassword(e.target.value);
        setConfirm(ok);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
    <div>
        <Button variant='contained' color='error' size='small' onClick={handleClickOpen}>Reset Password</Button>
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Reset User Password</DialogTitle>
        <DialogContent dividers>
        <Typography color='red'>WARNING: </Typography>
        <Typography>Please note that after changing the password the user will no longer be able to log into the application using the current password.</Typography>
        <br/>
        <FormControl margin="normal" fullWidth  variant="outlined">
            <InputLabel required size='small' htmlFor="password">Password</InputLabel>
            <OutlinedInput required size='small' inputProps={{ maxLength: 30 }} id="password" type={showPassword ? 'text' : 'password'} label="Password" name="password"
                onChange={(e)=>handlePasswordChange(e)}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
        </FormControl>
        <PasswordStrengthIndicator password={password}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color='inherit' variant='outlined'>Cancel</Button>
            <Button onClick={handleClose} color='error' variant='contained' disabled={!confirm}>Reset</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}