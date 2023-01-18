import React, { useState, useEffect } from 'react';
import { Paper, Divider, List, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material';
import {Avatar, Typography, Badge, Stack} from '@mui/material';
import {Mail} from '@mui/icons-material';
import config from '../config.json'
import axios from 'axios';
import NotificationBar from '../Components/NotificationBar';


function stringToColor(string) {
    let i, hash = 0;
    let color = '#';

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
}

function stringAvatar(name) {
    return {
    sx: {bgcolor: stringToColor(name)},
    children: `${name.split(' ')[0][0]}${name.split(' ')[1]?name.split(' ')[1][0]:""}`,
    };
}

const AdminPage = () => {

    const [request, setRequests] = useState([]);
    const [status, setStatus] = useState({msg:"",severity:"success", open:false}) 
    const [selected, setSelected] = useState(-1);

    const handleAccept = (id, index)=>{
        setSelected(index);

        axios.post(`${config['path']}/admin/accept/${id}`,
        {
          email: JSON.parse(sessionStorage.getItem("info")).email,
          username: JSON.parse(sessionStorage.getItem("info")).username,
        },
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }}
        ).then(res=>{
            showMsg(res.data.message, "success")
            var list = [...request];
            list.splice(index,1);
            setRequests(list);
        }).catch(err=>{
            if(err.response) showMsg(err.response.data.message, "error")
            else alert(err)
        }).finally(()=>{
            setSelected(-1);
        })

    }

    const handleReject = (id, index)=>{
       
        axios.delete(`${config['path']}/admin/requests/${id}`,
        { headers: {
            'Authorization': 'BEARER '+ JSON.parse(sessionStorage.getItem("info")).atoken,
            'email': JSON.parse(sessionStorage.getItem("info")).email,
        }},
        {
            email: JSON.parse(sessionStorage.getItem("info")).email,
            username: JSON.parse(sessionStorage.getItem("info")).username,
        }
        ).then(res=>{
            var list = [...request];
            list.splice(index,1);
            setRequests(list);
        }).catch(err=>{
            console.log(err)
            if(err.response) showMsg(err.response.data.message)
            else alert(err)
        }).finally(()=>{
            setSelected(-1);
        })
    }

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
            
          }) 
    },[])
  

    return (
        <div className='body'>
        <Paper sx={{p:3, my:1}}>
       
        <Stack direction='row'>
            <Typography sx={{ fontWeight: 700, m:1}}>Requests</Typography>  
            <Badge color="error" sx={{m:1}} badgeContent={request.length} showZero>
                <Mail color='action'/>
            </Badge>
        </Stack>

        <List>
            {request.map((item, index) => (
                <div key={index}>
                <ListItem
                    secondaryAction={
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' disabled={selected===index} onClick={()=>handleAccept(item._id, index)}>Accept</Button>
                        <Button variant='outlined' disabled={selected===index} color='error' onClick={()=>handleReject(item._id,index)}>Reject</Button>
                    </Stack>
                }>
                    <ListItemAvatar><Avatar {...stringAvatar(item.username)} /></ListItemAvatar>
                    <ListItemText
                    primary={item.username}
                    secondary={
                        <>
                        <span>{item.reg_no}</span><br/>
                        <span>{item.email}</span>
                        </>
                    }
                />
                </ListItem>
                <Divider variant="inset" component="li" />   
            </div>
            ))}
        
                     
        </List>
        </Paper>

        <NotificationBar status={status} setStatus={setStatus}/>

        </div>
    );
};;

export default AdminPage;