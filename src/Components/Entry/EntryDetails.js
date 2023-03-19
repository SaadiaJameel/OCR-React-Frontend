import React, { useEffect, useState } from 'react';
import { ArrowBack, ArrowLeft, AssignmentInd, Edit, People} from '@mui/icons-material';
import { Avatar, AvatarGroup, Paper, Tooltip, Typography , Stack, Box, Divider, Grid, Slide, Dialog, IconButton, Button, Table, TableRow, TableCell, TableBody, Skeleton, ListItem, ListItemText, List} from '@mui/material';
import { stringAvatar } from '../utils';
import image from '../../Assets/noImage.jpg'
import { styled } from '@mui/material/styles';
import { useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../Annotation/Canvas';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../../config.json';
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
    const selectorData = useSelector(state => state.data);
    const [userData, setUserData] = useState(selectorData);
    const [loading, setLoading] = useState(true);
    const [openAnnotation, setOpenAnnotation] = useState(false)
    const [openCrop, setOpenCrop] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [imageIndex, setImageIndex] = useState({});
    const [data, setData] = useState(null);
    const { id } = useParams();

    const handleDoubleClick = (index)=>{
        setImageIndex(index);
        setOpenAnnotation(true);
    }

    const handleClose = () => {
        setOpenAnnotation(false);
        setOpenCrop(false);
    };

    useEffect(()=>{
        setLoading(true);
        axios.get(`${config['path']}/user/entry/get/${id}`,{
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            withCredentials: true
        }).then(res=>{
            setData(res.data);
            console.log(res.data)
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data?.message, "error")
            else alert(err.message)
        })
    },[])

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    return (
            <div className="inner_content">
                <div>  
                    <div className="sticky">
                    <Typography sx={{ fontWeight: 700}} variant="h5">Tele Consultation Entry</Typography>                  
                    <Button component={Link} to='/manage/entries' size='small' startIcon={<ArrowBack/>} sx={{p:0}}>Go Back To Entries</Button>
                    </div>
                    {loading && !data?
                    <Paper sx={{p:2, my:3}}>
                    <Stack direction='row' spacing={2} alignItems='center' sx={{my:3}}>
                        <Skeleton variant="rounded" width={60} height={60} />
                        <Stack direction='column'>
                            <Skeleton variant="text" width={210} sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" width={210} />
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Skeleton variant="rounded" height={40} width={600}/>
                        <Skeleton variant="rounded" height={40} width={600}/>
                    </Stack>
                    </Paper>
                    :
                    <>
                    <Paper sx={{p:3, my:3}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <AssignmentInd sx={{color:'black', width:'60px',height:'60px'}}/>
                        <Stack direction='column'>
                            <Tooltip title='Go to patients profile' arrow placement="right"><Typography component={Link} to={`/manage/patients/${data.patient._id}`} variant='h5' color='Highlight' sx={{cursor:'pointer'}}>
                                {data.patient?.patient_name}
                            </Typography></Tooltip>
                            <Typography color='GrayText'>{data.patient?.patient_id}</Typography>
                        </Stack>
                    </Stack>
                    <Divider sx={{my:1}}/>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='body2'>Start Time: {dayjs(data.start_time).format("DD/MM/YYYY HH:MM A")}</Typography>
                        <Typography variant='body2'>Duration: {dayjs(new Date(data.end_time) - new Date(data.start_time)).format("HH:MM:ss")}</Typography>
                    </Stack>
                    <Divider sx={{my:1}}/>
                    <Typography variant='body2'>Reviewers:</Typography>
                    <AvatarGroup sx={{width:'fit-content'}}>
                        {
                            data.reviewers?.map((reviewer, index)=>{
                                return(<Tooltip title={reviewer.username} placement="bottom-start" arrow  key={index}><Avatar {...stringAvatar(reviewer.username)}/></Tooltip>)
                            })
                        }
                    </AvatarGroup>

                    </Paper>
                    <Paper sx={{p:2, my:3}}>
             
                    <Table  sx={{border: '1px solid lightgray'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>Complaint:</TableCell>
                                <TableCell>{data.complaint}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Findings:</TableCell>
                                <TableCell>{data.findings}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Current Habits:</TableCell>
                                <TableCell>
                                    <List>
                                    { data.current_habits?.map((item,index)=>{
                                        return(
                                        <ListItem key={index} disablePadding>
                                        <ListItemText
                                            primary={item.habit}
                                            secondary={item.frequency} 
                                        />
                                        </ListItem>
                                        )
                                    })}
                                    </List>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> 
                    </Paper>
                    <Paper sx={{p:2, my:3}}>
                    {
                        data.images?.length === 0 && 
                        <Typography sx={{mb:2}} color='GrayText' variant='body2'>No Images Added</Typography>
                    }
                    <Grid container spacing={2}>
                    {[...data.images].map((item, index) => (
                        <Grid item key={index} xs={4} md={3} lg={2}>
                            <div className='imageDiv'>
                                <div className='grid_image'>
                                    <img src={`${config["image_path"]}/${item.image_name}`} alt="Failed to Load"/>
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
                    </Paper>
                    <Paper sx={{p:2, my:3}}>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='body2'>Reviews:</Typography>
                    {
                        details.reviews?.map((item,index)=>{
                            return(
                                <Stack direction='row' key={index} sx={{background:'white', p:1}}>
                                    <Avatar {...stringAvatar("name")}/>
                                    <ArrowLeft/>
                                    <Box>
                                        <Typography variant='body2'><strong>Reviewers name</strong></Typography>
                                        <Typography variant='body2'>provisional_diagnosis:</Typography>
                                        <Typography variant='body2'>management_suggestions:</Typography>
                                        <Typography variant='body2'>management_suggestions:</Typography>
                                        <Typography variant='body2'>review_comment:</Typography>
                                        <Typography variant='body2'>other_comments:</Typography>
                                    </Box>
                                </Stack>
                            )
                        })
                    }
                    </Stack>
                    </Paper>
                    <Dialog fullScreen open={openAnnotation} onClose={handleClose} TransitionComponent={Transition}>
                        <Canvas imageIndex={imageIndex} open={openAnnotation} setOpen={setOpenAnnotation} data={data} setData={setData} upload={false}/>
                    </Dialog>
                    </>
                    }

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