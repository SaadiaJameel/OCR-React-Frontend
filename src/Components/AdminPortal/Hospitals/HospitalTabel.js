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

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [loading, setLoading] = useState(true);
    const selectorData = useSelector(state => state.userData.data);
    const [userData, setUserData] = useState(selectorData);

    const columns = [
        {
          field: 'name',
          headerName: 'Hospitals',
          sortable: false,
          flex: 1,
          disableColumnMenu: true,
          renderCell: ({row}) =>(
                <Typography>{row.name}</Typography>    
          )
        },
        {
            field: 'details',
            headerName: '',
            sortable: false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: ({row}) =>(
               <Typography color='GrayText'>{row.details}</Typography>
            )
        },
        {
            field: "_id",
            headerName: " ",
            sortable: false,
            disableColumnMenu: true,
            align: "right",
            renderCell: ({ row }) =>
                <DeleteHospital data={row}/>
          }
    ];

    const showMsg = (msg, severity)=>{
        setStatus({msg, severity, open:true})
    }

    useEffect(()=>{
        setLoading(true);
        setUserData(selectorData);
        axios.get(`${config['path']}/user/hospitals`,
        { headers: {
            'Authorization': `Bearer ${userData.accessToken.token}`,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            setData(res.data);
            setLoading(false);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
            
        })
    },[])
  

    return (
        <>        
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <AddHospital setData={setData}/>
        </Box>
        <DataGrid
                rows={data}
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
                        No new datas
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