import React, {useState} from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, 
    List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Edit, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const roles = [
    {name:"System Admin", permissions:[1,2,3], _id:'1'},
    {name:"Admin", permissions:[1,2,3],_id:'2'},
    {name:"Reviewer", permissions:[1,2,3], _id:'3'},
    {name:"Recruiter", permissions:[1,2,3], _id:'4'}
]

const permissions = {
    1: "permision1",
    2: "permision2",
    3: "permision3",
    4: "permision4",
    5: "permision5",
}

const UserPermissions = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/adminportal/permissions/${id}`);
    };

    const handleAddNew = ()=>{
        navigate(`/adminportal/permissions/new`)
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="inner_content">
        <div>
            <Box className="sticky">    
            <Typography sx={{ fontWeight: 700}} variant="h5">User Permissions</Typography>    
            </Box> 
            <Button variant='contained' sx={{mt:2}} onClick={handleAddNew}>Add New Role</Button> 
            <Paper sx={{p:2, my:3}}>  
            {
                roles.map((role,index)=>{
                    return(
                    <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}  >
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography variant='body2'>{role.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{background:'var(--bg-color)'}} >
                            {
                                role.permissions.map((p, i)=>{
                                    return(
                                        <Typography variant='body2' key={i}>{permissions[p]}</Typography>
                                    )
                                })
                            }
                        <Stack justifyContent='flex-end' direction='row'>
                            <IconButton size='small' onClick={()=>handleEdit(role._id)} ><Edit fontSize='small'/></IconButton>
                        </Stack>
                    </AccordionDetails>
                    </Accordion>
                    )
                })
            }
            </Paper>
            {/* <Paper sx={{p:2, my:3}}>  
            <Typography>Permissions:</Typography>
            <List>
            {
                Object.keys(permissions).map((key, i)=>{
                    return(
                        <ListItem key={i}>
                            <ListItemText primary={permissions[key]}/>
                        </ListItem>
                    )
                })
            }
            </List>
            </Paper> */}
        </div>
        </div>
    );
};

export default UserPermissions;