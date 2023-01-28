import React, {useState} from 'react';
import { Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Stack, InputAdornment} from '@mui/material';
import {Box, Grid, Button, FormControlLabel, Checkbox, IconButton} from "@mui/material";
import { Close } from '@mui/icons-material';
import axios from 'axios';
import config from '../../config.json';
import NotificationBar from '../NotificationBar';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const rows = [
    {patient_id: "P158", age: "28",gender: "Male",risk_factors:["smoking"], category:"Benign", histo_diagnosis: ""},
    {patient_id: "P160", age: "32",gender: "Female",risk_factors:[], category:"Benign", histo_diagnosis: ""},
    {patient_id: "P161", age: "21",gender: "Male",risk_factors:["alcohol"], category:"Malignant", histo_diagnosis: ""},
    {patient_id: "P170", age: "45",gender: "Male",risk_factors:["smoking","betel"], category:"OCA", histo_diagnosis: ""},
    {patient_id: "P171", age: "28",gender: "Male",risk_factors:["smoking"], category:"Benign", histo_diagnosis: ""},
    {patient_id: "P173", age: "32",gender: "Female",risk_factors:[], category:"Benign", histo_diagnosis: ""},
    {patient_id: "P174", age: "21",gender: "Male",risk_factors:["alcohol"], category:"Malignant", histo_diagnosis: ""},
    {patient_id: "P175", age: "45",gender: "Male",risk_factors:["smoking","betel"], category:"OCA", histo_diagnosis: ""},
]

const PatientsTable = () => {
    
    const [filt, setFilt] = useState('') // Initialize it with an empty filter
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const columns = [
        { field: "action", headerName: " ", sortable: false, disableColumnMenu: true, align: "center",
            renderCell: ({ row }) =>
            <Link to={`/manage/patients/${row.patient_id}`}>
              <IconButton>
                <Edit fontSize='small'/>
                
              </IconButton>
            </Link>
        },
        {field: 'patient_id', headerName: 'Patient Id', flex: 1, disableColumnMenu: true},
        {field: 'age', headerName: 'Age', flex: 1, disableColumnMenu: true},
        {field: 'gender', headerName: 'Gender', sortable: false, flex: 1, disableColumnMenu: true},
        {field: 'risk_factors', headerName: 'Risk Factors', sortable: false, flex: 1, disableColumnMenu: true},
        {field: 'category', headerName: 'Category', flex: 1, disableColumnMenu: true},
    ];

    return (
            <Box>   
                <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                    <TextField onChange={(e)=>handleChange(e)} variant="standard" placeholder='Search by patient Id'
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
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    autoHeight={true}
                    disableSelectionOnClick
                    disableMultipleColumnsFiltering={false}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    rowHeight={35}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) =>  row.patient_id}

                    filterModel={{
                        items: [{ columnField: 'patient_id', operatorValue: 'contains', value: filt }]
                    }}
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {outline: "none !important"},
                        ".MuiDataGrid-columnSeparator": {display: "none !important"}
                    }}
                />        
            </Box>   
    );
};

export default PatientsTable;