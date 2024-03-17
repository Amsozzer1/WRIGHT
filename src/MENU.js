import * as React from 'react';
import Box from '@mui/material/Box';
import { Button} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";



import './App.css';
function DropDown(){
  let Course =[[1,'Calculus'], [2,'Physics'], [3,'Chemistry'], [4,'Computer Science']];
  let [courseSelected, setCourseSelected] = React.useState(null);
  let navigate = useNavigate();
  function handleCourseSelected(course) {
    setCourseSelected(course);
    console.log(courseSelected);
    navigate(`/courses/${course}`);
  }
  return(
    <div className='flex flex-col absolute bg-white w-100 border-2 border-black border-t-0 '
    style={{top:'3rem'}}>
      {Course.map((course) => {
        return (
        <Button onClick={()=>{handleCourseSelected(course[1]);}} key={course[0]} className='text-6xl courseButton' sx={{fontSize:'1rem', minWidth: 100,color:'black'}}>
          {course[1]}
        </Button>
        )
      })}
    
    </div>
  )

}
function DropDownUser(){
  let Array = ['Profile', 'Settings', 'Sign Out'];
  function handleSignOut(){
    let auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign Out');
    }).catch((error) => {
      console.log(error);
    });
  }
  function handleOnClick(e){
    if(e.target.textContent === 'Sign Out'){
      handleSignOut();
    }
  }
  return(
    <div className='flex flex-col absolute  bg-white w-100 border-2 border-black border-t-0' style={
      {
        transition: '1s',
        alignContent:'center',
        justifyContent:'center',
        textAlign: 'center',
        right:'25px',
        top:'3rem',
      }
    }>
      {Array.map((course) => {
        return <Button key="course" onClick={handleOnClick} className='text-6xl courseButton' sx={{fontSize:'1rem', minWidth: 100,color:'black'}}>{course}</Button>
      })}
    
    </div>
  )

}
function User({user}){
  let image = user.photoURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
  let [open, setOpen] = React.useState(false);
  let handleOpen = () => {
    setOpen(!open);
  }
  return(
    <div className='flex flex-col align-middle justify-center'>
      <img src={image} alt="user" style={{marginRight:'60px',width:'40px', height:'40px', borderRadius:'50%'}}
      onClick={handleOpen}/>
      {open ? <DropDownUser/> : null}
    </div>
  )

}
export default function AccountMenu() {
  let router = useNavigate();
  let [anchorEl, setAnchorEl] = React.useState(null);
  let [user, setUser] = React.useState(null);
  

  const auth = getAuth();
  function authStateChange(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        //console.log(user);
      } else {
        setUser(null);
      }
    });
  }
  React.useEffect(() => {
    authStateChange();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleClick = (event) => {
    setAnchorEl(!anchorEl);
  };



  return (
    <div className='Menu '>
      <Box className="MenuBox" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent:'space-evenly' }}>
        <Button className="text-6xl" sx={{  color:'black', fontSize:'1.2rem', minWidth: 100 }}
        onClick={()=>router('/')}>Home</   Button>
        <div className='flex flex-row justify-center' style={{alignContent:'center',alignItems:'center'}}>
          <Button className="text-6xl" sx={{  color:'black', fontSize:'1.2rem', minWidth: 100 }} onClick={()=>router('/courses')}>Course</  Button>
          <ArrowDropDownIcon onClick={handleClick}/>
          </div>
          {anchorEl ? <DropDown/> : null}
        <Button className="text-6xl" sx={{  color:'black', fontSize:'1.2rem', minWidth: 100 }}>About</Button>
      </Box>
      {
        user ? <User user={user}/>:<Button onClick={()=>router('/signin')} className = 'LoginTitle' sx={{ color:'black', fontSize:'1.2rem',minWidth: 100,}} >Login</Button>
      }
      
    </div>
  );
}
