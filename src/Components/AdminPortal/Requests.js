import React, { useState, useEffect} from 'react';
import {Box} from '@mui/material';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import {Avatar, Typography, Badge, Stack} from '@mui/material';
import config from '../../config.json'
import axios from 'axios';
import NotificationBar from '../NotificationBar';
import { stringAvatar} from '../utils';
import { DataGrid } from '@mui/x-data-grid';
import { OpenInNew, Search } from '@mui/icons-material';
import CheckRequest from './CheckRequest';

const Requests = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const [filt, setFilt] = useState('')
    const [view, setView] = useState(false);
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const handleView = (row)=>{
        setView(true);
        setData(row);
    }

    const columns = [
        {
          field: 'username',
          headerName: 'Requests',
          sortable: false,
          flex: 1,
          disableColumnMenu: true,
          renderCell: ({row}) =>(
              <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar {...stringAvatar(row.username)} />
                    <Stack direction='column'>
                        <Typography>{row.username}</Typography>
                        <Typography color='GrayText'>{row.reg_no}</Typography>
                    </Stack>
              </Stack>
          )
        },
        {
          field: "reg_no",
          headerName: " ",
          sortable: false,
          disableColumnMenu: true,
          align: "center",
          renderCell: ({ row }) =>
            <IconButton onClick={()=>handleView(row)}>
              <OpenInNew fontSize='small'/>
            </IconButton>
        }
    ];

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(()=>{
        axios.get(`${config['path']}/admin/requests`,
        { headers: {
          'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
          'email': JSON.parse(sessionStorage.getItem("info")).email,
        }},
        {
          email: JSON.parse(sessionStorage.getItem("info")).email,
          username: JSON.parse(sessionStorage.getItem("info")).username,
        }
        ).then(res=>{
            setRequests(res.data)
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message)
            else alert(err)
            
        }).finally(()=>{
            setLoading(false);
        })
    },[view])
  

    return (
        <>
        <Stack direction='row' alignItems='center'>
            <Typography sx={{ fontWeight: 700}} variant='h5'>Requests</Typography>  
        </Stack>

        {view? 
        <CheckRequest setView={setView} data={data}/>
        :
        <>
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <TextField onChange={(e)=>handleChange(e)} variant="standard"
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
                getRowId={(row) =>  row.email}
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
                    )
                  }}
            />

            </>
        }
        <NotificationBar status={status} setStatus={setStatus}/>

        </>
    );
};;

export default Requests;