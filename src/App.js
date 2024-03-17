
import './App.css';
import * as React from 'react';
import { SignIn } from './Login';
import { SignUp } from './SignUp';
import { Homepage } from './Homepage';
import {CoursesEach} from './Courses_each';
import CoursesPage from './COURSES';
import LessonPage from './LessonPage';
import EachLesson from './EachLesson';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Link from './firebase/LinkedIn'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/courses',
    element: <CoursesPage />,
  },
  {
    path: '/courses/:course',
    element: <CoursesEach />,
  },
  {
    path: '/:course/:lessonid',
    element: <LessonPage />,
  },
  {
    path: '/:course/:lessonid/:chapterid',
    element: <EachLesson />,
  }

]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
