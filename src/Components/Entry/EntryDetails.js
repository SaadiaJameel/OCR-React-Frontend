import React, { useState } from 'react';
import { ArrowBack, ArrowLeft, AssignmentInd, Edit, People} from '@mui/icons-material';
import { Avatar, AvatarGroup, Tooltip, Typography , Stack, Box, Divider, Grid, Slide, Dialog, IconButton, Button} from '@mui/material';
import { stringAvatar } from '../utils';
import image from '../../Assets/noImage.jpg'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../Annotation/Canvas';
import NotificationBar from '../NotificationBar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const details = {
    "_id":"id",
    "patient": {
        "name":"patient name",
        "patient_id":"patient_id",
    },
    "assignees": [{"name":"P Silva", "availability":false},{"name":"M Perera", "availability":true}],
    "images":["1","2","3"],
    "Complaint":"",
    "startTime":"",
    "endTime":"",
    "findings":"findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here",
    "currentHabits":"",
    "reports":"",
    "reviews": ["1","2","3","4","5"],
    "createdAt": "2023-05-06 5.00 am",
    "updatedAt": "2023-05-10 10.14 pm"

}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const EntryDetails = () => {
    
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(false);
    const [openAnnotation, setOpenAnnotation] = useState(false)
    const [openCrop, setOpenCrop] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [imageIndex, setImageIndex] = useState({});
    const [data, setData] = useState(tempdata);
    const { id } = useParams();

    const handleDoubleClick = (index)=>{
        setImageIndex(index);
        setOpenAnnotation(true);
    }

    const handleClose = () => {
        setOpenAnnotation(false);
        setOpenCrop(false);
    };

    return (
            <div className="inner_content">
                <div>  
                    <Typography sx={{ fontWeight: 700}} variant="h5">Tele Consultation Entry</Typography>                  
                    <Box>
                    <Button component={Link} to='/manage/entries' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Entries</Button>
                    <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                        <AssignmentInd sx={{color:'lightgray', width:'60px',height:'60px'}}/>
                        <Stack direction='column'>
                            <Tooltip title='Go to patients profile' arrow placement="right"><Typography variant='h5' color='Highlight' sx={{cursor:'pointer'}}>
                                {details.patient.name}
                            </Typography></Tooltip>
                            <Typography color='GrayText'>{details.patient.patient_id}</Typography>
                        </Stack>
                    </Stack>
                    <Divider sx={{my:1}}/>
                    <Stack direction='row' spacing={1}>
                        <Typography><b>date</b></Typography>
                        <Typography><b>time</b></Typography>
                        <Typography><b>duration</b></Typography>
                    </Stack>
                    <Divider sx={{my:1}}/>
                    <Typography>Reviewers:</Typography>
                    <AvatarGroup sx={{width:'fit-content'}}>
                        {
                            details.assignees.map((reviewer, index)=>{
                                return(<Tooltip title={reviewer.name} placement="bottom-start" arrow  key={index}><Avatar {...stringAvatar(reviewer.name)}/></Tooltip>)
                            })
                        }
                    </AvatarGroup>

                    <Divider sx={{my:1}}/>
                    <Stack direction='column' spacing={1} sx={{my:2}}>
                        <Typography><b>Complaint:</b></Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci</Typography>

                        <Typography><b>Findings:</b></Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci, volutpat at lectus sit amet, fermentum consequat eros. Aliquam quis nulla blandit, tristique ipsum vitae, suscipit tortor. Vivamus in aliquam turpis. Donec in elit quis risus pulvinar condimentum quis at magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer et consectetur tellus. Vestibulum ac neque tempus, </Typography>
                        
                        <Typography><b>Current Habits:</b></Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci</Typography>
                        
                        <Typography><b>Images:</b></Typography>
                    </Stack>    
                    <Grid container spacing={2}>
                    {[...data].map((item, index) => (
                        <Grid item key={index} xs={4} md={3} lg={2}>
                            <div className='imageDiv'>
                                <div className='grid_image'>
                                    <img src={image} alt="Failed to Load"/>
                                    {item.annotation.length === 0 && <div className='overlay'>
                                    <svg onClick={()=>handleDoubleClick(index)}>
                                        <polygon points="0,0,70,0,70,70"/>
                                    </svg>
                                    </div>}
                                    <Stack direction='row' sx={{position:'absolute', bottom:10, right:0}}>
                                        <IconButton onClick={()=>handleDoubleClick(index)} size='small' sx={{ color:'transparent'}} className='iconBackground'><Edit fontSize='small'/></IconButton>
                                    </Stack>
                                </div>
                                        
                                <Stack direction='column' justifyContent='space-between' alignItems='start' px={1}>
                                <Box>
                                    <Typography fontSize='small' color='GrayText'>{item.location} | {item.clinical_diagnosis}</Typography>
                                </Box>
                                </Stack>
                            </div>
                        </Grid>
                    ))}
                    </Grid>
                    <Stack sx={{my:2}} direction='column' spacing={1}>
                        <Typography><b>Reviews:</b></Typography>
                    {
                        details.reviews.map((item,index)=>{
                            return(
                                <Stack direction='row' key={index} sx={{background:'white', p:1}}>
                                    <Avatar {...stringAvatar("name")}/>
                                    <ArrowLeft/>
                                    <Box>
                                        <Typography><strong>Reviewers name</strong></Typography>
                                        <Typography>provisional_diagnosis:</Typography>
                                        <Typography>management_suggestions:</Typography>
                                        <Typography>management_suggestions:</Typography>
                                        <Typography>review_comment:</Typography>
                                        <Typography>other_comments:</Typography>
                                    </Box>
                                </Stack>
                            )
                        })
                    }
                    </Stack>
                    </Box>
                    <Dialog fullScreen open={openAnnotation} onClose={handleClose} TransitionComponent={Transition}>
                        <Canvas imageIndex={imageIndex} open={openAnnotation} setOpen={setOpenAnnotation} data={data} setData={setData} upload={false}/>
                    </Dialog>

                    <NotificationBar status={status} setStatus={setStatus}/> 
                </div>
                </div>
        
    );
};


const tempdata = [
    {
      img: image,
      title: 'mouth',
      author: '@bkristastucchio',
      annotation: [],
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
      annotation: []
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      annotation: []
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      annotation: []
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      annotation: [],
    }
  ];
export default EntryDetails;