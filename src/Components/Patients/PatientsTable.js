import React, {useEffect, useState } from 'react';
import { FormControl, LinearProgress, Menu, MenuItem, OutlinedInput, Paper, Stack, TextField, Typography} from '@mui/material';
import { InputAdornment} from '@mui/material';
import {Box, IconButton} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Edit, FilterList, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBar from '../NotificationBar';
import axios from 'axios';
import config from '../../config.json';
import AddNewPatient from './AddNewPatient';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector} from 'react-redux';

const filtOptions = ["All","New","Updated","Assigned","Unassigned"]

const PatientsTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState("All");
    const open = Boolean(anchorEl);
    const [filt, setFilt] = useState('') // Initialize it with an empty filter
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false});
    const userData = useSelector(state => state.data);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const handleFilter = (name)=>{
        setValue(name);
        handleClose();
    }

    const handleClick = (params) => {
        navigate(`/manage/patients/${params.row._id}`)
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    function searchCall(name){
        axios.get(`${config['path']}/user/patient/search`,{
            headers: {
                'Authorization': `Bearer ${userData.accessToken.token}`,
                'email': JSON.parse(sessionStorage.getItem("info")).email,
            },
            params: {
                "query" : name,
                "field" : "patient_id"
            },
            withCredentials: true
        }).then(res=>{
            setOptions(res.data);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
    };

    const onInputChange = (event, value, reason) => {
        if(value){
            searchCall(value);
        }else{
            setOptions([]);
        }
    };

    

    useEffect(()=>{

        setLoading(true);

        axios.get(`${config['path']}/user/patient/all`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data.patients);
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
    },[])
  

    const columns = [
        {field: 'patient_id', headerName: 'Patient Id', flex: 1, disableColumnMenu: true},
        {field: 'age', headerName: 'Age', flex: 1, disableColumnMenu: true},
        {field: 'gender', headerName: 'Gender', sortable: false, flex: 1, disableColumnMenu: true},
        {field: 'category', headerName: 'Category', flex: 1, disableColumnMenu: true},
    ];

    return (
        <div className="inner_content">
        <div>
        <div className="sticky">
            <Typography sx={{ fontWeight: 700}} variant="h5">Patients</Typography> 
        </div>
            
                <AddNewPatient/>
                
                <Paper sx={{p:2, my:3}}>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                <IconButton
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpen}
                ><FilterList/></IconButton>
                <FormControl sx={{width: '30ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        placeholder='Search by name'
                        size='small'
                        inputProps={{ maxLength: 20}}
                        onChange={(e)=>handleChange(e)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
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
                <DataGrid

                    rows={data}
                    columns={columns}
                    pageSize={pageSize}
                    onRowClick={handleClick}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    autoHeight={true}
                    disableSelectionOnClick
                    disableMultipleColumnsFiltering={false}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    rowHeight={35}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) =>  row._id}
                    loading={loading} 
                    filterModel={{
                        items: [{ columnField: 'patient_id', operatorValue: 'contains', value: filt }]
                    }}
                    sx={{
                        cursor:'pointer',
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {outline: "none !important"},
                        ".MuiDataGrid-columnSeparator": {display: "none !important"}
                    }}
                    components={{
                        NoRowsOverlay: () => (
                          <Stack height="100%" alignItems="center" justifyContent="center">
                            No Patients
                          </Stack>
                        ),
                        NoResultsOverlay: () => (
                          <Stack height="100%" alignItems="center" justifyContent="center">
                            filter returns no result
                          </Stack>
                        ),
                        LoadingOverlay: () => (
                            <LinearProgress/>
                        )
                      }}
                />  
                </Paper>
                <NotificationBar status={status} setStatus={setStatus}/>  
                <Autocomplete
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
                />
   
        </div>
    </div> 
    );
};

export default PatientsTable;