import React from 'react';
import { Button, TextField, Paper, Grid, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from './firebase/config';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
// Initialize the Firebase Auth instance with your app
const auth = getAuth(app);
export default function SimpleAlert({severity, message, Icon}) {
  return (
    <Alert icon={<Icon fontSize="inherit" />} severity={severity}>
      {message}
    </Alert>
  );
}
export function SignUp() {
  let router = useNavigate();
  let [email, setEmail] = React.useState('');
  let [password, setPassword] = React.useState('');
  let [password2, setPassword2] = React.useState('');
  let [clicked, setClicked] = React.useState(false);
  let [success, setSuccess] = React.useState(false);
  let [showAlert, setShowAlert] = React.useState(false);
  let [message, setMessage] = React.useState('');
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isPasswordStrong(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;
  
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough;
  }
  const TimeOut=()=>{ 
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  function signUp() {
    
      setClicked(true);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      if (password !== password2){
        setSuccess(false);
        setMessage('Passwords dont match');
        return;
      }
      else if (!isValidEmail(email)){
        setSuccess(false);
        setMessage('Email is not valid');
        return;
      }
      else if (!isPasswordStrong(password)){
        setSuccess(false);
        setMessage('Password is not strong enough');
        return;
      }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setMessage('Account created successfully');
        console.log(user);
        setSuccess(true); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        setSuccess(false);
      });
    }
    // }
  }

  return (
    <Paper elevation={10} style={{ padding: 20, height: 'fit-content', width: 320, margin: "20px auto" }}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <div className='flex flex-col gap-2'>
            <Typography sx={{textAlign:'center'}} variant="h5" component="h3">
              Create your account
            </Typography>
            <Typography sx={{textAlign:'center'}} component="p">Free and only takes a minute.</Typography>
          </div>
        </Grid>
        <Grid item>
          <div className='flex flex-col gap-5'>
            <TextField label="Email address" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" fullWidth required />
            <TextField label="Password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" type="password" fullWidth required />
            <TextField label="Re Enter Password" onChange={(e) => setPassword2(e.target.value)} placeholder="Re-enter password" type="password" fullWidth required />
          </div>
        </Grid>
        <Grid item>
          <Button type="submit" color="primary" variant="contained" fullWidth onClick={signUp}>Continue</Button>
        </Grid>
        <Grid item>
          <Typography> Already have an account?
            <Button onClick={()=>router('/signin')}component="button" sx={{color:'teal'}} variant="body2" >Login</Button>
          </Typography>
          {showAlert && clicked && success ? <SimpleAlert Icon={CheckIcon} severity="success" message={message}/> : null}
          
          {showAlert && clicked && !success ?<SimpleAlert Icon={CloseIcon} severity="error" message={message}/>:null}
        </Grid>
      </Grid>
    </Paper>
  );
}
