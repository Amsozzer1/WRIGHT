import Menu from './MENU.js';
import { useParams,useNavigate } from 'react-router-dom';
import {getLessonFromSubCourse} from './firebase/functions.js';
import {Button} from '@mui/material';
import React, { useState } from 'react';
import './chapter.css';
// import CommentsSection from './comments.js';



function Chapter({chpNum,id,name,video,course,lessonid}){
    let navigate = useNavigate();
    function handleClick(){
        navigate(`/${course}/${lessonid}/${name}`);
    }
    return (
        <div className="chapter-entry">
            <button className="chapter-button"
            onClick={handleClick}
            
            >Chapter {chpNum}: {name}</button>
        </div>
    )
}


export default function LessonPage() {
    var { course,lessonid } = useParams(); 
    let [Chapters, setChapters] = useState([]);
    let [rendered, setRendered] = useState(false);
    
    function dtbsHelper(course,lessonid){
        getLessonFromSubCourse(course,lessonid)
        .then((docs) =>
        // eslint-disable-next-line array-callback-return
        docs.map((doc) => {
          
          setChapters((prev) => {
            return [...prev, doc];
          });
        })
        );
       
      }
    React.useEffect(() => {
      if(rendered===false){
        dtbsHelper(course,lessonid);
        setRendered(true);
      }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rendered]);
    
    return (
        <div >
            <Menu/>
            
                {/* <h1 className='pt-20'>{course}/{lessonid}</h1> */}
                <div className='pt-20 container_chapter'
                
                >
                {
                    Chapters.map((chapter) => 
                        <Chapter key={chapter[1].number} course={course} lessonid={lessonid} chpNum={chapter[1].number} name={chapter[1].name}/>
                    )
                
                }
                </div>
        </div>
    );
    }