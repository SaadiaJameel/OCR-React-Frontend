import React, { useState, useRef } from 'react';
import { Button, Typography, Grid, Box, Stack, Dialog, Slide,IconButton, List, ListItem, ListItemText} from '@mui/material';
import { Close, Crop, Delete, Edit} from '@mui/icons-material';
import NotificationBar from '../NotificationBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config.json';

const UploadTests = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(false);
    const hidenInput = useRef();
    const { id } = useParams();

    const selectFiles = (event) => {
        
        if(selectedFiles.length + event.target.files.length > 12){
            showMsg("Cannot upload more than 12 files at once","error");
            return;
        }

        let files = [...selectedFiles];

        for (let i = 0; i < event.target.files.length; i++) {
            if(event.target.files[i].size < 25*1000*1000){
                files.unshift(event.target.files[i]);
            }
        }

        setSelectedFiles(files);
    };

    const handleSelection = ()=>{
        hidenInput.current.click();
    }

    const handleDelete = (index)=>{
        let files = [...selectedFiles];
        files.splice(index,1);
        setSelectedFiles(files);
    }

    const handleSubmit = ()=>{

        setLoading(true);

        var form = new FormData();
        selectedFiles.forEach((report, index) => {
            var filename = id+"_"+ Date.now() + "_"+ index + "_" + report.name;
            form.append('files', report, filename);
        });

        return;
        axios.post(`${config['path']}/user/patient/reports/${id}`, form,
        {headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'Content-Type': 'multipart/form-data',
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg("reports Uploaded Successfully", "success")
            setSelectedFiles([]);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setLoading(false);
        })
    }

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <div>       
        <Box>
            <input hidden accept="application/pdf" ref={hidenInput} multiple type="file" onChange={selectFiles}/>
            <Stack spacing={2} direction='row'>
                <Button variant='outlined' disabled={loading} onClick={handleSelection}>Add Reports</Button>
                {/* <LoadingButton  variant="contained" disabled={selectedFiles.length===0} loading={loading} onClick={handleSubmit}> Upload </LoadingButton> */}
            </Stack>
                    
            <List disablePadding >
            {[...selectedFiles].map((item, index) => (
                    <ListItem key={index} disablePadding
                    secondaryAction={
                        <IconButton edge="end" onClick={()=>handleDelete(index)}>
                        <Close fontSize='small' color='error' />
                        </IconButton>
                    }
                >
                <ListItemText
                    primary={item.name}
                    secondary={item.size} 
                />
                </ListItem>
            ))}
            </List>  
        </Box>   
            <NotificationBar status={status} setStatus={setStatus}/> 
        </div>
    );
};
export default UploadTests;