import { Close, OpenInNew } from '@mui/icons-material';
import { Avatar, AvatarGroup, IconButton, Tooltip, Typography , Stack, Box} from '@mui/material';
import React from 'react';

const EntryDetails = ({details, setDetails, setShowList}) => {

    const closePanel = ()=>{
        setDetails(null);
        setShowList(true);
    }

    const openFullPanel = ()=>{
        setShowList(false);
    }

    return (
        <div>
            <Box sx={{background: '#f0f0f0', p:2, borderRadius:2}}>
            <Stack direction='row' justifyContent='flex-end' >
                <IconButton onClick={openFullPanel}><OpenInNew/></IconButton>
                <IconButton onClick={closePanel}><Close/></IconButton>
            </Stack>
          
            <Typography>Patient Name: {details.patient.name}</Typography>
            <Typography>Patient Id: {details.patient.patient_id}</Typography>
            <Typography>Reviewers:</Typography>
            <AvatarGroup sx={{width:'fit-content'}}>
                {
                    details.assignees.map((reviewer, index)=>{
                        return(<Tooltip title={reviewer.name} placement="bottom-start" arrow  key={index}><Avatar alt={reviewer.name} src="/"></Avatar></Tooltip>)
                    })
                }
            </AvatarGroup>
            </Box>
        </div>
    );
};

export default EntryDetails;