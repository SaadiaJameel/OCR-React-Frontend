import React, { useState, useEffect} from 'react';
import {Box, Button, FormControl, IconButton, LinearProgress, OutlinedInput} from '@mui/material';
import {TextField, InputAdornment, Skeleton} from '@mui/material';
import {Avatar, Typography, Stack} from '@mui/material';
import config from '../../../config.json'
import axios from 'axios';
import NotificationBar from '../../NotificationBar';
import { stringAvatar} from '../../utils';
import { DataGrid } from '@mui/x-data-grid';
import { OpenInNew, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

const ReviewersTable = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const [filt, setFilt] = useState('');
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    const handleClick = (params) => {
        navigate(`/adminportal/reviewers/${params.row._id}`)
    };

    const columns = [
        {
            field: "_id",
            headerName: "Avatar",
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }) =>
                <Avatar {...stringAvatar(row.username)} variant='rounded' />
        },
        {
          field: 'username',
          headerName: 'Name',
          flex: 1,
          disableColumnMenu: true,
        },
        {
          field: 'reg_no',
          headerName: 'SLMC Reg No',
          flex: 1,
          disableColumnMenu: true,
        },
        {
          field: 'hospital',
          headerName: 'Hospital',
          flex: 1,
          disableColumnMenu: true,
        }
    ];

    useEffect(()=>{

        setLoading(true);

        axios.get(`${config['path']}/admin/reviewers`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setRequests(res.data)
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
    },[])
  

    return (
        <div className="inner_content">
        <div>  
        <Typography sx={{ fontWeight: 700}} variant="h5">Reviewers</Typography>          
        <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center',my:1}}>
        <Button variant='contained'>Add New</Button>
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
        </Box>
        <DataGrid
                rows={request}
                columns={columns}
                onRowClick={handleClick}
                hideFooter={true}
                autoHeight={true}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) =>  row._id}

                loading={loading}   // you need to set your boolean loading
                filterModel={{
                    items: [{ columnField: 'username', operatorValue: 'contains', value: filt }]
                }}

                sx={{
                    cursor:'pointer',
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {outline: "none !important"},
                    ".MuiDataGrid-columnSeparator": {display: "none !important"},
                }}
                components={{
                    NoRowsOverlay: () => (
                      <Stack height="100%" alignItems="center" justifyContent="center">
                        No Reviewers
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

        </div>
        </div>
    );
};;

export default ReviewersTable;