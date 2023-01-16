import React, {useState} from 'react';
import { Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Box, Grid, Button, OutlinedInput, Checkbox, ListItemText, useMediaQuery} from "@mui/material";
import {AppBar, Toolbar, Slide, Dialog} from "@mui/material";
import mouth from '../Assets/mouth.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import {EditAttributes, EditAttributesOutlined, Close} from '@mui/icons-material';
import Canvas from './Annotation/Canvas';

const AllRiskFactors = ['Smoking', 'Chewing Betel','Alcohol'];
const AllCategories = ['OCA', 'OPMD', 'Benign', 'Healthy'];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImagesPage = () => {
    
    const [riskFactor, setRiskFactor] = useState([]);
    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    
    const handleClickOpen = () => {
        setOpen(true);
    };    

    const handleClose = () => {
        setOpen(false);
    };

    const annotation = (img)=>{
        setImage(img);
        handleClickOpen();
    }

    const handleRiskFactorChange = (event) => {
      const {target: { value },} = event;
      setRiskFactor(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleCategoryChange = (event) => {
      const {target: { value },} = event;
      setCategory(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('reg_no'))
        console.log(data.get('category'))
    }

    const matches = useMediaQuery('(min-width:800px)');

    return (
        <div className='body'>
            <Paper sx={{p:2, my:1}}>
            <Typography sx={{ fontWeight: 700, m: 1 }}>Image Filters</Typography>               
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>                    
                                    
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item>
                            <TextField margin="normal" size='small' label="Patients' Reg No" name="reg_no" sx={{width:'250px'}}/>
                        </Grid>
                        <Grid item>
                            <FormControl margin="normal">
                                <InputLabel size='small' id="risk-factor-label">Risk Factor</InputLabel>
                                <Select size='small' labelId="risk-factor-label" name='risk factor' label="Risk Factor"  multiple sx={{width:'250px'}}
                                value={riskFactor} onChange={handleRiskFactorChange} input={<OutlinedInput label="Risk Factor" />} renderValue={(selected) => selected.join(', ')}>
                                {AllRiskFactors.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    <Checkbox checked={riskFactor.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl margin="normal">
                                <InputLabel size='small' id="category">Category</InputLabel>
                                <Select size='small' labelId="category" name='category' label="Category"  multiple sx={{width:'250px'}}
                                value={category} onChange={handleCategoryChange} input={<OutlinedInput label="Category" />} renderValue={(selected) => selected.join(', ')}>
                                {AllCategories.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    <Checkbox checked={category.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" sx={{mt:2}} > Get Images </Button>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Paper>
            <Paper sx={{p:2, my:1}}>
                
                <ImageList cols={matches? 8:5}>
                    {itemData.map((item, index) => (
                        <ImageListItem key={index}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{background: 'transparent'}}
                            position="top"
                            actionIcon={
                                
                                <IconButton size='small' sx={{ color: 'white' }} aria-label={`star ${item.title}`} onClick={()=>annotation(item.img)}>
                                    {item.annotated?
                                    <EditAttributesOutlined />
                                    :
                                    <EditAttributes />
                                    }
                                </IconButton>
                            }
                            actionPosition="right"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Paper>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'fixed'}}>
                <Toolbar>
                    <Typography sx={{ flex: 1 }} variant="h6" component="div">Image Annotation</Typography>
                
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <Close/>
                    </IconButton>
                </Toolbar>
                </AppBar>
                <div style={{minHeight:"50px", width: "100px"}}></div>
                <Canvas img={image} open={open} />
            </Dialog>
        </div>
    );
};

export default ImagesPage;


const itemData = [
    {
      img: mouth,
      title: 'Breakfast',
      author: '@bkristastucchio',
      annotated: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      annotated: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      annotated: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
      annotated: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      annotated: false,
    },
  ];