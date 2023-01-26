import React, {useState} from 'react';
import {Typography, Box, Stack, Avatar, TextField, InputAdornment, IconButton, Button} from '@mui/material';
import { stringAvatar} from '../utils';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from '@mui/icons-material';
import EditProfile from './EditProfile';

const rows = [
    {username: "admin1", email: "admin1@gmail.com", reg_No: "adminreg1"},
    {username: "admin2", email: "admin2@gmail.com", reg_No: "adminreg2"},
    {username: "admin3", email: "admin3@gmail.com", reg_No: "adminreg3"},
]

const Reviewers = () => {

    const [filt, setFilt] = useState('') // Initialize it with an empty filter
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        setFilt(e.target.value);
    };

    const handleEdit = (row)=>{
        setEditing(true);
        setData(row);
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
                      <Typography color='GrayText'>{row.reg_No}</Typography>
                  </Stack>
              </Stack>
          )
        },
        {
          field: "action",
          headerName: " ",
          sortable: false,
          disableColumnMenu: true,
          align: "center",
          renderCell: ({ row }) =>
            <IconButton onClick={()=>handleEdit(row)}>
              <Edit fontSize='small'/>
            </IconButton>
        }
    ];

    return (
        <>
            <Typography sx={{ fontWeight: 700}} variant="h5">Reviewers</Typography> 

            {editing?

            <>
            <EditProfile setEditing={setEditing} data={data}/>
            </>

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
                rows={rows}
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
                    ".MuiDataGrid-columnSeparator": {display: "none !important"}
                }}
            />
        
            </>
            }
        </>
    );
};

export default Reviewers;