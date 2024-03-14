import { useParams } from 'react-router-dom';


export function CoursesEach(){

  let params = useParams();
  let course = params.course;
  return (
    <h1>COURSE: {course}</h1>
  )
}