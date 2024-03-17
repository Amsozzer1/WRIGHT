import {Box } from '@mui/material';
import * as React from 'react';
import { getDocsFromCollection } from './firebase/functions.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Menu from './MENU.js';
import "./App.css";


function Course({ course, image }) {
    let navigate = useNavigate();
    let [courseSelected, setCourseSelected] = React.useState(null);
    
    function handleCourseSelected(course) {
        setCourseSelected(course);
        console.log(courseSelected);
        navigate(`/courses/${course}`);
      }
    return (
      <Box className="CourseCard" onClick={()=>{handleCourseSelected(course)}}>
        <img className="CourseImage" src={image} alt={course} />
        <h2 className="CourseTitle">{course}</h2>
      </Box>
    );
  }
  


function Courses() {
    // let [user, setUser] = React.useState(null);
    let [name, setName] = React.useState(null);
    let [nameCount, setNameCount] = React.useState(false);
    
    
    const auth = getAuth();
    

    React.useEffect(() => {
      function authStateChange(){
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // setUser(user);
            setName(user.displayName);
            console.log(user);
          } else {
            // setUser(null);
          }
        });
      }
        if(!nameCount){
      authStateChange();
        setNameCount(true);
        
    }
    }, [auth, nameCount]);

    
    const [docs, setDocs] = React.useState(
        [
        
    ]);

    const [count, setCount] = React.useState(false);
    React.useEffect(() => {
      if(!count){
        getDocsFromCollection().then((docs) => setDocs(docs));
        setCount(true);
    }
    }, [count]);

    return (
        <div className=" pt-20  h-screen flex flex-col "  style={{alignContent:'center',alignItems:'center'}} >
            <h1 style={{fontWeight:'bold', fontSize:'28px',}}>Welcome {name} Here are your courses.</h1>
            <div className='CoursesContainer flex flex-col'>
            
            <div className='CoursesGrid  flex flex-row'>
                {docs.map((doc) => (
                <Course key={doc[0]} course={doc[0]} image={doc[1]['image'] || null}
                 />
                ))}
            </div>
            </div>
        </div>

    );
}
export default function CoursesPage() {
    return (
      <div>
        <Menu />
        <Courses />
      </div>
    );
  }