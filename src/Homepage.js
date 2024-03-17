import React from 'react';
import { Paper, Typography, Box, Button, Grid, Container } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import Menu from './MENU.js';
import Uni from './UNI.jpg'
import Hat from './Grad_cap.jpg'
import './App.css';


export function Homepage() {
    

  return (
    <div>
        <Menu />
        <div className='pt-11'>
        <Box component="header" className="BG"sx={{ backgroundImage: `url(${Uni})`, height:'550px',
          borderBottom: '5px solid teal',
      }}>
         
        </Box>
        </div>
        <Container >
        
        
        
        
        
        <div className='flex flex-row gap-5 align-middle'>
        <Box component="section" sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <img src={Hat} alt="Graduation Cap" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
        </Box>
        <Paper elevation={3} sx={{ display:'flex', flexDirection:'column',my: 4, p: 2,justifyContent:'center', alignItems:'center'}}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography variant="body1" sx={{textAlign:'center', }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </Typography>
        </Paper>
        </div>
        
        
        
      </Container>
      <Box component="section"sx={{alignContent:'center',justifyContent:'center', mt: 4, display:'flex',flexDirection:'row',backgroundColor:'teal',width:'100%',overflow:'hidden',height:'100%'}}>
        <div  className='flex flex-col relative left-64'  style= {{alignContent:'center',justifyContent:'center', textAlign: 'center', fontSize:'28px'}}>
            <h1>Ready for your next lesson?</h1>
          </div>
          <Grid container spacing={1} justifyContent="between"direction="column"
  alignItems="center"
 columns={{ xs: 4, md: 12 }}
 sx={{paddingTop:'5px',paddingBottom:'15px',position:'relative',left:'5rem',}}>
            <Grid item xs={2}>
              <Button sx={{width:'150px',backgroundColor:'whitesmoke'}} variant="outlined" startIcon={<InstagramIcon />}>
                Instagram
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button sx={{width:'150px',backgroundColor:'whitesmoke'}} variant="outlined" startIcon={<YouTubeIcon />}>
                YouTube
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button sx={{width:'150px',backgroundColor:'whitesmoke', }} variant="outlined" startIcon={<EmailIcon />}>
                Email
              </Button>
            </Grid>
          </Grid>
        </Box>
        
    </div>
  );
}
