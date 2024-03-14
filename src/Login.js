import React from 'react';
import {Button, TextField, Link, Paper, Grid, Typography } from '@mui/material';
import LinkedIn from './LinkedIn.png';
import Googgle from "./icons8-google-60.png";
import Github from "./icons8-github-50 (1).png"
import Microsoft from "./icons8-microsoft-48.png"
// import { GoogleAuthProvider } from "firebase/auth";
import {app} from './firebase/config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";


import { FacebookAuthProvider } from "firebase/auth";

const providerFace = new FacebookAuthProvider();
let providerMi = new OAuthProvider('microsoft.com');
providerMi.setCustomParameters({
  prompt: "consent",
  tenant: "44467e6f-462c-4ea2-823f-7800de5434e3",
  })
const providerGit = new GithubAuthProvider();
const provider = new GoogleAuthProvider();


const auth = getAuth();

export function SignIn() {
  
  const signInWithMicrosoft = () => {
    signInWithPopup(auth, providerMi)
  .then((result) => {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.

    // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;

  })
  .catch((error) => {
    // Handle error.
    console.log(error);
  });
}
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        router('/');
        console.log(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const signInWithGithub = () => {
    signInWithPopup(auth, providerGit)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user);
    router('/');
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  }
  const signInWithFacebook = () => {

const auth = getAuth();
signInWithPopup(auth, providerFace)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    router('/');
    // console.log("USER: ",user);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log("ERROR: ",error);
    // ...
  });
}
  const responseFacebook = (response) => {
    console.log(response);
  }
  
  
  let router = useNavigate();
  return (
    <Paper elevation={10} style={{ padding: 20, height: 'fit-content', width: 320, margin: "20px auto" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography sx={{textAlign:'center'}} variant="h5" component="h3">
            Welcome
          </Typography>
          <Typography sx={{textAlign:'center'}} component="p">Log in to continue to Dashboard.</Typography>
        </Grid>
        <Grid item>
          <TextField label="Email address" placeholder="Enter email" fullWidth required />
        </Grid>
        <Grid item>
          <Button type="submit" color="primary" variant="contained" sx={{backgroundColor:'teal'}} fullWidth>Continue</Button>
        </Grid>
        <Grid item>
          <Typography> Don’t have an account?
            <Link className='pl-2' sx={{color:'teal'}} href="#" onClick={() => {router('/signup')}}>
              Sign Up
            </Link>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='py-5'>
              <hr style={{ width: '45%', textAlign: 'left', marginLeft: 0 }} />
              <p>or</p>
              <hr style={{ width: '45%', textAlign: 'left', marginLeft: 0 }}/>
            </div>
          </Typography>
           <div className='flex flex-col gap-4 pb-10'>
            <Button variant="contained" sx={{fontSize:'15px',textShadow:'rgb(0, 0, 255)',justifyContent:'space-between',backgroundColor:'white',color:'black'}} fullWidth
            onClick={signInWithGoogle}
            >
            <img className = "h-7" src= {Googgle} alt="Google"/>
            Continue with Google
            </Button>
            <Button variant="contained" onClick={signInWithGithub}sx={{fontSize:'15px',textShadow:'rgb(0, 0, 255)',justifyContent:'space-between',backgroundColor:'white',color:'black'}} fullWidth>
              <img className = "h-7" src= {Github} alt="Github"/>
              Continue with Github</Button>
            {/* <Button onClick={signInWithMicrosoft}variant="contained" sx={{fontSize:'14px',textShadow:'rgb(0, 0, 255)',justifyContent:'space-between',backgroundColor:'white',color:'black'}} fullWidth>
              <img className = "h-7" src= {Microsoft} alt="Microsoft"/>
              Continue with Microsoft</Button> */}
            <Button 
            onClick={signInWithFacebook}
            variant="contained" sx={{fontSize:'15px',textShadow:'rgb(0, 0, 255)',justifyContent:'space-between',backgroundColor:'white',color:'black'}} fullWidth>
              <img className = "h-7" src= {LinkedIn} alt="LinkedIn"/>
              Continue with Facebook
            </Button>
                   
            </div>

        </Grid>
        {/* You can add the social media buttons here, similar to below */}
      </Grid>
    </Paper>
  );
}
