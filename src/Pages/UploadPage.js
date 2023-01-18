import React, { useEffect, useState, useRef } from 'react';
import { Button, Paper, Typography, Grid, Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import {useMediaQuery, IconButton, TextField} from '@mui/material';
import { Delete} from '@mui/icons-material';

const UploadPage = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const hidenInput = useRef();
    const patientidRef = useRef();

    const matches = useMediaQuery('(min-width:800px)');

    const selectFiles = (event) => {
        
        if(imagePreviews.length + event.target.files.length > 10){
            return;
        }

        let images = [...imagePreviews];
        let files = [...selectedFiles];
        
        for (let i = 0; i < event.target.files.length; i++) {
            files.unshift(event.target.files[i]);
            images.unshift(URL.createObjectURL(event.target.files[i]));
        }

        setSelectedFiles(files);       
        setImagePreviews(images);
    };

    const handleSelection = ()=>{
        //setLoading(true)
        if(patientidRef.current.value==="") return
        hidenInput.current.click()
        
    }

    const handleDelete = (index)=>{
        let images = [...imagePreviews];
        let files = [...selectedFiles];
        
        images.splice(index,1);
        files.splice(index,1);

        setSelectedFiles(files);       
        setImagePreviews(images);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var length = imagePreviews.length
        for(var i=0; i< length; i++){
            console.log(data.get(`diagnosis-${i}`))
        }
    }

    return (
        <div className='body'>
        
        <Paper sx={{p:3, my:1}}>
        <Typography sx={{ fontWeight: 700, m: 1 }}>Add Images</Typography>  
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <input hidden accept="image/png, image/jpeg" ref={hidenInput} multiple type="file" onChange={selectFiles}/>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField size='small' inputRef={patientidRef} required label="Patients' Reg No" name="patient_id" fullWidth autoComplete='off' inputProps={{ maxLength: 100 }}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button fullWidth variant="contained" disabled={loading} onClick={handleSelection} component="label">
                        Select Images
                    </Button>  
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button  fullWidth type='submit' variant="contained" disabled={selectedFiles.length===0}> Upload </Button>
                </Grid>
            </Grid>
            <ImageList cols={matches? 5:2} sx={{mt:5}}>
            {imagePreviews.map((item, index) => (
                <ImageListItem key={index}>
                <img
                    src={item}
                    // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={index}
                    loading="lazy"
                    style={{aspectRatio: '1/1'}}
                />
                <ImageListItemBar
                 position="top"
                 sx={{backgroundColor:'transparent'}}
                 actionIcon={
                     <IconButton size='small' sx={{ color: 'white' }} aria-label={`star ${item.title}`} onClick={()=>handleDelete(index)}>
                         <Delete />
                     </IconButton>
                 }
                />
                <ImageListItemBar
                    subtitle={
                   <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                    <div>
                        <p>Patients' Id:</p>
                        <p>Location:</p>
                        <p>Clinical diagnosis:</p>
                        <p>Lesions appear:</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '5px', paddingTop: '8px', width: '100%'}}>                   
                            <input name={`patient-${index}`} />
                    
                            <select name={`location-${index}`} style={{width: '100%'}}>
                            <option value="1">Lips</option>
                            <option value="2">Upper labial mucosa</option>
                            <option value="3">Lower labial mucosa</option>
                            <option value="4">L/S Buccal mucosa</option>
                            <option value="5">R/S Buccal mucosa</option>
                            <option value="6">Palate</option>
                            <option value="7">Tongue-dorsum</option>
                            <option value="8">Tongue-ventral</option>
                            <option value="9">Tongue-lateral border</option>
                            <option value="10">Alveolar ridge</option>
                            <option value="11">Gingiva</option>
                            <option value="12">Flour of the mouth</option>
                            </select>
                       
                            <select name={`diagnosis-${index}`} style={{width: '100%'}}>
                            <option value="1">Normal</option>
                            <option value="2">OLP / LR</option>
                            <option value="3">OSMF/OSF</option>
                            <option value="4">VBD</option>
                            <option value="5">RAU</option>
                            <option value="6">MRG</option>
                            <option value="7">FEP</option>
                            <option value="8">PVL</option>
                            <option value="9">SLE</option>
                            <option value="10">OFG</option>
                            <option value="11">OCA</option>
                            </select>
                       
                            <select name={`lesion-${index}`} style={{width: '100%'}}>
                            <option value="true">True</option>
                            <option value="false">Flase</option>
                            </select>
                        </div>
                    </div>
                    }
                    position="below"
                />
                </ImageListItem>
            ))}
            </ImageList>
        </Box>
        </Paper>           
        </div>
    );
};
export default UploadPage;