import React from 'react';

const LINKEDIN_CLIENT_SECRET = 'nuKNXDOY3O4wyeNz';
const LINKEDIN_CLIENT_ID = '786lejjp9z5n84';
const LINKEDIN_CALLBACK_URL = 'http://localhost:3000/auth/linkedin/callback';
const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  LINKEDIN_CALLBACK_URL
)}&scope=r_liteprofile%20r_emailaddress`;

const LinkedInOAuth = () => {
  const handleLogin = async (code) => {
    // Exchange the code for an access token
    const data = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: LINKEDIN_CALLBACK_URL,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    }).then((response) => response.json());

    const accessToken = data.access_token;

    // Fetch the user's LinkedIn profile
    const userProfile = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    // Handle the user profile data (e.g., store it in your database and log the user in)
    console.log(
      `Welcome, ${userProfile.data.firstName.localized.en_US} ${userProfile.data.lastName.localized.en_US}!`
    );
  };

  const handleLinkedInCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    if (code) handleLogin(code);
  };

  React.useEffect(() => {
    handleLinkedInCallback();
  }, []);

  return (
    <div>
      <a href={linkedinOAuthURL}>Sign in with LinkedIn</a>
    </div>
  );
};

export default LinkedInOAuth;