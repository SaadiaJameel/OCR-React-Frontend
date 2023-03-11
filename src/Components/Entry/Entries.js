import { FilterList, Photo, Comment, MoreVert } from '@mui/icons-material';
import { Avatar, AvatarGroup, Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const filtOptions = ["All","New","Updated","Assigned","Unassigned"]
const entry = [{
    "_id":"id",
    "patient": {
        "name":"patient name",
        "patient_id":"patient_id",
    },
    "assignees": [{"name":"P Silva", "availability":false},{"name":"M Perera", "availability":true}],
    "images":["1","2","3"],
    "Complaint":"",
    "startTime":"",
    "endTime":"",
    "findings":"findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here",
    "currentHabits":"",
    "reports":"",
    "reviews": ["1","2","3","4","5"],
    "createdAt": "2023-05-06 5.00 am",
    "updatedAt": "2023-05-10 10.14 pm"

},{
    "_id":"id",
    "patient": {
        "name":"patient name",
        "patient_id":"patient_id"
    },
    "assignees": [{"name":"M Perera", "availability":true}],
    "images":["1"],
    "Complaint":"",
    "startTime":"",
    "endTime":"",
    "findings":"findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here findings findings findings new findings are shown here",
    "currentHabits":"",
    "reports":"",
    "reviews": [],
    "createdAt": "2023-05-06 5.00 am",
    "updatedAt": "2023-05-10 10.14 pm"

}]

const IconInfo = (props)=>{
    return(
        <div style={{display: 'flex', alignItems:'center', 
        gap:3, marginTop:3}}>
            {props.children}
        </div>
    )
}

const Entries = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState("All");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (name)=>{
        setValue(name);
        handleClose();
    }

    const handleSelect = (id)=>{
       navigate(`/manage/entries/${id}`);
    }

    return (
        <div className="inner_content">
        <div>
            <div style={{position:'sticky', top:0, left:0, background:'white', width:'100%', zIndex:1}}>
            <Typography sx={{ fontWeight: 700}} variant="h5">Entry</Typography> 
            <Stack direction='row' alignItems='center' spacing={1}>
                <IconButton
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                ><FilterList/></IconButton>

                <Typography color='GrayText'>{value}</Typography>
            </Stack>
            </div>

            <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button'}} anchorEl={anchorEl} open={open} onClose={handleClose}>
                {filtOptions.map((item,index)=>{ return(<MenuItem key={index} onClick={()=>handleFilter(item)}>{item}</MenuItem>)})}
            </Menu>

            <Table  sx={{border: '1px solid lightgray', mb:3}}>
                {/* <TableHead>
                    <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>Patient ID</TableCell>
                        <TableCell>Images/Reviews</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>Updated At</TableCell>
                        <TableCell>Reviewers</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>                    
                    {
                        [...Array.from({ length: 4 }, () => entry).flat()].map((entry, index)=>{
                            return(
                                <TableRow key={index} sx={{cursor:'pointer', '&:hover':{background: '#f0f0f0'}}} onClick={()=>handleSelect(entry._id)}>
                                    <TableCell>{entry.createdAt}</TableCell>
                                    <TableCell>{entry.patient.name}</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>{entry.patient.patient_id}</TableCell>
                                    <TableCell>
                                        <Photo sx={{mx:1}} fontSize='small' color={entry.images.length>0?'info':'action'}/>{entry.images.length} 
                                        <Comment sx={{mx:1}} fontSize='small' color={entry.reviews.length>0?'warning':'action'}/>{entry.reviews.length}
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>{entry.updatedAt}</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }}}>
                                        <AvatarGroup>
                                            {
                                                entry.assignees.map((reviewer, index)=>{
                                                    return(
                                                    <Tooltip title={reviewer.name} placement="bottom-end" arrow  key={index}>
                                                        <Avatar sx={{height:'25px',width:'25px'}}>{reviewer.name[0]}</Avatar>
                                                    </Tooltip>)
                                                })
                                            }
                                        </AvatarGroup>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
        </div>
    );
};

export default Entries;