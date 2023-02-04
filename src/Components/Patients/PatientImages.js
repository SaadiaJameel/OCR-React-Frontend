import React, { useState} from 'react';
import { Button, Typography, Grid, Box, Stack, Dialog, Slide,IconButton} from '@mui/material';
import { Crop, Delete, Edit} from '@mui/icons-material';
import Canvas from '../Annotation/Canvas';
import NotificationBar from '../NotificationBar';
import ImageCropper from '../Crop/ImageCropper';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config.json';
import noImage from '../../Assets/temp data/mouth.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PatientImages = () => {

    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(false);
    const [openAnnotation, setOpenAnnotation] = useState(false)
    const [openCrop, setOpenCrop] = useState(false)
    const [imageIndex, setImageIndex] = useState({});
    const [data, setData] = useState(tempData);
    const { id } = useParams();

    const handleDelete = (index)=>{

        let images = [...data];
        images.splice(index,1);
        setData(images);

    }

    const handleDoubleClick = (index)=>{
        setImageIndex(index);
        setOpenAnnotation(true);

    }

    const handleEdit = (index)=>{
        setImageIndex(index);
        setOpenCrop(true);
    }
    
    const handleClose = () => {
        setOpenAnnotation(false);
        setOpenCrop(false);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
        <div>       
        <Box>
            <Stack spacing={2} direction='row' sx={{mb:2}}>
                <Button variant="contained" disabled={loading} >Generate Report</Button>  
            </Stack>
                    
            <Grid container spacing={2}>
            {[...data].map((item, index) => (
                <Grid item key={index} xs={6} md={4} lg={3}>
                    <div className='imageDiv'>
                        
                        <div className='grid_image'>
                            <img src={item.img} alt="Failed to Load"/>
                            {item.annotation.length === 0 && <div className='overlay'>
                            <svg>
                                <polygon points="0,0,70,0,70,70"/>
                            </svg>
                            </div>}
                        </div>
                                
                        <Stack direction='column' justifyContent='space-between' alignItems='start' px={1}>
                        <Stack direction='row'>
                            <IconButton onClick={()=>handleEdit(index)} size='small'><Crop fontSize='small'/></IconButton>
                            <IconButton onClick={()=>handleDoubleClick(index)} size='small'><Edit fontSize='small'/></IconButton>
                            <IconButton onClick={()=>handleDelete(index)} size='small'><Delete fontSize='small'/></IconButton>
                        </Stack>
                        <Box>
                            <Typography>Location: <b>{item.location}</b></Typography>
                            <Typography>Clinical diagnosis: <b>{item.clinical_diagnosis}</b></Typography>
                            <Typography>Lesions appear: <b>{item.lesions_appear.toString()}</b></Typography>
                        </Box>
                        </Stack>
                    </div>
                </Grid>
            ))}
            </Grid>  

            <Dialog fullScreen open={openAnnotation} onClose={handleClose} TransitionComponent={Transition}>
                <Canvas imageIndex={imageIndex} open={openAnnotation} setOpen={setOpenAnnotation} data={data} setData={setData} upload={false}/>
            </Dialog>

            <Dialog fullScreen open={openCrop} onClose={handleClose} TransitionComponent={Transition}>
                <ImageCropper imageIndex={imageIndex} upload={false}
                data={data} setData={setData} 
                open={openCrop} setOpen={setOpenCrop} />
            </Dialog>
        </Box>   
            <NotificationBar status={status} setStatus={setStatus}/> 
        </div>
    );
};

export default PatientImages;

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