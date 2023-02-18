import React, { useState, useEffect} from 'react';
import {Box, LinearProgress} from '@mui/material';
import {Typography, Stack} from '@mui/material';
import config from '../../../config.json'
import axios from 'axios';
import NotificationBar from '../../NotificationBar';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector} from 'react-redux';
import AddHospital from './AddHospital';
import DeleteHospital from './DeleteHospital';

const HospitalTable = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const selectorData = useSelector(state => state.userData.data);
    const [userData, setUserData] = useState(selectorData);

    const columns = [
        {
          field: 'username',
          headerName: 'Hospitals',
          sortable: false,
          disableColumnMenu: true,
          renderCell: ({row}) =>(
                <Typography>{row.username}</Typography>    
          )
        },
        {
            field: '_id',
            headerName: ' ',
            sortable: false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: ({row}) =>(
               <Typography color='GrayText'>{row.reg_no}</Typography>
            )
        },
        {
            field: "reg_no",
            headerName: " ",
            sortable: false,
            disableColumnMenu: true,
            align: "right",
            renderCell: ({ row }) =>
                <DeleteHospital name={row.username}/>
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
            'Authorization': `Bearer ${userData.accessToken.token}`,
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
            <AddHospital/>
        </Box>
        <DataGrid
                rows={request}
                columns={columns}
                pageSize={25}
                autoHeight={true}
                disableSelectionOnClick
                rowsPerPageOptions={[25]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) =>  row._id}

                loading={loading}   // you need to set your boolean loading
        
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

export default HospitalTable;