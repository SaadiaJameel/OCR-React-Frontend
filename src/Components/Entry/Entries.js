import React, {useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Button, FormControl, LinearProgress, Menu, MenuItem, OutlinedInput, Paper, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography} from '@mui/material';
import {IconButton} from '@mui/material';
import {FilterList, Image, Message} from '@mui/icons-material';
import {useNavigate } from 'react-router-dom';
import NotificationBar from '../NotificationBar';
import axios from 'axios';
import config from '../../config.json';
import { useSelector} from 'react-redux';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

const filtOptions = ["Created Date","Updated Date"]

const Entries = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filt, setFilt] = React.useState("Created Date");
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false});
    const userData = useSelector(state => state.data);
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(false);
    const navigate = useNavigate();

    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (name)=>{
        setPage(1);
        setFilt(name);
        handleClose();
        getData();
    }

    const handleClick = (id) => {
        navigate(`/manage/entries/${id}`)
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(() => {
        getData();
    }, []);

    const loadMore = () => {
        setLoading(true);
        setNoMore(false);
        axios.get(`${config['path']}/user/entry/get`,{
            params: { page: page + 1, filter: filt},
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            withCredentials: true
        }).then(res=>{
            if(res.data?.length < 20) setNoMore(true);
            setData([...data, ...res.data]);
            setPage(page+1);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setLoading(false);
        })
    };

    const getData = ()=>{
        setLoading(true);
        setNoMore(false);
        axios.get(`${config['path']}/user/entry/get`,{
            params: { page: 1, filter: filt},
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            withCredentials: true
        }).then(res=>{
            if(res.data?.length < 20) setNoMore(true);
            setData(res.data);
            console.log(res.data)
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setLoading(false);
        })
    }      

    return (
        <div className="inner_content">
        <div>
        <div className="sticky">
            <Typography sx={{ fontWeight: 700}} variant="h5">Consultation Entries</Typography> 
        </div>                
                <Paper sx={{p:2, my:3}}>
                <Stack direction='row' alignItems='center' spacing={1} mb={2}>
                    <IconButton
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpen}
                    ><FilterList/></IconButton>
                    <Typography variant='body2' color='GrayText'>{filt}</Typography>
                </Stack>

                <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button'}} anchorEl={anchorEl} open={open} onClose={handleClose}>
                {filtOptions.map((item,index)=>{ return(<MenuItem key={index} onClick={()=>handleFilter(item)}>{item}</MenuItem>)})}
                </Menu>

                <TableContainer sx={{border: '1px solid lightgray', borderRadius: 1}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient ID</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>Images/Reviews</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>Updated Date</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>Reviewers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        loading && 
                        <TableRow >
                            <TableCell sx={{p:0}} colSpan={6}><LinearProgress/></TableCell>
                        </TableRow>
                    }
                    {data.map((item,index)=>{ 
                        return(
                        <TableRow key={index} sx={{cursor:'pointer', '&:hover':{background: '#f8f8f8'}}} onClick={()=>handleClick(item._id)}>
                            <TableCell>{item.patient?.patient_id}</TableCell>
                            <TableCell>{item.patient?.patient_name}</TableCell>
                            <TableCell>{dayjs( new Date(item.createdAt)).format('DD/MM/YYYY h:mm A')}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Image color={item.images?.length > 0? "primary":"disabled"} fontSize='small'/>
                                    <Typography variant='body2'>{item.images?.length}</Typography>
                                    <Message color={item.reviews?.length > 0? "primary":"disabled"} fontSize='small'/>
                                    <Typography variant='body2'>{item.reviews?.length ? item.reviews.length: 0}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>{dayjs( new Date(item.updatedAt)).format('DD/MM/YYYY h:mm A')}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                            <AvatarGroup max={3}>
                                {
                                    item.reviewers?.map((reviewer, index)=>{
                                        return(
                                            <Tooltip arrow placement='bottom-end' key={index} title={reviewer.username}><Avatar sx={{width: '30px', height:'30px'}}  alt={reviewer.username} src="/"/></Tooltip>
                                        )
                                    })
                                }
                            </AvatarGroup>
                            </TableCell>
                        </TableRow>
                    )})}
                    </TableBody>
                </Table>
                </TableContainer>
                <Stack direction='row' justifyContent='center'>
                    <LoadingButton disabled={noMore} loading={loading} sx={{mt:2}} onClick={loadMore}>Load More</LoadingButton>
                </Stack>
                </Paper>
                <NotificationBar status={status} setStatus={setStatus}/>  
        </div>
    </div> 
    );
};

export default Entries;