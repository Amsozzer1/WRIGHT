import React, { useEffect } from 'react';
import {Button, TextField, Link, Paper, Grid, Typography } from '@mui/material';
import LinkedIn from '../LinkedIn.png';
const FacebookSDK = ({ appId, version }) => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      // eslint-disable-next-line no-undef
      FB.init({
        appId      : appId,
        cookie     : true,
        xfbml      : true,
        version    : version
      });
      // eslint-disable-next-line no-undef
      FB.AppEvents.logPageView();
    };

    // Load the SDK script
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
  }, [appId, version]); // Empty array ensures this only runs once

  return null; // This component doesn't render anything
};
export const FacebookLoginButton = () => {
  const handleFBLogin = () => {
    // Calling the FB.login method with the required options
    window.FB.login(response => {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information.... ');
        // For example, getting the user's profile information
        window.FB.api('/me', { fields: 'name, email' }, function(user) {
          console.log(`Good to see you, ${user.name}.`);
          // You can now use this information to log the user in to your app
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email'}); // Add other permissions as needed
  };

  return (
    // <button onClick={handleFBLogin}>Login with Facebook</button>
    <Button 
    onClick={handleFBLogin} 
    variant="contained" sx={{fontSize:'15px',textShadow:'rgb(0, 0, 255)',justifyContent:'space-between',backgroundColor:'white',color:'black'}} fullWidth>
              <img className = "h-7" src= {LinkedIn} alt="LinkedIn"/>
              Continue with Facebook
            </Button> 
  );
};
const FACE = () => {
  // Replace 'your-app-id' and 'vX.X' with your app's ID and the SDK version
  return (
    <div>
      <FacebookSDK appId="434287805628862" version="v11.0" />
      <FacebookLoginButton />

      {/* ... rest of your app components */}
    </div>
  );
};

export default FACE;