import React, {useState} from 'react';
import {Box,Button,Snackbar,Paper,Avatar,CssBaseline} from '@mui/material';
import {TextField, Grid,Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import background_img from '../Assets/background.jpeg';
import logo from '../Assets/logo.svg'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage =()=>{

    const [singup, setSignup] = useState(false);
    const [msg, setMsg] = useState("")
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const toggleSignin = ()=>{
        setSignup(!singup);
    }

    const handleSignInSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('email')==="" || data.get('password')===""){
            setMsg("Cannot leave Required fiels empty");
            setSeverity("error");
            setOpen(true);
            return
        }
        if(data.get("password").length < 8){
            setMsg("Password should contain atleast 8 charactors");
            setSeverity("error");
            setOpen(true);
            return
        }



    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('email')==="" || data.get('regNo')==="" 
        || data.get('password')==="" || data.get('confirm password')===""){
            setMsg("Cannot leave required fields empty");
            setSeverity("error");
            setOpen(true);
            return
        }
        if(data.get("password").length < 8){
            setMsg("Password should contain atleast 8 charactors");
            setSeverity("error");
            setOpen(true);
            return
        }
        if(data.get("password") !== data.get("confirm password")){
            setMsg("Passwords doesn't match");
            setSeverity("error");
            setOpen(true);
            return
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} sx={{ background: `url(${background_img}) left center`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            {
                singup?
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container justify="flex-end" alignItems="center">
                    <Box sx={{ my: 8, mx: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} alt="Oral" src={logo}/>
                        <Typography component="h1" variant="h5"> Sign up </Typography>

                        <Box component="form" noValidate onSubmit={handleSignUpSubmit} sx={{ mt: 1 }}>

                        <TextField margin="normal" size='small' required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                        <TextField margin="normal" size='small' required fullWidth id="regNo" label="Register No" name="regNo"/>
                        <TextField margin="normal" size='small' required fullWidth name="password" label="Password" type="password" id="password1" />
                        <TextField margin="normal" size='small' required fullWidth name="confirm password" label="Confirm Password" type="password" id="password2" />
                                                
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
                        
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item><Typography variant="body2" onClick={toggleSignin} sx={{cursor: 'pointer'}}>
                                {"Already have an account? Sign In"}
                            </Typography>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>
                :
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container justify="flex-end" alignItems="center">
                    <Box sx={{ my: 8, mx: 4, p:2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} alt="Oral" src={logo}/>
                        <Typography component="h1" variant="h5"> Sign in </Typography>
                        
                        <Box component="form" noValidate onSubmit={handleSignInSubmit} sx={{ mt: 1 }}>
                            
                        <TextField margin="normal" size='small' required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                        <TextField margin="normal" size='small' required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                        {/* <FormControlLabel control={<Checkbox  size='small' value="remember" color="primary" />} label="Remember me" /> */}
                    
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                        
                        <Grid container>
                            <Grid item xs> </Grid>
                            <Grid item>
                                <Typography variant="body2" onClick={toggleSignin} sx={{cursor: 'pointer'}}>
                                {"Don't have an account? Sign Up"}
                                </Typography>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>
            }

            <Snackbar open={open} autoHideDuration={5000} onClose={()=>setOpen(false)} anchorOrigin={{ vertical: 'top',horizontal: 'right' }}>
                <Alert onClose={()=>setOpen(false)} severity={severity} sx={{ width: '100%' }}>{msg}</Alert>
            </Snackbar>
            
        </Grid>
    );
}

export default  LoginPage;