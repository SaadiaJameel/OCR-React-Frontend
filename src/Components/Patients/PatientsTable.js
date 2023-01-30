import React, {useEffect, useState} from 'react';
import { LinearProgress, Stack, TextField} from '@mui/material';
import { InputAdornment} from '@mui/material';
import {Box, IconButton} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NotificationBar from '../NotificationBar';
import axios from 'axios';
import config from '../../config.json';
import AddNewPatient from './AddNewPatient';


const PatientsTable = () => {
    
    const [filt, setFilt] = useState('') // Initialize it with an empty filter
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(()=>{

        setLoading(true);

        axios.get(`${config['path']}/user/patient/all`,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
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
        { field: "action", headerName: " ", sortable: false, disableColumnMenu: true, align: "center",
            renderCell: ({ row }) =>
            <Link to={`/manage/patients/${row._id}`}>
              <IconButton>
                <Edit fontSize='small'/>
              </IconButton>
            </Link>
        },
        {field: 'patient_id', headerName: 'Patient Id', flex: 1, disableColumnMenu: true},
        {field: 'age', headerName: 'Age', flex: 1, disableColumnMenu: true},
        {field: 'gender', headerName: 'Gender', sortable: false, flex: 1, disableColumnMenu: true},
        {field: 'category', headerName: 'Category', flex: 1, disableColumnMenu: true},
    ];

    return (
            <Box>   
                <AddNewPatient/>
                <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                    <TextField onChange={(e)=>handleChange(e)} size='small' variant="standard" placeholder='Search by patient Id'
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize='small'/>
                            </InputAdornment>
                        )
                        }}
                    />
                </Box>

                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={pageSize}
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
                <NotificationBar status={status} setStatus={setStatus}/>  

            </Box>   
    );
};

export default PatientsTable;