import React, { useState, useEffect} from 'react';
import {Box} from '@mui/material';
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

const ReviewersTable = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const [filt, setFilt] = useState('');
    const userData = useSelector(state => state.userData.data);

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    const columns = [
        {
          field: 'username',
          headerName: 'Reviewers',
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
            <Link to={`/adminportal/reviewers/${row._id}`}>
                <OpenInNew fontSize='small'/>
            </Link>
        }
    ];

    useEffect(()=>{

        setLoading(true);

        axios.get(`${config['path']}/admin/reviewers`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': userData.email,
        },
            withCredentials: true
        }
        ).then(res=>{
            setRequests(res.data)
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
                        No Reviewers
                      </Stack>
                    ),
                    NoResultsOverlay: () => (
                      <Stack height="100%" alignItems="center" justifyContent="center">
                        filter returns no result
                      </Stack>
                    ),
                    LoadingOverlay: () => (
                        <Box sx={{height: "max-content"}}>
                          {[...Array(2)].map((_, index) => (
                            <Stack direction='row' alignItems='center' key={index}>
                                <Skeleton variant="circular" width={40} height={40} sx={{m:1}}/>
                                <Skeleton variant="text" width={210} sx={{ fontSize: '2rem',m:1 }}/>
                            </Stack>
                          ))}
                        </Box>
                    )
                  }}
            />
            <NotificationBar status={status} setStatus={setStatus}/>

        </>
    );
};;

export default ReviewersTable;