import React, { useState, useRef } from 'react';
import { Button, Typography, Grid, Box, ImageList, ImageListItem, ImageListItemBar,
    Stack, Dialog, Toolbar, AppBar, Slide} from '@mui/material';
import {useMediaQuery, IconButton} from '@mui/material';
import { Close, Delete, Save} from '@mui/icons-material';
import noImage from '../../Assets/noImage.jpg'
import Canvas from '../Annotation/Canvas';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UploadPage = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState({});
    const [data, setData] = useState(tempData);
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

    const handleDoubleClick = (index)=>{
        setInfo(index);
        setOpen(true);

    }
    
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>       
        <Box component="form" onSubmit={handleSubmit} noValidate >
            <input hidden accept="image/png, image/jpeg" ref={hidenInput} multiple type="file" onChange={selectFiles}/>
            <Stack spacing={2} direction='row' sx={{mb:2}}>
                <Button variant="contained" disabled={loading} onClick={handleSelection} component="label">Add image</Button>  
                <Button  type='submit' variant="contained" disabled={selectedFiles.length===0}> Upload </Button>
            </Stack>
                    
            <Grid container spacing={2}>
            {[...data].map((item, index) => (
                <Grid item key={index} xs={6} md={4} lg={3}>
                    <div className='imageDiv'>
                        <div className='grid_image' style={{backgroundImage: `url(${item.img})`}} onClick={()=>handleDoubleClick(index)}></div>
                        <Typography>Location: {item.location}</Typography>
                        <Typography>Clinical diagnosis: {item.clinical_diagnosis}</Typography>
                        <Typography>Lesions appear: {item.lesions_appear.toString()}</Typography>
                    </div>
                </Grid>
            ))}
            </Grid>  
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Canvas info={info} open={open} setOpen={setOpen} data={data} setData={setData}/>
            </Dialog>
            
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
                        <p>Location:</p>
                        <p>Clinical diagnosis:</p>
                        <p>Lesions appear:</p>
                    </div>
                   
                    </div>
                    }
                    position="below"
                />
                </ImageListItem>
            ))}
            </ImageList>
        </Box>    
        </div>
    );
};
export default UploadPage;

const tempData = [
    {
      img: noImage,
      location: "Upper labial mucosa",
      clinical_diagnosis: "Normal",
      lesions_appear: true,
      annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: false,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
    {
        img: noImage,
        location: "Upper labial mucosa",
        clinical_diagnosis: "Normal",
        lesions_appear: true,
        annotation: [],
    },
  ];