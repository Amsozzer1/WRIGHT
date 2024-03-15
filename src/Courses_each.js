import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Menu from './MENU.js';
import './App.css';
function SubCourse({subCourse}){
  
  return (
    <div className=' each_course_bg w-100 rounded-2xl h-fit flex flex-row mb-10'>
      <img className='w-44 h-40 rounded-l-2xl'alt='i'
      src='https://lh3.googleusercontent.com/drive-viewer/AKGpihZSoUtz2xPesTOzIFKQnWXJ8MLdzEVBenGmLBPO2ZP7pHeH-rfxKcsQczDVTCjTEieC-SH7O9fHmRtmXiQlhZzk59bK6g=s1600'></img>
      <div className='pl-20 flex flex-col align-middle justify-center subCourseLabels'>
      
      {subCourse[1] ?<h1>{subCourse[0]} : {subCourse[1]}</h1>: <h1>{subCourse[0]}</h1> }
      
      
      <p>{subCourse[2]} Lessons</p>
      </div>
    </div>

  )
}


export function CoursesEach(){
  const DummyData =[
    {
      "id": "1",
      "course": "Math",
      'SubCourse': [[1,['Calculus II',null,10]], [2,['Calculus II',null,10]], [3,['Calculus III',null,10]]],
    },
    {
      "id": "2",
      "course": "Computer Science",
      'SubCourse': [[1,['Object Oriented Programming C++ I',null,10]], [2,['Object Oriented Programming C++ II',null,10]]],
    },
    {
      "id": "3",
      "course": "Physics",
      'SubCourse': [[1,['Physics 1','Mechanics & Wave Motion',20]], [2,['Physics 2','Electricity & Magnetism',35]], [3,['Statics',null,15]]],
    },
    {
      "id": "4",
      "course": "Chemistry",
      'SubCourse': [[1,['Chemistry I',null,2]], [2,['Chemistry II',null,10]]],
    },
  ];
  function getCourse(courseName) {
    const course = DummyData.find((c) => c.course === courseName);
    // Here you would navigate to 404 if course is undefined, using navigate hook from react-router-dom
    // if (!course) navigate('/404');
    setChosen(course);
  }

  let { course } = useParams(); // This is how you destructure course out of params
  let [chosen, setChosen] = useState(null);

  React.useEffect(() => {
    getCourse(course);
    // Removing chosen from the dependency array to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  return (
    <div className=' overflow-hidden'>
      <Menu />
      <div className=' pt-20 flex flex-col gap-2'>
        <div className='  flex flex-col px-10 h-screen align-middle justify-start gap-2 text-start pl-5'>
      <h1 className='CourseLabel text-start'>{course}</h1>
        
          
          {chosen &&
            chosen.SubCourse.map((subcourse) => (
              // subcourse[0] is the unique id used for the key
              <SubCourse key={subcourse[0]} subCourse={subcourse[1]} />
            ))}
        </div>
        
        

        
      </div>
    </div>
  );
}