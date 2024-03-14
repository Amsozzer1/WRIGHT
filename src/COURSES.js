import { Button,Box, selectClasses } from '@mui/material';
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
    let [user, setUser] = React.useState(null);
    let [name, setName] = React.useState(null);
    let [nameCount, setNameCount] = React.useState(false);
    
    
    const auth = getAuth();
    function authStateChange(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setName(user.displayName);
          console.log(user);
        } else {
          setUser(null);
        }
      });
    }

    React.useEffect(() => {
        if(!nameCount){
      authStateChange();
        setNameCount(true);
        
    }
    }, [nameCount]);

    
    const [docs, setDocs] = React.useState(
        [
            ['Physics', {image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZSoUtz2xPesTOzIFKQnWXJ8MLdzEVBenGmLBPO2ZP7pHeH-rfxKcsQczDVTCjTEieC-SH7O9fHmRtmXiQlhZzk59bK6g=s1600'}], 
            ['Math', {image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbMYPUE9aO6n47cd-MYOuDfEexMCQ8DYRU1t2zSAWX-Q2nLtOlAsueJ23UZKXnzTSdKPDDNJV5jV4uTfsRPFv2la4yiWA=s1600'}],
            ['Chemistry', {image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihaN8P7DDhtVzNN1FD2wAaXJbyk6suLIQmuZjhEzy3n-gsosGZSSY6684y191kkasQpeGqmuBjlPzTvw-9b5hYDKNdVDSQ=s1600'}],
            ['Computer Science', {image: 'https://lh3.googleusercontent.com/drive-viewer/AKGpihY5Y7BM9qW5A71Gu10l6zEXKPX6hbjxEc312aQKn6qZH6OTSQbUc6zT9zwsY6IvGsJIsQ3oCBo6it05qO5nvr7Zhd3F9g=s1600'}],
    
    ]);
    
    //REAL TIME DATABASE
    // const [count, setCount] = React.useState(false);
    // React.useEffect(() => {
    //     if(!count){
    //     getDocsFromCollection().then((docs) => setDocs(docs));
    //     setCount(true);}
    // }, [count]);

    //MOCK DATABASE
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