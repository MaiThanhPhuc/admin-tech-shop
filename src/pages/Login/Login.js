import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { validateEmail, validatePassword } from '../../util/ValidateData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [clickLogin, setClickLogin] = useState(false);
  const [validate, setValidate] = useState(true);
  const navigate = useNavigate();
  const handleClickLogin = () => {
    setClickLogin((prev) => !prev);
  };

  const validateLogin = (data) => {
    return validateEmail(data?.email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleClickLogin();
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!validateLogin(loginData)) {
      setValidate(false);
      handleClickLogin();
      return;
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kltn-ecommerce.herokuapp.com/api/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: loginData,
    };

    axios
      .request(config)
      .then((response) => {
        const dataResp = response.data;
        navigate('/dashboard');
        localStorage.setItem('access_token', dataResp.data.access_token);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Incorret email or password.');
      })
      .finally(() => handleClickLogin());
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={!validate}
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
                error={!validate}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <LoadingButton
                type="submit"
                endIcon={<SendIcon />}
                loading={clickLogin}
                loadingPosition="end"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Sign In</span>
              </LoadingButton>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
