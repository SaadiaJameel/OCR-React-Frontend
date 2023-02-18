import React, { useState, useEffect} from 'react';
import {Box, LinearProgress} from '@mui/material';
import {TextField, InputAdornment, Skeleton} from '@mui/material';
import {Avatar, Typography, Stack} from '@mui/material';
import config from '../../config.json'
import axios from 'axios';
import NotificationBar from '../NotificationBar';
import { stringAvatar} from '../utils';
import { DataGrid } from '@mui/x-data-grid';
import { OpenInNew, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

const RequestsTable = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const [filt, setFilt] = useState('');
    const selectorData = useSelector(state => state.data);
    const [userData, setUserData] = useState(selectorData);

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const columns = [
        {
          field: "reg_no",
          headerName: " ",
          sortable: false,
          disableColumnMenu: true,
          align: "center",
          renderCell: ({ row }) =>
            <Link to={`/adminportal/requests/${row._id}`}>
                    <OpenInNew fontSize='small'/>
            </Link>
        },
        {
          field: 'username',
          headerName: 'Requests',
          sortable: false,
          flex: 1,
          disableColumnMenu: true,
          renderCell: ({row}) =>(
              <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar {...stringAvatar(row.username)} variant='rounded'/>
                    <Stack direction='column'>
                        <Typography>{row.username}</Typography>
                        <Typography color='GrayText'>{row.reg_no}</Typography>
                    </Stack>
              </Stack>
          )
        }
    ];

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(()=>{
        setLoading(true);
        setUserData(selectorData);
        axios.get(`${config['path']}/admin/requests`,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setRequests(res.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
    },[])
  

    return (
        <>        
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <TextField  onChange={(e)=>handleChange(e)} variant="standard" placeholder='Search by username'
                inputProps={{ maxLength: 20}}
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
                rows={request}
                columns={columns}
                pageSize={5}
                autoHeight={true}
                disableSelectionOnClick
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) =>  row._id}

                loading={loading}   // you need to set your boolean loading
                filterModel={{
                    items: [{ columnField: 'username', operatorValue: 'contains', value: filt }]
                }}

                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {outline: "none !important"},
                    ".MuiDataGrid-columnSeparator": {display: "none !important"},
                }}
                components={{
                    NoRowsOverlay: () => (
                      <Stack height="100%" alignItems="center" justifyContent="center">
                        No new requests
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

        </>
    );
};;

export default RequestsTable;