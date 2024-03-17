import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './MENU.js';
import './App.css';
import {getSubDocsFromCollection} from './firebase/functions.js';


function SubCourse({course,id,name,lessons}){
  let navigate = useNavigate();
  console.log(course,id,name,lessons);
  return (
    <div className=' each_course_bg w-100 rounded-2xl h-fit flex flex-row mb-10'
    onClick={() => navigate(`/${course}/${id}`)}
    >
      <img className='w-44 h-40 rounded-l-2xl'alt='i'
      src='https://lh3.googleusercontent.com/drive-viewer/AKGpihZSoUtz2xPesTOzIFKQnWXJ8MLdzEVBenGmLBPO2ZP7pHeH-rfxKcsQczDVTCjTEieC-SH7O9fHmRtmXiQlhZzk59bK6g=s1600'></img>
      <div className='pl-20 flex flex-col align-middle justify-center subCourseLabels'>
      <h1>{name}</h1>
      <p>{lessons} Lessons</p>
      </div>
    </div>

  )
}

  
export function CoursesEach(){
  
  let { course } = useParams(); 
  let [courses, setCourses] = useState([]);

  function dtbsHelper(course){
    getSubDocsFromCollection(course)
    .then((docs) =>
    docs.forEach((doc) => {
      
      setCourses((prev) => {
        return [...prev, doc];
      });
    })
    );
   
  }
React.useEffect(() => {
  
  setCourses([]);
  dtbsHelper(course);
  


}, [course]);

  return (
    <div className=' overflow-hidden'>
      <Menu />
      <div className=' pt-20 flex flex-col gap-2'>
        <div className='  flex flex-col px-10 h-screen align-middle justify-start gap-2 text-start pl-5'>
          <h1 className='CourseLabel text-start'>{course}</h1>
          {courses&&
            courses.map((subcourse) => (
              <SubCourse course={course} id={subcourse[0]} key={subcourse[0]} name = {subcourse[1].name}  lessons = {subcourse[1].lessons}/>
            ))}
        </div>
      </div>
    </div>
  );
}