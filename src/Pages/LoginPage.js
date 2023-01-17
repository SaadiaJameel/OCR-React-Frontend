import React, {useState} from 'react';
import {Box,Button,Snackbar,Paper,Avatar,CssBaseline} from '@mui/material';
import {TextField, Grid,Typography, FormControl, IconButton, OutlinedInput, InputAdornment} from '@mui/material';
import {InputLabel} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import background_img from '../Assets/background.jpeg';
import logo from '../Assets/logo.svg'
import axios from 'axios';
import config from '../config.json';
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage =()=>{

    const [singup, setSignup] = useState(false);
    const [msg, setMsg] = useState("")
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleClickShowSignupPassword = () => setShowSignupPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const toggleSignin = ()=>{
        setSignup(!singup);
    }

    const showMsg = (msg, severity)=>{
        setMsg(msg);
        setSeverity(severity);
        setOpen(true);
    }

    const handleSignInSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('email')==="" || data.get('password')===""){
            showMsg("Cannot leave Required fiels empty",'error')
            return
        }

        
        setLoading(true);

        axios.post(`${config['path']}/auth/login`, {
            email: data.get('email'),
            password: data.get('password')
        })
        .then(function (response) {
            var data = response.data
            
            const object = {username: data.username, email: data.email, roles: data.role, atoken: data.access_token, reg_no: data.reg_no }
            sessionStorage.setItem("info",JSON.stringify(object))

            if(response.data.role.includes(1)){
                navigate("/adminportal");
            }else{
                navigate("/upload");
            }
        })
        .catch(function (error) {
            if(error.response){
                showMsg(error.response.data.message, "error")
            }else{
                alert(error)
            }
        }).finally(()=>{
            setLoading(false);
        });

    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if(data.get('signup email')==="" || data.get('regNo')==="" 
        || data.get('signup password')==="" || data.get('confirm password')===""
        || data.get('username')===""){
            showMsg("Cannot leave required fields empty","error")
            return
        }
        if(data.get("signup password").length < 8){
            showMsg("Password should contain atleast 8 charactors","error")
            return
        }
        if(data.get("signup password") !== data.get("confirm password")){
            showMsg("Passwords doesn't match", 'error')
            return
        }

        setLoading(true)
        axios.post(`${config['path']}/auth/signup`, {
                username: data.get('username'),
                email: data.get('signup email'),
                reg_no: data.get('regNo'),
                password: data.get('signup password')
            })
            .then(function (response) {
                showMsg("You will recieve an email on acceptance", "success")
                return
            })
            .catch(function (error) {
                if(error.message){
                    showMsg(error.message, "error")
                }else{
                    showMsg(error, "error")
                }
            }).finally(()=>{
                setLoading(false)
            });
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

                        <TextField margin="normal" size='small' inputProps={{ maxLength: 100 }} required fullWidth id="email" label="Email Address" name="signup email" autoFocus/>
                        <TextField margin="normal" size='small' inputProps={{ maxLength: 100 }} required fullWidth id="username" label="User Name" name="username"/>
                        <TextField margin="normal" size='small' inputProps={{ maxLength: 100 }} required fullWidth id="regNo" label="Register No" name="regNo"/>
                        <FormControl margin="normal" fullWidth  variant="outlined">
                        <InputLabel required size='small' htmlFor="signup password">Password</InputLabel>
                        <OutlinedInput required size='small' inputProps={{ maxLength: 100 }} id="signup password" type={showSignupPassword ? 'text' : 'password'} label="Password" name="signup password"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowSignupPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
                        <FormControl margin="normal" fullWidth  variant="outlined">
                        <InputLabel required size='small' htmlFor="confirm password">Confirm Password</InputLabel>
                        <OutlinedInput required size='small' inputProps={{ maxLength: 100 }} id="confirm password" type={showConfirmPassword ? 'text' : 'password'} label="Confirm Password" name="confirm password"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>                                                
                        <Button type="submit" disabled={loading} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Request to Register</Button>
                        
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
                            
                        <TextField margin="normal" size='small' inputProps={{ maxLength: 100 }} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                        <FormControl margin="normal" fullWidth  variant="outlined">
                        <InputLabel required size='small' htmlFor="password">Password</InputLabel>
                        <OutlinedInput required size='small' inputProps={{ maxLength: 100 }} id="password" type={showPassword ? 'text' : 'password'} label="Password" name="password"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
                        {/* <FormControlLabel control={<Checkbox  size='small' value="remember" color="primary" />} label="Remember me" /> */}
                    
                        <Button type="submit" disabled={loading} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                        
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