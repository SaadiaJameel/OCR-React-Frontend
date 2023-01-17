import React from 'react';
import {IconButton, Divider, Tooltip} from '@mui/material';
import {Preview,ZoomIn,CropFree,ZoomOut,Close, CancelOutlined, HelpOutline, Style, Save} from '@mui/icons-material';
import {ArrowUpward, ArrowDownward, ArrowBack, ArrowForward, Opacity, Check} from '@mui/icons-material';
import {Label, LabelOff} from '@mui/icons-material';

const ButtonPanel = ({func, labelVisibility}) => {

    return (
        <>
        <div style={{display: 'flex', flexDirection: "column"}}>
            <div>
                <Divider color="gray"/>  
                <Tooltip title="Show Regions" placement="bottom-end" arrow><IconButton onClick={func.show_regions} sx={{color: 'white'}}><Preview/></IconButton></Tooltip>
                <Tooltip title="Finish Drawing" placement="bottom-end" arrow><IconButton onClick={func.finish_drawing} sx={{color: 'white'}}><Check/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>  
                <Tooltip title="Zoom In" placement="bottom-end" arrow><IconButton onClick={func.zoom_in} sx={{color: 'white'}}><ZoomIn/></IconButton></Tooltip>
                <Tooltip title="Zoom Out" placement="bottom-end" arrow><IconButton onClick={func.zoom_out} sx={{color: 'white'}}><ZoomOut/></IconButton></Tooltip>
                <Tooltip title="Zoom Reset" placement="bottom-end" arrow><IconButton onClick={func.zoom_reset} sx={{color: 'white'}}><CropFree/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>
                <Tooltip title="Move Up" placement="bottom-end" arrow><IconButton onClick={()=>func.move_selected("ArrowUp", 10)} sx={{color: 'white'}}><ArrowUpward/></IconButton></Tooltip>
                <Tooltip title="Move Down" placement="bottom-end" arrow><IconButton onClick={()=>func.move_selected("ArrowDown", 10)} sx={{color: 'white'}}><ArrowDownward/></IconButton></Tooltip>
            </div>
            <div>
                <Tooltip title="Move Left" placement="bottom-end" arrow><IconButton onClick={()=>func.move_selected("ArrowLeft", 10)} sx={{color: 'white'}}><ArrowBack/></IconButton></Tooltip>
                <Tooltip title="Clear Right" placement="bottom-end" arrow><IconButton onClick={()=>func.move_selected("ArrowRight", 10)} sx={{color: 'white'}}><ArrowForward/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>
                <Tooltip title="Clear Selected" placement="bottom-end" arrow><IconButton onClick={func.delete_selected} sx={{color: 'white'}}><Close/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>
                <Tooltip title="Toggle Label Visibility" placement="bottom-end" arrow><IconButton onClick={func.show_label} sx={{color: 'white'}}>{labelVisibility?<LabelOff/>:<Label/>}</IconButton></Tooltip>
                <Tooltip title="Toggle label type" placement="bottom-end" arrow><IconButton onClick={func.label_type} sx={{color: 'white'}}><Style/></IconButton></Tooltip>
                <Tooltip title="Clear All" placement="bottom-end" arrow><IconButton onClick={func.opacity_change} sx={{color: 'white'}}><Opacity/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>
                <Tooltip title="Help" placement="bottom-end" arrow><IconButton onClick={func.show_help} sx={{color: 'white'}}><HelpOutline/></IconButton></Tooltip>
            </div>
            <div>
                <Divider/>
                <Tooltip title="Clear All" placement="bottom-end" arrow><IconButton onClick={func.clear_all} sx={{color: 'white'}}><CancelOutlined/></IconButton></Tooltip>
                <Divider color="gray"/>  
            </div>  
        </div>
        </>
    );
};
export default ButtonPanel;