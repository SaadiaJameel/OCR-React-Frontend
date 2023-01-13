import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import background_img from '../Assets/background.jpeg';
import logo from '../Assets/logo.svg'

const LoginPage =()=>{

    const [singup, setSignup] = useState(false);

    const toggleSignin = ()=>{
        setSignup(!singup);
        console.log(singup)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                background: `url(${background_img}) left center`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
            />
            {
                singup?
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container justify="flex-end" alignItems="center">
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} alt="Oral" src={logo}/>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="regNo"
                            label="Register No"
                            name="regNo"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                            <Typography variant="body2" onClick={toggleSignin} sx={{cursor: 'pointer'}}>
                                {"Already have an account? Sign In"}
                            </Typography>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>
                :
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container justify="flex-end" alignItems="center">
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        p:2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} alt="Oral" src={logo}/>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                            </Grid>
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
            
        </Grid>
    );
}

export default  LoginPage;