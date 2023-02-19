import React , {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import config from '../../../config.json';
import NotificationBar from '../../NotificationBar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector} from 'react-redux';

export default function AddHospital({setData}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(0);
  const [status, setStatus] = useState({msg:"",severity:"success", open:false});
  const selectorData = useSelector(state => state.userData.data);
  const [userData, setUserData] = useState(selectorData);
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

  const fetchData = ()=>{
    axios.get(`${config['path']}/user/hospitals`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
  }

  const handleCreateHospital = () =>{

    const name = hospitalRef.current.value ;
    const details = hospitalDetailsRef.current.value ;
    if(name === "") {
      handleClose()
      return;
    };

    setState(1);
    axios.post(`${config['path']}/admin/hospital`,
        {
          name, details

        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success");
            fetchData();
            handleClose();
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setState(0);
        })
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
            <Button onClick={handleClose} variant='outlined' disabled={state!=0}>Cancle</Button>
            <LoadingButton onClick={handleCreateHospital} loading={state === 1} variant="contained" disabled={state!==0}>Create</LoadingButton>
        </DialogActions>
    </Dialog>
    <NotificationBar status={status} setStatus={setStatus}/>
    </div>
  );
}
