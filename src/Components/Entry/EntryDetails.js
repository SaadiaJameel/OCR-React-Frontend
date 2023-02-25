import React from 'react';
import { Close, Fullscreen, FullscreenExit, People} from '@mui/icons-material';
import { Avatar, AvatarGroup, IconButton, Tooltip, Typography , Stack, Box, Popover, Button, Divider, Grid} from '@mui/material';
import { stringAvatar } from '../utils';
import image from '../../Assets/noImage.jpg'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const EntryDetails = ({details, setDetails, setShowList, showList}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const closePanel = ()=>{
        setDetails(null);
        setShowList(true);
    }

    const openFullPanel = ()=>{
        setShowList(false);
    }

    const closeFullPanel = ()=>{
        setShowList(true);
    }

    return (
        <div>
            <Box sx={{background: '#f0f0f0', p:2, borderRadius:2}}>

            <Stack direction='row' justifyContent='flex-end' >
                <Typography variant='h5' aria-describedby={id} onClick={handleClick} color='Highlight' sx={{cursor:'pointer'}}>
                    {details.patient.name}
                </Typography>
                <div style={{flexGrow:1}}/>
                {showList?
                    <IconButton onClick={openFullPanel}><Fullscreen/></IconButton>
                    :
                    <IconButton onClick={closeFullPanel}><FullscreenExit/></IconButton>
                }
                <IconButton onClick={closePanel}><Close/></IconButton>
            </Stack>

            <Typography variant='h6'>Id: {details.patient.patient_id}</Typography>
            <Divider sx={{my:1}}/>
            <Stack direction='row' spacing={1}>
                <Typography>date</Typography>
                <Typography>time</Typography>
                <Typography>duration</Typography>
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
            <Stack direction='column' spacing={1}>
                <Typography>Complaint:</Typography>
                <Typography bgcolor='white' p={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci</Typography>

                <Typography>Findings:</Typography>
                <Typography bgcolor='white' p={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci, volutpat at lectus sit amet, fermentum consequat eros. Aliquam quis nulla blandit, tristique ipsum vitae, suscipit tortor. Vivamus in aliquam turpis. Donec in elit quis risus pulvinar condimentum quis at magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Integer et consectetur tellus. Vestibulum ac neque tempus, </Typography>
                
                <Typography>Current Habits:</Typography>
                <Typography bgcolor='white' p={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis fermentum orci, sed dapibus sem. Ut in pretium odio. Donec lorem orci</Typography>
            </Stack>    
            
            <Stack sx={{my:2}} direction='column' spacing={1}>
                <Typography>Reviews:</Typography>
            {
                details.reviews.map((item,index)=>{
                    return(
                        <Stack direction='row' spacing={1} key={index} sx={{background:'white', p:1}}>
                            <Avatar {...stringAvatar("name")}/>
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
            <Grid container spacing={2} columns={12} sx={{my:1}}>
                {[1,2,3,4,5,5,5,5,5,5].map((item, index) => (
                    <Grid item key={index} xs={12} md={6}>
                        <div className='imageDiv'>
                            <div className='grid_image'>
                                <img src={image}/>
                                {/* <img src={`${config["image_path"]}/${item.image_name}`} alt="Failed to Load"/>
                                {item.annotation.length === 0 && <div className='overlay'>
                                <svg onClick={()=>handleDoubleClick(index)}>
                                    <polygon points="0,0,70,0,70,70"/>
                                </svg>
                                </div>}
                                <Stack direction='row' sx={{position:'absolute', bottom:10, right:0}}>
                                    <IconButton onClick={()=>handleEdit(index)} size='small' sx={{ color:'transparent'}} className='iconBackground'><Crop fontSize='small'/></IconButton>
                                    <IconButton onClick={()=>handleDoubleClick(index)} size='small' sx={{ color:'transparent'}} className='iconBackground'><Edit fontSize='small'/></IconButton>
                                    <IconButton onClick={()=>handleDelete(index)} size='small' sx={{ color:'transparent'}} className='iconBackground'><Delete fontSize='small'/></IconButton>
                                </Stack> */}
                            </div>
                                    
                            <Stack direction='column' justifyContent='space-between' alignItems='start' px={1}>
                            <Box>
                                <Typography fontSize='small' color='GrayText'>item.location | item.clinical_diagnosis</Typography>
                            </Box>
                            </Stack>
                        </div>
                    </Grid>
                ))}
            </Grid>          
            </Box>
           
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <Box sx={{minWidth:'400px'}}>
                    <Box sx={{background: '#48A9E6', height:'50px', width:'100%',position:'absolute'}}></Box>
                    <IconButton sx={{mx:1,border:'5px solid #48A9E6',background: '#fff', '&:hover':{background:'#f0f0f0'}}}><People sx={{color:'lightgray', width:'60px',height:'60px'}}/></IconButton>
                    <Box px={2} py={1}>
                        <Typography>{details.patient.name}</Typography>
                        <Typography color='GrayText'>{details.patient.patient_id}</Typography>
                        <Typography>Age: Gender:</Typography>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};

export default EntryDetails;