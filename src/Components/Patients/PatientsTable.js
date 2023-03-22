import React, {useEffect, useState } from 'react';
import { Button, FormControl, LinearProgress, Menu, MenuItem, OutlinedInput, Paper, Stack, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { InputAdornment, IconButton} from '@mui/material';
import { ArrowDownward, ArrowUpward, FilterList, Search } from '@mui/icons-material';
import {useNavigate } from 'react-router-dom';
import NotificationBar from '../NotificationBar';
import axios from 'axios';
import config from '../../config.json';
import { useSelector} from 'react-redux';
import dayjs from 'dayjs';
import { age } from '../utils';
import { LoadingButton } from '@mui/lab';

const filtOptions = ["All","ID","Name","Age","Gender","Created Date","Updated Date"]

const PatientsTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filt, setFilt] = React.useState("All");
    const open = Boolean(anchorEl);
    const [search, setSearch] = useState('') // Initialize it with an empty filter
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false});
    const userData = useSelector(state => state.data);
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(false);
    const [sort, setSort] = useState(true);
    const navigate = useNavigate();

    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = ()=>{
        setPage(1)
        getData();
    }

    const handleSort = () =>{
        setPage(1)
        setSort(!sort)
    }

    const handleFilter = (name)=>{
        setPage(1);
        setFilt(name);
        handleClose();
        getData();
    }

    const handleClick = (id) => {
        navigate(`/manage/patients/${id}`)
    };

    const handleAddNew = () => {
        navigate(`/manage/patients/new`);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(() => {
        getData();
    }, [sort]);

    const loadMore = () => {
        setLoading(true);
        setNoMore(false);
        axios.get(`${config['path']}/user/patient/get`,{
            params: { page: page + 1, search: search, filter: filt, sort:sort},
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            withCredentials: true
        }).then(res=>{
            if(res.data.patients?.length < 20) setNoMore(true);
            setData([...data, ...res.data.patients]);
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
        axios.get(`${config['path']}/user/patient/get`,{
            params: { page: 1, search: search, filter: filt, sort: sort},
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            withCredentials: true
        }).then(res=>{
            if(res.data.patients?.length < 20) setNoMore(true);
            setData(res.data.patients);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setLoading(false);
        })
    }
    
    // function searchCall(name){
    //     axios.get(`${config['path']}/user/patient/search`,{
    //         headers: {
    //             'Authorization': `Bearer ${userData.accessToken.token}`,
    //             'email': JSON.parse(sessionStorage.getItem("info")).email,
    //         },
    //         params: {
    //             "query" : name,
    //             "field" : "patient_id"
    //         },
    //         withCredentials: true
    //     }).then(res=>{
    //         setOptions(res.data);
    //     }).catch(err=>{
    //         if(err.response) showMsg(err.response.data.message, "error")
    //         else alert(err)
            
    //     })
    // };

    // const onInputChange = (event, value, reason) => {
    //     if(value){
    //         searchCall(value);
    //     }else{
    //         setOptions([]);
    //     }
    // };   

    // useEffect(()=>{

    //     setLoading(true);

    //     axios.get(`${config['path']}/user/patient/all`,
    //     { headers: {
    //         'Authorization': `Bearer ${userData.accessToken.token}`,
    //         'email': JSON.parse(sessionStorage.getItem("info")).email,
    //     }}
    //     ).then(res=>{
    //         setData(res.data.patients);
    //         setLoading(false);
    //     }).catch(err=>{
    //         if(err.response) showMsg(err.response.data.message, "error")
    //         else alert(err)
            
    //     })
    // },[])
  
    function highlightSearchText(text, search) {
        try {
            if(search === "") return <Typography variant='body2'>{text}</Typography>
            const regex = new RegExp(search, 'gi');
            return <Typography variant='body2'  dangerouslySetInnerHTML={{ __html: text.replace(regex, `<mark>$&</mark>`) }}></Typography>
        } catch (error) {
            return <Typography variant='body2'>{text}</Typography>
        }  
    }
      

    return (
        <div className="inner_content">
        <div>
        <div className="sticky">
            <Typography sx={{ fontWeight: 700}} variant="h5">Patients</Typography> 
        </div>
            
                <Button sx={{mt:2}} variant='contained'onClick={handleAddNew}>Add New</Button>
                
                <Paper sx={{p:2, my:3}}>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                    <IconButton
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpen}
                    ><FilterList/></IconButton>
                    <Typography variant='body2' color='GrayText'>{filt}</Typography>
                    <IconButton size='small' onClick={handleSort}>
                        { sort?
                        <ArrowUpward color='disabled' fontSize='small'/>
                         :
                        <ArrowDownward color='disabled' fontSize='small'/>
                        }
                    </IconButton>
                    </Stack>
                
                <FormControl sx={{width: '30ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        placeholder='Search'
                        size='small'
                        inputProps={{ maxLength: 20}}
                        onChange={(e)=>handleChange(e)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={()=>handleSearch()}
                            >
                            <Search/>
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
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
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        loading && 
                        <TableRow >
                            <TableCell sx={{p:0}} colSpan={4}><LinearProgress/></TableCell>
                        </TableRow>
                    }
                    {data.map((item,index)=>{ 
                        return(
                        <TableRow key={index} sx={{cursor:'pointer', '&:hover':{background: '#f8f8f8'}}} onClick={()=>handleClick(item._id)}>
                            <TableCell>{highlightSearchText(item.patient_id, search)}</TableCell>
                            <TableCell>{highlightSearchText(item.patient_name, search)}</TableCell>
                            <TableCell>{age(dayjs(item.DOB))}</TableCell>
                            <TableCell>{highlightSearchText(item.gender, search)}</TableCell>
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
                {/* <Autocomplete
                    sx={{mt:2}}
                    options={options}
                    onInputChange={onInputChange}
                    getOptionLabel={(option) => option.patient_id}
                    style={{ width: 300 }}
                    noOptionsText="No Patients"
                    onChange={(event, value) => {navigate(`/manage/patients/${value._id}`)}} 
                    renderInput={(params) => (
                    <TextField {...params} label="Search By ID" variant="outlined" />
                    )}
                />    */}
        </div>
    </div> 
    );
};

export default PatientsTable;