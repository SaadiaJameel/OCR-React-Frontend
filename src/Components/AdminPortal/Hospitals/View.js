import React, { useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography, TextField} from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { MuiTelInput } from 'mui-tel-input';
import axios from 'axios';
import config from '../../../config.json'
import LoadingButton from '@mui/lab/LoadingButton';
import NotificationBar from '../../NotificationBar';
import DeleteHospitalDialog from './DeleteHospitalDialog';

const View = ({data}) => {
    const [ editEnable, setEditEnable] = useState(true);
    const [number, setNumber] = useState(data.contact_no);
    const [name, setName] = useState(data.name);
    const [category, setCategory] = useState(data.category);
    const [city, setCity] = useState(data.city);
    const [address, setAddress] = useState(data.address);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) ;
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
    const handleChange = (newValue) => {
        setNumber(newValue)
    }

    const onCancel = ()=>{
        setEditEnable(!editEnable)
    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }


    const onSave = () => {
        setLoading(true);
        axios.post(`${config['path']}/admin/hospitals/update`,
        {data, name, city, category, address, number},
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setLoading(false);
            setEditEnable(!editEnable);
            showMsg("Sucessfully Updated the entry", "success")
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(
            setLoading(false)
        )
        
    }

    return (
            <Box>
                <Stack direction='row' spacing={2} py={1} justifyContent='flex-end'>
                    <Button variant='outlined' endIcon={<Edit/>} onClick={() => setEditEnable(!editEnable)}
                    style={{ display: !(editEnable && !isDelete) ? 'none' : undefined }}>Edit</Button>
                    <Button variant='outlined' endIcon={<Delete/>}
                    color="error"
                    onClick={() => setIsDelete(!isDelete)}
                    style={{ display: !(editEnable && !isDelete) ? 'none' : undefined }}>Delete</Button>
                </Stack>
                
                {
                    isDelete &&
                    <Box sx={{border: '1px solid red', borderRadius:'5px', my:5}}>
                    <Stack sx={{p:3}} justifyContent='center' direction='row'>
                        <DeleteHospitalDialog hospital={data} setIsDelete={setIsDelete}/>
                    </Stack>
                    </Box>
                    
                }

                <Stack direction='column' spacing={3}>
            <TextField disabled={editEnable} defaultValue={data.name} name='Name' size='small' label='Name' InputLabelProps={{shrink: true,}} 
            onChange={(e) => setName(e.target.value)}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            <TextField disabled={editEnable} defaultValue={data.category} name='Category' size='small' label='Category' InputLabelProps={{shrink: true,}}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            <TextField disabled={editEnable} defaultValue={data.city} name='City' size='small' label='City' InputLabelProps={{shrink: true,}}
            onChange={(e) => setCity(e.target.value)}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            <TextField disabled={editEnable} defaultValue={data.address} name='Address' size='small' label='Address' InputLabelProps={{shrink: true,}}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            <MuiTelInput disabled={editEnable} value={number} onChange={handleChange} size='small' name='contactNo' placeholder='Phone Number' margin="normal" fullWidth
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            <TextField disabled={true} defaultValue={(data.createdAt.split("T"))[0]} name='Created At' size='small' label='Created At' InputLabelProps={{shrink: true,}}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
              },
            }}/>
            </Stack>
            <Stack direction='row' spacing={2} py={1} justifyContent='flex-start'>
                    <LoadingButton
                    loadingIndicator={<CircularProgress color="inherit" size={16}/>}
                    loading={loading}
                     style={{ display: editEnable ? 'none' : undefined }} variant='contained' endIcon={<Save/>}
                    onClick={onSave}>Save</LoadingButton>
                    <Button style={{ display: editEnable ? 'none' : undefined }} variant='outlined' endIcon={<Cancel/>}
                    onClick={onCancel}>Cancel</Button>
            </Stack>
            
            <NotificationBar status={status} setStatus={setStatus}/>
            </Box>
            
    );
};

export default View;